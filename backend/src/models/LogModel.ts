import { Prisma } from "@prisma/client";

export default class LogModel {
    constructor(private logDelegate: any) { }

    public async create(data: any): Promise<any> {
        return this.logDelegate.create({ data });
    }

    public async findAll(): Promise<any[]> {
        return this.logDelegate.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    public async findByUserId(userId: number): Promise<any[]> {
        return this.logDelegate.findMany({
            where: { userId },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }

    public async findByAction(action: string): Promise<any[]> {
        return this.logDelegate.findMany({
            where: { action },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
    }
}
