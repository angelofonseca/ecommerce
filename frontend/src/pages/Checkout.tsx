import { useState, useEffect } from 'react';
import CartCheckout from '../components/CartCheckout';
import CheckoutForm from '../components/CheckoutForm';
import { useCartContext } from '../context/CartContext';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Loader2 } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Usar a variável de ambiente ou fallback para localhost
const API_BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || 'http://localhost:8080';

export default function Checkout() {
  const { totalPrice, cart } = useCartContext();
  const [shippingAddress, setShippingAddress] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Buscar a chave pública do Stripe
    const fetchStripeKey = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/config`);
        const data = await response.json();
        console.log(data)
        if (data.stripePublishableKey) {
          setStripePromise(loadStripe(data.stripePublishableKey));
        }
      } catch (err) {
        console.error('Erro ao buscar chave do Stripe:', err);
        setError('Erro ao carregar configuração de pagamento');
      }
    };

    fetchStripeKey();
  }, []);

  const createPaymentIntent = async () => {
    setIsLoading(true);
    setError('');

    try {
      const { token } = JSON.parse(localStorage.getItem('login') ?? '{}');
      
      if (!token) {
        throw new Error('Usuário não autenticado');
      }

      // Transformar cart (objeto) em array de items
      const items = Object.values(cart).map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        priceUnit: item.price,
      }));

      const response = await fetch(`${API_BASE_URL}/payment/create-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'brl',
          items,
          shippingAddress: shippingAddress || 'Endereço não informado',
          paymentMethod: 'CREDIT_CARD',
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar Payment Intent');
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao preparar pagamento';
      setError(message);
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Criar Payment Intent quando o componente carregar e o Stripe estiver pronto
    if (totalPrice > 0 && stripePromise) {
      createPaymentIntent();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice, stripePromise]);

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mx-auto p-4 flex items-center justify-center">
      <div className="w-full pt-5 mt-5 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CartCheckout />
          
          <Card>
            <CardHeader>
              <CardTitle>Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Endereço de entrega */}
              <div className="space-y-2">
                <Label htmlFor="shippingAddress">Endereço de Entrega</Label>
                <Input
                  id="shippingAddress"
                  placeholder="Rua, número, bairro, cidade, estado, CEP"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  disabled={isLoading}
                  required
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Formulário de pagamento */}
              {isLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Carregando...</span>
                </div>
              )}

              {clientSecret && stripePromise && !isLoading && (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm 
                    shippingAddress={shippingAddress}
                    onSuccess={() => {
                      console.log('Pagamento realizado com sucesso!');
                    }}
                  />
                </Elements>
              )}

              {!stripePromise && !isLoading && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-600">Carregando sistema de pagamento...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

