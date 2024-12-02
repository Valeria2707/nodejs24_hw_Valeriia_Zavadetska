import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, Repository } from 'typeorm';
import { AbstractDatabaseService } from '../database-abstraction.service';
import { PostgresEntityMapEnum } from '../types/enums/postgres-entity-map.enum';
import { UserEntity } from '../entities/user.entity';
import { ReservationEntity } from '../entities/reservation.entity';

@Injectable()
export class PostgresDatabaseService<T> extends AbstractDatabaseService<T> {
  private readonly logger = new Logger(PostgresDatabaseService.name);
  private dataSource: DataSource;

  constructor(configService: ConfigService) {
    super();

    this.dataSource = new DataSource({
      type: 'postgres',
      host: configService.get<string>('POSTGRES_HOST'),
      port: configService.get<number>('POSTGRES_PORT'),
      username: configService.get<string>('POSTGRES_USER'),
      password: configService.get<string>('POSTGRES_PASSWORD'),
      database: configService.get<string>('POSTGRES_DB'),
      entities: [UserEntity, ReservationEntity],
      synchronize: true,
      logging: true,
    });
  }

  async connect(): Promise<void> {
    await this.dataSource.initialize();
    this.logger.log('Connected to Postgres');
  }

  async disconnect(): Promise<void> {
    await this.dataSource.destroy();
    this.logger.log('Disconnected from Postgres');
  }

  async insertOne<T>(table: PostgresEntityMapEnum, data: T): Promise<void> {
    const repository = this.getRepository(table);
    await repository.save(data);
  }

  async findOne<T>(
    table: PostgresEntityMapEnum,
    query: Partial<T>,
  ): Promise<T | null> {
    const repository = this.getRepository(table);
    return repository.findOneBy(query);
  }

  async findAll(
    table: PostgresEntityMapEnum,
    filter?: Partial<T>,
    search?: string,
  ): Promise<T[]> {
    const repository = this.getRepository(table);
    const queryBuilder = repository.createQueryBuilder('entity');

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
      });
    }

    if (search) {
      const searchPattern = `%${search}%`;
      queryBuilder.andWhere(
        '(entity.firstName ILIKE :search OR entity.lastName ILIKE :search)',
        { search: searchPattern },
      );
    }

    return queryBuilder.getMany();
  }

  async updateOne<T>(
    table: PostgresEntityMapEnum,
    query: Partial<T>,
    updateData: Partial<T>,
  ): Promise<T | null> {
    const repository = this.getRepository(table);
    const entity = await repository.findOneBy(query);

    if (!entity) {
      return null;
    }

    Object.assign(entity, updateData);
    return repository.save(entity);
  }

  async deleteOne<T>(
    table: PostgresEntityMapEnum,
    query: Partial<T>,
  ): Promise<void> {
    const repository = this.getRepository(table);
    await repository.delete(query);
  }

  private getRepository(table: PostgresEntityMapEnum): Repository<any> {
    switch (table) {
      case PostgresEntityMapEnum.USER:
        return this.dataSource.getRepository(UserEntity);
      case PostgresEntityMapEnum.RESERVATION:
        return this.dataSource.getRepository(ReservationEntity);
      default:
        throw new Error(`Repository for table ${table} not found`);
    }
  }
}
