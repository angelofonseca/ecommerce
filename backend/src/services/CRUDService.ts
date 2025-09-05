import Message from "../Interfaces/Message";
import ServiceResponse from "../Interfaces/ServiceResponse";

export default class CRUDService<T> {
  protected service: any;

  constructor(service: any) {
    this.service = service;
  }

  async find(id: number): Promise<ServiceResponse<Message | T>> {
    const result = await this.service.find(id);
    if (!result) return { status: 404, data: { message: "Not found" } };
    return { status: 200, data: result };
  }

  async findAll(): Promise<ServiceResponse<T[]>> {
    const result = await this.service.findAll();
    return { status: 200, data: result };
  }

  async create(data: T): Promise<ServiceResponse<Message>> {
    const info = await this.service.create(data);
    return { status: 201, data: { message: "Created successfully" } };
  }

  // Método usando find para validar o id (Verificar qual é o método mais eficiente)

  async update(
    id: number,
    data: Partial<T>
  ): Promise<ServiceResponse<Message>> {
    const result = await this.service.find(id);
    if (!result) return { status: 404, data: { message: "Not found" } };

    await this.service.update(id, data);

    return { status: 200, data: { message: "Updated successfully" } };
  }

  // Método usando try/catch para validar o id

  async delete(id: number): Promise<ServiceResponse<Message>> {
    try {
      await this.service.delete(id);
      return { status: 200, data: { message: "Deleted successfully" } };
    } catch (error) {
      return { status: 404, data: { message: "Not Found" } };
    }
  }
}
