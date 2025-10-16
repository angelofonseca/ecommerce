import { Product, Stock } from "@prisma/client";
import CRUDService from "./CRUDService.js";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { validateProduct } from "../validations/validations.js";
import prisma from "../database/prismaClient.js";
import ProductModel from "../models/ProductModel.js";

type ProductWithStock = Product & { stock: Stock };
type ProductWithQuantity = Product & { quantity: number };

export default class ProductService extends CRUDService<Product> {
  constructor(protected model: ProductModel) {
    super(model);
  }

  async find(id: number): Promise<ServiceResponse<Message | Product>> {
    return super.find(id, { category: true, brand: true, stock: true });
  }

  private sanitizeProductData(data: any): any {
    const sanitized = { ...data };
    if (typeof sanitized.price === "string") {
      sanitized.price = parseFloat(sanitized.price);
    }
    if (typeof sanitized.quantity === "string") {
      sanitized.quantity = parseInt(sanitized.quantity, 10);
    }
    return sanitized;
  }

  public async create(
    product: ProductWithQuantity
  ): Promise<ServiceResponse<Message>> {
    try {
      await prisma.$transaction(async (tx) => {
        const sanitizedProduct = this.sanitizeProductData(
          product
        ) as ProductWithQuantity;
        const validation = validateProduct(sanitizedProduct);
        if (validation) throw new Error(validation.data.error[0].message);
        const { quantity, ...data } = sanitizedProduct;
        const { id } = await tx.product.create({ data });

        await this.createStockEntry(tx, id, quantity);
      });
      return {
        status: 201,
        data: { message: "Product created successfully" },
      };
    } catch (error) {
      console.error("Error creating product:", error);
      return {
        status: 500,
        data: { message: "Failed to create product" },
      };
    }
  }

  public async updateById(
    id: number,
    data: Partial<ProductWithStock>
  ): Promise<ServiceResponse<Message>> {
    try {
      const sanitizedProduct = this.sanitizeProductData(
        data
      ) as Partial<ProductWithStock>;
      const { stock, ...productData } =
        sanitizedProduct as Partial<ProductWithStock>;
      const quantity = stock?.quantity;

      const updateData = { ...productData } as any;

      if (quantity !== undefined) {
        updateData.stock = {
          upsert: {
            create: { quantity },
            update: { quantity, updatedAt: new Date() },
          },
        };
      }

      await this.model.updateById(id, updateData, {
        category: true,
        brand: true,
        stock: true,
      });

      return { status: 200, data: { message: "Product updated successfully" } };
    } catch (error) {
      throw error;
    }
  }

  public async findAll(): Promise<ServiceResponse<Product[]>> {
    const products = await this.model.findAll({
      category: true,
      brand: true,
      stock: true,
    });
    return { status: 200, data: products };
  }

  public async findAllByCategoryId(
    categoryId: number
  ): Promise<ServiceResponse<Product[]>> {
    const products = await this.model.findAllByCategoryId(categoryId, {
      category: true,
      brand: true,
      stock: true,
    });
    return { status: 200, data: products };
  }

  public async findAllByName(
    name: string
  ): Promise<ServiceResponse<Product[]>> {
    const result = await this.model.findAllByName(name, {
      category: true,
      brand: true,
      stock: true,
    });
    return { status: 200, data: result };
  }

  public async deleteById(id: number): Promise<ServiceResponse<Message>> {
    try {
      await prisma.$transaction(async (tx) => {
        await tx.stock.deleteMany({ where: { id } });
        await tx.product.delete({ where: { id } });
      });
      return { status: 200, data: { message: "Deleted successfully" } };
    } catch (error) {
      return { status: 404, data: { message: "Failed to delete product" } };
    }
  }

  private async createStockEntry(
    tx: any,
    id: number,
    quantity: number
  ): Promise<void> {
    const now = new Date();
    await tx.stock.create({
      data: {
        id,
        quantity,
        createdAt: now,
        updatedAt: now,
      },
    });
  }
}
