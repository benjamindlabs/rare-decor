
import { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { Product } from '@/types';

interface ProductActionsProps {
  product: Product;
  sizes: string[];
  colors: string[];
}

export function ProductActions({ product, sizes, colors }: ProductActionsProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      return;
    }
    
    // Make sure we're passing a product with images
    const productWithImages = {
      ...product,
      images: product.images || (product.image_url ? [product.image_url] : ['/placeholder.svg'])
    };
    
    addToCart(productWithImages, quantity, selectedSize, selectedColor);
  };
  
  const handleToggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      // Make sure we're passing a product with images
      const productWithImages = {
        ...product,
        images: product.images || (product.image_url ? [product.image_url] : ['/placeholder.svg'])
      };
      
      addToWishlist(productWithImages);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Size</h3>
          <Button variant="link" className="text-xs" onClick={() => window.open('/size-guide', '_blank')}>
            Size Guide
          </Button>
        </div>
        <div className="flex flex-wrap gap-3">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`h-10 min-w-[2.5rem] px-3 flex items-center justify-center border ${
                selectedSize === size 
                  ? 'border-accent bg-accent/10 text-accent' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`h-10 min-w-[4rem] px-3 flex items-center justify-center border ${
                selectedColor === color 
                  ? 'border-accent bg-accent/10 text-accent' 
                  : 'border-border hover:border-accent/50'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quantity */}
      <div>
        <h3 className="text-sm font-medium mb-2">Quantity</h3>
        <div className="flex items-center">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={decrementQuantity}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={incrementQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          className="premium-button flex-1"
          size="lg"
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor}
        >
          <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
        </Button>
        <Button 
          variant={isInWishlist(product.id) ? "default" : "outline"}
          size="lg" 
          className="flex-1"
          onClick={handleToggleWishlist}
        >
          <Heart className={`mr-2 h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} /> 
          {isInWishlist(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
        </Button>
      </div>
    </div>
  );
}
