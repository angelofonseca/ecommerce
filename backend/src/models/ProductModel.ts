import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";

export default class ProductModel extends CRUDModel<Product> {
  constructor(protected model: PrismaClient['product']) {
    super(model);
  }

  async findAllByCategoryId(param?: {
    include: { category: boolean; brand: boolean; stock: boolean };
    where: { categoryId: number };
  }): Promise<Product[]> {
    return await this.model.findMany({ ...param });
  }

  async findAllByName(name: string): Promise<Product[]> {
    return this.model.findMany({
      include: { category: true, brand: true, stock: true },
      where: {
        name: {
          contains: name,
        }
      },
    });
  }
}
