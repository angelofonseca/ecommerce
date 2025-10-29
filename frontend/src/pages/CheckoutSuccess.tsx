import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

export default function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  
  const paymentIntentId = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');

  if (redirectStatus !== 'succeeded') {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <XCircle className="h-6 w-6" />
              Erro no Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Houve um problema ao processar seu pagamento. Por favor, tente novamente.
            </p>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/checkout">Tentar Novamente</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">Voltar à Loja</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Pagamento Efetuado com Sucesso!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">✅ Pedido Confirmado!</h2>
            <p className="text-gray-600 mb-2">
              Seu pagamento foi processado com sucesso.
            </p>
            {paymentIntentId && (
              <p className="text-sm text-gray-500 mt-2">
                ID do Pagamento: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{paymentIntentId}</code>
              </p>
            )}
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>📧 Você receberá um email de confirmação em breve</p>
            <p>📦 Acompanhe o status do seu pedido na seção "Meus Pedidos"</p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button asChild variant="outline" className="flex-1">
              <Link to="/">Continuar Comprando</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/orders">Meus Pedidos</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
