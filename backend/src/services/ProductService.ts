import { Product, Stock } from "@prisma/client";
import CRUDService from "./CRUDService.js";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { validateProduct } from "../validations/validations.js";
import prisma from "../database/prismaClient.js";
import ProductModel from "../models/ProductModel.js";
import StockModel from "../models/StockModel.js";

type ProductWithStock = Product & { stock: Stock };
type ProductWithQuantity = Product & { quantity: number };

export default class ProductService extends CRUDService<Product> {
    private stockModel = new StockModel(prisma.stock);
    constructor(protected service: ProductModel) {
        super(service);
    }

    async find(id: number): Promise<ServiceResponse<Message | Product>> {
        return super.find(id, { category: true, brand: true, stock: true });
    }

    private sanitizeProductData(data: any): any {
        const sanitized = { ...data };
        if (typeof sanitized.price === 'string') {
            sanitized.price = parseFloat(sanitized.price);
        }
        if (typeof sanitized.quantity === 'string') {
            sanitized.quantity = parseInt(sanitized.quantity, 10);
        }
        return sanitized;
    }

   public async create(
        product: ProductWithQuantity
    ): Promise<ServiceResponse<Message>> {
        const sanitizedProduct = this.sanitizeProductData(product);
        const validation = validateProduct(sanitizedProduct);
        if (validation) return validation;

        const { quantity, ...productData } = sanitizedProduct;

        const result = await super.create(productData);

        // Verificar se o result pode retornar o produto criado para diminuir o codigo.
        const createdProduct = await this.service.findByName(product.name);

        if (createdProduct) this.createStockEntry(createdProduct.id, quantity);

        return result;
    }

   public async updateById(
        id: number,
        data: Partial<ProductWithStock>
    ): Promise<ServiceResponse<Message>> {
        try {
            const sanitizedProduct = this.sanitizeProductData(data);
            const { stock, ...productData } = sanitizedProduct as Partial<ProductWithStock>;
            const quantity = stock?.quantity;

            const updateData = { ...productData } as any;;

            if (quantity !== undefined) {
                updateData.stock = {
                    upsert: {
                        create: { quantity },
                        update: { quantity, updatedAt: new Date() }
                    }
                };
            }

            await this.service.updateById(id, updateData, {
                category: true, brand: true, stock: true
            });

            return { status: 200, data: { message: "Product updated successfully" } };
        } catch (error) {
            throw error;
        }
    }

   public async findAll(): Promise<ServiceResponse<Product[]>> {
        const products = await this.service.findAll({
            category: true, brand: true, stock: true
        });
        return { status: 200, data: products };
    }

   public async findAllByCategoryId(categoryId: number): Promise<ServiceResponse<Product[]>> {
        const products = await this.service.findAllByCategoryId(categoryId, {
            category: true, brand: true, stock: true
        });
        return { status: 200, data: products };
    }

   public async findAllByName(name: string): Promise<ServiceResponse<Product[]>> {
        const result = await this.service.findAllByName(name, {
            category: true, brand: true, stock: true
        });
        return { status: 200, data: result };
    }

   public async deleteById(id: number): Promise<ServiceResponse<Message>> {
        const productId = id;
        await this.stockModel.deleteById(productId);
        return super.deleteById(id);
    }

   private async createStockEntry(id: number, quantity: number): Promise<void> {
            const now = new Date();
            await this.stockModel.create({ id, quantity, createdAt: now, updatedAt: now });
    }
}
