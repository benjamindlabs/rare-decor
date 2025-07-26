import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { orderService } from '@/services/orderService';
import { Order } from '@/types';

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const userOrders = await orderService.getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error('Error loading orders:', error);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [user]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Please log in</h2>
            <p className="text-foreground/70">You need to be logged in to view your order history.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium">Order History</h1>
          <p className="text-foreground/70 mt-2">Track your orders and view purchase history</p>
        </div>

        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Something went wrong</h2>
            <p className="text-foreground/70 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">No orders yet</h2>
            <p className="text-foreground/70 mb-6">You haven't placed any orders yet.</p>
            <a 
              href="/products" 
              className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 inline-block"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        Order #{order.id.slice(-8)}
                      </CardTitle>
                      <p className="text-sm text-foreground/70">
                        Placed on {formatDate(order.created_at)}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/70">Total Amount:</span>
                      <span className="font-medium">{formatPrice(order.total)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/70">Payment Method:</span>
                      <span className="text-sm">{order.payment_method}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/70">Shipping Address:</span>
                      <span className="text-sm text-right max-w-xs">{order.shipping_address}</span>
                    </div>
                    
                    {order.items && order.items.length > 0 && (
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Items ({order.items.length})</h4>
                        <div className="space-y-2">
                          {order.items.slice(0, 3).map(item => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <span>{item.product_name} × {item.quantity}</span>
                              <span>{formatPrice(item.total_price)}</span>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <p className="text-sm text-foreground/70">
                              and {order.items.length - 3} more items...
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
