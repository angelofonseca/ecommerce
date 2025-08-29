import jwt from "jsonwebtoken";

const createToken = (payload: any) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '7d'})
  return token
};

const verifyToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET as string)
  return user
};

export default { createToken, verifyToken };