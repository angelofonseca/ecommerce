export default class CRUDService<T> {
  protected model: any;

  constructor(model: any) {
    this.model = model;
  }

  async find(id: number): Promise<T | null> {
    return await this.model.find(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.findAll();
  }

  async create(data: T): Promise<void> {
    await this.model.create(data);
  }

  async update(id: number, data: Partial<T>): Promise<void> {
    await this.model.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.model.delete(id);
  }
}
