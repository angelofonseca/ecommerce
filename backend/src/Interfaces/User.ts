export default interface User {
  id: number;
  name: string;
  cpf: string;
  email: string;
  password: string;
  phone: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
};