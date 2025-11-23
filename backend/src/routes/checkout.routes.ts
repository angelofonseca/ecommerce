import { Router } from 'express';
import CheckoutController from '../controllers/CheckoutController.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import isAdminMiddleware from '../middlewares/isAdmin.middleware.js';

const checkoutRouter = Router();

/**
 * POST /checkout/create-session
 * Criar uma sessão de checkout do Stripe
 * Autenticação necessária
 */
checkoutRouter.post(
  '/create-session',
  // authMiddleware,
  (req, res) => CheckoutController.createCheckoutSession(req, res)
);

/**
 * GET /checkout/success?session_id=xxx
 * Verificar status após checkout bem-sucedido
 */
checkoutRouter.get(
  '/success',
  (req, res) => CheckoutController.checkoutSuccess(req, res)
);

/**
 * GET /checkout/cancel
 * Página de cancelamento
 */
checkoutRouter.get(
  '/cancel',
  (req, res) => CheckoutController.checkoutCancel(req, res)
);

/**
 * GET /orders/:id
 * Buscar detalhes de uma order específica
 */
checkoutRouter.get(
  '/orders/:id',
  // authMiddleware,
  (req, res) => CheckoutController.getOrderById(req, res)
);

/**
 * GET /orders/sale/:saleId
 * Buscar todas as orders de uma venda
 */
checkoutRouter.get(
  '/orders/sale/:saleId',
  // authMiddleware,
  (req, res) => CheckoutController.getOrdersBySale(req, res)
);

/**
 * PUT /orders/:id
 * Atualizar uma order (quantity ou priceUnit)
 * Apenas permitido se a venda estiver PENDING
 */
checkoutRouter.put(
  '/orders/:id',
  // authMiddleware,
  (req, res) => CheckoutController.updateOrder(req, res)
);

/**
 * DELETE /orders/:id
 * Deletar uma order
 * Apenas permitido se a venda estiver PENDING
 */
checkoutRouter.delete(
  '/orders/:id',
  // authMiddleware,
  (req, res) => CheckoutController.deleteOrder(req, res)
);

/**
 * GET /orders (admin only)
 * Buscar todas as orders
 */
checkoutRouter.get(
  '/orders',
  // authMiddleware,
  // isAdminMiddleware,
  (req, res) => CheckoutController.getAllOrders(req, res)
);

export default checkoutRouter;
