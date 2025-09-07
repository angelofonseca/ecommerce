import prisma from "../database/prismaClient.js";
import ProductService from "../services/ProductService.js";
import ProductModel from "../models/ProductModel.js";
import { Request, Response, Router } from "express";
import ProductController from "../controllers/ProductController.js";

export default class ProductRoute {
  private controller: ProductController;
  private router: Router
  constructor() {
    this.router = Router();
    const model = new ProductModel(prisma.product);
    const service = new ProductService(model);
    const controller = new ProductController(service);
    this.controller = controller;
  }

    getRoutes() {
      this.router.get("/", (req: Request, res: Response) => this.controller.findAll(req, res));
      this.router.get("/:id", (req: Request, res: Response) => this.controller.find(req, res));
      this.router.get("/category/:id", (req: Request, res: Response) => this.controller.findAllByCategory(req, res));
      this.router.post("/", (req: Request, res: Response) => this.controller.create(req, res));
      this.router.patch("/:id", (req: Request, res: Response) => this.controller.update(req, res));
      this.router.delete("/:id", (req: Request, res: Response) => this.controller.deleteById(req, res));

      return this.router;
    }
}
