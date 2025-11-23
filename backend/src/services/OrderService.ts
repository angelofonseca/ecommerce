import { Order } from '@prisma/client';
import OrderModel from '../models/OrderModel.js';
import prisma from '../database/prismaClient.js';
import Message from '../Interfaces/Message.js';
import ServiceResponse from '../Interfaces/ServiceResponse.js';

export default class OrderService {
  private orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(prisma.order);
  }

  /**
   * Buscar order por ID
   */
  async findById(id: number): Promise<ServiceResponse<Message | Order>> {
    try {
      const order = await this.orderModel.findById(id, {
        product: true,
        sale: true,
      });

      if (!order) {
        return {
          status: 404,
          data: { message: 'Order não encontrada' },
        };
      }

      return {
        status: 200,
        data: order,
      };
    } catch (error) {
      console.error('Erro ao buscar order:', error);
      return {
        status: 500,
        data: { message: 'Erro ao buscar order' },
      };
    }
  }

  /**
   * Buscar orders por Sale ID
   */
  async findBySaleId(saleId: number): Promise<ServiceResponse<Order[]>> {
    try {
      const orders = await this.orderModel.findBySaleId(saleId, {
        product: true,
      });

      return {
        status: 200,
        data: orders,
      };
    } catch (error) {
      console.error('Erro ao buscar orders:', error);
      return {
        status: 500,
        data: [],
      };
    }
  }

  /**
   * Atualizar order
   * Permite atualizar quantity e recalcula subtotal
   */
  async updateById(
    id: number,
    data: { quantity?: number; priceUnit?: number }
  ): Promise<ServiceResponse<Message | Order>> {
    try {
      // Buscar order atual
      const currentOrder = await this.orderModel.findById(id);

      if (!currentOrder) {
        return {
          status: 404,
          data: { message: 'Order não encontrada' },
        };
      }

      // Preparar dados para atualização
      const updateData: any = {};

      if (data.quantity !== undefined) {
        if (data.quantity <= 0) {
          return {
            status: 400,
            data: { message: 'Quantidade deve ser maior que zero' },
          };
        }
        updateData.quantity = data.quantity;
      }

      if (data.priceUnit !== undefined) {
        if (data.priceUnit <= 0) {
          return {
            status: 400,
            data: { message: 'Preço unitário deve ser maior que zero' },
          };
        }
        updateData.priceUnit = data.priceUnit;
      }

      // Recalcular subtotal
      const newQuantity = updateData.quantity ?? currentOrder.quantity;
      const newPriceUnit = updateData.priceUnit ?? currentOrder.priceUnit;
      updateData.subtotal = newQuantity * Number(newPriceUnit);

      // Atualizar
      const updatedOrder = await this.orderModel.updateById(id, updateData, {
        product: true,
        sale: true,
      });

      return {
        status: 200,
        data: updatedOrder,
      };
    } catch (error) {
      console.error('Erro ao atualizar order:', error);
      return {
        status: 500,
        data: { message: 'Erro ao atualizar order' },
      };
    }
  }

  /**
   * Deletar order
   * Apenas permitido se a venda ainda estiver PENDING
   */
  async deleteById(id: number): Promise<ServiceResponse<Message>> {
    try {
      // Buscar order com sale
      const order = await this.orderModel.findById(id, { sale: true });

      if (!order) {
        return {
          status: 404,
          data: { message: 'Order não encontrada' },
        };
      }

      // Verificar se a venda ainda está PENDING
      if (order.sale.status !== 'PENDING') {
        return {
          status: 400,
          data: {
            message: `Não é possível deletar order de venda com status ${order.sale.status}`,
          },
        };
      }

      // Deletar
      await this.orderModel.deleteById(id);

      // Recalcular total da venda (se necessário)
      const remainingOrders = await this.orderModel.findBySaleId(order.saleId);
      const newTotal = remainingOrders.reduce(
        (sum, o) => sum + Number(o.subtotal),
        0
      );

      // Atualizar total da venda
      await prisma.sale.update({
        where: { id: order.saleId },
        data: { totalValue: newTotal },
      });

      return {
        status: 200,
        data: { message: 'Order deletada com sucesso' },
      };
    } catch (error) {
      console.error('Erro ao deletar order:', error);
      return {
        status: 500,
        data: { message: 'Erro ao deletar order' },
      };
    }
  }

  /**
   * Buscar todas as orders
   */
  async findAll(): Promise<ServiceResponse<Order[]>> {
    try {
      const orders = await this.orderModel.findAll({
        product: true,
        sale: true,
      });

      return {
        status: 200,
        data: orders,
      };
    } catch (error) {
      console.error('Erro ao buscar orders:', error);
      return {
        status: 500,
        data: [],
      };
    }
  }
}
