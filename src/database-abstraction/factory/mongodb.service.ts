import { Injectable, Logger } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AbstractDatabaseService } from '../database-abstraction.service';
import { MongooseModelsMapEnum } from '../types/enums/mngodb-model-map.enum';
import { UserModel } from '../models/user.model';

@Injectable()
export class MongoDatabaseService extends AbstractDatabaseService {
  private readonly logger = new Logger(MongoDatabaseService.name);

  private client: Mongoose;
  private mongoUri: string;

  constructor(configService: ConfigService) {
    super();

    this.mongoUri = configService.get<string>('MONGO_URI');
  }

  async connect(): Promise<void> {
    this.client = await mongoose.connect(this.mongoUri);
    this.logger.log('Connected to MongoDB');
    console.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    await this.client.connection.close();
    this.logger.log('Distonnected from MongoDB');
    console.log('Distonnected from MongoDB');
  }

  async insertOne<T>(table: MongooseModelsMapEnum, data: T): Promise<void> {
    const model = this.getModel(table);
    const insertEntity = new model(data);
    await insertEntity.save();
  }

  async findOne<T>(
    table: MongooseModelsMapEnum,
    query: Partial<T>,
  ): Promise<T | null> {
    const model = this.getModel(table);
    return model.findOne(query).lean<T>();
  }

  private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;

      default:
        break;
    }
  }
}
