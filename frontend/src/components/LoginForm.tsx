import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { adminLogin, login } from "@/services/api";
import { useAuthContext } from "@/context/AuthContext";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { setLocalLogin } = useAuthContext();
  const location = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data =
      location.pathname === "/login"
        ? await login(form)
        : await adminLogin(form);
    if (!data.token) {
      setError("E-mail e/ou senha inválido(s).");
      return;
    }
    setLocalLogin(data);
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Esqueci minha senha
                </a>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a
                href="#"
                className="underline underline-offset-4"
                onClick={() => navigate("/signin")}
              >
                Criar conta
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
