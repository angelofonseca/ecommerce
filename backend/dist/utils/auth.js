import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const createToken = (payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return token;
};
const verifyToken = (token) => {
    const user = jwt.verify(token, secret);
    return user;
};
export default { createToken, verifyToken };
