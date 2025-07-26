
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function EmptyCartMessage() {
  return (
    <div className="text-center py-12">
      <p className="mb-6">Your cart is empty. Please add items to your cart before checking out.</p>
      <Link to="/products">
        <Button>Browse Products</Button>
      </Link>
    </div>
  );
}
