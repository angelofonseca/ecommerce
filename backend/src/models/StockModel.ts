import { PrismaClient, Stock } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";

export default class StockModel extends CRUDModel<Stock> {
    constructor(protected model: PrismaClient['stock']) {
        super(model);
    }
}
