import bcrypt from "bcryptjs";
import auth from "../utils/auth.js";
import Message from "../Interfaces/Message";
import Token from "../Interfaces/Token";
import Login from "../Interfaces/Login";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { User } from "@prisma/client";
import { validateLogin, validateUser } from "../validations/validations.js";
import UserModel from "../models/UserModel.js";
import CRUDService from "./CRUDService.js";

const invalidMessage: Message = { message: "Invalid email or password" };

export default class UserService extends CRUDService<User> {
  constructor(protected model: UserModel) {
    super(model);
  }

  async create(user: User): Promise<ServiceResponse<Message>> {
    const validation = validateUser(user);
    if (validation) return validation;

    if (!user.role) user.role = 'CUSTOMER';

    user.password = bcrypt.hashSync(user.password, 8);
    try {
      return await super.create(user);
    } catch (error) {
      return { status: 400, data: { message: "Email ou CPF já cadastrado" } };
    }
  }

  async login(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.model.findByEmail(email);
    if (!foundUser) return { status: 401, data: invalidMessage };

    const { password: hash, role, id, name } = foundUser;

    const userPassword = bcrypt.compareSync(password, hash);
    if (!userPassword) return { status: 401, data: invalidMessage };

    const token = auth.createToken({ email, id, role });

    return { status: 200, data: { token, user: { name, email } } };
  }

    async adminLogin(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.model.findByEmail(email);
    if (!foundUser) return { status: 401, data: invalidMessage };

    const { password: hash, role, id, name } = foundUser;

    const userPassword = bcrypt.compareSync(password, hash);
    if (!userPassword) return { status: 401, data: invalidMessage };

    const token = auth.createToken({ email, id, role });
    
    if (role !== 'ADMIN') return { status: 401, data: { message: 'Access denied: Admins only' } };

    return { status: 200, data: { token, user: { name, email } } };
  }
}
