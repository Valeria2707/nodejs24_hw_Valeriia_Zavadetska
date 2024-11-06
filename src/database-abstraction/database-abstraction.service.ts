import { IAbstractDatabaseService } from './types/database-abstraction-service.interface';

export abstract class AbstractDatabaseService<T>
  implements IAbstractDatabaseService<T>
{
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract insertOne<T>(table: string, data: T): Promise<void>;
  abstract findOne<T>(table: string, query: Partial<T>): Promise<T | null>;
}
