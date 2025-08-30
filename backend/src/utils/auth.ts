import jwt from "jsonwebtoken";
import AuthPayload from "../Interfaces/AuthPayload";

const secret = process.env.JWT_SECRET as string;

const createToken = (payload: AuthPayload) => {
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
};

const verifyToken = (token: string) => {
  const user = jwt.verify(token, secret);
  return user;
};

export default { createToken, verifyToken };