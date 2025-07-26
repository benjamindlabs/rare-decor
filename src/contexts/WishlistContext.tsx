
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { wishlistService } from '@/services/wishlistService';
import { useToast } from '@/hooks/use-toast';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load wishlist
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        // Load from Supabase for authenticated users
        setIsLoading(true);
        try {
          const wishlistItems = await wishlistService.getWishlistItems(user.id);
          setItems(wishlistItems);
        } catch (error) {
          console.error('Error loading wishlist:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Load from localStorage for guest users
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          try {
            setItems(JSON.parse(savedWishlist));
          } catch (error) {
            console.error('Error parsing wishlist from localStorage:', error);
          }
        }
      }
    };

    loadWishlist();
  }, [user]);

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('wishlist', JSON.stringify(items));
    }
  }, [items, user]);

  const addToWishlist = async (product: Product) => {
    if (user) {
      try {
        await wishlistService.addToWishlist(user.id, product.id);
        setItems([...items, product]);
        
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to add item to wishlist.",
          variant: "destructive",
        });
      }
    } else {
      if (!isInWishlist(product.id)) {
        setItems([...items, product]);
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (user) {
      try {
        await wishlistService.removeFromWishlist(user.id, productId);
        setItems(items.filter(item => item.id !== productId));
        
        toast({
          title: "Removed from wishlist",
          description: "Item has been removed from your wishlist.",
        });
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from wishlist.",
          variant: "destructive",
        });
      }
    } else {
      setItems(items.filter(item => item.id !== productId));
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist.",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const clearWishlist = async () => {
    if (user) {
      try {
        // Remove all items individually since there's no bulk delete endpoint
        await Promise.all(items.map(item => 
          wishlistService.removeFromWishlist(user.id, item.id)
        ));
        setItems([]);
      } catch (error) {
        console.error('Error clearing wishlist:', error);
      }
    } else {
      setItems([]);
    }
  };

  return (
    <WishlistContext.Provider value={{
      items,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      isLoading
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
