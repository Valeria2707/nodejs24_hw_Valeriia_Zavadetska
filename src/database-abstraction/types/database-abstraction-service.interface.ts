export interface IAbstractDatabaseService<T> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  insertOne(table: string, data: T): Promise<void>;
  findOne(table: string, query: Partial<T>): Promise<T | null>;
  findAll(table: string, filter?: Partial<T>, search?: string): Promise<T[]>;
  updateOne(
    table: string,
    query: Partial<T>,
    updateData: Partial<T>,
  ): Promise<T | null>;
  deleteOne(table: string, query: Partial<T>): Promise<void>;
}
