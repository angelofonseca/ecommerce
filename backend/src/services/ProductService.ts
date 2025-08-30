import { Product } from "../generated/prisma";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import ProductModel from "../models/ProductModel";

export default class ProductService {
  constructor(private model: ProductModel) {}

  async findProduct(id: number): Promise<ServiceResponse<Message | Product>> {
    const product = await this.model.find(id);

    if (!product) {
      return { status: 404, data: { message: "Product not found" } };
    }

    return { status: 200, data: product };
  }
}
