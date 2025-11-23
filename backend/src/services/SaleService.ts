import Stripe from 'stripe';
import SaleModel from '../models/SaleModel.js';
import StockModel from '../models/StockModel.js';
import prisma from '../database/prismaClient.js';
import { SaleStatus } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  priceUnit: number;
}

interface CheckoutData {
  userId: number;
  items: CartItem[];
  shippingAddress: string;
  paymentMethod?: 'CREDIT_CARD' | 'BOLETO' | 'PIX'; // Opcional, padrão CREDIT_CARD
}

interface PaymentIntentData {
  userId: number;
  totalValue: number;
  shippingAddress: string;
  paymentMethod: 'CREDIT_CARD' | 'BOLETO' | 'PIX';
  stripePaymentId: string;
  items: CartItem[];
}

export default class SaleService {
  private saleModel: SaleModel;
  private stockModel: StockModel;

  constructor() {
    this.saleModel = new SaleModel(prisma.sale);
    this.stockModel = new StockModel(prisma.stock);
  }

  /**
   * Cria uma sessão de checkout do Stripe e uma venda PENDING no banco
   */
  async createCheckoutSession(data: CheckoutData) {
    const { userId, items, shippingAddress, paymentMethod = 'CREDIT_CARD' } = data;

    // Calcula o total
    const totalValue = items.reduce(
      (sum, item) => sum + item.priceUnit * item.quantity,
      0
    );

    // Valida estoque ANTES de criar a sessão
    for (const item of items) {
      const stock = await this.stockModel.find(item.productId);
      if (!stock || stock.quantity < item.quantity) {
        throw new Error(
          `Produto ${item.productName} não tem estoque suficiente. Disponível: ${stock?.quantity || 0}`
        );
      }
    }

    // Cria line items para o Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.productName,
          },
          unit_amount: Math.round(item.priceUnit * 100), // Stripe usa centavos
        },
        quantity: item.quantity,
      })
    );

    // Cria a sessão de checkout no Stripe
    // Mapear paymentMethod para os tipos aceitos pelo Stripe
    const stripePaymentMethods: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ['card'];
    
    // Adicionar outros métodos se suportados na sua região
    if (paymentMethod === 'BOLETO') {
      stripePaymentMethods.push('boleto');
    } else if (paymentMethod === 'PIX') {
      // PIX ainda não está amplamente disponível no Stripe Brasil
      // Descomente quando estiver disponível na sua conta
      // stripePaymentMethods.push('pix' as any);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: stripePaymentMethods,
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout/cancel`,
      metadata: {
        userId: userId.toString(),
        paymentMethod,
      },
    });

    // Cria a venda no banco com status PENDING
    const sale = await prisma.$transaction(async (tx) => {
      const createdSale = await tx.sale.create({
        data: {
          userId,
          totalValue,
          shippingAddress,
          paymentMethod, // Salvar o método de pagamento
          stripeCheckoutId: session.id,
          status: 'PENDING',
          orders: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceUnit: item.priceUnit,
              subtotal: item.priceUnit * item.quantity,
            })),
          },
        },
        include: {
          orders: {
            include: {
              product: true,
            },
          },
        },
      });

      return createdSale;
    });

    return {
      sale,
      checkoutUrl: session.url,
      sessionId: session.id,
    };
  }

  /**
   * Confirma pagamento via webhook e decrementa estoque
   */
  async confirmPayment(stripeCheckoutId: string, stripePaymentId: string) {
    // Busca a venda pelo Checkout ID
    const sale = await this.saleModel.findByStripeCheckoutId(stripeCheckoutId);

    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    if (sale.status === 'PAID') {
      console.log('Venda já confirmada anteriormente');
      return sale;
    }

    if (!sale.orders || sale.orders.length === 0) {
      throw new Error('Venda sem itens (orders)');
    }

    // Atualiza status para PAID e decrementa estoque em uma transação
    const updatedSale = await prisma.$transaction(async (tx) => {
      // Atualiza a venda
      const updated = await tx.sale.update({
        where: { id: sale.id },
        data: {
          status: 'PAID',
          stripePaymentId,
          paidAt: new Date(),
        },
        include: {
          orders: {
            include: {
              product: true,
            },
          },
        },
      });

      // Decrementa estoque de cada produto
      for (const order of sale.orders) {
        await tx.stock.update({
          where: { id: order.productId },
          data: {
            quantity: {
              decrement: order.quantity,
            },
          },
        });
      }

      return updated;
    });

    console.log(`✅ Pagamento confirmado! Sale ID: ${sale.id}`);
    return updatedSale;
  }

  /**
   * Confirma pagamento pelo Sale ID (usado no Payment Intent flow)
   */
  async confirmPaymentBySaleId(saleId: number, stripePaymentId: string) {
    const sale = await this.saleModel.findById(saleId);

    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    if (sale.status === 'PAID') {
      console.log('Venda já confirmada anteriormente');
      return sale;
    }

    if (!sale.orders || sale.orders.length === 0) {
      throw new Error('Venda sem itens (orders)');
    }

    // Atualiza status para PAID e decrementa estoque em uma transação
    const updatedSale = await prisma.$transaction(async (tx) => {
      // Atualiza a venda
      const updated = await tx.sale.update({
        where: { id: sale.id },
        data: {
          status: 'PAID',
          stripePaymentId,
          paidAt: new Date(),
        },
        include: {
          orders: {
            include: {
              product: true,
            },
          },
        },
      });

      // Decrementa estoque de cada produto
      for (const order of sale.orders) {
        await tx.stock.update({
          where: { id: order.productId },
          data: {
            quantity: {
              decrement: order.quantity,
            },
          },
        });
      }

      return updated;
    });

    console.log(`✅ Pagamento confirmado! Sale ID: ${sale.id}`);
    return updatedSale;
  }

  /**
   * Cria Sale e Orders quando o pagamento é confirmado (webhook)
   */
  async createSaleFromPaymentIntent(data: PaymentIntentData) {
    const { userId, totalValue, shippingAddress, paymentMethod, stripePaymentId, items } = data;

    // Criar Sale e Orders em uma transação
    const sale = await prisma.$transaction(async (tx) => {
      // Criar a venda já com status PAID
      const createdSale = await tx.sale.create({
        data: {
          userId,
          totalValue,
          shippingAddress,
          paymentMethod,
          stripePaymentId,
          status: 'PAID',
          paidAt: new Date(),
          orders: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceUnit: item.priceUnit,
              subtotal: item.priceUnit * item.quantity,
            })),
          },
        },
        include: {
          orders: {
            include: {
              product: true,
            },
          },
        },
      });

      // Decrementa estoque de cada produto
      for (const item of items) {
        await tx.stock.update({
          where: { id: item.productId },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return createdSale;
    });

    console.log(`✅ Sale criada: #${sale.id} | Stripe Payment: ${stripePaymentId}`);
    return sale;
  }

  /**
   * Cancela venda e restaura estoque (se necessário)
   */
  async cancelSale(stripeCheckoutId: string, reason: string) {
    const sale = await this.saleModel.findByStripeCheckoutId(stripeCheckoutId);

    if (!sale) {
      throw new Error('Venda não encontrada');
    }

    // Se já foi pago, precisa restaurar o estoque
    if (sale.status === 'PAID') {
      await prisma.$transaction(async (tx) => {
        // Atualiza status
        await tx.sale.update({
          where: { id: sale.id },
          data: { status: 'CANCELLED' },
        });

        // Restaura estoque
        for (const order of sale.orders) {
          await tx.stock.update({
            where: { id: order.productId },
            data: {
              quantity: {
                increment: order.quantity,
              },
            },
          });
        }
      });

      console.log(`❌ Venda cancelada e estoque restaurado. Motivo: ${reason}`);
    } else {
      // Se ainda não foi pago, apenas atualiza o status
      await this.saleModel.updateStatus(sale.id, 'CANCELLED');
      console.log(`❌ Venda cancelada. Motivo: ${reason}`);
    }

    return sale;
  }

  /**
   * Busca venda por Stripe Checkout Session ID
   */
  async getSaleByCheckoutSessionId(stripeCheckoutId: string) {
    return await this.saleModel.findByStripeCheckoutId(stripeCheckoutId);
  }

  /**
   * Busca vendas por usuário
   */
  async getSalesByUser(userId: number) {
    return await this.saleModel.findByUserId(userId);
  }

  /**
   * Busca detalhes de uma venda
   */
  async getSaleById(id: number) {
    return await this.saleModel.findById(id);
  }

  /**
   * Busca todas as vendas (admin)
   */
  async getAllSales() {
    return await this.saleModel.findAll();
  }

  /**
   * Atualiza status de uma venda
   */
  async updateSaleStatus(
    saleId: number,
    status: 'PENDING' | 'PROCESSING' | 'PAID' | 'CANCELLED' | 'REFUNDED'
  ) {
    try {
      const sale = await this.saleModel.findById(saleId);

      if (!sale) {
        throw new Error('Venda não encontrada');
      }

      // Se mudar para CANCELLED ou REFUNDED e estava PAID, restaurar estoque
      if (
        (status === 'CANCELLED' || status === 'REFUNDED') &&
        sale.status === 'PAID'
      ) {
        await prisma.$transaction(async (tx) => {
          // Atualiza status
          await tx.sale.update({
            where: { id: saleId },
            data: { 
              status,
              ...(status === 'REFUNDED' ? { refundedAt: new Date() } : {})
            },
          });

          // Restaura estoque
          for (const order of sale.orders) {
            await tx.stock.update({
              where: { id: order.productId },
              data: {
                quantity: {
                  increment: order.quantity,
                },
              },
            });
          }
        });

        console.log(`✅ Venda ${saleId} atualizada para ${status} e estoque restaurado`);
      } else {
        // Apenas atualiza o status
        await this.saleModel.updateStatus(saleId, status);
        console.log(`✅ Venda ${saleId} atualizada para ${status}`);
      }

      return await this.saleModel.findById(saleId);
    } catch (error) {
      console.error('Erro ao atualizar status da venda:', error);
      throw error;
    }
  }

  /**
   * Deletar venda
   * Apenas permitido se estiver PENDING ou CANCELLED
   */
  async deleteSale(saleId: number) {
    try {
      const sale = await this.saleModel.findById(saleId);

      if (!sale) {
        throw new Error('Venda não encontrada');
      }

      // Verificar se pode deletar
      if (sale.status === 'PAID' || sale.status === 'PROCESSING') {
        throw new Error(
          `Não é possível deletar venda com status ${sale.status}. Cancele a venda primeiro.`
        );
      }

      // Se estava PAID e foi cancelada/reembolsada, o estoque já foi restaurado
      // Apenas deleta a venda e orders (cascade)
      await prisma.sale.delete({
        where: { id: saleId },
      });

      console.log(`✅ Venda ${saleId} deletada com sucesso`);
      return { success: true, message: 'Venda deletada com sucesso' };
    } catch (error) {
      console.error('Erro ao deletar venda:', error);
      throw error;
    }
  }
}
