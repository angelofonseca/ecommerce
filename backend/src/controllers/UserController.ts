import { Request, Response } from "express";
import UserService from "../services/UserService.js";
import { User } from "../generated/prisma/index.js";
import Login from "../Interfaces/Login";

export default class UserController {
  constructor(private service: UserService) {}

  async login(req: Request, res: Response) {
    const { data, status } = await this.service.login(req.body as Login);
    res.status(status).json(data);
  }

  async create(req: Request, res: Response) {
    const { data, status } = await this.service.create(req.body as User);
    res.status(status).json(data);
  }

  static getRole(req: Request, res: Response) {
    const { role } = res.locals;
    res.status(200).json({ role });
  }
}
