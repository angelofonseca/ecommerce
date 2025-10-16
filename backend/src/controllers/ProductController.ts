import { Request, Response } from "express";
import { Product } from "@prisma/client";
import CRUDController from "./CRUDController.js";
import ProductService from "../services/ProductService";

export default class ProductController extends CRUDController<Product> {
    constructor(protected service: ProductService) {
        super(service);
    }

    public async findAllByCategory(req: Request, res: Response) {
        const categoryId = Number(req.params.id);
        const { data, status } = await this.service.findAllByCategoryId(
            categoryId
        );
        res.status(status).json(data);
    }

    public async findAll(req: Request, res: Response): Promise<void> {
        const { name } = req.query;
        if (name) {
            const { data, status } = await this.service.findAllByName(
                name as string
            );
            res.status(status).json(data);
        }
        const { data, status } = await this.service.findAll();
        res.status(status).json(data);
    }
}
