
import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { reviewService } from '@/services/reviewService';
import { Review } from '@/types';

interface ProductReviewsProps {
  product: {
    id: string;
    rating: number;
    reviewCount: number;
  };
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = async () => {
    try {
      const reviewsData = await reviewService.getProductReviews(product.id);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await reviewService.createReview({
        productId: product.id,
        userId: user.id,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment
      });
      
      setNewReview({ rating: 5, title: '', comment: '' });
      setShowReviewForm(false);
      loadReviews(); // Reload reviews
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5';
    
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-serif font-medium mb-6">Customer Reviews</h3>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-medium">Customer Reviews</h3>
        {user && (
          <Button onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </Button>
        )}
      </div>

      {/* Overall Rating */}
      <div className="flex items-center gap-4 mb-8 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-3xl font-bold">{product.rating.toFixed(1)}</div>
          {renderStars(Math.round(product.rating), 'md')}
        </div>
        <div className="text-foreground/70">
          Based on {product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && user && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-4 border rounded-lg">
          <h4 className="font-medium mb-4">Write Your Review</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="p-1"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= newReview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Input
              placeholder="Review title (optional)"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Write your review..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit">Submit Review</Button>
            <Button type="button" variant="outline" onClick={() => setShowReviewForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  {renderStars(review.rating)}
                  {review.title && (
                    <h5 className="font-medium mt-1">{review.title}</h5>
                  )}
                </div>
                <span className="text-sm text-foreground/70">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              
              {review.comment && (
                <p className="text-foreground/80 mt-2">{review.comment}</p>
              )}
              
              {review.is_verified_purchase && (
                <span className="inline-flex items-center gap-1 mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                  <ThumbsUp className="h-3 w-3" />
                  Verified Purchase
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
