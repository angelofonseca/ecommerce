import prisma from "../database/prismaClient.js";
import ServiceResponse from "../Interfaces/ServiceResponse";
import Message from "../Interfaces/Message";

interface BackupData {
    timestamp: string;
    version: string;
    data: {
        brands: any[];
        categories: any[];
        users: any[];
        products: any[];
        stocks: any[];
        sales: any[];
        orders: any[];
        logs: any[];
    };
}

export default class BackupService {
    /**
     * Cria um backup completo de todas as tabelas do sistema
     */
    public async createBackup(): Promise<ServiceResponse<BackupData | Message>> {
        try {
            console.log('Iniciando processo de backup...');

            // Buscar dados de todas as tabelas
            const [brands, categories, users, products, stocks, sales, orders, logs] = await Promise.all([
                prisma.brand.findMany(),
                prisma.category.findMany(),
                prisma.user.findMany(),
                prisma.product.findMany(),
                prisma.stock.findMany(),
                prisma.sale.findMany(),
                prisma.order.findMany(),
                prisma.log.findMany(),
            ]);

            const backupData: BackupData = {
                timestamp: new Date().toISOString(),
                version: "1.0",
                data: {
                    brands,
                    categories,
                    users,
                    products,
                    stocks,
                    sales,
                    orders,
                    logs,
                },
            };

            console.log('Backup criado com sucesso:', {
                brands: brands.length,
                categories: categories.length,
                users: users.length,
                products: products.length,
                stocks: stocks.length,
                sales: sales.length,
                orders: orders.length,
                logs: logs.length,
            });

            return {
                status: 200,
                data: backupData,
            };
        } catch (error) {
            console.error('Erro ao criar backup:', error);
            return {
                status: 500,
                data: { message: "Erro ao criar backup do sistema" },
            };
        }
    }

    /**
     * Restaura o sistema a partir de um backup
     * ATENÇÃO: Esta operação apaga todos os dados atuais e os substitui pelo backup
     */
    public async restoreBackup(backupData: BackupData): Promise<ServiceResponse<Message>> {
        try {
            console.log('Iniciando processo de restore...');
            console.log('Backup timestamp:', backupData.timestamp);

            // Validar estrutura do backup
            if (!backupData.data || !backupData.timestamp) {
                return {
                    status: 400,
                    data: { message: "Estrutura de backup inválida" },
                };
            }

            // Usar uma transação para garantir atomicidade
            await prisma.$transaction(async (tx) => {
                // 1. Deletar dados na ordem correta (respeitar relações)
                console.log('Limpando dados existentes...');
                await tx.log.deleteMany({});
                await tx.order.deleteMany({});
                await tx.sale.deleteMany({});
                await tx.stock.deleteMany({});
                await tx.product.deleteMany({});
                await tx.user.deleteMany({});
                await tx.category.deleteMany({});
                await tx.brand.deleteMany({});

                // 2. Restaurar dados na ordem correta (dependências primeiro)
                console.log('Restaurando brands...');
                if (backupData.data.brands && backupData.data.brands.length > 0) {
                    await tx.brand.createMany({
                        data: backupData.data.brands,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando categories...');
                if (backupData.data.categories && backupData.data.categories.length > 0) {
                    await tx.category.createMany({
                        data: backupData.data.categories,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando users...');
                if (backupData.data.users && backupData.data.users.length > 0) {
                    await tx.user.createMany({
                        data: backupData.data.users,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando products...');
                if (backupData.data.products && backupData.data.products.length > 0) {
                    await tx.product.createMany({
                        data: backupData.data.products,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando stocks...');
                if (backupData.data.stocks && backupData.data.stocks.length > 0) {
                    await tx.stock.createMany({
                        data: backupData.data.stocks,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando sales...');
                if (backupData.data.sales && backupData.data.sales.length > 0) {
                    await tx.sale.createMany({
                        data: backupData.data.sales,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando orders...');
                if (backupData.data.orders && backupData.data.orders.length > 0) {
                    await tx.order.createMany({
                        data: backupData.data.orders,
                        skipDuplicates: true,
                    });
                }

                console.log('Restaurando logs...');
                if (backupData.data.logs && backupData.data.logs.length > 0) {
                    await tx.log.createMany({
                        data: backupData.data.logs,
                        skipDuplicates: true,
                    });
                }

                // 3. Resetar sequences (auto-increment) para evitar conflitos futuros
                // Isso é importante para PostgreSQL
                console.log('Atualizando sequences...');

                // Brand
                if (backupData.data.brands && backupData.data.brands.length > 0) {
                    const maxBrandId = Math.max(...backupData.data.brands.map((b: any) => b.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('brand', 'id'), ${maxBrandId}, true);`
                    );
                }

                // Category
                if (backupData.data.categories && backupData.data.categories.length > 0) {
                    const maxCategoryId = Math.max(...backupData.data.categories.map((c: any) => c.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('category', 'id'), ${maxCategoryId}, true);`
                    );
                }

                // User
                if (backupData.data.users && backupData.data.users.length > 0) {
                    const maxUserId = Math.max(...backupData.data.users.map((u: any) => u.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('user', 'id'), ${maxUserId}, true);`
                    );
                }

                // Product
                if (backupData.data.products && backupData.data.products.length > 0) {
                    const maxProductId = Math.max(...backupData.data.products.map((p: any) => p.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('product', 'id'), ${maxProductId}, true);`
                    );
                }

                // Sale
                if (backupData.data.sales && backupData.data.sales.length > 0) {
                    const maxSaleId = Math.max(...backupData.data.sales.map((s: any) => s.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('sale', 'id'), ${maxSaleId}, true);`
                    );
                }

                // Order
                if (backupData.data.orders && backupData.data.orders.length > 0) {
                    const maxOrderId = Math.max(...backupData.data.orders.map((o: any) => o.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('order', 'id'), ${maxOrderId}, true);`
                    );
                }

                // Log
                if (backupData.data.logs && backupData.data.logs.length > 0) {
                    const maxLogId = Math.max(...backupData.data.logs.map((l: any) => l.id));
                    await tx.$executeRawUnsafe(
                        `SELECT setval(pg_get_serial_sequence('log', 'id'), ${maxLogId}, true);`
                    );
                }
            });

            console.log('Restore concluído com sucesso!');

            return {
                status: 200,
                data: {
                    message: `Backup restaurado com sucesso! Data do backup: ${backupData.timestamp}`,
                },
            };
        } catch (error) {
            console.error('Erro ao restaurar backup:', error);
            return {
                status: 500,
                data: { message: "Erro ao restaurar backup do sistema" },
            };
        }
    }
}
