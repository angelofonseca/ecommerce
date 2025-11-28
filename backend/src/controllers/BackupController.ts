import { Request, Response } from "express";
import BackupService from "../services/BackupService.js";

export default class BackupController {
    private service: BackupService;

    constructor() {
        this.service = new BackupService();
    }

    /**
     * GET /backup
     * Cria um backup completo do sistema e retorna os dados em JSON
     */
    public async createBackup(req: Request, res: Response): Promise<void> {
        try {
            console.log('Solicitação de backup recebida');
            const { data, status } = await this.service.createBackup();

            if (status === 200) {
                // Configurar headers para download de arquivo
                res.setHeader('Content-Type', 'application/json');
                res.setHeader(
                    'Content-Disposition',
                    `attachment; filename=backup-${new Date().toISOString().replace(/:/g, '-')}.json`
                );
            }

            res.status(status).json(data);
        } catch (error) {
            console.error('Erro no controller de backup:', error);
            res.status(500).json({
                message: "Erro ao processar backup",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }

    /**
     * POST /restore
     * Restaura o sistema a partir de um backup fornecido
     * Body esperado: JSON completo do backup
     */
    public async restoreBackup(req: Request, res: Response): Promise<void> {
        try {
            console.log('Solicitação de restore recebida');

            const backupData = req.body;

            // Validação básica
            if (!backupData || !backupData.data || !backupData.timestamp) {
                res.status(400).json({
                    message: "Dados de backup inválidos. Certifique-se de enviar um arquivo de backup válido."
                });
                return;
            }

            const { data, status } = await this.service.restoreBackup(backupData);
            res.status(status).json(data);
        } catch (error) {
            console.error('Erro no controller de restore:', error);
            res.status(500).json({
                message: "Erro ao processar restore",
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            });
        }
    }
}
