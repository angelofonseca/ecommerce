import { Request, Response } from "express";
import { Product } from "../generated/prisma";
import CRUDController from "./CRUDController.js";

export default class ProductController extends CRUDController<Product> {
  constructor(service: any) {
    super(service);
  }

  async findAllByCategory(req: Request, res: Response) {
    const categoryId = Number(req.params.id);
    const { data, status } = await this.controller.findAllByCategoryId(
      categoryId
    );
    res.status(status).json(data);
  }

  async findAll(req: Request, res: Response): Promise<void> {
    const { name } = req.query;
    if (name) {
      // Buscar por nome
      const { data, status } = await this.controller.findAllByName(
        name as string
      );
      res.status(status).json(data);
    }
    // Buscar todos
    const { data, status } = await this.controller.findAll();
    res.status(status).json(data);
  }

  // async findAll(req: Request, res: Response) {
  //   const { name } = req.query;
  //   if (name) {
  //     const { data, status } = await this.controller.findAllByName(name as string);
  //     return res.status(status).json(data);
  //   }
  //   const { data, status } = await this.controller.findAll();
  //   return res.status(status).json(data);
  // }
}
