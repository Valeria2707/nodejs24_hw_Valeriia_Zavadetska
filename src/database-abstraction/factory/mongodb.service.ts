import { Injectable, Logger } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AbstractDatabaseService } from '../database-abstraction.service';
import { MongooseModelsMapEnum } from '../types/enums/mngodb-model-map.enum';
import { UserModel } from '../models/user.model';
import { ReservationModel } from '../models/reservation.model';
import { MenuModel } from '../models/menu.model';

@Injectable()
export class MongoDatabaseService<T> extends AbstractDatabaseService<T> {
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
  }

  async disconnect(): Promise<void> {
    await this.client.connection.close();
    this.logger.log('Disconnected from MongoDB');
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

  async findAll(
    table: MongooseModelsMapEnum,
    filter?: Partial<T>,
    search?: string,
  ): Promise<T[]> {
    const model = this.getModel(table);
    const query: any = {};

    if (filter && Object.keys(filter).length > 0) {
      Object.assign(query, filter);
    }

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [
        { name: { $regex: regex } },
        { description: { $regex: regex } },
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
      ];
    }

    return model.find(query).lean<T[]>().exec();
  }

  async updateOne<T>(
    table: MongooseModelsMapEnum,
    query: Partial<T>,
    updateData: Partial<T>,
  ): Promise<T | null> {
    const model = this.getModel(table);
    return model.findOneAndUpdate(query, updateData, { new: true }).lean<T>();
  }

  async deleteOne<T>(
    table: MongooseModelsMapEnum,
    query: Partial<T>,
  ): Promise<void> {
    const model = this.getModel(table);
    await model.deleteOne(query).exec();
  }

  private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
    switch (table) {
      case MongooseModelsMapEnum.USER:
        return UserModel;
      case MongooseModelsMapEnum.RESERVATION:
        return ReservationModel;
      case MongooseModelsMapEnum.MENU:
        return MenuModel;
      default:
        throw new Error(`Model for table ${table} not found`);
    }
  }
}
