import IncludeOptions from "../Interfaces/IncludeOptions";
import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import CRUDModel from "../models/CRUDModel";

export default class CRUDService<T> {

  constructor(protected model: CRUDModel<T>) {
  }

  public async find(id: number, include?: IncludeOptions): Promise<ServiceResponse<Message | T>> {
    const result = await this.model.find(id, include);
    if (!result) return { status: 404, data: { message: "Not found" } };
    return { status: 200, data: result };
  }

  public async findAll(include?: IncludeOptions): Promise<ServiceResponse<T[]>> {
    const result = await this.model.findAll(include);
    return { status: 200, data: result };
  }

  public async create(data: T): Promise<ServiceResponse<Message>> {
    await this.validateCreateData(data);
    await this.model.create(data);
    return { status: 201, data: { message: "Created successfully" } };
  }

  public async updateById(
    id: number,
    data: Partial<T>,
    include?: IncludeOptions
  ): Promise<ServiceResponse<Message>> {
    const exists = await this.validateResourceExists(id);
    if (!exists) return { status: 404, data: { message: "ID not Found" } };

    await this.validateUpdateData(data);
    await this.model.updateById(id, data, include);

    return { status: 200, data: { message: "Updated successfully" } };
  }

  public async deleteById(id: number): Promise<ServiceResponse<Message>> {
    try {
      await this.model.deleteById(id);
      return { status: 200, data: { message: "Deleted successfully" } };
    } catch (error) {
      return { status: 404, data: { message: "ID not Found" } };
    }
  }

  protected async validateResourceExists(id: number): Promise<boolean> {
    const result = await this.model.find(id);
    return !!result;
  }

  protected async validateCreateData(data: T): Promise<void> {
    if (!data || Object.keys(data as any).length === 0) {
      throw new Error('Data cannot be empty');
    }
  }

  protected async validateUpdateData(data: Partial<T>): Promise<void> {
    if (!data || Object.keys(data as any).length === 0) {
      throw new Error('Update data cannot be empty');
    }
  }

  protected async findByName(name: string, include?: IncludeOptions): Promise<T | null> {
    return await this.model.findByName(name, include);
  }
}
