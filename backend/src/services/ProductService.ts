import { Product } from "../generated/prisma";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "./CRUDService.js";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { validateProduct } from "../validations/validations.js";
import prisma from "../database/prismaClient.js";
import ProductModel from "../models/ProductModel";

type ProductWithQuantity = Product & { quantity: number };

export default class ProductService extends CRUDService<Product> {
  private stockModel = new CRUDModel(prisma.stock);
  constructor(protected service: ProductModel) {
    super(service);
  }

  // Validação e criação do produto com quantidade em estoque

  async create(
    product: ProductWithQuantity
  ): Promise<ServiceResponse<Message>> {
    const validation = validateProduct(product);
    if (validation) return validation;

    const { quantity, ...productData } = product;

    const result = await super.create(productData);

    const createdProduct = await this.service.findByName(product.name);

    if (createdProduct) {
      const productId = createdProduct.id;
      await this.stockModel.create({ productId, quantity });
    }

    return result;
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
