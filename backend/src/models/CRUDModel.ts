import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaDelegate } from "../Interfaces/PrismaDelegate";

type IncludeOptions = {
  category?: boolean;
  brand?: boolean;
  stock?: boolean;
};

export default class CRUDModel<T> {

  constructor(protected model: PrismaDelegate<T>) {}

      private sanitizeID(id: any): any {
        if (typeof id === 'string') {
            return parseInt(id, 10);
        }
        return id;
    }

  async find(id: number, include?: IncludeOptions): Promise<T | null> {
    return await this.model.findUnique({ 
      where: { id },
      ...(include ? { include }: {})
    });
  }

  async findByName(name: string, include?: IncludeOptions): Promise<T | null> {
    return this.model.findFirst({
      where: { name },
      ...(include ? { include }: {})
    });
  }

  async create(data: T): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, data: Partial<T>, include?: IncludeOptions): Promise<T> {
    try {
      return await this.model.update({ 
        where: { id }, 
        data,
        ...(include ? { include }: {})
      });
    } catch (error) {
      throw error;
    }
  }

  async findAll(include?: IncludeOptions): Promise<T[]> {
    return await this.model.findMany({ 
      ...(include ? { include }: {})
    });
  }

  async deleteById(id: number, include?: IncludeOptions): Promise<T> {
    this.sanitizeID(id);
    return await this.model.delete({ where: { id }, ...(include ? { include }: {}) });
  }
}
