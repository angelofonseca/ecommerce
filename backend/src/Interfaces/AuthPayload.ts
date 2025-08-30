import { Role } from "../generated/prisma";

export default interface AuthPayload {
  id: number;
  email: string;
  role: Role;
}
