import { Router } from "express";
import BackupController from "../controllers/BackupController.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import isAdminMiddleware from "../middlewares/isAdmin.middleware.js";

export default class BackupRoutes {
    public router: Router;
    private controller: BackupController;

    constructor() {
        this.router = Router();
        this.controller = new BackupController();
    }

    public getRoutes(): Router {
        /**
         * GET /backup
         * Cria e retorna um backup completo do sistema
         * Requer autenticação de ADMIN
         */
        this.router.get(
            "/",
            authMiddleware,
            isAdminMiddleware,
            (req, res) => this.controller.createBackup(req, res)
        );

        /**
         * POST /restore
         * Restaura o sistema a partir de um backup
         * Requer autenticação de ADMIN
         * ATENÇÃO: Esta operação apaga todos os dados atuais
         */
        this.router.post(
            "/restore",
            authMiddleware,
            isAdminMiddleware,
            (req, res) => this.controller.restoreBackup(req, res)
        );

        return this.router;
    }
}
