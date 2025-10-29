import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface StripePaymentWrapperProps {
  userId: number;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    priceUnit: number;
  }>;
  shippingAddress: string;
}

export default function StripePaymentWrapper({
  userId,
  items,
  shippingAddress
}: StripePaymentWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Criar a sessão de checkout no backend
    const createCheckoutSession = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:3000/checkout/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId,
            items,
            shippingAddress,
            paymentMethod: 'CREDIT_CARD'
          })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao criar sessão de checkout');
        }

        // Redirecionar para o Stripe Checkout URL
        if (data.data.checkoutUrl) {
          window.location.href = data.data.checkoutUrl;
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erro ao criar checkout';
        setError(message);
        console.error('Erro ao criar checkout:', err);
      } finally {
        setLoading(false);
      }
    };

    createCheckoutSession();
  }, [userId, items, shippingAddress]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Preparando pagamento...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-red-800 font-semibold mb-2">Erro ao criar checkout</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // Se chegou aqui sem redirecionar, mostrar mensagem
  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
      <p className="text-blue-800">Redirecionando para pagamento...</p>
    </div>
  );
}
