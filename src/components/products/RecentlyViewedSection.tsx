import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Trash2, Eye } from 'lucide-react';

export default function RecentlyViewedSection() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recently Viewed</h2>
            <p className="text-muted-foreground">
              Products you've viewed recently
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearRecentlyViewed}
            className="flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear History</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {recentlyViewed.slice(0, 10).map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute top-2 left-2 z-10">
                <div className="bg-background/80 backdrop-blur-sm rounded-full p-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}