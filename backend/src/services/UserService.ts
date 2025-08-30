import bcrypt from 'bcryptjs';
import auth from '../utils/auth.js';
import utils from '../utils/utils.js';

import Message from '../Interfaces/Message';
import Token from '../Interfaces/Token';
import Login from '../Interfaces/Login';
import ServiceResponse from '../Interfaces/ServiceResponse';
import UserModel from '../Interfaces/IUser';
import User from '../Interfaces/User.js';

const emptyFieldsMessage: Message = { message: 'All fields must be filled' };
const invalidMessage: Message = { message: 'Invalid email or password' };

export default class UserService {
  constructor(
    private model: UserModel,
  ) {}

  async login(user: Login): Promise<ServiceResponse<Message | Token>> {
    if (!user.email || !user.password) {
      return { status: 400, data: emptyFieldsMessage };
    }
    
    const { email, password } = user;

    if (!utils.isValidEmail(email) || password.length < 6) {
      return { status: 401, data: invalidMessage };
    }

    const foundUser = await this.model.find(email);
    if (!foundUser) {
      return { status: 401, data: invalidMessage };
    }

    const { id, password: hash, role } = foundUser;

    const userPassword = bcrypt.compareSync(password, hash);
    if (!userPassword) {
      return { status: 401, data: invalidMessage };
    }

    const token = auth.createToken({ email, id, role });

    return { status: 200, data: { token } };
  }

  async create(user: User): Promise<ServiceResponse<Message>> {
    if (!user.email || !user.password || !user.name || !user.cpf || !user.phone || !user.address) {
      return { status: 400, data: emptyFieldsMessage };
    }

    if (!utils.isValidEmail(user.email) || user.password.length < 6) {
      return { status: 401, data: invalidMessage };
    }

    user.password = bcrypt.hashSync(user.password, 8);

    this.model.create(user);

    return { status: 200, data: { message: 'User Created Successfully' } };
  }
}