import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";

export default class UserModel extends CRUDModel<User> {
  constructor(protected model: PrismaClient["user"]) {
    super(model);
  }

    async findByEmail(email: string): Promise<User | null> {
    return await this.model.findUnique({ where: { email } });
  }

}
