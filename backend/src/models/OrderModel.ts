import { PrismaClient, Order } from '@prisma/client';
import CRUDModel from './CRUDModel.js';

export default class OrderModel extends CRUDModel<Order> {
  constructor(protected model: PrismaClient['order']) {
    super(model);
  }

  /**
   * Buscar order por ID com relacionamentos
   */
  async findById(id: number, include?: any): Promise<any> {
    return await this.model.findUnique({
      where: { id },
      ...(include && { include }),
    });
  }

  /**
   * Buscar orders por Sale ID
   */
  async findBySaleId(saleId: number, include?: any): Promise<any[]> {
    return await this.model.findMany({
      where: { saleId },
      ...(include && { include }),
    });
  }

  /**
   * Atualizar order por ID
   */
  async updateById(
    id: number,
    data: Partial<Order>,
    include?: any
  ): Promise<any> {
    return await this.model.update({
      where: { id },
      data,
      ...(include && { include }),
    });
  }

  /**
   * Deletar order por ID
   */
  async deleteById(id: number): Promise<Order> {
    return await this.model.delete({
      where: { id },
    });
  }

  /**
   * Buscar todas as orders
   */
  async findAll(include?: any): Promise<any[]> {
    return await this.model.findMany({
      ...(include && { include }),
      orderBy: { createdAt: 'desc' },
    });
  }
}
