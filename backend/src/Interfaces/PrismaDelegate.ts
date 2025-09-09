export interface PrismaDelegate<T> {
  findUnique(args: any): Promise<T | null>;
  findFirst(args: any): Promise<T | null>;
  create(args: any): Promise<T>;
  update(args: any): Promise<T>;
  findMany(args?: any): Promise<T[]>;
  delete(args: any): Promise<T>;
}