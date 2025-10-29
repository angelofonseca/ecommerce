// backend/src/models/SaleModel.ts
import { PrismaClient, Sale, SaleStatus, Prisma } from '@prisma/client';
import CRUDModel from './CRUDModel.js';

// Tipo para Sale com relacionamentos incluídos (com orders)
export type SaleWithOrders = Prisma.SaleGetPayload<{
  include: {
    orders: {
      include: {
        product: true;
      };
    };
  };
}>;

// Tipo para Sale com todos os relacionamentos
export type SaleWithRelations = Prisma.SaleGetPayload<{
  include: {
    orders: {
      include: {
        product: true;
      };
    };
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        address: true;
      };
    };
  };
}>;

export default class SaleModel extends CRUDModel<Sale> {
  constructor(protected model: PrismaClient['sale']) {
    super(model);
  }

  /**
   * Buscar venda por ID com relacionamentos
   */
  async findById(id: number): Promise<SaleWithRelations | null> {
    return await this.model.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });
  }

  /**
   * Buscar todas as vendas com relacionamentos
   */
  async findAll(): Promise<SaleWithRelations[]> {
    return await this.model.findMany({
      include: {
        orders: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Buscar venda por Stripe Checkout ID
   */
  async findByStripeCheckoutId(checkoutId: string): Promise<SaleWithRelations | null> {
    return await this.model.findUnique({
      where: { stripeCheckoutId: checkoutId },
      include: {
        orders: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true,
          },
        },
      },
    });
  }

  /**
   * Buscar venda por Stripe Payment ID
   */
  async findByStripePaymentId(paymentId: string): Promise<Sale | null> {
    return await this.model.findUnique({
      where: { stripePaymentId: paymentId },
      include: {
        orders: true,
      },
    });
  }

  /**
   * Buscar vendas por usuário
   */
  async findByUserId(userId: number): Promise<SaleWithOrders[]> {
    return await this.model.findMany({
      where: { userId },
      include: {
        orders: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Atualizar status da venda
   */
  async updateStatus(id: number, status: SaleStatus): Promise<Sale> {
    return await this.model.update({
      where: { id },
      data: {
        status,
        ...(status === 'PAID' ? { paidAt: new Date() } : {}),
      },
    });
  }

  /**
   * Atualizar com dados do Stripe
   */
  async updateStripeData(
    id: number,
    data: {
      stripePaymentId?: string;
      status?: SaleStatus;
    }
  ): Promise<Sale> {
    return await this.model.update({
      where: { id },
      data: {
        ...data,
        ...(data.status === 'PAID' ? { paidAt: new Date() } : {}),
      },
    });
  }
}