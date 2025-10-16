import IncludeOptions from "../Interfaces/IncludeOptions";
import { PrismaDelegate } from "../Interfaces/PrismaDelegate";

export default class CRUDModel<T> {

  constructor(protected model: PrismaDelegate<T>) {}

  public async find(id: number, include?: IncludeOptions): Promise<T | null> {
    const sanitizedId = this.sanitizeID(id);
    return await this.model.findUnique({
      where: { id: sanitizedId },
      ...(include ? { include }: {})
    });
  }

  public async findByName(name: string, include?: IncludeOptions): Promise<T | null> {
    return this.model.findFirst({
      where: { name },
      ...(include ? { include }: {})
    });
  }

  public async create(data: T): Promise<T> {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw error;
    }
  }

  public async updateById(id: number, data: Partial<T>, include?: IncludeOptions): Promise<T> {
    try {
      const sanitizedId = this.sanitizeID(id);
      return await this.model.update({
        where: { id: sanitizedId },
        data,
        ...(include ? { include }: {})
      });
    } catch (error) {
      throw error;
    }
  }

  public async findAll(include?: IncludeOptions): Promise<T[]> {
    return await this.model.findMany({
      ...(include ? { include }: {})
    });
  }

  public async deleteById(id: number, include?: IncludeOptions): Promise<T> {
    const sanitizedId = this.sanitizeID(id);
    return await this.model.delete({
      where: { id: sanitizedId },
      ...(include ? { include }: {})
    });
  }

  protected buildIncludeOptions(include?: IncludeOptions): object | undefined {
    if (!include) return undefined;

    const includeObj: any = {};
    if (include.category) includeObj.category = true;
    if (include.brand) includeObj.brand = true;
    if (include.stock) includeObj.stock = true;

    return Object.keys(includeObj).length > 0 ? includeObj : undefined;
  }

  private sanitizeID(id: any): number {
    if (typeof id === 'string') {
      const parsed = parseInt(id, 10);
      if (isNaN(parsed)) {
        throw new Error('Invalid ID format');
      }
      return parsed;
    }

    if (typeof id === 'number') {
      if (id <= 0 || !Number.isInteger(id)) {
        throw new Error('ID must be a positive integer');
      }
      return id;
    }

    throw new Error('ID must be a number or numeric string');
  }
}
