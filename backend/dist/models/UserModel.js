import { PrismaClient } from "../generated/prisma/client.js";
export default class UserModel {
    constructor() {
        this.prisma = new PrismaClient();
    }
    async find(email) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    async create(user) {
        await this.prisma.user.create({ data: user });
    }
}
