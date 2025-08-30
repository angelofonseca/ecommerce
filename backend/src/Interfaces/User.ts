import type { Role } from "../generated/prisma/index.js";

export default interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  role: Role;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
};