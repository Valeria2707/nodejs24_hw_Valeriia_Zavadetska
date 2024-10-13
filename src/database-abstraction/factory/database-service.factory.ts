import { ConfigService } from '@nestjs/config';
import { DBType } from '../types/enums/database-type.enum';
import { IAbstractDatabaseService } from '../types/database-abstraction-service.interface';
import { MongoDatabaseService } from './mongodb.service';
import { PostgresDatabaseService } from './postgresdb.service';

export const createDatabaseService = <T>(
  dbType: DBType,
  configService: ConfigService,
): IAbstractDatabaseService<T> => {
  switch (dbType) {
    case DBType.MONGODB:
      return new MongoDatabaseService(configService);

    case DBType.POSTGRES:
      return new PostgresDatabaseService(configService);
    default:
      break;
  }
};
