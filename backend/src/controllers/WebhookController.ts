import { Request, Response } from 'express';
import Stripe from 'stripe';
import SaleService from '../services/SaleService.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

class WebhookController {
  private saleService: SaleService;

  constructor() {
    this.saleService = new SaleService();
  }
  /**
   * Processar webhooks do Stripe
   */
  async handleStripeWebhook(req: Request, res: Response): Promise<void> {
    const signature = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
      // Verificar assinatura do Stripe
      if (endpointSecret) {
        event = stripe.webhooks.constructEvent(
          req.body,
          signature,
          endpointSecret
        );
      } else {
        // Sem secret (apenas dev/teste - não recomendado)
        event = JSON.parse(req.body.toString());
        console.warn('⚠️ Webhook sem verificação de assinatura!');
      }

      console.log(`🔔 Webhook recebido: ${event.type}`);

      // Processar eventos
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleCheckoutCompleted(
            event.data.object as Stripe.Checkout.Session
          );
          break;

        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(
            event.data.object as Stripe.PaymentIntent
          );
          break;

        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(
            event.data.object as Stripe.PaymentIntent
          );
          break;

        case 'charge.refunded':
          await this.handleRefund(
            event.data.object as Stripe.Charge
          );
          break;

        case 'payment_method.attached':
          console.log('💳 Método de pagamento anexado');
          break;

        default:
          console.log(`⚠️ Evento não tratado: ${event.type}`);
      }

      // Sempre responder 200 OK para o Stripe
      res.json({ received: true, type: event.type });
    } catch (err: any) {
      console.error('❌ Erro no webhook:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  /**
   * Checkout completado (pode não estar pago ainda)
   */
  private async handleCheckoutCompleted(
    session: Stripe.Checkout.Session
  ) {
    console.log('✅ Checkout completado:', session.id);
    console.log('   Cliente:', session.customer_email);
    console.log('   Total:', session.amount_total! / 100, 'BRL');
    console.log('   Status pagamento:', session.payment_status);

    // Se o pagamento já foi confirmado no checkout, confirmar a venda
    if (session.payment_status === 'paid' && session.payment_intent) {
      try {
        await this.saleService.confirmPayment(
          session.id,
          session.payment_intent as string
        );
        console.log('✅ Sale confirmada via checkout.session.completed');
      } catch (error: any) {
        console.error('❌ Erro ao confirmar sale:', error.message);
      }
    }
  }

  /**
   * Pagamento confirmado (dinheiro garantido!)
   */
  private async handlePaymentSucceeded(
    paymentIntent: Stripe.PaymentIntent
  ) {
    console.log('💰 Pagamento confirmado!');
    console.log('   Payment Intent:', paymentIntent.id);
    console.log('   Valor:', paymentIntent.amount / 100, 'BRL');
    console.log('   Status:', paymentIntent.status);

    try {
      // Extrair dados dos metadados
      const { userId, shippingAddress, paymentMethod, items } = paymentIntent.metadata;
      
      if (!userId || !items) {
        console.error('❌ Metadados incompletos no Payment Intent');
        return;
      }

      // Parsear items (foram serializados como JSON)
      const parsedItems = JSON.parse(items);
      const totalValue = paymentIntent.amount / 100; // Converter de centavos para reais

      // Criar Sale e Orders no banco
      await this.saleService.createSaleFromPaymentIntent({
        userId: parseInt(userId),
        totalValue,
        shippingAddress,
        paymentMethod: paymentMethod as 'CREDIT_CARD' | 'BOLETO' | 'PIX',
        stripePaymentId: paymentIntent.id,
        items: parsedItems,
      });
      
      console.log('✅ Sale criada e estoque decrementado');
    } catch (error: any) {
      console.error('❌ Erro ao criar sale:', error.message);
    }
  }

  /**
   * Pagamento falhou
   */
  private async handlePaymentFailed(
    paymentIntent: Stripe.PaymentIntent
  ) {
    console.log('❌ Pagamento falhou!');
    console.log('   Payment Intent:', paymentIntent.id);
    console.log('   Motivo:', paymentIntent.last_payment_error?.message);

    // Como não criamos Sale antes do pagamento ser confirmado,
    // não há nada a fazer aqui além de logar
    console.log('⚠️ Nenhuma Sale foi criada, pois o pagamento falhou antes da confirmação');
  }

  /**
   * Reembolso processado
   */
  private async handleRefund(charge: Stripe.Charge) {
    console.log('💸 Reembolso processado!');
    console.log('   Charge:', charge.id);
    console.log('   Valor reembolsado:', charge.amount_refunded / 100, 'BRL');

    try {
      const paymentIntentId = charge.payment_intent as string;
      
      if (paymentIntentId) {
        // Buscar a sale pelo payment intent e cancelar
        // Nota: você precisa adicionar esse método no SaleModel se quiser buscar por payment_intent
        console.log('💸 Reembolso registrado. Implemente lógica de devolução ao estoque se necessário');
      }
    } catch (error: any) {
      console.error('❌ Erro ao processar reembolso:', error.message);
    }
  }
}

export default new WebhookController();