import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BACKEND_BASEURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

export default function ActivateAccount() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token de ativação não encontrado");
        return;
      }

      try {
        const response = await fetch(
          `${BACKEND_BASEURL}/user/activate/${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage(data.message || "Conta ativada com sucesso!");
        } else {
          setStatus("error");
          setMessage(
            data.message || "Erro ao ativar conta. Token inválido ou expirado."
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage("Erro ao ativar conta. Tente novamente mais tarde.");
      }
    };

    activateAccount();
  }, [token]);

  const handleGoToLogin = () => {
    navigate("/login");
  };

  const handleGoToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {status === "loading" && (
              <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />
            )}
            {status === "success" && (
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            )}
            {status === "error" && (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Ativando sua conta..."}
            {status === "success" && "Conta Ativada!"}
            {status === "error" && "Erro na Ativação"}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {status === "success" && (
              <>
                <Button onClick={handleGoToLogin} className="w-full" size="lg">
                  Fazer Login
                </Button>
                <Button
                  onClick={handleGoToHome}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Voltar para Home
                </Button>
              </>
            )}
            {status === "error" && (
              <Button
                onClick={handleGoToHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Voltar para Home
              </Button>
            )}
            {status === "loading" && (
              <div className="text-center text-sm text-muted-foreground">
                Por favor, aguarde...
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
