import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import { User } from "@prisma/client";
import Login from "../Interfaces/Login";
import CRUDController from "./CRUDController.js";

export default class UserController extends CRUDController<User> {
  constructor(protected service: UserService) {
    super(service);
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.login(req.body as Login);
      res.status(status).json(data);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error during login' });
    }
  }

  async adminLogin(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.adminLogin(req.body as Login);
      res.status(status).json(data);
    } catch (error) {
      console.error('Admin login error:', error);
      res.status(500).json({ message: 'Internal server error during admin login' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.create(req.body as User);
      res.status(status).json(data);
    } catch (error) {
      console.error('User creation error:', error);
      res.status(500).json({ message: 'Internal server error during user creation' });
    }
  }

  static getRole(req: Request, res: Response): void {
    const { role } = res.locals;
    res.status(200).json({ role });
  }
}
