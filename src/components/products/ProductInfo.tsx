
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatPrice } from '@/components/products/ProductUtils';

interface ProductInfoProps {
  product: {
    name: string;
    price: number;
    description: string;
    rating: number;
    reviewCount: number;
    sku: string;
    category: string;
    tags: string[];
    features: string[];
  };
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-medium">{product.name}</h1>
        <p className="text-accent text-2xl font-medium mt-2">{formatPrice(product.price)}</p>
        
        <div className="flex items-center mt-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
              />
            ))}
          </div>
          <span className="ml-2 text-foreground/70">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>
      </div>
      
      <div>
        <p className="text-foreground/80">{product.description}</p>
      </div>
      
      {/* Product Details Tabs */}
      <div className="pt-6 mt-6 border-t border-border">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <dl className="space-y-2">
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-foreground/70">SKU</dt>
                <dd>{product.sku}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-foreground/70">Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <dt className="text-foreground/70">Tags</dt>
                <dd>{product.tags.join(', ')}</dd>
              </div>
            </dl>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="shipping" className="pt-4">
            <div className="space-y-4">
              <p>We offer the following shipping options:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Standard Shipping (3-5 business days):</span>
                    <span className="ml-1">₦2,000</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <div>
                    <span className="font-medium">Express Shipping (1-2 business days):</span>
                    <span className="ml-1">₦5,000</span>
                  </div>
                </li>
              </ul>
              <p>Free shipping on orders over ₦50,000.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
