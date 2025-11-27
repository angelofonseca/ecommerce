import LogModel from "../models/LogModel.js";
import { Request } from "express";

export interface LogData {
    userId?: number;
    action: string;
    entity?: string;
    entityId?: number;
    details?: string;
}export default class LogService {
    constructor(private model: LogModel) { }

    public async createLog(data: LogData): Promise<any> {
        return this.model.create(data);
    }

    public async createLogFromRequest(
        req: Request,
        action: string,
        entity?: string,
        entityId?: number,
        details?: string
    ): Promise<any> {
        const userId = (req as any).userId;

        return this.createLog({
            userId,
            action,
            entity,
            entityId,
            details
        });
    }

    public async getAllLogs(): Promise<any[]> {
        return this.model.findAll();
    }

    public async getLogsByUser(userId: number): Promise<any[]> {
        return this.model.findByUserId(userId);
    }

    public async getLogsByAction(action: string): Promise<any[]> {
        return this.model.findByAction(action);
    }

    // Métodos auxiliares para registrar ações específicas
    public async logUserLogin(userId: number, req: Request, success: boolean): Promise<any> {
        return this.createLogFromRequest(
            req,
            success ? 'USER_LOGIN_SUCCESS' : 'USER_LOGIN_FAILED',
            'User',
            userId,
            success ? 'Login realizado com sucesso' : 'Tentativa de login falhou'
        );
    }

    public async logUserRegister(userId: number, req: Request): Promise<any> {
        return this.createLogFromRequest(
            req,
            'USER_REGISTER',
            'User',
            userId,
            'Novo usuário registrado'
        );
    }

    public async logOrderCreated(userId: number, orderId: number, req: Request): Promise<any> {
        return this.createLogFromRequest(
            req,
            'ORDER_CREATED',
            'Order',
            orderId,
            'Pedido criado'
        );
    }

    public async logOrderUpdated(userId: number, orderId: number, req: Request): Promise<any> {
        return this.createLogFromRequest(
            req,
            'ORDER_UPDATED',
            'Order',
            orderId,
            'Pedido atualizado'
        );
    }

    public async logOrderDeleted(userId: number, orderId: number, req: Request): Promise<any> {
        return this.createLogFromRequest(
            req,
            'ORDER_DELETED',
            'Order',
            orderId,
            'Pedido deletado'
        );
    }

    public async logUnauthorizedAccess(req: Request, resource: string): Promise<any> {
        return this.createLogFromRequest(
            req,
            'UNAUTHORIZED_ACCESS',
            resource,
            undefined,
            'Tentativa de acesso não autorizado'
        );
    }
}
