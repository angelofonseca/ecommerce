import { User } from "@prisma/client";

export default interface IUser {
  find(email: string): Promise<User | null>;
  create(user: User): Promise<void>;
}
