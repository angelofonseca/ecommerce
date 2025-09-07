import { Router, Request, Response } from "express";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "../services/CRUDService.js";
import CRUDController from "../controllers/CRUDController.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

export default class CRUDRoute<T> {
  protected router: Router;
  protected controller: CRUDController<T>;
  constructor(
    model: CRUDModel<T>,
    service: CRUDService<T> = new CRUDService<T>(model),
    controller: CRUDController<T> = new CRUDController<T>(service)
  ) {
    this.router = Router();
    this.controller = controller;
  }
  getRoutes() {
    this.router.post("/", (req: Request, res: Response) => this.controller.create(req, res));
    this.router.get("/:id", (req: Request, res: Response) => this.controller.find(req, res));
    this.router.get("/", (req: Request, res: Response) => this.controller.findAll(req, res));
    this.router.patch("/:id", (req: Request, res: Response) => this.controller.update(req, res));
    this.router.delete("/:id", (req: Request, res: Response) => this.controller.deleteById(req, res));

    return this.router;
  }
}
