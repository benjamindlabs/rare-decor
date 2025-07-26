import { supabase } from '@/integrations/supabase/client';
import { Product, Category } from '@/types';

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export const productService = {
  async getProducts(
    filters: ProductFilters = {},
    page: number = 1,
    limit: number = 12,
    sortBy: string = 'created_at',
    order: 'asc' | 'desc' = 'desc'
  ): Promise<{ data: Product[]; count: number }> {
    console.log('productService.getProducts called with:', { filters, page, limit, sortBy, order });
    
    let query = supabase
      .from('products')
      .select('*, categories(name)', { count: 'exact' })
      .eq('is_active', true);

    // Apply filters
    if (filters.category) {
      query = query.eq('category_id', filters.category);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters.inStock) {
      query = query.gt('stock', 0);
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: order === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching products:', error);
      return { data: [], count: 0 };
    }

    console.log('Raw product data from Supabase:', data);

    const products: Product[] = data?.map(product => ({
      id: product.id,
      name: product.name,
      description: product.description || '',
      price: Number(product.price),
      image_url: product.image_url,
      images: product.image_url ? [product.image_url] : [],
      category: product.categories?.name || 'Uncategorized',
      category_id: product.category_id,
      tags: product.tags || [],
      features: product.features || [],
      sizes: product.sizes || [],
      colors: product.colors || [],
      stock: Number(product.stock),
      rating: Number(product.rating) || 0,
      reviewCount: Number(product.review_count) || 0,
      sku: product.sku || `SKU-${product.id.slice(-8)}`,
      inStock: Number(product.stock) > 0,
      isNew: false,
      isBestSeller: product.is_featured || false,
      created_at: product.created_at,
      updated_at: product.updated_at
    })) || [];

    console.log('Processed products:', products);

    return { data: products, count: count || 0 };
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      image_url: data.image_url,
      images: data.image_url ? [data.image_url] : [],
      category: data.categories?.name || 'Uncategorized',
      category_id: data.category_id,
      tags: data.tags || [],
      features: data.features || [],
      sizes: data.sizes || [],
      colors: data.colors || [],
      stock: Number(data.stock),
      rating: Number(data.rating) || 0,
      reviewCount: Number(data.review_count) || 0,
      sku: data.sku || `SKU-${data.id.slice(-8)}`,
      inStock: Number(data.stock) > 0,
      isNew: false,
      isBestSeller: data.is_featured || false,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async createProduct(productData: Omit<Product, 'id' | 'created_at' | 'updated_at' | 'rating' | 'reviewCount'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url,
        category_id: productData.category_id,
        tags: productData.tags,
        features: productData.features,
        sizes: productData.sizes,
        colors: productData.colors,
        stock: productData.stock,
        sku: productData.sku,
        is_featured: productData.isBestSeller,
        is_active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating product:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      image_url: data.image_url,
      images: data.image_url ? [data.image_url] : [],
      category: productData.category,
      category_id: data.category_id,
      tags: data.tags || [],
      features: data.features || [],
      sizes: data.sizes || [],
      colors: data.colors || [],
      stock: Number(data.stock),
      rating: 0,
      reviewCount: 0,
      sku: data.sku || `SKU-${data.id.slice(-8)}`,
      inStock: Number(data.stock) > 0,
      isNew: productData.isNew,
      isBestSeller: productData.isBestSeller,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        image_url: productData.image_url,
        category_id: productData.category_id,
        tags: productData.tags,
        features: productData.features,
        sizes: productData.sizes,
        colors: productData.colors,
        stock: productData.stock,
        sku: productData.sku,
        is_featured: productData.isBestSeller,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      throw error;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description || '',
      price: Number(data.price),
      image_url: data.image_url,
      images: data.image_url ? [data.image_url] : [],
      category: productData.category || 'Uncategorized',
      category_id: data.category_id,
      tags: data.tags || [],
      features: data.features || [],
      sizes: data.sizes || [],
      colors: data.colors || [],
      stock: Number(data.stock),
      rating: Number(data.rating) || 0,
      reviewCount: Number(data.review_count) || 0,
      sku: data.sku || `SKU-${data.id.slice(-8)}`,
      inStock: Number(data.stock) > 0,
      isNew: productData.isNew || false,
      isBestSeller: data.is_featured || false,
      created_at: data.created_at,
      updated_at: data.updated_at
    };
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ is_active: false })
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  }
};
