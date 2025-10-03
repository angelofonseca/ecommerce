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

type ProductUpdateData = {
    name?: string;
    photo?: string;
    description?: string;
    price?: number;
    categoryId?: number;
    brandId?: number;
    freeShipping?: boolean;
    quantity?: number;
};

export default class ProductService extends CRUDService<Product> {
    private stockModel = new StockModel(prisma.stock);
    constructor(protected service: ProductModel) {
        super(service);
    }

    private sanitizeProductData(data: any): any {
        const sanitized = { ...data };
        if (typeof sanitized.price === 'string') {
            sanitized.price = parseFloat(sanitized.price);
        }
        if (typeof sanitized.quantity === 'string') {
            sanitized.quantity = parseInt(sanitized.quantity, 10);
        }
        // Adicione outros campos numéricos se necessário
        return sanitized;
    }

    // Validação e criação do produto com quantidade em estoque

    async create(
        product: ProductWithQuantity
    ): Promise<ServiceResponse<Message>> {
        const sanitizedProduct = this.sanitizeProductData(product);
        const validation = validateProduct(sanitizedProduct);
        if (validation) return validation;

        const { quantity, ...productData } = sanitizedProduct;

        const result = await super.create(productData);

        const createdProduct = await this.service.findByName(product.name);

        if (createdProduct) {
            const productId = createdProduct.id;
            const now = new Date();
            await this.stockModel.create({ productId, quantity, createdAt: now, updatedAt: now });
        }

        return result;
    }

    async updateById(
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
                include: { category: true, brand: true, stock: true },
            });

            return { status: 200, data: { message: "Product updated successfully" } };
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<ServiceResponse<Product[]>> {
        const products = await this.service.findAll({
            include: { category: true, brand: true, stock: true },
        });
        return { status: 200, data: products };
    }

    async findAllByCategoryId(categoryId: number): Promise<ServiceResponse<Product[]>> {
        const products = await this.service.findAllByCategoryId({
            include: { category: true, brand: true, stock: true },
            where: { categoryId },
        });
        return { status: 200, data: products };
    }

    async findAllByName(name: string): Promise<ServiceResponse<Product[]>> {
        const result = await this.service.findAllByName(name);
        return { status: 200, data: result };
    }

}
