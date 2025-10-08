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

// Constants
const BCRYPT_SALT_ROUNDS = 8;
const DEFAULT_USER_ROLE = 'CUSTOMER';
const ADMIN_ROLE = 'ADMIN';

// Error messages
const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_CPF_EXISTS: "Email ou CPF já cadastrado",
  ACCESS_DENIED: "Access denied: Admins only"
} as const;

export default class UserService extends CRUDService<User> {
  constructor(protected model: UserModel) {
    super(model);
  }

  async create(user: User): Promise<ServiceResponse<Message>> {
    const validation = validateUser(user);
    if (validation) return validation;

    // Set default role if not provided
    if (!user.role) {
      user.role = DEFAULT_USER_ROLE;
    }

    // Hash password
    user.password = this.hashPassword(user.password);
    
    try {
      return await super.create(user);
    } catch (error) {
      return { 
        status: 400, 
        data: { message: ERROR_MESSAGES.EMAIL_CPF_EXISTS } 
      };
    }
  }

  async login(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.model.findByEmail(email);
    if (!foundUser) {
      return { 
        status: 401, 
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } 
      };
    }

    const { password: hash, role, id, name } = foundUser;

    const isPasswordValid = this.verifyPassword(password, hash);
    if (!isPasswordValid) {
      return { 
        status: 401, 
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } 
      };
    }

    const token = auth.createToken({ email, id, role });

    return { 
      status: 200, 
      data: { token, user: { name, email } } 
    };
  }

  async adminLogin(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.model.findByEmail(email);
    if (!foundUser) {
      return { 
        status: 401, 
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } 
      };
    }

    const { password: hash, role, id, name } = foundUser;

    const isPasswordValid = this.verifyPassword(password, hash);
    if (!isPasswordValid) {
      return { 
        status: 401, 
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS } 
      };
    }

    // Check admin role
    if (role !== ADMIN_ROLE) {
      return { 
        status: 401, 
        data: { message: ERROR_MESSAGES.ACCESS_DENIED } 
      };
    }

    const token = auth.createToken({ email, id, role });
    
    return { 
      status: 200, 
      data: { token, user: { name, email } } 
    };
  }

  // Private utility methods
  private hashPassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  }

  private verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
