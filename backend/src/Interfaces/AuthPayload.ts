import type { Role } from "../generated/prisma/index.js";


export default interface AuthPayload {
  id: number;
  email: string;
  role: Role;
}