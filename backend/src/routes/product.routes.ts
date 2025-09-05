import { Product } from "../generated/prisma";
import prisma from "../database/prismaClient.js";
import ProductService from "../services/ProductService.js";
import CRUDRoutes from "./crud.routes.js";
import CRUDModel from "../models/CRUDModel.js";
import CRUDController from "../controllers/CRUDController.js";

export default class ProductRoute extends CRUDRoutes<Product> {
  constructor() {
    const model = new CRUDModel<Product>(prisma.product);
    const service = new ProductService(model);
    const controller = new CRUDController(service);
    super(model, service, controller);
  }
}
