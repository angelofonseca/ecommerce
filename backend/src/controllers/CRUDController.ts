import { Request, Response } from "express";
import CRUDService from "../services/CRUDService";

export default class CRUDController<T> {

  constructor(protected service: CRUDService<T>) {
  }

  async create(req: Request, res: Response) {
    const info = req.body;
    const { data, status } = await this.service.create(info);
    res.status(status).json(data);
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.service.find(id);
    res.status(status).json(data);
  }

  async findAll(req: Request, res: Response) {
    const { data, status } = await this.service.findAll();
    res.status(status).json(data);
  }

  async updateById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const info = req.body;
    const { data, status } = await this.service.updateById(id, info);
    res.status(status).json(data);
  }

  async deleteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.service.deleteById(id);
    res.status(status).json(data);
  }
}
