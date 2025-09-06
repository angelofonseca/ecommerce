import { Request, Response } from "express";

export default class CRUDController<T> {
  protected controller: any;

  constructor(controller: any) {
    this.controller = controller;
  }

  async create(req: Request, res: Response) {
    const info = req.body;
    const { data, status } = await this.controller.create(info);
    res.status(status).json(data);
  }

  async find(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.controller.find(id);
    res.status(status).json(data);
  }

  async findAll(req: Request, res: Response) {
    const { data, status } = await this.controller.findAll();
    res.status(status).json(data);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const info = req.body;
    const { data, status } = await this.controller.update(id, info);
    res.status(status).json(data);
  }

  async deleteById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { data, status } = await this.controller.deleteById(id);
    res.status(status).json(data);
  }
}
