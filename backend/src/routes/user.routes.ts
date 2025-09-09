import authMiddleware from "../middlewares/auth.middleware.js";
import UserController from "../controllers/UserController.js";
import { User } from "@prisma/client";
import prisma from "../database/prismaClient.js";
import CRUDRoutes from "./crud.routes.js";
import UserModel from "../models/UserModel.js";
import UserService from "../services/UserService.js";

export default class UserRoutes extends CRUDRoutes<User> {
  constructor() {
    const model = new UserModel(prisma.user);
    const service = new UserService(model);
    const controller = new UserController(service);
    super(model, service, controller);
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
