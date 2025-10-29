import { Router } from 'express';
import CheckoutController from '../controllers/CheckoutController.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdminMiddleware from '../middlewares/isAdmin.middleware.js';

const salesRouter = Router();

/**
 * GET /sales/user/:userId
 * Buscar vendas de um usuário específico
 * Autenticação necessária
 */
salesRouter.get(
  '/user/:userId',
  authMiddleware,
  (req, res) => CheckoutController.getUserSales(req, res)
);

/**
 * GET /sales/:id
 * Buscar detalhes de uma venda específica
 * Autenticação necessária
 */
salesRouter.get(
  '/:id',
  authMiddleware,
  (req, res) => CheckoutController.getSaleById(req, res)
);

/**
 * GET /sales
 * Buscar todas as vendas (ADMIN)
 * Autenticação e permissão de admin necessárias
 */
salesRouter.get(
  '/',
  authMiddleware,
  isAdminMiddleware,
  (req, res) => CheckoutController.getAllSales(req, res)
);

export default salesRouter;
