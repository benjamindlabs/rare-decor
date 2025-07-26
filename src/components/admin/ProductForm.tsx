
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Product } from '@/types';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface ProductFormProps {
  initialProduct?: Product;
  onSave: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
}

type FormValues = {
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  stock: string;
};

export default function ProductForm({ initialProduct, onSave, onCancel }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: initialProduct?.name || '',
      description: initialProduct?.description || '',
      price: initialProduct?.price.toString() || '',
      image_url: initialProduct?.image_url || '',
      category: initialProduct?.category || '',
      stock: initialProduct?.stock.toString() || '0',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      await onSave({
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        image_url: data.image_url || undefined,
        category: data.category,
        stock: parseInt(data.stock, 10),
        // Add the required fields for the Product type
        images: data.image_url ? [data.image_url] : [],
        tags: [],
        features: [],
        sizes: [],
        colors: [],
        rating: 0,
        reviewCount: 0,
        sku: `SKU-${Date.now().toString().substring(8)}`,
        inStock: parseInt(data.stock, 10) > 0,
        isNew: false,
        isBestSeller: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  required 
                  placeholder="Enter product name"
                  className={cn(
                    "transition-all focus:border-primary",
                    !field.value && "border-red-300"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Enter product description"
                  rows={4}
                  className="resize-none focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($) *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    step="0.01" 
                    min="0" 
                    required
                    placeholder="0.00"
                    className={cn(
                      "transition-all focus:border-primary",
                      !field.value && "border-red-300"
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="0" 
                    required
                    placeholder="0"
                    className="focus:border-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter product category"
                  className="focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="url" 
                  placeholder="https://example.com/image.jpg"
                  className="focus:border-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="opacity-100 bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full"></span>
                Saving...
              </span>
            ) : (
              initialProduct ? 'Update Product' : 'Add Product'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
