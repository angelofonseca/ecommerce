import { Request, Response } from 'express';
import SaleService from '../services/SaleService.js';
import OrderService from '../services/OrderService.js';

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  priceUnit: number;
}

class CheckoutController {
  private saleService: SaleService;
  private orderService: OrderService;

  constructor() {
    this.saleService = new SaleService();
    this.orderService = new OrderService();
  }

  /**
   * POST /checkout/create-session
   * Cria uma sessão de checkout do Stripe
   */
  async createCheckoutSession(req: Request, res: Response): Promise<void> {
    try {
      const { userId, items, shippingAddress, paymentMethod } = req.body;

      // Validações básicas
      if (!userId || !items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({
          error: 'Dados inválidos. Forneça userId, items (array) e shippingAddress',
        });
        return;
      }

      if (!shippingAddress || !shippingAddress.trim()) {
        res.status(400).json({
          error: 'Endereço de entrega é obrigatório',
        });
        return;
      }

      // Validar paymentMethod se fornecido
      if (paymentMethod && !['CREDIT_CARD', 'BOLETO', 'PIX'].includes(paymentMethod)) {
        res.status(400).json({
          error: 'Método de pagamento inválido. Use: CREDIT_CARD, BOLETO ou PIX',
        });
        return;
      }

      // Validar estrutura dos items
      for (const item of items) {
        if (!item.productId || !item.productName || !item.quantity || !item.priceUnit) {
          res.status(400).json({
            error: 'Cada item deve ter: productId, productName, quantity e priceUnit',
          });
          return;
        }

        if (item.quantity <= 0 || item.priceUnit <= 0) {
          res.status(400).json({
            error: 'Quantidade e preço devem ser maiores que zero',
          });
          return;
        }
      }

      // Criar sessão de checkout
      const result = await this.saleService.createCheckoutSession({
        userId,
        items,
        shippingAddress,
        paymentMethod, // Passa o método de pagamento (opcional)
      });

      res.status(200).json({
        success: true,
        message: 'Sessão de checkout criada com sucesso',
        data: {
          saleId: result.sale.id,
          checkoutUrl: result.checkoutUrl,
          sessionId: result.sessionId,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro ao criar checkout:', error.message);
      
      // Erros específicos de estoque
      if (error.message.includes('estoque')) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      // Erro genérico
      res.status(500).json({
        error: 'Erro ao criar sessão de checkout',
        details: error.message,
      });
    }
  }

  /**
   * GET /checkout/success?session_id=xxx
   * Página de sucesso após checkout (opcional - pode ser apenas frontend)
   */
  async checkoutSuccess(req: Request, res: Response): Promise<void> {
    try {
      const sessionId = req.query.session_id as string;

      if (!sessionId) {
        res.status(400).json({
          error: 'session_id é obrigatório',
        });
        return;
      }

      // Buscar a venda pelo checkout session ID
      const sale = await this.saleService.getSaleByCheckoutSessionId(sessionId);

      if (!sale) {
        res.status(404).json({
          error: 'Venda não encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Checkout finalizado com sucesso',
        data: {
          saleId: sale.id,
          status: sale.status,
          totalValue: sale.totalValue,
          paidAt: sale.paidAt,
        },
      });
    } catch (error: any) {
      console.error('❌ Erro ao verificar checkout:', error.message);
      res.status(500).json({
        error: 'Erro ao verificar checkout',
        details: error.message,
      });
    }
  }

  /**
   * GET /checkout/cancel
   * Página de cancelamento (opcional - pode ser apenas frontend)
   */
  async checkoutCancel(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      message: 'Checkout cancelado pelo usuário',
    });
  }

  /**
   * GET /sales/user/:userId
   * Buscar vendas de um usuário
   */
  async getUserSales(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.userId);

      if (isNaN(userId)) {
        res.status(400).json({
          error: 'userId inválido',
        });
        return;
      }

      const sales = await this.saleService.getSalesByUser(userId);

      res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar vendas:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar vendas',
        details: error.message,
      });
    }
  }

  /**
   * GET /sales/:id
   * Buscar detalhes de uma venda específica
   */
  async getSaleById(req: Request, res: Response): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);

      if (isNaN(saleId)) {
        res.status(400).json({
          error: 'saleId inválido',
        });
        return;
      }

      const sale = await this.saleService.getSaleById(saleId);

      if (!sale) {
        res.status(404).json({
          error: 'Venda não encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: sale,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar venda:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar venda',
        details: error.message,
      });
    }
  }

  /**
   * GET /sales (admin only)
   * Buscar todas as vendas
   */
  async getAllSales(req: Request, res: Response): Promise<void> {
    try {
      const sales = await this.saleService.getAllSales();

      res.status(200).json({
        success: true,
        data: sales,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar vendas:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar vendas',
        details: error.message,
      });
    }
  }

  /**
   * PATCH /sales/:id/status
   * Atualizar status de uma venda
   */
  async updateSaleStatus(req: Request, res: Response): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);
      const { status } = req.body;

      if (isNaN(saleId)) {
        res.status(400).json({
          error: 'saleId inválido',
        });
        return;
      }

      // Validar status
      const validStatuses = ['PENDING', 'PROCESSING', 'PAID', 'CANCELLED', 'REFUNDED'];
      if (!status || !validStatuses.includes(status)) {
        res.status(400).json({
          error: 'Status inválido. Use: PENDING, PROCESSING, PAID, CANCELLED ou REFUNDED',
        });
        return;
      }

      const updatedSale = await this.saleService.updateSaleStatus(saleId, status);

      res.status(200).json({
        success: true,
        message: `Status da venda atualizado para ${status}`,
        data: updatedSale,
      });
    } catch (error: any) {
      console.error('❌ Erro ao atualizar status da venda:', error.message);
      
      if (error.message.includes('não encontrada')) {
        res.status(404).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: 'Erro ao atualizar status da venda',
        details: error.message,
      });
    }
  }

  /**
   * DELETE /sales/:id
   * Deletar uma venda (apenas PENDING ou CANCELLED)
   */
  async deleteSale(req: Request, res: Response): Promise<void> {
    try {
      const saleId = parseInt(req.params.id);

      if (isNaN(saleId)) {
        res.status(400).json({
          error: 'saleId inválido',
        });
        return;
      }

      const result = await this.saleService.deleteSale(saleId);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      console.error('❌ Erro ao deletar venda:', error.message);
      
      if (error.message.includes('não encontrada')) {
        res.status(404).json({
          error: error.message,
        });
        return;
      }

      if (error.message.includes('Não é possível deletar')) {
        res.status(400).json({
          error: error.message,
        });
        return;
      }

      res.status(500).json({
        error: 'Erro ao deletar venda',
        details: error.message,
      });
    }
  }

  /**
   * GET /orders/:id
   * Buscar detalhes de uma order específica
   */
  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);

      if (isNaN(orderId)) {
        res.status(400).json({
          error: 'orderId inválido',
        });
        return;
      }

      const { data, status } = await this.orderService.findById(orderId);

      res.status(status).json({
        success: status === 200,
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar order:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar order',
        details: error.message,
      });
    }
  }

  /**
   * GET /orders/sale/:saleId
   * Buscar todas as orders de uma venda
   */
  async getOrdersBySale(req: Request, res: Response): Promise<void> {
    try {
      const saleId = parseInt(req.params.saleId);

      if (isNaN(saleId)) {
        res.status(400).json({
          error: 'saleId inválido',
        });
        return;
      }

      const { data, status } = await this.orderService.findBySaleId(saleId);

      res.status(status).json({
        success: true,
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar orders:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar orders',
        details: error.message,
      });
    }
  }

  /**
   * PUT /orders/:id
   * Atualizar uma order (quantity ou priceUnit)
   * Apenas permitido se a venda estiver PENDING
   */
  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);
      const { quantity, priceUnit } = req.body;

      if (isNaN(orderId)) {
        res.status(400).json({
          error: 'orderId inválido',
        });
        return;
      }

      if (quantity === undefined && priceUnit === undefined) {
        res.status(400).json({
          error: 'Forneça quantity ou priceUnit para atualizar',
        });
        return;
      }

      const { data, status } = await this.orderService.updateById(orderId, {
        quantity,
        priceUnit,
      });

      res.status(status).json({
        success: status === 200,
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro ao atualizar order:', error.message);
      res.status(500).json({
        error: 'Erro ao atualizar order',
        details: error.message,
      });
    }
  }

  /**
   * DELETE /orders/:id
   * Deletar uma order
   * Apenas permitido se a venda estiver PENDING
   */
  async deleteOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = parseInt(req.params.id);

      if (isNaN(orderId)) {
        res.status(400).json({
          error: 'orderId inválido',
        });
        return;
      }

      const { data, status } = await this.orderService.deleteById(orderId);

      res.status(status).json({
        success: status === 200,
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro ao deletar order:', error.message);
      res.status(500).json({
        error: 'Erro ao deletar order',
        details: error.message,
      });
    }
  }

  /**
   * GET /orders (admin only)
   * Buscar todas as orders
   */
  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.orderService.findAll();

      res.status(status).json({
        success: true,
        data,
      });
    } catch (error: any) {
      console.error('❌ Erro ao buscar orders:', error.message);
      res.status(500).json({
        error: 'Erro ao buscar orders',
        details: error.message,
      });
    }
  }
}

export default new CheckoutController();
