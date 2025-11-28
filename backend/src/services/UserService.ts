import bcrypt from "bcryptjs";
import crypto from "crypto";
import auth from "../utils/auth.js";
import Message from "../Interfaces/Message";
import Token from "../Interfaces/Token";
import Login from "../Interfaces/Login";
import ServiceResponse from "../Interfaces/ServiceResponse";
import { User } from "@prisma/client";
import { validateLogin, validateUser } from "../validations/validations.js";
import UserModel from "../models/UserModel.js";
import CRUDService from "./CRUDService.js";
import LogService from "./LogService.js";
import LogModel from "../models/LogModel.js";
import prisma from "../database/prismaClient.js";
import EmailService from "./EmailService.js";

const BCRYPT_SALT_ROUNDS = 8;
const DEFAULT_USER_ROLE = 'CUSTOMER';
const ADMIN_ROLE = 'ADMIN';
const RESET_CODE_EXPIRATION_MINUTES = 15;

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_CPF_EXISTS: "Email ou CPF já cadastrado",
  ACCESS_DENIED: "Access denied: Admins only",
  USER_NOT_FOUND: "Usuário não encontrado",
  INVALID_RESET_CODE: "Código de verificação inválido ou expirado",
  RESET_CODE_EXPIRED: "Código de verificação expirado. Solicite um novo código.",
  ACCOUNT_NOT_ACTIVATED: "Conta não ativada. Verifique seu email para ativar sua conta.",
  INVALID_ACTIVATION_TOKEN: "Token de ativação inválido",
  ACCOUNT_ALREADY_ACTIVE: "Conta já está ativa"
} as const;

export default class UserService extends CRUDService<User> {
  private logService: LogService;

  constructor(protected model: UserModel) {
    super(model);
    const logModel = new LogModel(prisma.log);
    this.logService = new LogService(logModel);
  }

  public async create(user: User): Promise<ServiceResponse<Message>> {
    const validation = validateUser(user);
    if (validation) return validation;

    if (!user.role) {
      user.role = DEFAULT_USER_ROLE;
    }

    user.password = this._hashPassword(user.password);

    const activationToken = this._generateActivationToken();
    user.activationToken = activationToken;

    try {
      const result = await super.create(user);

      if (result.status === 201) {
        try {
          await EmailService.sendActivationEmail(user.email, activationToken, user.name);

          await this.logService.createLog({
            action: 'USER_REGISTER',
            entity: 'User',
            details: `Novo usuário registrado: ${user.email} (aguardando ativação)`,
          });
        } catch (error) {
          console.error('Erro ao enviar email de ativação ou registrar log:', error);
        }
      }

      return {
        status: 201,
        data: {
          message: "Cadastro realizado com sucesso! Verifique seu email para ativar sua conta."
        }
      };
    } catch (error) {
      try {
        await this.logService.createLog({
          action: 'USER_REGISTER_FAILED',
          entity: 'User',
          details: `Tentativa de registro falhou: ${user.email}`,
        });
      } catch (logError) {
        console.error('Erro ao registrar log:', logError);
      }

      return {
        status: 400,
        data: { message: ERROR_MESSAGES.EMAIL_CPF_EXISTS }
      };
    }
  }

  public async login(user: Login): Promise<ServiceResponse<Message | Token>> {
    const validation = validateLogin(user);
    if (validation) return validation;

    const { email, password } = user;

    const foundUser = await this.model.findByEmail(email);
    if (!foundUser) {
      // Registrar tentativa de login falha
      try {
        await this.logService.createLog({
          action: 'USER_LOGIN_FAILED',
          entity: 'User',
          details: `Tentativa de login com email não encontrado: ${email}`,
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 401,
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS }
      };
    }

    const { password: hash, role, id, name } = foundUser;

    const isPasswordValid = this._verifyPassword(password, hash);
    if (!isPasswordValid) {
      // Registrar tentativa de login com senha inválida
      try {
        await this.logService.createLog({
          userId: id,
          action: 'USER_LOGIN_FAILED',
          entity: 'User',
          entityId: id,
          details: `Tentativa de login com senha inválida: ${email}`,
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 401,
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS }
      };
    }

    if (foundUser.status !== 'ACTIVE') {
      try {
        await this.logService.createLog({
          userId: id,
          action: 'USER_LOGIN_FAILED',
          entity: 'User',
          entityId: id,
          details: `Tentativa de login com conta não ativada: ${email}`,
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 403,
        data: { message: ERROR_MESSAGES.ACCOUNT_NOT_ACTIVATED }
      };
    }

    // Registrar login bem-sucedido
    try {
      await this.logService.createLog({
        userId: id,
        action: 'USER_LOGIN_SUCCESS',
        entity: 'User',
        entityId: id,
        details: `Login realizado com sucesso: ${email}`,
      });
    } catch (error) {
      console.error('Erro ao registrar log:', error);
    }

    const token = auth.createToken({ email, id, role });

    return {
      status: 200,
      data: { token, user: { name, email } }
    };
  }

  public async adminLogin(user: Login): Promise<ServiceResponse<Message | Token>> {
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

    const isPasswordValid = this._verifyPassword(password, hash);
    if (!isPasswordValid) {
      return {
        status: 401,
        data: { message: ERROR_MESSAGES.INVALID_CREDENTIALS }
      };
    }

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

  private _hashPassword(password: string): string {
    return bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
  }

  private _verifyPassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }

  private _generateResetCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private _generateActivationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  public async requestPasswordReset(email: string): Promise<ServiceResponse<Message>> {
    try {
      const user = await this.model.findByEmail(email);

      if (!user) {
        // Por segurança, retornar sucesso mesmo se usuário não existir
        return {
          status: 200,
          data: {
            message: "Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha."
          }
        };
      }

      // Gerar código de 6 dígitos
      const resetCode = this._generateResetCode();

      // Definir expiração (15 minutos)
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + RESET_CODE_EXPIRATION_MINUTES);

      // Atualizar usuário com código e expiração
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetPasswordCode: resetCode,
          resetPasswordExpires: expiresAt
        }
      });

      // Enviar email
      await EmailService.sendResetPasswordEmail(email, resetCode, user.name);

      // Registrar log
      try {
        await this.logService.createLog({
          userId: user.id,
          action: 'PASSWORD_RESET_REQUESTED',
          entity: 'User',
          entityId: user.id,
          details: `Solicitação de recuperação de senha para: ${email}`
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 200,
        data: {
          message: "Se o email estiver cadastrado, você receberá as instruções para redefinir sua senha."
        }
      };
    } catch (error) {
      console.error('Erro ao solicitar reset de senha:', error);
      return {
        status: 500,
        data: { message: "Erro ao processar solicitação" }
      };
    }
  }

  public async resetPassword(
    email: string,
    code: string,
    newPassword: string
  ): Promise<ServiceResponse<Message>> {
    try {
      const user = await this.model.findByEmail(email);

      if (!user) {
        return {
          status: 404,
          data: { message: ERROR_MESSAGES.USER_NOT_FOUND }
        };
      }

      // Verificar se há código de reset
      if (!user.resetPasswordCode || !user.resetPasswordExpires) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.INVALID_RESET_CODE }
        };
      }

      // Verificar se o código está correto
      if (user.resetPasswordCode !== code) {
        // Registrar tentativa falha
        try {
          await this.logService.createLog({
            userId: user.id,
            action: 'PASSWORD_RESET_FAILED',
            entity: 'User',
            entityId: user.id,
            details: `Código de verificação inválido para: ${email}`
          });
        } catch (error) {
          console.error('Erro ao registrar log:', error);
        }

        return {
          status: 400,
          data: { message: ERROR_MESSAGES.INVALID_RESET_CODE }
        };
      }

      // Verificar se o código expirou
      const now = new Date();
      if (now > user.resetPasswordExpires) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.RESET_CODE_EXPIRED }
        };
      }

      // Validar nova senha
      const passwordValidation = validateUser({ ...user, password: newPassword });
      if (passwordValidation) {
        return passwordValidation;
      }

      // Hash da nova senha
      const hashedPassword = this._hashPassword(newPassword);

      // Atualizar senha e limpar código de reset
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetPasswordCode: null,
          resetPasswordExpires: null
        }
      });

      // Enviar email de confirmação
      await EmailService.sendPasswordChangedConfirmation(email, user.name);

      // Registrar log
      try {
        await this.logService.createLog({
          userId: user.id,
          action: 'PASSWORD_RESET_SUCCESS',
          entity: 'User',
          entityId: user.id,
          details: `Senha redefinida com sucesso para: ${email}`
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 200,
        data: { message: "Senha alterada com sucesso! Faça login com sua nova senha." }
      };
    } catch (error) {
      console.error('Erro ao resetar senha:', error);
      return {
        status: 500,
        data: { message: "Erro ao processar solicitação" }
      };
    }
  }

  public async validateResetCode(
    email: string,
    code: string
  ): Promise<ServiceResponse<Message | { valid: boolean }>> {
    try {
      const user = await this.model.findByEmail(email);

      if (!user) {
        return {
          status: 404,
          data: { message: ERROR_MESSAGES.USER_NOT_FOUND }
        };
      }

      if (!user.resetPasswordCode || !user.resetPasswordExpires) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.INVALID_RESET_CODE }
        };
      }

      if (user.resetPasswordCode !== code) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.INVALID_RESET_CODE }
        };
      }

      const now = new Date();
      if (now > user.resetPasswordExpires) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.RESET_CODE_EXPIRED }
        };
      }

      return {
        status: 200,
        data: { valid: true }
      };
    } catch (error) {
      console.error('Erro ao validar código de reset:', error);
      return {
        status: 500,
        data: { message: "Erro ao processar solicitação" }
      };
    }
  }

  public async activateAccount(token: string): Promise<ServiceResponse<Message>> {
    try {
      const user = await prisma.user.findUnique({
        where: { activationToken: token }
      });

      if (!user) {
        return {
          status: 400,
          data: { message: ERROR_MESSAGES.INVALID_ACTIVATION_TOKEN }
        };
      }

      if (user.status === 'ACTIVE') {
        return {
          status: 200,
          data: { message: ERROR_MESSAGES.ACCOUNT_ALREADY_ACTIVE }
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          status: 'ACTIVE',
          activationToken: null
        }
      });

      try {
        await this.logService.createLog({
          userId: user.id,
          action: 'USER_ACCOUNT_ACTIVATED',
          entity: 'User',
          entityId: user.id,
          details: `Conta ativada com sucesso: ${user.email}`
        });
      } catch (error) {
        console.error('Erro ao registrar log:', error);
      }

      return {
        status: 200,
        data: { message: "Conta ativada com sucesso! Agora você pode fazer login." }
      };
    } catch (error) {
      console.error('Erro ao ativar conta:', error);
      return {
        status: 500,
        data: { message: "Erro ao ativar conta" }
      };
    }
  }
}
