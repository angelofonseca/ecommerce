import { Product } from "../generated/prisma";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "./CRUDService.js";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { validateProduct } from "../validations/validations.js";

export default class ProductService extends CRUDService<Product> {
  constructor(protected service: CRUDModel<Product>) {
    super(service);
  }

  async create(product: Product): Promise<ServiceResponse<Message>> {
    const validation = validateProduct(product);
    if (validation) return validation;

    const result = await super.create(product);

    return result;
  }

  async find(id: number): Promise<ServiceResponse<Message | Product>> {
    const result = await super.find(id);

    return result;
  }

  async findAll(): Promise<ServiceResponse<Product[]>> {
    const result = await super.findAll();
    return result;
  }

  async update(
    id: number,
    product: Partial<Product>
  ): Promise<ServiceResponse<Message>> {
    const result = await super.update(id, product);
    return result;
  }

  async delete(id: number): Promise<ServiceResponse<Message>> {
    const result = await super.delete(id);
    return result;
  }
}
