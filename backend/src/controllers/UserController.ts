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
      this.validateUserCreation(req.body);
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

  private validateUserCreation(userData: any): void {
    this.validateRequestBody(userData);

    if (!userData.email || !userData.password) {
      throw new Error('Email and password are required');
    }

    if (!userData.cpf) {
      throw new Error('CPF is required');
    }
  }
}
