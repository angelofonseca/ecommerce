import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";
import IncludeOptions from "../Interfaces/IncludeOptions.js";

export default class ProductModel extends CRUDModel<Product> {
  constructor(protected model: PrismaClient['product']) {
    super(model);
  }

  async findAllByCategoryId(categoryId: number, include?: IncludeOptions): Promise<Product[]> {
    return await this.model.findMany({ 
      where: { categoryId },
      ...(include && { include })
    });
  }

  async findAllByName(name: string, include?: IncludeOptions): Promise<Product[]> {
    return this.model.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        }
      },
      ...(include && { include })
    });
  }
}
