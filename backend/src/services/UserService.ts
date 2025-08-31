import bcrypt from "bcryptjs";
import auth from "../utils/auth.js";
import Message from "../Interfaces/Message";
import Token from "../Interfaces/Token";
import Login from "../Interfaces/Login";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { User } from "../generated/prisma";
import { validateLogin, validateUser } from "../validations/validations.js";
import CRUDModel from "../models/CRUDModel.js";
import CRUDService from "./CRUDService.js";

const invalidMessage: Message = { message: "Invalid email or password" };

export default class UserService extends CRUDService<User> {
  constructor(protected service: CRUDModel<User>) {
    super(service);
  }

  async create(user: User): Promise<ServiceResponse<Message>> {
    const validation = validateUser(user);
    if (validation) return validation;

    user.password = bcrypt.hashSync(user.password, 8);

    const result = await super.create(user);
    return result;
  }

  async login(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.service.findByEmail(email);
    if (!foundUser) return { status: 401, data: invalidMessage };

    const { password: hash, role, id } = foundUser;

    const userPassword = bcrypt.compareSync(password, hash);
    if (!userPassword) return { status: 401, data: invalidMessage };

    const token = auth.createToken({ email, id, role });

    return { status: 200, data: { token } };
  }
}
