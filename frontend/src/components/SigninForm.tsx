import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { registerUser } from "@/services/api";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setForm((prevForm) => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== form.password) {
      alert("Senhas não coincidem");
      return;
    }

    try {
      await registerUser(rest);
      alert("Usuário cadastrado com sucesso!");
      setError(null);
      setForm({
        name: "",
        cpf: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erro ao cadastrar usuário. CPF ou email já cadastrado.";
      setError(errorMessage);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Faça seu Cadastro</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  name="name"
                  required
                  onChange={handleChange}
                  value={form.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  type="text"
                  placeholder="Seu CPF"
                  name="cpf"
                  required
                  onChange={handleChange}
                  value={form.cpf}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="text"
                  placeholder="Seu telefone"
                  name="phone"
                  required
                  onChange={handleChange}
                  value={form.phone}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Seu endereço"
                  name="address"
                  required
                  onChange={handleChange}
                  value={form.address}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                  onChange={handleChange}
                  value={form.email}
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
                  required
                  onChange={handleChange}
                  value={form.password}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirmar Senha</Label>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  name="confirmPassword"
                  required
                  onChange={handleChange}
                  value={form.confirmPassword}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Criar Conta
                </Button>
                {error && <div style={{ color: "red" }}>{error}</div>}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
