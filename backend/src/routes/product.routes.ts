import { Router } from "express";
import { PrismaClient, Product } from "../generated/prisma/client.js";
import jwtMiddleware from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import ProductController from "../controllers/ProductController.js";
import ProductService from "../services/ProductService.js";
import CRUDModel from "../models/CRUDModel.js";

const prisma = new PrismaClient();

const router = Router();

const model = new CRUDModel<Product>(prisma.product);
const service = new ProductService(model);
const controller = new ProductController(service);

router.post("/", jwtMiddleware, isAdmin, (req, res) =>
  controller.create(req, res)
);
router.get("/:id", (req, res) => controller.find(req, res));
router.get("/", (req, res) => controller.findAll(req, res));
router.patch("/:id", (req, res) => controller.update(req, res));
router.delete("/:id", (req, res) => controller.delete(req, res));

export default router;
