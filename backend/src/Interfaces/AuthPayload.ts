import { Role } from "@prisma/client";

export default interface AuthPayload {
  id: number;
  email: string;
  role: Role;
}
