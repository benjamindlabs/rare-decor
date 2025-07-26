
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const isMobile = useIsMobile();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };
  
  // Get product images or fallback to image_url or placeholder
  const productImages = product.images || (product.image_url ? [product.image_url] : ['/placeholder.svg']);
  const productCategory = product.category || 'Uncategorized';
  
  return (
    <div 
      className="group premium-card overflow-hidden animate-fade-in" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={productImages[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          
          {(isHovered || isMobile) && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex space-x-2 md:space-x-3">
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className={`rounded-full w-8 h-8 md:w-10 md:h-10 ${isInWishlist(product.id) ? 'bg-accent text-accent-foreground' : ''}`}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full w-8 h-8 md:w-10 md:h-10"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="secondary" 
                  className="rounded-full w-8 h-8 md:w-10 md:h-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = `/products/${product.id}`;
                  }}
                >
                  <Eye className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Product Tags */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1 md:gap-2">
            {product.isNew && (
              <span className="bg-accent text-accent-foreground px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium">
                New
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-primary text-primary-foreground px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium">
                Best Seller
              </span>
            )}
          </div>
        </div>
        
        <div className="p-2 md:p-4">
          <h3 className="font-serif text-sm md:text-lg font-medium mt-1 md:mt-2 group-hover:text-accent transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-foreground/80 text-xs md:text-sm mt-0.5 md:mt-1">{productCategory}</p>
          <p className="font-medium mt-1 md:mt-2 text-sm md:text-base">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </div>
  );
}
