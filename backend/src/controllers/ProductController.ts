import { Request, Response } from "express";
import { Product } from "../generated/prisma";
import CRUDController from "./CRUDController.js";
import ProductService from "../services/ProductService";

export default class ProductController extends CRUDController<Product> {
    constructor(protected service: ProductService) {
        super(service);
    }

    async findAllByCategory(req: Request, res: Response) {
        const categoryId = Number(req.params.id);
        const { data, status } = await this.service.findAllByCategoryId(
            categoryId
        );
        res.status(status).json(data);
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const { name } = req.query;
        if (name) {
            // Buscar por nome
            const { data, status } = await this.service.findAllByName(
                name as string
            );
            res.status(status).json(data);
        }
        // Buscar todos
        const { data, status } = await this.service.findAll();
        res.status(status).json(data);
    }
}
