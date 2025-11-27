import { Router } from 'express';
import LogController from '../controllers/LogController.js';
import LogService from '../services/LogService.js';
import LogModel from '../models/LogModel.js';
import prisma from "../database/prismaClient.js";
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdminMiddleware from '../middlewares/isAdmin.middleware.js';

const logRouter = Router();
const logModel = new LogModel(prisma.log);
const logService = new LogService(logModel);
const logController = new LogController(logService);

/**
 * GET /logs
 * Buscar todos os logs (apenas admin)
 */
logRouter.get(
    '/',
    authMiddleware,
    isAdminMiddleware,
    (req, res) => logController.getAllLogs(req, res)
);

/**
 * GET /logs/user/:userId
 * Buscar logs de um usuário específico (apenas admin)
 */
logRouter.get(
    '/user/:userId',
    authMiddleware,
    isAdminMiddleware,
    (req, res) => logController.getLogsByUser(req, res)
);

/**
 * GET /logs/action/:action
 * Buscar logs por tipo de ação (apenas admin)
 */
logRouter.get(
    '/action/:action',
    authMiddleware,
    isAdminMiddleware,
    (req, res) => logController.getLogsByAction(req, res)
);

export default logRouter;
