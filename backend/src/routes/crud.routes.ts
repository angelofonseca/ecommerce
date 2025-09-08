import { Router, Request, Response } from "express";

export default class CRUDRoutes<T> {
  protected router: Router;
  constructor(
    protected model: any,
    protected service: any,
    protected controller: any,
  ) {
    this.router = Router();
  }
  getRoutes() {
    this.router.post("/", (req: Request, res: Response) => this.controller.create(req, res));
    this.router.get("/:id", (req: Request, res: Response) => this.controller.find(req, res));
    this.router.get("/", (req: Request, res: Response) => this.controller.findAll(req, res));
    this.router.patch("/:id", (req: Request, res: Response) => this.controller.updateById(req, res));
    this.router.delete("/:id", (req: Request, res: Response) => this.controller.deleteById(req, res));

    return this.router;
  }
}
