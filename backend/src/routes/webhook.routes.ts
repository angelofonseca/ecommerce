import { Router } from 'express';
import express from 'express';
import WebhookController from '../controllers/WebhookController.js';

const webhookRouter = Router();

/**
 * POST /webhook
 * Endpoint para receber webhooks do Stripe
 * IMPORTANTE: Este endpoint DEVE usar express.raw() para preservar o body original
 * necessário para verificar a assinatura do Stripe
 */
webhookRouter.get('/config', (req, res) => {
  res.send({
    stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
webhookRouter.post(
  '/',
  express.raw({ type: 'application/json' }),
  (req, res) => WebhookController.handleStripeWebhook(req, res)
);

export default webhookRouter;
