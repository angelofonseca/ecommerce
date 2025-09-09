import CRUDRoutes from "./crud.routes.js";
import prisma from "../database/prismaClient.js";
import { Brand } from "@prisma/client";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "../services/CRUDService.js";
import CRUDController from "../controllers/CRUDController.js";

export default class BrandRoutes extends CRUDRoutes<Brand> {
    constructor() {
        const model = new CRUDModel<Brand>(prisma.brand);
        const service = new CRUDService<Brand>(model);
        const controller = new CRUDController<Brand>(service);
        super(model, service, controller);
    }
}