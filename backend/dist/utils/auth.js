import jwt from "jsonwebtoken";
// const secret = process.env.JWT_SECRET as string;
const createToken = (payload) => {
    // const token = jwt.sign(payload, 'secret', {expiresIn: '7d'});
    return 'test';
};
const verifyToken = (token) => {
    const user = jwt.verify(token, 'secret');
    return user;
};
export default { createToken, verifyToken };
