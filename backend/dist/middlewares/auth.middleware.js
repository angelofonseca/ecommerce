import jwt from '../utils/auth.js';
function jwtMiddleware(req, res, next) {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const token = bearerToken.split(' ')[1];
        const decoded = jwt.verifyToken(token);
        if (typeof decoded === 'string')
            throw new Error('token is a string');
        const { role } = decoded;
        res.locals = { role };
    }
    catch (error) {
        return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
}
export default jwtMiddleware;
