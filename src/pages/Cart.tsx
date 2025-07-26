
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + shipping;
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-3xl font-serif font-medium mb-8">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="py-12 text-center">
            <div className="bg-secondary/50 p-8 rounded-lg max-w-md mx-auto">
              <ShoppingCart className="h-12 w-12 mx-auto text-foreground/50" />
              <h2 className="text-xl font-medium mt-4 mb-2">Your cart is empty</h2>
              <p className="text-foreground/70 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link to="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="col-span-2 space-y-6">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-border">
                  <div className="w-full sm:w-24 h-24 aspect-square premium-card overflow-hidden">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link to={`/products/${item.id}`} className="font-medium hover:text-accent transition-colors">
                        {item.name}
                      </Link>
                      <span className="font-medium">{formatPrice(item.price)}</span>
                    </div>
                    
                    <div className="mt-1 text-sm text-foreground/70">
                      {item.selectedColor && <span className="mr-2">Color: {item.selectedColor}</span>}
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                    </div>
                    
                    <div className="flex justify-between mt-4 items-center">
                      <div className="flex items-center border border-border">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Link to="/products">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 p-6 premium-card">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
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
                  
                  <p className="text-xs text-foreground/70 italic">
                    Taxes calculated at checkout
                  </p>
                </div>
                
                <Link to="/checkout">
                  <Button className="w-full mt-6 premium-button">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
