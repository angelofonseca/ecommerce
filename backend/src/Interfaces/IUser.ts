import User from './User';

export default interface IUser {
  find(email: string): Promise<User | null>;
  create(user: User): void;
}
