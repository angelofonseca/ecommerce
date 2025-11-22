import { PrismaClient } from "@prisma/client";
import { Product } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";
import IncludeOptions from "../Interfaces/IncludeOptions.js";

export default class ProductModel extends CRUDModel<Product> {
  constructor(protected model: PrismaClient['product']) {
    super(model);
  }

  public async findAllByCategoryId(categoryId: number, include?: IncludeOptions): Promise<Product[]> {
    return await this.model.findMany({
      where: { categoryId },
      ...(include && { include })
    });
  }

  public async findAllByName(name: string, include?: IncludeOptions): Promise<Product[]> {
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

  public async findAllByCategoryName(categoryName: string, include?: IncludeOptions): Promise<Product[]> {
    return this.model.findMany({
      where: {
        category: {
          name: {
            contains: categoryName,
            mode: 'insensitive',
          }
        }
      },
      ...(include && { include })
    });
  }

  public async findAllByBrandName(brandName: string, include?: IncludeOptions): Promise<Product[]> {
    return this.model.findMany({
      where: {
        brand: {
          name: {
            contains: brandName,
            mode: 'insensitive',
          }
        }
      },
      ...(include && { include })
    });
  }

  public async findAllByFreeShipping(freeShipping: boolean, include?: IncludeOptions): Promise<Product[]> {
    return this.model.findMany({
      where: { freeShipping },
      ...(include && { include })
    });
  }

  public async findWithFilters(filters: {
    name?: string;
    categoryName?: string;
    brandName?: string;
    freeShipping?: boolean;
  }, include?: IncludeOptions): Promise<Product[]> {
    const where: any = {};

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.categoryName) {
      where.category = {
        name: {
          contains: filters.categoryName,
          mode: 'insensitive',
        }
      };
    }

    if (filters.brandName) {
      where.brand = {
        name: {
          contains: filters.brandName,
          mode: 'insensitive',
        }
      };
    }

    if (filters.freeShipping !== undefined) {
      where.freeShipping = filters.freeShipping;
    }

    return this.model.findMany({
      where,
      ...(include && { include })
    });
  }
}
