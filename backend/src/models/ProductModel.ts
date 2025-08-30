import { PrismaClient, Product } from "../generated/prisma/client.js";
import IProduct from "../Interfaces/IProduct.js";

export default class ProductModel implements IProduct {
  private prisma = new PrismaClient();

  async create(product: Product): Promise<void> {
    await this.prisma.product.create({ data: product });
  }

  async find(id: number): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: Partial<Product>): Promise<void> {
    await this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
