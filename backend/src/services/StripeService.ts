// backend/src/services/StripeService.ts
import Stripe from 'stripe';
import { PaymentMethod } from '@prisma/client';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

if (!STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
}

const stripe = new Stripe(STRIPE_SECRET_KEY);

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  photo: string;
}

interface CreateCheckoutSessionParams {
  userId: number;
  userEmail: string;
  cartItems: CartItem[];
  paymentMethod: PaymentMethod;
  shippingAddress: string;
}

interface CheckoutSessionResponse {
  sessionId: string;
  url?: string;
  pixQrCode?: string;
  pixExpiresAt?: Date;
  boletoUrl?: string;
  boletoBarcode?: string;
  boletoExpiresAt?: Date;
}

class StripeService {
  /**
   * Criar sessão de checkout do Stripe
   */
  async createCheckoutSession(
    params: CreateCheckoutSessionParams
  ): Promise<CheckoutSessionResponse> {
    const { userId, userEmail, cartItems, paymentMethod, shippingAddress } = params;

    // Calcular total
    const totalValue = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Line items para o Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cartItems.map(
      (item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
            images: item.photo ? [item.photo] : [],
          },
          unit_amount: Math.round(item.price * 100), // Converter para centavos
        },
        quantity: item.quantity,
      })
    );

    // Configurar métodos de pagamento
    const paymentMethodTypes = this.getPaymentMethodTypes(paymentMethod);

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: paymentMethodTypes,
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail,
      client_reference_id: userId.toString(),
      metadata: {
        userId: userId.toString(),
        shippingAddress,
        paymentMethod,
      },
      success_url: `${FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/checkout/cancel`,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hora de validade
    });

    // Resposta base
    const response: CheckoutSessionResponse = {
      sessionId: session.id,
    };

    // Para cartão de crédito, retornar URL do checkout
    if (paymentMethod === 'CREDIT_CARD') {
      response.url = session.url!;
    }

    // Para PIX, configurar dados específicos
    if (paymentMethod === 'PIX') {
      // No Brasil, o Stripe ainda está em beta para PIX
      // Por enquanto, vamos simular os dados
      response.pixQrCode = session.id; // Em produção, usar payment_intent.next_action.pix_display_qr_code
      response.pixExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutos
    }

    // Para boleto, configurar dados específicos
    if (paymentMethod === 'BOLETO') {
      response.boletoUrl = session.url!;
      response.boletoBarcode = session.id; // Em produção, extrair do payment_intent
      response.boletoExpiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 dias
    }

    return response;
  }

  /**
   * Recuperar sessão de checkout
   */
  async retrieveSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer'],
    });
  }

  /**
   * Verificar status do pagamento
   */
  async getPaymentStatus(sessionId: string): Promise<{
    status: string;
    paymentIntentId?: string;
    amountTotal?: number;
    customerEmail?: string;
  }> {
    const session = await this.retrieveSession(sessionId);

    return {
      status: session.payment_status,
      paymentIntentId: session.payment_intent as string,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
      customerEmail: session.customer_email || undefined,
    };
  }

  /**
   * Criar reembolso
   */
  // async createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund> {
  //   const refundParams: Stripe.RefundCreateParams = {
  //     payment_intent: paymentIntentId,
  //   };

  //   if (amount) {
  //     refundParams.amount = Math.round(amount * 100); // Converter para centavos
  //   }

  //   return await stripe.refunds.create(refundParams);
  // }

  /**
   * Verificar assinatura do webhook
   */
  constructWebhookEvent(
    payload: string | Buffer,
    signature: string
  ): Stripe.Event {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!webhookSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined');
    }

    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  }

  /**
   * Obter métodos de pagamento suportados
   */
  private getPaymentMethodTypes(
    paymentMethod: PaymentMethod
  ): Stripe.Checkout.SessionCreateParams.PaymentMethodType[] {
    switch (paymentMethod) {
      case 'CREDIT_CARD':
        return ['card'];
      case 'PIX':
        // No Brasil, PIX ainda está em beta no Stripe
        // Por enquanto, vamos usar 'card' e simular PIX
        return ['card']; // Em produção: ['pix']
      case 'BOLETO':
        return ['boleto'];
      default:
        return ['card'];
    }
  }
}

export default new StripeService();