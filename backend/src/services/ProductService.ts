import { Product } from "../generated/prisma";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import ProductModel from "../models/ProductModel";

export default class ProductService {
  constructor(private model: ProductModel) {}

  async create(product: Product): Promise<ServiceResponse<Message>> {
    await this.model.create(product);
    return { status: 201, data: { message: "Product created successfully" } };
  }

  async find(id: number): Promise<ServiceResponse<Message | Product>> {
    const product = await this.model.find(id);

    if (!product) {
      return { status: 404, data: { message: "Product not found" } };
    }

    return { status: 200, data: product };
  }

  async findAll(): Promise<ServiceResponse<Product[]>> {
    const products = await this.model.findAll();
    return { status: 200, data: products };
  }

  async update(
    id: number,
    product: Partial<Product>
  ): Promise<ServiceResponse<Message>> {
    const foundProduct = await this.model.find(id);

    if (!foundProduct) {
      return { status: 404, data: { message: "Product not found" } };
    }

    await this.model.update(id, product);
    return { status: 200, data: { message: "Product updated successfully" } };
  }

  async delete(id: number): Promise<ServiceResponse<Message>> {
    const foundProduct = await this.model.find(id);

    if (!foundProduct) {
      return { status: 404, data: { message: "Product not found" } };
    }

    await this.model.delete(id);
    return { status: 200, data: { message: "Product deleted successfully" } };
  }
}
