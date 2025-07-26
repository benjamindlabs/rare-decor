
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { RecentlyViewedProvider } from '@/contexts/RecentlyViewedContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load components
const Index = lazy(() => import('@/pages/Index'));
const Products = lazy(() => import('@/pages/Products'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const Cart = lazy(() => import('@/pages/Cart'));
const Checkout = lazy(() => import('@/pages/Checkout'));
const Wishlist = lazy(() => import('@/pages/Wishlist'));
const OrderHistory = lazy(() => import('@/pages/OrderHistory'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Collections = lazy(() => import('@/pages/Collections'));
const Auth = lazy(() => import('@/pages/Auth'));
const Admin = lazy(() => import('@/pages/Admin'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const ShippingReturns = lazy(() => import('@/pages/ShippingReturns'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <RecentlyViewedProvider>
              <div className="min-h-screen bg-background text-foreground">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/orders" element={<OrderHistory />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/shipping-returns" element={<ShippingReturns />} />
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute requireAdmin>
                          <Admin />
                        </ProtectedRoute>
                      } 
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
              <Toaster />
              </RecentlyViewedProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
