
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/contexts/CartContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  formatPrice: (price: number) => string;
}

export default function OrderSummary({ 
  items, 
  subtotal, 
  shipping, 
  total,
  formatPrice 
}: OrderSummaryProps) {
  return (
    <div className="bg-secondary/30 p-6 premium-card sticky top-32">
      <h2 className="text-xl font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
            <div className="w-16 h-16 premium-card overflow-hidden flex-shrink-0">
              <img 
                src={item.images[0]} 
                alt={item.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
              <p className="text-xs text-foreground/70">
                {item.selectedColor}, {item.selectedSize} × {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-foreground/70">
        <p>By placing your order, you agree to our <Link to="/terms-of-service" className="underline">Terms of Service</Link> and <Link to="/privacy-policy" className="underline">Privacy Policy</Link>.</p>
      </div>
    </div>
  );
}
