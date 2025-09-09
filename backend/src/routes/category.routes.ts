import CRUDRoutes from "./crud.routes.js";
import prisma from "../database/prismaClient.js";
import { Category } from "@prisma/client";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "../services/CRUDService.js";
import CRUDController from "../controllers/CRUDController.js";

export default class CategoryRoutes extends CRUDRoutes<Category> {
    constructor() {
        const model = new CRUDModel<Category>(prisma.category);
        const service = new CRUDService<Category>(model);
        const controller = new CRUDController<Category>(service);
        super(model, service, controller);
    }
}