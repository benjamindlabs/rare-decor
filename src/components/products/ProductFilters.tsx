
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { FilterX, Search } from 'lucide-react';
import { Category } from '@/types';

interface ProductFiltersProps {
  categories: Category[];
  currentFilters: {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
  };
  onFiltersChange: (filters: any) => void;
}

export function ProductFilters({
  categories,
  currentFilters,
  onFiltersChange
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [priceRange, setPriceRange] = useState([
    currentFilters.minPrice || 0,
    currentFilters.maxPrice || 150000
  ]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({
      ...currentFilters,
      search: searchTerm || undefined
    });
  };

  const handleCategoryChange = (categoryId: string) => {
    onFiltersChange({
      ...currentFilters,
      category: categoryId === currentFilters.category ? undefined : categoryId
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...currentFilters,
      minPrice: values[0] > 0 ? values[0] : undefined,
      maxPrice: values[1] < 150000 ? values[1] : undefined
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setPriceRange([0, 150000]);
    onFiltersChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="text-lg font-medium mb-4">Search</h3>
        <form onSubmit={handleSearchSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category.id}`} 
                checked={currentFilters.category === category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label 
                htmlFor={`category-${category.id}`}
                className="text-sm cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <Slider 
          defaultValue={[0, 150000]} 
          max={150000}
          step={1000}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          className="my-6"
        />
        <div className="flex justify-between text-sm">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>
      
      <Button onClick={handleReset} variant="outline" className="w-full">
        <FilterX className="h-4 w-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );
}

export default ProductFilters;
