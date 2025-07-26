
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';

const sampleItems: Product[] = [
  {
    id: "1",
    name: "Luxury Curved Sofa - Beige",
    price: 515000,
    description: "Elegant curved sofa with premium upholstery",
    images: ["/lovable-uploads/072c43ba-3554-4e9c-af4d-45ceaf191e70.png"],
    category: "Furniture",
    tags: ["seating", "premium"],
    features: ["Premium fabric", "Ergonomic design", "Stain-resistant"],
    sizes: ["Standard", "Large"],
    colors: ["Beige", "Gray"],
    rating: 4.9,
    reviewCount: 120,
    sku: "SOFA-CURVE-001",
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stock: 10,
    created_at: "2023-01-01",
    updated_at: "2023-01-01"
  },
  {
    id: "2",
    name: "Circular Storage Coffee Table",
    price: 245000,
    description: "Circular coffee table with hidden storage compartment",
    images: ["/lovable-uploads/1530f3e8-1b60-4022-9438-0f345444179b.png"],
    category: "Furniture",
    tags: ["table", "storage", "premium"],
    features: ["Hidden storage", "Durable materials", "Modern design"],
    sizes: ["Standard"],
    colors: ["Walnut", "Oak"],
    rating: 4.8,
    reviewCount: 62,
    sku: "TABLE-COFF-003",
    isBestSeller: true,
    isNew: false,
    inStock: true,
    stock: 8,
    created_at: "2023-01-01",
    updated_at: "2023-01-01"
  }
];

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const displayItems = items.length > 0 ? items : sampleItems;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const handleAddToCart = (productId: string) => {
    const product = displayItems.find(item => item.id === productId);
    if (product) {
      addToCart(product);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-3xl font-serif font-medium mb-8">Your Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="py-12 text-center">
            <div className="bg-secondary/50 p-8 rounded-lg max-w-md mx-auto">
              <Heart className="h-12 w-12 mx-auto text-foreground/50" />
              <h2 className="text-xl font-medium mt-4 mb-2">Your wishlist is empty</h2>
              <p className="text-foreground/70 mb-6">Save items you love for inspiration or later purchase.</p>
              <Link to="/products">
                <Button>Explore Products</Button>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <Button variant="outline" size="sm" onClick={clearWishlist}>
                Clear Wishlist
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayItems.map((item) => (
                <div key={item.id} className="premium-card overflow-hidden group">
                  <div className="relative">
                    <Link to={`/products/${item.id}`}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      </div>
                      
                      {/* Product Tags */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {item.isNew && (
                          <span className="bg-accent text-accent-foreground px-3 py-1 text-xs font-medium">
                            New
                          </span>
                        )}
                        {item.isBestSeller && (
                          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                            Best Seller
                          </span>
                        )}
                      </div>
                    </Link>
                    
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <Link to={`/products/${item.id}`}>
                      <h3 className="font-serif text-lg font-medium group-hover:text-accent transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-foreground/80 text-sm mt-1">{item.category}</p>
                    <p className="font-medium mt-2">{formatPrice(item.price)}</p>
                    
                    <Button 
                      className="w-full mt-4"
                      onClick={() => handleAddToCart(item.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
