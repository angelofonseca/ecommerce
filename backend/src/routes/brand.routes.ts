import CRUDRoutes from "./crud.routes.js";
import prisma from "../database/prismaClient.js";
import { Brand } from "@prisma/client";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "../services/CRUDService.js";
import CRUDController from "../controllers/CRUDController.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";
import { Request, Response } from "express";

export default class BrandRoutes extends CRUDRoutes<Brand> {
    constructor() {
        const model = new CRUDModel<Brand>(prisma.brand);
        const service = new CRUDService<Brand>(model);
        const controller = new CRUDController<Brand>(service);
        super(model, service, controller);
    }

    public getRoutes() {
        this.router.get("/", (req: Request, res: Response) => this.controller.findAll(req, res));
        this.router.get("/:id", (req: Request, res: Response) => this.controller.find(req, res));
        this.router.post("/", authMiddleware, isAdminMiddleware, (req: Request, res: Response) => this.controller.create(req, res));
        this.router.patch("/:id", authMiddleware, isAdminMiddleware, (req: Request, res: Response) => this.controller.updateById(req, res));
        this.router.delete("/:id", authMiddleware, isAdminMiddleware, (req: Request, res: Response) => this.controller.deleteById(req, res));

        return this.router;
    }
}