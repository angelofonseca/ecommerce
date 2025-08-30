import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { Product } from "../generated/prisma";

export default class ProductController {
  constructor(private service: ProductService) {}

  async create(req: Request, res: Response) {
    const { data, status } = await this.service.create(req.body as Product);
    res.status(status).json(data);
  }

  async find(req: Request, res: Response) {
    const { data, status } = await this.service.find(Number(req.params.id));
    res.status(status).json(data);
  }

  async update(req: Request, res: Response) {
    const { data, status } = await this.service.update(
      Number(req.params.id),
      req.body as Partial<Product>
    );
    res.status(status).json(data);
  }

  async delete(req: Request, res: Response) {
    const { data, status } = await this.service.delete(Number(req.params.id));
    res.status(status).json(data);
  }
}
