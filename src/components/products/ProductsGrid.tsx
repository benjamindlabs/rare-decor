
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

interface ProductsGridProps {
  products: Product[];
}

export function ProductsGrid({ products }: ProductsGridProps) {
  // Add safety check to prevent the runtime error
  if (!products || !Array.isArray(products)) {
    console.log('ProductsGrid: products is undefined or not an array:', products);
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-medium mb-4">Loading Products...</h2>
        <p className="text-foreground/70 mb-6">Please wait while we fetch the products.</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-serif font-medium mb-4">No Products Found</h2>
        <p className="text-foreground/70 mb-6">Try adjusting your filters to find what you're looking for.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductsGrid;
