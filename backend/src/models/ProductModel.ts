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

  async updateById(
    id: number,
    data: Partial<Product> & { quantity?: number },
    param = { include: { category: true, brand: true, stock: true } }
  ): Promise<Product> {
    try {
      // Separa quantity dos demais dados do produto
      const { quantity, ...productData } = data;

      // Monta o objeto de atualização
      const updateData: any = { ...productData };

      // Se quantity foi fornecido, adiciona à atualização do stock
      if (quantity !== undefined) {
        updateData.stock = {
          upsert: {
            create: { quantity },
            update: { quantity }
          }
        };
      }

      return await this.model.update({
        where: { id },
        data: updateData,
        ...param
      });
    } catch (error) {
      throw error;
    }
  }

}
