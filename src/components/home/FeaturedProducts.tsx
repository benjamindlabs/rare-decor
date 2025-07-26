
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../products/ProductCard';
import { Product } from '@/types';
import { productService } from '@/services/productService';

const categories = ["All", "Furniture", "Lighting", "Rugs & Textiles", "Home Accessories", "Art & Decor"];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const filters = { inStock: true };
        const result = await productService.getProducts(filters, 1, 8, 'name', 'asc');
        setFeaturedProducts(result.data);
      } catch (error) {
        console.error('Error loading featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);
  
  const filteredProducts = activeCategory === "All" 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === activeCategory);
  
  return (
    <section className="py-20 px-4 md:px-6 bg-secondary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium">Featured Collection</h2>
            <p className="text-foreground/70 mt-2">Discover our handpicked selection of premium decor</p>
          </div>
          <Link to="/products">
            <Button variant="link" className="premium-link mt-4 md:mt-0">
              View All Products <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <div className="flex space-x-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 whitespace-nowrap transition-all ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary/50 text-foreground hover:bg-secondary'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products Grid - Updated for better mobile display */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {loading ? (
            // Show skeleton loading
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-secondary/50 aspect-square w-full mb-3"></div>
                <div className="bg-secondary/50 h-4 w-3/4 mb-2"></div>
                <div className="bg-secondary/50 h-4 w-1/2"></div>
              </div>
            ))
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-foreground/70">No featured products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
