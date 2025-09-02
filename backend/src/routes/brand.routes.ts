// import { Router } from "express";
// import { Brand } from "../generated/prisma/client.js";
// import jwtMiddleware from "../middlewares/auth.middleware.js";
// import isAdmin from "../middlewares/isAdmin.middleware.js";
// import CRUDModel from "../models/CRUDModel.js";
// import prisma from "../database/prismaClient.js";
// import CRUDService from "../services/CRUDService.js";
// import CRUDController from "../controllers/CRUDController.js";

// const router = Router();

// const model = new CRUDModel<Brand>(prisma.brand);
// const service = new CRUDService(model);
// const controller = new CRUDController(service);

// router.post("/", jwtMiddleware, isAdmin, (req, res) =>
//   controller.create(req, res)
// );
// router.get("/:id", (req, res) => controller.find(req, res));
// router.get("/", (req, res) => controller.findAll(req, res));
// router.patch("/:id", (req, res) => controller.update(req, res));
// router.delete("/:id", (req, res) => controller.delete(req, res));

// export default router;
