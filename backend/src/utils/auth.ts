import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET as string;

const createToken = (payload: { id: number, email: string }) => {
  const token = jwt.sign(payload, secret, { expiresIn: '7d' });
  return token;
};

const verifyToken = (token: string) => {
  const user = jwt.verify(token, secret);
  return user;
};

export default { createToken, verifyToken };