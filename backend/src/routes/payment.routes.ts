import { Router } from 'express';
import PaymentIntentController from '../controllers/PaymentIntentController.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const paymentRouter = Router();

/**
 * POST /payment/create-intent
 * Criar Payment Intent para PaymentElement
 */
paymentRouter.post(
  '/create-intent',
  authMiddleware,
  (req, res) => PaymentIntentController.createPaymentIntent(req, res)
);

export default paymentRouter;
