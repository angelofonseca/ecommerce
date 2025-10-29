import { useState, FormEvent } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

interface StripeCheckoutFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function StripeCheckoutForm({ onSuccess, onError }: StripeCheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) {
        // Erro na confirmação do pagamento
        const message = error.message || 'Ocorreu um erro ao processar o pagamento';
        setErrorMessage(message);
        onError?.(message);
      } else {
        // Pagamento confirmado
        onSuccess?.();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro inesperado';
      setErrorMessage(message);
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Informações de Pagamento</h2>
        
        {/* Stripe Payment Element */}
        <PaymentElement 
          id="payment-element"
          options={{
            layout: 'tabs',
          }}
        />

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errorMessage}</p>
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando pagamento...
          </>
        ) : (
          'Finalizar Compra'
        )}
      </Button>

      {!stripe && (
        <p className="text-sm text-gray-500 text-center">
          Carregando informações de pagamento...
        </p>
      )}
    </form>
  );
}
