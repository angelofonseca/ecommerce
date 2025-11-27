import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import { User } from "@prisma/client";
import Login from "../Interfaces/Login";
import CRUDController from "./CRUDController.js";

export default class UserController extends CRUDController<User> {
  constructor(protected service: UserService) {
    super(service);
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.login(req.body as Login);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Login error');
    }
  }

  public async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.adminLogin(req.body as Login);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Admin login error');
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      this._validateUserCreation(req.body);
      const { data, status } = await this.service.create(req.body as User);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'User creation error');
    }
  }

  public static getRole(req: Request, res: Response): void {
    const { role } = res.locals;
    res.status(200).json({ role });
  }

  public async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ message: 'Email é obrigatório' });
        return;
      }

      const { data, status } = await this.service.requestPasswordReset(email);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Password reset request error');
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email, code, newPassword } = req.body;

      if (!email || !code || !newPassword) {
        res.status(400).json({
          message: 'Email, código e nova senha são obrigatórios'
        });
        return;
      }

      const { data, status } = await this.service.resetPassword(
        email,
        code,
        newPassword
      );
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Password reset error');
    }
  }

  private _validateUserCreation(userData: any): void {
    this.validateRequestBody(userData);

    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    if (!userData.cpf) {
      throw new Error('CPF is required');
    }
  }
}
