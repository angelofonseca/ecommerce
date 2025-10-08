import { Request, Response } from "express";
import CRUDService from "../services/CRUDService";

export default class CRUDController<T> {

  constructor(protected service: CRUDService<T>) {
  }

  // PUBLIC - Routes endpoints que serão chamados pelo Express
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const info = req.body;
      const { data, status } = await this.service.create(info);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Error creating resource');
    }
  }

  public async find(req: Request, res: Response): Promise<void> {
    try {
      const id = this.extractIdFromParams(req);
      const { data, status } = await this.service.find(id);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Error finding resource');
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { data, status } = await this.service.findAll();
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Error finding resources');
    }
  }

  public async updateById(req: Request, res: Response): Promise<void> {
    try {
      const id = this.extractIdFromParams(req);
      const info = req.body;
      const { data, status } = await this.service.updateById(id, info);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Error updating resource');
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    try {
      const id = this.extractIdFromParams(req);
      const { data, status } = await this.service.deleteById(id);
      res.status(status).json(data);
    } catch (error) {
      this.handleError(res, error, 'Error deleting resource');
    }
  }

  protected extractIdFromParams(req: Request): number {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new Error('Invalid ID parameter');
    }
    return id;
  }

  protected handleError(res: Response, error: any, message: string): void {
    console.error(`${message}:`, error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }

  protected validateRequestBody(body: any): void {
    if (!body || Object.keys(body).length === 0) {
      throw new Error('Request body cannot be empty');
    }
  }
}
