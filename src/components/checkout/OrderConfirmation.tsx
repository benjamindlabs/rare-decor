
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function OrderConfirmation() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="text-3xl font-serif font-medium mb-4">Order Confirmed!</h1>
      <p className="text-foreground/70 mb-8">
        Thank you for your purchase. Your order has been placed and will be processed shortly.
        You will receive a confirmation email with your order details.
      </p>
      <Link to="/">
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
