import authMiddleware from "../middlewares/auth.middleware.js";
import { Product } from "@prisma/client";
import prisma from "../database/prismaClient.js";
import CRUDRoutes from "./crud.routes.js";
import { Request, Response } from "express";
import ProductModel from "../models/ProductModel.js";
import ProductService from "../services/ProductService.js";
import ProductController from "../controllers/ProductController.js";

export default class ProductRoutes extends CRUDRoutes<Product> {
  constructor() {
    const model = new ProductModel(prisma.product);
    const service = new ProductService(model);
    const controller = new ProductController(service);
    super(model, service, controller);
  }
  getRoutes() {
    this.router.get("/", (req: Request, res: Response) => this.controller.findAll(req, res));
    this.router.get("/:id", (req: Request, res: Response) => this.controller.find(req, res));
    this.router.get("/category/:id", (req: Request, res: Response) => this.controller.findAllByCategory(req, res));
    this.router.post("/", (req: Request, res: Response) => this.controller.create(req, res));
    this.router.patch("/:id", (req: Request, res: Response) => this.controller.updateById(req, res));
    this.router.delete("/:id", (req: Request, res: Response) => this.controller.deleteById(req, res));

    return this.router;
  }
}

