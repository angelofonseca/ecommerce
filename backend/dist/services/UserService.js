import bcrypt from 'bcryptjs';
import auth from '../utils/auth.js';
import utils from '../utils/utils.js';
const emptyFieldsMessage = { message: 'All fields must be filled' };
const invalidMessage = { message: 'Invalid email or password' };
export default class UserService {
    constructor(model) {
        this.model = model;
    }
    async login(user) {
        if (!user.email || !user.password) {
            return { status: 400, data: emptyFieldsMessage };
        }
        const { email, password } = user;
        if (!utils.isValidEmail(email) || password.length < 6) {
            return { status: 401, data: invalidMessage };
        }
        const foundUser = await this.model.find(email);
        if (!foundUser) {
            return { status: 401, data: invalidMessage };
        }
        const { id, password: hash, role } = foundUser;
        const userPassword = bcrypt.compareSync(password, hash);
        if (!userPassword) {
            return { status: 401, data: invalidMessage };
        }
        const token = auth.createToken({ email, id, role });
        return { status: 200, data: { token } };
    }
}
