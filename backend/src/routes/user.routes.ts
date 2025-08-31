import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import UserService from "../services/UserService.js";
import UserController from "../controllers/UserController.js";
import CRUDModel from "../models/CRUDModel.js";
import { User } from "../generated/prisma/index.js";
import prisma from "../database/prismaClient.js";

const router = Router();

const model = new CRUDModel<User>(prisma.user);
const service = new UserService(model);
const controller = new UserController(service);

router.post("/login", (req, res) => controller.login(req, res));
router.post("/register", (req, res) => controller.create(req, res));
router.get("/role", authMiddleware, (req, res) =>
  UserController.getRole(req, res)
);

export default router;
