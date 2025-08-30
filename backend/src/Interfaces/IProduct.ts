import { Product } from "../generated/prisma";

export default interface IProduct {
  find(id: number): Promise<Product | null>;
  create(product: Product): Promise<void>;
}
