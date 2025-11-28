import { useState } from "react";
import {
  Download,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Database,
} from "lucide-react";
import { createBackup, restoreBackup } from "@/services/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AdminBackup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleCreateBackup = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const loginData = localStorage.getItem("login");
      if (!loginData) {
        setError("Token de autenticação não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const { token } = JSON.parse(loginData);
      if (!token) {
        setError("Token de autenticação não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const backupData = await createBackup(token);

      // Criar arquivo para download
      const blob = new Blob([JSON.stringify(backupData, null, 2)], {
        type: "application/json",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup-${new Date().toISOString().replace(/:/g, "-")}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      setSuccess("Backup criado e baixado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar backup");
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "application/json") {
        setError("Por favor, selecione um arquivo JSON válido");
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
      setSuccess(null);
    }
  };

  const handleRestoreBackup = async () => {
    if (!selectedFile) {
      setError("Por favor, selecione um arquivo de backup");
      return;
    }

    // Confirmar ação
    const confirmed = window.confirm(
      "⚠️ ATENÇÃO: Esta operação irá APAGAR TODOS os dados atuais e substituí-los pelo backup!\n\n" +
        "Tem certeza que deseja continuar?"
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const loginData = localStorage.getItem("login");
      if (!loginData) {
        setError("Token de autenticação não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      const { token } = JSON.parse(loginData);
      if (!token) {
        setError("Token de autenticação não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      // Ler arquivo
      const fileContent = await selectedFile.text();
      const backupData = JSON.parse(fileContent);

      // Validar estrutura básica
      if (!backupData.data || !backupData.timestamp) {
        setError("Arquivo de backup inválido. Estrutura incorreta.");
        return;
      }

      const result = await restoreBackup(token, backupData);
      setSuccess(result.message || "Backup restaurado com sucesso!");
      setSelectedFile(null);

      // Limpar input file
      const fileInput = document.getElementById(
        "file-input"
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao restaurar backup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Database className="h-8 w-8" />
          Backup e Restore
        </h1>
        <p className="text-muted-foreground mt-2">
          Gerencie backups do sistema e restaure dados quando necessário
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-6 border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">Sucesso</AlertTitle>
          <AlertDescription className="text-green-600">
            {success}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Card Criar Backup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Criar Backup
            </CardTitle>
            <CardDescription>
              Exporta todos os dados do sistema em um arquivo JSON
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>O backup incluirá:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Marcas</li>
                  <li>Categorias</li>
                  <li>Produtos e Estoque</li>
                  <li>Usuários (com senhas criptografadas)</li>
                  <li>Vendas e Pedidos</li>
                  <li>Logs do Sistema</li>
                </ul>
              </div>

              <Button
                onClick={handleCreateBackup}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                {loading ? "Criando Backup..." : "Criar e Baixar Backup"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card Restaurar Backup */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <Upload className="h-5 w-5" />
              Restaurar Backup
            </CardTitle>
            <CardDescription>
              Restaura o sistema a partir de um arquivo de backup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>ATENÇÃO</AlertTitle>
                <AlertDescription>
                  Esta operação irá{" "}
                  <strong>APAGAR TODOS os dados atuais</strong> e substituí-los
                  pelos dados do backup. Esta ação não pode ser desfeita!
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label
                  htmlFor="file-input"
                  className="block text-sm font-medium text-gray-700"
                >
                  Selecione o arquivo de backup (JSON)
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileSelect}
                  disabled={loading}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-orange-50 file:text-orange-700
                    hover:file:bg-orange-100
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {selectedFile && (
                  <p className="text-sm text-green-600">
                    ✓ Arquivo selecionado: {selectedFile.name}
                  </p>
                )}
              </div>

              <Button
                onClick={handleRestoreBackup}
                disabled={loading || !selectedFile}
                variant="destructive"
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-4 w-4" />
                {loading ? "Restaurando..." : "Restaurar Backup"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
