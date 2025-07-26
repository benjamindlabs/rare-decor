
import { Product } from '@/types';

export function formatPrice(price: number) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

export function filterAndSortProducts(
  products: Product[], 
  activeCategory: string, 
  priceRange: number[],
  sortBy: string
) {
  // Ensure all products have the required properties needed for filtering and sorting
  const enhancedProducts = products.map(product => ({
    ...product,
    images: product.images || (product.image_url ? [product.image_url] : ['/placeholder.svg']),
    category: product.category || 'Uncategorized',
  }));

  return enhancedProducts
    .filter(product => activeCategory === "All" || product.category === activeCategory)
    .filter(product => product.price >= priceRange[0] && product.price <= priceRange[1])
    .sort((a, b) => {
      if (sortBy === "Newest") return 0; // In a real app, you'd sort by date
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Best Sellers") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0;
    });
}
