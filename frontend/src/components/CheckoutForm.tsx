import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface CheckoutFormProps {
  onSuccess?: () => void;
  shippingAddress: string;
}

export default function CheckoutForm({ onSuccess, shippingAddress }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage("");

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: {
              address: {
                line1: shippingAddress,
              },
            },
          },
        },
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "Erro no cartão");
        } else {
          setMessage("Ocorreu um erro inesperado.");
        }
      } else {
        onSuccess?.();
      }
    } catch (err) {
      setMessage("Ocorreu um erro inesperado.");
      console.error("Erro no pagamento:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement id="payment-element" />
      
      {message && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{message}</p>
        </div>
      )}

      <Button 
        type="submit"
        disabled={isProcessing || !stripe || !elements} 
        className="w-full"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processando...
          </>
        ) : (
          "Pagar Agora"
        )}
      </Button>
    </form>
  );
}
