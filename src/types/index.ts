
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  images: string[];
  category: string;
  category_id?: string;
  tags: string[];
  features: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviewCount: number;
  sku: string;
  inStock: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  user_id: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  phone?: string;
  payment_method: string;
  payment_reference?: string;
  payment_status: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  product_name: string;
  product_image_url?: string;
  selected_size?: string;
  selected_color?: string;
  created_at: string;
}

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

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  role: 'user' | 'admin';
  created_at: string;
}

export interface PaymentInfo {
  reference: string;
  status: string;
  gateway_response?: string;
  amount?: number;
  currency?: string;
  customer_email?: string;
  customer_name?: string;
  payment_method?: string;
}
