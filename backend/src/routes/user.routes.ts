import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";
import CRUDModel from "../models/CRUDModel.js";
import { User } from "../generated/prisma/index.js";
import prisma from "../database/prismaClient.js";

export default class UserRoutes {
  private controller: UserController;
  private service: UserService;
  private model: CRUDModel<User>;
  private router = Router();
  constructor() {
    this.model = new CRUDModel(prisma.user);
    this.service = new UserService(this.model);
    this.controller = new UserController(this.service);
  }

  getRoutes() {
    this.router.post("/login", (req, res) => this.controller.login(req, res));
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
    this.router.get("/role", authMiddleware, (req, res) =>
      UserController.getRole(req, res)
    );

    return this.router;
  }
}
