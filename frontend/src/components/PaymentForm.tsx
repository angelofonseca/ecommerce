import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

function PaymentForm() {
  const INITIAL_STATE = {
    fullname: "",
    email: "",
    cpf: "",
    phone: "",
    cep: "",
    address: "",
    payment: "",
  };

  const navigate = useNavigate();
  const [isValidForm, setIsValidForm] = useState(true);
  const [form, setForm] = useState(INITIAL_STATE);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.values(form).includes("")) {
      setIsValidForm(false);
      return;
    }
    localStorage.clear();
    navigate("/");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Formulário de Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullname">Nome Completo</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              type="text"
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cep">CEP</Label>
            <Input
              type="text"
              id="cep"
              name="cep"
              value={form.cep}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Método de Pagamento</Label>
            <RadioGroup
              name="payment"
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, payment: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="boleto" id="ticket" />
                <Label htmlFor="ticket">Boleto Bancário</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cartao" id="cartao" />
                <Label htmlFor="cartao">Cartão de Crédito</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pix" id="pix" />
                <Label htmlFor="pix">PIX</Label>
              </div>
            </RadioGroup>
          </div>

          <Button variant="gradient" type="submit" className="w-full">
            Confirmar
          </Button>
        </form>
        {!isValidForm && <p className="text-red-500 mt-2">Campos inválidos</p>}
      </CardContent>
    </Card>
  );
}

export default PaymentForm;
