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
  constructor(
    model: CRUDModel<T>,
    service: CRUDService<T> = new CRUDService<T>(model),
    controller: CRUDController<T> = new CRUDController<T>(service)
  ) {
    this.router = Router();
    this.model = model;
    this.service = service;
    this.controller = controller;
  }
  getRoutes() {
    this.router.post("/", (req, res) => this.controller.create(req, res));
    this.router.get("/:id", (req, res) => this.controller.find(req, res));
    this.router.get("/", (req, res) => this.controller.findAll(req, res));
    this.router.patch("/:id", (req, res) => this.controller.update(req, res));
    this.router.delete("/:id", (req, res) => this.controller.delete(req, res));

    return this.router;
  }
}
