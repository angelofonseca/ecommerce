import { Request, Response } from 'express';
import Stripe from 'stripe';
import prisma from '../database/prismaClient.js';
import StockModel from '../models/StockModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  priceUnit: number;
}

class PaymentIntentController {
  private stockModel: StockModel;

  constructor() {
    this.stockModel = new StockModel(prisma.stock);
  }

  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const { 
        amount, 
        currency = 'brl', 
        items, 
        shippingAddress,
        paymentMethod = 'CREDIT_CARD' 
      } = req.body;

      // Pegar userId do token (res.locals preenchido pelo authMiddleware)
      const userId = res.locals.userId;

      if (!amount || amount <= 0) {
        res.status(400).json({
          error: 'Valor inválido',
        });
        return;
      }

      if (!userId || !items || items.length === 0 || !shippingAddress) {
        res.status(400).json({
          error: 'Dados incompletos: items e shippingAddress são obrigatórios',
        });
        return;
      }

      // Valida estoque ANTES de criar Payment Intent
      for (const item of items as CartItem[]) {
        const stock = await this.stockModel.find(item.productId);
        if (!stock || stock.quantity < item.quantity) {
          res.status(400).json({
            error: `Produto ${item.productName} não tem estoque suficiente. Disponível: ${stock?.quantity || 0}`,
          });
          return;
        }
      }

      // Criar Payment Intent com todos os dados nos metadados
      // A Sale será criada no webhook quando o pagamento for confirmado
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Converter para centavos
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          userId: userId.toString(),
          shippingAddress,
          paymentMethod,
          items: JSON.stringify(items), // Serializar items para salvar depois
        },
      });

      console.log(`✅ Payment Intent criado: ${paymentIntent.id}`);

      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });
    } catch (error: unknown) {
      console.error('❌ Erro ao criar Payment Intent:', error);
      const message = error instanceof Error ? error.message : 'Erro ao criar Payment Intent';
      res.status(500).json({
        error: message,
      });
    }
  }
}

export default new PaymentIntentController();
