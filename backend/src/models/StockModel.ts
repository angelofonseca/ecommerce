import { PrismaClient } from "@prisma/client";
import { Stock } from "../generated/prisma";
import CRUDModel from "./CRUDModel.js";

export default class StockModel extends CRUDModel<Stock> {
    constructor(protected model: PrismaClient['stock']) {
        super(model);
    }
}
