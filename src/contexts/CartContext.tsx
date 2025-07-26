
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { cartService } from '@/services/cartService';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  productId: string; // The actual product ID from products table
  name: string;
  price: number;
  images: string[];
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartContextType {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart from localStorage for guest users or Supabase for authenticated users
  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        // Load from Supabase for authenticated users
        setIsLoading(true);
        try {
          const cartItems = await cartService.getCartItems(user.id);
          const transformedItems = cartItems.map(item => ({
            id: item.id, // Cart item ID
            productId: item.product.id, // Actual product ID
            name: item.product.name,
            price: item.product.price,
            images: item.product.images,
            quantity: item.quantity,
            selectedSize: item.selectedSize,
            selectedColor: item.selectedColor
          }));
          
          setItems(transformedItems);
        } catch (error) {
          console.error('Error loading cart:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Load from localStorage for guest users
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (error) {
            console.error('Error parsing cart from localStorage:', error);
          }
        }
      }
    };

    loadCart();
  }, [user]);

  // Save to localStorage for guest users
  useEffect(() => {
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, user]);

  // Sync localStorage cart to Supabase when user logs in
  useEffect(() => {
    const syncCartToSupabase = async () => {
      if (user && items.length > 0) {
        // Check if these items are from localStorage
        const hasLocalStorageItems = items.some(item => !item.id.includes('-'));
        
        if (hasLocalStorageItems) {
          try {
            // Sync localStorage items to Supabase
            for (const item of items) {
              // Find the product to get its ID
              // For now, we'll skip this sync as we need product IDs
            }
          } catch (error) {
            console.error('Error syncing cart to Supabase:', error);
          }
        }
      }
    };

    syncCartToSupabase();
  }, [user, items]);

  const addToCart = async (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    if (user) {
      // Add to Supabase for authenticated users
      try {
        await cartService.addToCart(user.id, product.id, quantity, selectedSize, selectedColor);
        
        // Reload cart
        const cartItems = await cartService.getCartItems(user.id);
        const transformedItems = cartItems.map(item => ({
          id: item.id, // Cart item ID
          productId: item.product.id, // Actual product ID
          name: item.product.name,
          price: item.product.price,
          images: item.product.images,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }));
        
        setItems(transformedItems);
        
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
        toast({
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      // Add to localStorage for guest users
      const existingItemIndex = items.findIndex(
        item => item.productId === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        setItems(updatedItems);
      } else {
        const newItem: CartItem = {
          id: product.id, // For guest users, use product ID as both ID and productId
          productId: product.id,
          name: product.name,
          price: product.price,
          images: product.images,
          quantity,
          selectedSize,
          selectedColor,
        };
        setItems([...items, newItem]);
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        await cartService.removeFromCart(itemId);
        setItems(items.filter(item => item.id !== itemId));
        
        toast({
          title: "Removed from cart",
          description: "Item has been removed from your cart.",
        });
      } catch (error) {
        console.error('Error removing from cart:', error);
        toast({
          title: "Error",
          description: "Failed to remove item from cart.",
          variant: "destructive",
        });
      }
    } else {
      setItems(items.filter(item => item.id !== itemId));
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    if (user) {
      try {
        await cartService.updateCartItem(itemId, quantity);
        setItems(items.map(item => 
          item.id === itemId ? { ...item, quantity } : item
        ));
      } catch (error) {
        console.error('Error updating cart item:', error);
        toast({
          title: "Error",
          description: "Failed to update cart item.",
          variant: "destructive",
        });
      }
    } else {
      setItems(items.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await cartService.clearCart(user.id);
        setItems([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    } else {
      setItems([]);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      subtotal,
      itemCount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
