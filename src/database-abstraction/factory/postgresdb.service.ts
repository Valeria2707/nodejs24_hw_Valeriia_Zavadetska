import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DBType } from '../types/enums/database-type.enum';
import { AbstractDatabaseService } from '../database-abstraction.service';
import { PostgresEntityMapEnum } from '../types/enums/postgres-entity-map.enum';
import { DataSource } from 'typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class PostgresDatabaseService<T> extends AbstractDatabaseService<T> {
  private dataSource: DataSource;
  private readonly logger = new Logger(PostgresDatabaseService.name);

  constructor(configService: ConfigService) {
    super();

    this.dataSource = new DataSource({
      type: DBType.POSTGRES,
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DB'),
    });
  }

  async connect(): Promise<void> {
    await this.dataSource.initialize();
    this.logger.log('Connected to Postgres');
    console.log('Connected to Postgres');
  }

  async disconnect(): Promise<void> {
    await this.dataSource.destroy();
    this.logger.log('Distonnected from Postgres');
    console.log('Distonnected from Postgres');
  }

  async insertOne<T>(table: PostgresEntityMapEnum, data: T): Promise<void> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);
    await repository.save(data);
  }

  async findOne<T>(
    table: PostgresEntityMapEnum,
    query: Partial<T>,
  ): Promise<T | null> {
    const entity = this.getEntity(table);
    const repository = this.dataSource.getRepository(entity);
    return repository.findOneBy(query);
  }

  private getEntity(table: PostgresEntityMapEnum): EntityClassOrSchema {
    switch (table) {
      case PostgresEntityMapEnum.USER:
        return UserEntity;

      default:
        break;
    }
  }
}
