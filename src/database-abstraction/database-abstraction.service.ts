import { IAbstractDatabaseService } from './types/database-abstraction-service.interface';

export abstract class AbstractDatabaseService
  implements IAbstractDatabaseService
{
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne<T>(table: string, data: T): Promise<void>;
  abstract findOne<T>(table: string, query: T | null): Promise<any>;
}
