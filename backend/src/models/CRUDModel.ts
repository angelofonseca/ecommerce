export default class CRUDModel<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async find(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<T | null> {
    return await this.model.findUnique({ where: { email } });
  }

  async create(data: T): Promise<void> {
    await this.model.create({ data });
  }

  async update(id: number, data: Partial<T>): Promise<void> {
    await this.model.update({ where: { id }, data });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }
}
