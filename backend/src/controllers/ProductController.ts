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
        const { name, categoryName, brandName, freeShipping } = req.query;
        
        // Se houver qualquer filtro, usar findWithFilters
        if (name || categoryName || brandName || freeShipping !== undefined) {
            const filters: any = {};
            if (name) filters.name = name as string;
            if (categoryName) filters.categoryName = categoryName as string;
            if (brandName) filters.brandName = brandName as string;
            if (freeShipping !== undefined) {
                filters.freeShipping = freeShipping === 'true' || freeShipping === '1';
            }
            
            const { data, status } = await this.service.findWithFilters(filters);
            res.status(status).json(data);
            return;
        }
        
        // Sem filtros, retornar todos
        const { data, status } = await this.service.findAll();
        res.status(status).json(data);
    }
}
