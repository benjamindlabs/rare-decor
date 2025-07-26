
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export const cartService = {
  async getCartItems(userId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        products(*)
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }

    return data?.map(item => ({
      id: item.id,
      product: {
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
      },
      quantity: item.quantity,
      selectedSize: item.selected_size,
      selectedColor: item.selected_color
    })) || [];
  },

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) {
    const { data, error } = await supabase
      .from('cart_items')
      .upsert({
        user_id: userId,
        product_id: productId,
        quantity,
        selected_size: selectedSize,
        selected_color: selectedColor
      }, {
        onConflict: 'user_id,product_id,selected_size,selected_color'
      })
      .select();

    if (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }

    return data;
  },

  async updateCartItem(itemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', itemId)
      .select();

    if (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }

    return data;
  },

  async removeFromCart(itemId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  async clearCart(userId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  }
};
