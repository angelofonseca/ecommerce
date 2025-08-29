import { PrismaClient } from "../generated/prisma/client.js"
import User from '../Interfaces/User';
import IUser from "../Interfaces/IUser";


export default class UserModel implements IUser {
  private prisma = new PrismaClient();

  async find(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: User): Promise<void> {
    await this.prisma.user.create({ data: user });
  } 
}