
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { productService } from '@/services/productService';
import { orderService } from '@/services/orderService';
import AdminProductList from '@/components/admin/AdminProductList';
import OrderList from '@/components/admin/OrderList';
import { Product, Order } from '@/types';

export default function Admin() {
  const { isAdmin } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products
  const { data: productsData, isLoading: productsLoading, refetch: refetchProducts } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => productService.getProducts({}, 1, 100),
    enabled: isAdmin
  });

  // Fetch orders
  const { data: orders = [], isLoading: ordersLoading, refetch: refetchOrders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => orderService.getAllOrders(),
    enabled: isAdmin
  });

  const handleSaveProduct = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, productData);
      } else {
        await productService.createProduct(productData);
      }
      
      setSelectedProduct(null);
      refetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
      throw error;
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productService.deleteProduct(productId);
      refetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      refetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  };

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Access Denied</h1>
            <p className="text-foreground/70">You don't have permission to access this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const products = productsData?.data || [];
  const totalProducts = productsData?.count || 0;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalRevenue = orders
    .filter(order => order.status === 'delivered')
    .reduce((sum, order) => sum + parseFloat(order.total.toString()), 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-medium">Admin Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingOrders}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <AdminProductList
              products={products}
              isLoading={productsLoading}
              onEdit={(product) => setSelectedProduct(product)}
              onDelete={handleDeleteProduct}
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrderList
              orders={orders}
              isLoading={ordersLoading}
              onUpdateStatus={handleUpdateOrderStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
