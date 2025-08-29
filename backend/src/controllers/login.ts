import jwt from "jsonwebtoken"


const secret = process.env.JWT_SECRET || "secret123"

const createToken = (payload: any) => {
  const token = jwt.sign(payload, secret, {expiresIn: '7d'})
  return token
}

const verifyToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET as string)

  return user
}

export default {
  createToken,
  verifyToken
}