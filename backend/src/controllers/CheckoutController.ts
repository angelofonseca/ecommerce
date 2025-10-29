import { Request, Response } from 'express';
import SaleService from '../services/SaleService.js';

interface CartItem {
  productId: number;
  productName: string;
  quantity: number;
  priceUnit: number;
}

class CheckoutController {
  private saleService: SaleService;

  constructor() {
    this.saleService = new SaleService();
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
}

export default new CheckoutController();
