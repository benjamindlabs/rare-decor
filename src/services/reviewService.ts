
import { supabase } from '@/integrations/supabase/client';

export interface Review {
  id: string;
  product_id: string;
  user_id?: string;
  rating: number;
  title?: string;
  comment?: string;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export const reviewService = {
  async getProductReviews(productId: string): Promise<Review[]> {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    return data || [];
  },

  async createReview(review: {
    productId: string;
    userId: string;
    rating: number;
    title?: string;
    comment?: string;
  }) {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: review.productId,
        user_id: review.userId,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        is_verified_purchase: false,
        is_approved: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }

    return data;
  },

  async updateReview(reviewId: string, updates: {
    rating?: number;
    title?: string;
    comment?: string;
  }) {
    const { data, error } = await supabase
      .from('reviews')
      .update(updates)
      .eq('id', reviewId)
      .select();

    if (error) {
      console.error('Error updating review:', error);
      throw error;
    }

    return data;
  },

  async deleteReview(reviewId: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (error) {
      console.error('Error deleting review:', error);
      throw error;
    }
  }
};
