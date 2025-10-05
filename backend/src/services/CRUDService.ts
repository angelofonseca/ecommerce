import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";
import CRUDModel from "../models/CRUDModel";

type IncludeOptions = {
  category?: boolean;
  brand?: boolean;
  stock?: boolean;
};

export default class CRUDService<T> {

  constructor(protected service: CRUDModel<T>) {
  }

  async find(id: number, include?: IncludeOptions): Promise<ServiceResponse<Message | T>> {
    const result = await this.service.find(id, include);
    if (!result) return { status: 404, data: { message: "Not found" } };
    return { status: 200, data: result };
  }

  async findAll(include?: IncludeOptions): Promise<ServiceResponse<T[]>> {
    const result = await this.service.findAll(include);
    return { status: 200, data: result };
  }

  async create(data: T): Promise<ServiceResponse<Message>> {
    const info = await this.service.create(data);
    return { status: 201, data: { message: "Created successfully" } };
  }

  // Método usando find para validar o id (Verificar qual é o método mais eficiente)

  async updateById(
    id: number,
    data: Partial<T>,
    include?: IncludeOptions
  ): Promise<ServiceResponse<Message>> {
    const result = await this.service.find(id);
    if (!result) return { status: 404, data: { message: "ID not Found" } };

    await this.service.updateById(id, data, include);

    return { status: 200, data: { message: "Updated successfully" } };
  }

  // Método usando try/catch para validar o id

  async deleteById(id: number): Promise<ServiceResponse<Message>> {
    try {
      await this.service.deleteById(id);
      return { status: 200, data: { message: "Deleted successfully" } };
    } catch (error) {
      return { status: 404, data: { message: "ID not Found" } };
    }
  }
}
