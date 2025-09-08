import { PrismaClient } from "@prisma/client";
import { User } from "../generated/prisma";
import CRUDModel from "./CRUDModel.js";

export default class UserModel extends CRUDModel<User> {
    constructor(protected model: PrismaClient['user']) {
        super(model);
    }

    async findAllByCategoryId(param?: {
        include: { category: boolean; brand: boolean; stock: boolean };
        where: { categoryId: number };
    }): Promise<User[]> {
        return await this.model.findMany({ ...param });
    }

    async findAllByName(name: string): Promise<User[]> {
        return this.model.findMany({
            include: { category: true, brand: true, stock: true },
            where: {
                name: {
                    contains: name,
                }
            },
        });
    }
}
