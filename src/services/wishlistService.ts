
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export const wishlistService = {
  async getWishlistItems(userId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching wishlist items:', error);
      return [];
    }

    return data?.map(item => ({
      ...item.products,
      price: Number(item.products.price),
      stock: Number(item.products.stock),
      images: item.products.image_url ? [item.products.image_url] : [],
      category: item.products.category || 'Uncategorized',
      tags: item.products.tags || [],
      features: item.products.features || [],
      sizes: item.products.sizes || [],
      colors: item.products.colors || [],
      rating: Number(item.products.rating) || 0,
      reviewCount: Number(item.products.review_count) || 0,
      sku: item.products.sku || `SKU-${item.products.id.slice(-8)}`,
      inStock: Number(item.products.stock) > 0,
      isNew: false,
      isBestSeller: item.products.is_featured
    })) || [];
  },

  async addToWishlist(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .insert({
        user_id: userId,
        product_id: productId
      })
      .select();

    if (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }

    return data;
  },

  async removeFromWishlist(userId: string, productId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  },

  async isInWishlist(userId: string, productId: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (error) {
      return false;
    }

    return !!data;
  }
};
