import authMiddleware from "../middlewares/auth.middleware.js";
import UserController from "../controllers/UserController.js";
import { User } from "@prisma/client";
import prisma from "../database/prismaClient.js";
import CRUDRoutes from "./crud.routes.js";
import UserModel from "../models/UserModel.js";
import UserService from "../services/UserService.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";

export default class UserRoutes extends CRUDRoutes<User> {
  constructor() {
    const model = new UserModel(prisma.user);
    const service = new UserService(model);
    const controller = new UserController(service);
    super(model, service, controller);
  }
  public getRoutes() {
    this.router.post("/login", (req, res) => this.controller.login(req, res));
    this.router.post("/register", (req, res) =>
      this.controller.create(req, res)
    );
    this.router.get("/role", authMiddleware, (req, res) =>
      UserController.getRole(req, res)
    );
    this.router.get("/", authMiddleware, isAdminMiddleware, (req, res) =>
      this.controller.findAll(req, res)
    );
    this.router.post("/admin", (req, res) => this.controller.adminLogin(req, res));

    // Rotas de recuperação de senha
    this.router.post("/forgot-password", (req, res) =>
      this.controller.requestPasswordReset(req, res)
    );
    this.router.post("/validate-reset-code", (req, res) =>
      this.controller.validateResetCode(req, res)
    );
    this.router.post("/reset-password", (req, res) =>
      this.controller.resetPassword(req, res)
    );

    return this.router;
  }
}
