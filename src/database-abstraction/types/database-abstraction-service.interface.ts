export interface IAbstractDatabaseService<T> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne(table: string, data: T): Promise<void>;
  findOne(table: string, query: Partial<T>): Promise<T | null>;
}
