import { PrismaClient } from "@prisma/client";

export default class CRUDModel<T> {

  constructor(protected model: PrismaClient[keyof PrismaClient]) { }

  async find(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<T | null> {
    return await this.model.findUnique({ where: { email } });
  }

  async findByName(name: string): Promise<T | null> {
    return this.model.findFirst({
      where: { name },
    });
  }

  async create(data: T): Promise<void> {
    await this.model.create({ data });
  }

  async updateById(id: number, data: Partial<T>): Promise<void> {
    await this.model.update({ where: { id }, data });
  }

  async findAll(param?: {
    include: { category: boolean; brand: boolean; stock: boolean };
  }): Promise<T[]> {
    return await this.model.findMany({ ...param });
  }

  async deleteById(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
