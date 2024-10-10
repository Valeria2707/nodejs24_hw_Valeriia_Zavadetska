import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseService } from './factory/database-service.factory';
import { DBType } from './types/enums/database-type.enum';
import { IAbstractDatabaseService } from './types/database-abstraction-service.interface';

@Module({})
export class DatabaseAbstractionModule {
  static register(dbType: DBType): DynamicModule {
    return {
      module: DatabaseAbstractionModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'DATABASE_SERVICE',
          useFactory: (configService: ConfigService) =>
            createDatabaseService(dbType, configService),
          inject: [ConfigService],
        },
        {
          provide: 'DATABASE_CONNECTION',
          useFactory: async (dbService: IAbstractDatabaseService) => {
            await dbService.connect();
            return dbService;
          },
          inject: ['DATABASE_SERVICE'],
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
