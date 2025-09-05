import { Router } from "express";
import prisma from "../database/prismaClient.js";
import ProductService from "../services/ProductService.js";
import ProductController from "../controllers/CRUDController.js";
import { Product } from "../generated/prisma";

import CRUDRoute from "./crud.routes"; // ajuste o caminho se necessário
import CRUDModel from "../models/CRUDModel.js";

export default class ProductRoute extends CRUDRoute<Product> {
  constructor() {
    // Instancia o ProductService com o model do produto
    const productService = new ProductService(new CRUDModel(prisma.product));
    super(prisma.product); // inicializa o CRUDRoute
    // Substitui o controller pelo específico de produto
    this.controller = new ProductController(productService);
  }
}