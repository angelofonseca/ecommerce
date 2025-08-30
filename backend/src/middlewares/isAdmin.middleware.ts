import { NextFunction, Request, Response } from "express";

function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (res.locals.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acesso negado: apenas admins' });
  }
  next();
}
export default isAdmin;