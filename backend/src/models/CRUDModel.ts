import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaDelegate } from "../Interfaces/PrismaDelegate";

export default class CRUDModel<T> {

  constructor(protected model: PrismaDelegate<T>) { }

  async find(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<T | null> {
    return this.model.findFirst({
      where: { name },
    });
  }

  async create(data: T): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw error;
    }
  }

  async updateById(id: number, data: Partial<T>): Promise<T> {
    try {
      return await this.model.update({ where: { id }, data });
    } catch (error) {
      throw error;
    }
  }

  async findAll(param?: {
    include: { category: boolean; brand: boolean; stock: boolean };
  }): Promise<T[]> {
    return await this.model.findMany({ ...param });
  }

  async deleteById(id: number): Promise<T> {
    return await this.model.delete({ where: { id } });
  }
}
