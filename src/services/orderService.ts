
import { supabase } from '@/integrations/supabase/client';
import { Order, OrderItem, OrderStatus } from '@/types';

export const orderService = {
  async createOrder(orderData: {
    userId: string;
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    phone?: string;
    paymentMethod: string;
    paymentReference?: string;
    items: Array<{
      productId: string;
      quantity: number;
      unitPrice: number;
      productName: string;
      productImageUrl?: string;
      selectedSize?: string;
      selectedColor?: string;
    }>;
  }): Promise<Order> {
    const subtotal = orderData.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    const shippingCost = subtotal > 50000 ? 0 : 2500; // Free shipping over ₦50,000
    const taxAmount = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + shippingCost + taxAmount;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.userId,
        status: 'pending' as OrderStatus,
        total,
        subtotal,
        shipping_cost: shippingCost,
        tax_amount: taxAmount,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        shipping_address: orderData.shippingAddress,
        phone: orderData.phone,
        payment_method: orderData.paymentMethod,
        payment_reference: orderData.paymentReference,
        payment_status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: item.unitPrice,
      total_price: item.unitPrice * item.quantity,
      product_name: item.productName,
      product_image_url: item.productImageUrl,
      selected_size: item.selectedSize,
      selected_color: item.selectedColor
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    return {
      ...order,
      status: order.status as OrderStatus
    };
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }

    return data?.map(order => ({
      ...order,
      status: order.status as OrderStatus,
      items: order.order_items || []
    })) || [];
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return null;
    }

    return {
      ...data,
      status: data.status as OrderStatus,
      items: data.order_items || []
    };
  },

  async updateOrderStatus(orderId: string, status: OrderStatus) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Error updating order status:', error);
      throw error;
    }

    return data;
  },

  async updatePaymentStatus(orderId: string, paymentStatus: string, paymentReference?: string) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        payment_status: paymentStatus,
        payment_reference: paymentReference,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select();

    if (error) {
      console.error('Error updating payment status:', error);
      throw error;
    }

    return data;
  },

  async getAllOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching all orders:', error);
      return [];
    }

    return data?.map(order => ({
      ...order,
      status: order.status as OrderStatus,
      items: order.order_items || []
    })) || [];
  }
};
