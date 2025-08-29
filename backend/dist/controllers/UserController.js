export default class UserController {
    constructor(service) {
        this.service = service;
    }
    async login(req, res) {
        const { data, status } = await this.service.login(req.body);
        res.status(status).json(data);
    }
    static getRole(req, res) {
        const { role } = res.locals;
        res.status(200).json({ role });
    }
}
