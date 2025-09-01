import { Router } from "express";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "../services/CRUDService.js";
import CRUDController from "../controllers/CRUDController.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

export default class CRUDRoute<T> {
  protected router: Router;
  private model: CRUDModel<T>;
  private service: CRUDService<T>;
  protected controller: CRUDController<T>;
  constructor(model: any) {
    this.router = Router();
    this.model = new CRUDModel<any>(model);
    this.service = new CRUDService(this.model);
    this.controller = new CRUDController(this.service);
  }
  getRoutes() {
    this.router.post("/", jwtMiddleware, isAdmin, (req, res) =>
      this.controller.create(req, res)
    );
    this.router.get("/:id", (req, res) => this.controller.find(req, res));
    this.router.get("/", (req, res) => this.controller.findAll(req, res));
    this.router.patch("/:id", (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));

    return this.router;
  }
}
