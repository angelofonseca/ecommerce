import { NextFunction, Request, Response } from "express";

function isAdminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (res.locals.role !== "ADMIN") {
    return res.status(403).json({ message: "ACCESS DENIED" });
  }
  next();
}
export default isAdminMiddleware;
