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
  authMiddleware,
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

export default checkoutRouter;
