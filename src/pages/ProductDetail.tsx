import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductInfo } from '@/components/products/ProductInfo';
import { ProductActions } from '@/components/products/ProductActions';
import ProductReviews from '@/components/products/ProductReviews';
import { Skeleton } from '@/components/ui/skeleton';
import { productService } from '@/services/productService';
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import { Product } from '@/types';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const productData = await productService.getProductById(id);
        if (productData) {
          setProduct(productData);
          // Add to recently viewed when product loads successfully
          addToRecentlyViewed(productData);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, addToRecentlyViewed]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">
              {error || 'Product not found'}
            </h2>
            <p className="text-foreground/70 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <button 
              onClick={() => window.history.back()} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ProductGallery images={product.images} name={product.name} />
          
          <div className="space-y-6">
            <ProductInfo product={product} />
            <ProductActions product={product} sizes={product.sizes} colors={product.colors} />
          </div>
        </div>
        
        <ProductReviews product={product} />
      </div>
    </Layout>
  );
}
