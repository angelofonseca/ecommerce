import bcrypt from 'bcryptjs';
import auth from '../utils/auth.js';
import utils from '../utils/utils.js';

import Message from '../Interfaces/Message';
import Token from '../Interfaces/Token';
import Login from '../Interfaces/Login';
import ServiceResponse from '../Interfaces/ServiceResponse';
import UserModel from '../Interfaces/IUser';

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

    const { id, password: hash } = foundUser;

    const userPassword = bcrypt.compareSync(password, hash);
    if (!userPassword) {
      return { status: 401, data: invalidMessage };
    }

    const token = auth.createToken({ email, id });

    return { status: 200, data: { token } };
  }
}