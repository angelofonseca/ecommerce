import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";
import CRUDModel from "./CRUDModel.js";

export default class UserModel extends CRUDModel<User> {
  constructor(protected model: PrismaClient["user"]) {
    super(model);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findUnique({ 
      where: { email } 
    });
  }

  async findByCPF(cpf: string): Promise<User | null> {
    return await this.model.findUnique({ 
      where: { cpf } 
    });
  }

  async findByRole(role: 'ADMIN' | 'CUSTOMER'): Promise<User[]> {
    return await this.model.findMany({ 
      where: { role } 
    });
  }
}
