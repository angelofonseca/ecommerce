import jwt from "jsonwebtoken";
import Login from "../Interfaces/Login.js";

const secret = process.env.JWT_SECRET as string;
console.log(typeof jwt.sign);
// const createToken = (payload: Login) => {
//   const token = jwt.sign(payload, secret, {expiresIn: '7d'});
//   return token;
// };

const verifyToken = (token: string) => {
  const user = jwt.verify(token, secret);
  return user;
};

export default { verifyToken };