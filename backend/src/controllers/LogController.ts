import { Request, Response } from "express";
import LogService from "../services/LogService.js";

export default class LogController {
    constructor(private logService: LogService) { }

    public async getAllLogs(req: Request, res: Response): Promise<void> {
        try {
            const logs = await this.logService.getAllLogs();
            res.status(200).json(logs);
        } catch (error) {
            console.error('Error fetching logs:', error);
            res.status(500).json({ message: 'Error fetching logs' });
        }
    }

    public async getLogsByUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            if (isNaN(userId)) {
                res.status(400).json({ message: 'Invalid user ID' });
                return;
            }

            const logs = await this.logService.getLogsByUser(userId);
            res.status(200).json(logs);
        } catch (error) {
            console.error('Error fetching user logs:', error);
            res.status(500).json({ message: 'Error fetching user logs' });
        }
    }

    public async getLogsByAction(req: Request, res: Response): Promise<void> {
        try {
            const action = req.params.action;
            if (!action) {
                res.status(400).json({ message: 'Action is required' });
                return;
            }

            const logs = await this.logService.getLogsByAction(action);
            res.status(200).json(logs);
        } catch (error) {
            console.error('Error fetching action logs:', error);
            res.status(500).json({ message: 'Error fetching action logs' });
        }
    }
}
