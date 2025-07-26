
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface ProductSorterProps {
  currentSort: string;
  currentOrder: 'asc' | 'desc';
  onSortChange: (sortBy: string, order: 'asc' | 'desc') => void;
}

export function ProductSorter({ 
  currentSort, 
  currentOrder,
  onSortChange 
}: ProductSorterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const sortOptions = [
    { value: 'created_at', label: 'Newest First', order: 'desc' as const },
    { value: 'created_at', label: 'Oldest First', order: 'asc' as const },
    { value: 'price', label: 'Price: Low to High', order: 'asc' as const },
    { value: 'price', label: 'Price: High to Low', order: 'desc' as const },
    { value: 'name', label: 'Name: A to Z', order: 'asc' as const },
    { value: 'name', label: 'Name: Z to A', order: 'desc' as const },
  ];

  const currentOption = sortOptions.find(opt => opt.value === currentSort && opt.order === currentOrder);
  
  return (
    <div className="relative group">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      >
        {currentOption?.label || 'Sort by'} <ChevronDown className="h-4 w-4" />
      </Button>
      
      <div className={`absolute right-0 top-12 bg-card border border-border shadow-lg p-2 w-48 z-10 ${
        isOpen ? 'block' : 'hidden md:group-hover:block'
      }`}>
        {sortOptions.map(option => (
          <button
            key={`${option.value}-${option.order}`}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-muted ${
              currentSort === option.value && currentOrder === option.order ? 'bg-accent/10 text-accent' : ''
            }`}
            onClick={() => {
              onSortChange(option.value, option.order);
              setIsOpen(false);
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
