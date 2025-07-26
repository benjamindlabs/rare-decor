import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ProductsGrid } from '@/components/products/ProductsGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductSorter } from '@/components/products/ProductSorter';
import { Skeleton } from '@/components/ui/skeleton';
import { productService, ProductFilters as ProductFiltersType } from '@/services/productService';
import { Product } from '@/types';

const ITEMS_PER_PAGE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  
  // Get current filters from URL
  const currentPage = parseInt(searchParams.get('page') || '1');
  const currentCategory = searchParams.get('category') || '';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'created_at';
  const currentOrder = (searchParams.get('order') || 'desc') as 'asc' | 'desc';
  const minPrice = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    
    loadCategories();
  }, []);

  // Load products when filters change
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const filters: ProductFiltersType = {
          category: currentCategory || undefined,
          search: currentSearch || undefined,
          minPrice,
          maxPrice,
          inStock: true
        };

        const result = await productService.getProducts(
          filters,
          currentPage,
          ITEMS_PER_PAGE,
          currentSort,
          currentOrder
        );

        setProducts(result.data);
        setTotalCount(result.count);
      } catch (error) {
        console.error('Error loading products:', error);
        setError('Failed to load products. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [currentPage, currentCategory, currentSearch, currentSort, currentOrder, minPrice, maxPrice]);

  const handleFilterChange = (filters: any) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Reset to page 1 when filters change
    newParams.set('page', '1');
    
    if (filters.category) {
      newParams.set('category', filters.category);
    } else {
      newParams.delete('category');
    }
    
    if (filters.search) {
      newParams.set('search', filters.search);
    } else {
      newParams.delete('search');
    }
    
    if (filters.minPrice) {
      newParams.set('minPrice', filters.minPrice.toString());
    } else {
      newParams.delete('minPrice');
    }
    
    if (filters.maxPrice) {
      newParams.set('maxPrice', filters.maxPrice.toString());
    } else {
      newParams.delete('maxPrice');
    }
    
    setSearchParams(newParams);
  };

  const handleSortChange = (sortBy: string, order: 'asc' | 'desc') => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', sortBy);
    newParams.set('order', order);
    setSearchParams(newParams);
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Something went wrong</h2>
            <p className="text-foreground/70 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif font-medium">
              {currentCategory ? `${currentCategory} Products` : 'All Products'}
            </h1>
            <p className="text-foreground/70 mt-2">
              {loading ? 'Loading...' : `${totalCount} products found`}
            </p>
          </div>
          <ProductSorter 
            currentSort={currentSort}
            currentOrder={currentOrder}
            onSortChange={handleSortChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <ProductFilters
              categories={categories}
              currentFilters={{
                category: currentCategory,
                search: currentSearch,
                minPrice,
                maxPrice
              }}
              onFiltersChange={handleFilterChange}
            />
          </aside>

          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-medium mb-4">No products found</h2>
                <p className="text-foreground/70">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            ) : (
              <>
                <ProductsGrid products={products} />
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded ${
                            page === currentPage
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
}
