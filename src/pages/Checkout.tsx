
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { initializePaystack, generateReference, verifyPayment } from '@/utils/paymentUtils';
import { orderService } from '@/services/orderService';
import { PaymentInfo } from '@/types';
import CheckoutForm, { CheckoutFormData } from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';
import EmptyCartMessage from '@/components/checkout/EmptyCartMessage';
import BankTransferDialog from '@/components/checkout/BankTransferDialog';

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showBankTransferDialog, setShowBankTransferDialog] = useState(false);
  const [pendingOrderData, setPendingOrderData] = useState<any>(null);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'paystack',
  });
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };
  
  const shipping = subtotal > 50000 ? 0 : 2000;
  const total = subtotal + shipping;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: value as 'paystack' | 'flutterwave' | 'bank-transfer',
    }));
  };
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to place an order.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Generate a unique reference for this transaction
      const reference = generateReference();
      
      if (formData.paymentMethod === 'paystack') {
        // Initialize Paystack payment
        await initializePaystack({
          reference,
          email: formData.email,
          amount: total * 100, // Convert to kobo
          firstname: formData.firstName,
          lastname: formData.lastName,
          onSuccess: async (reference) => {
            // Verify payment status
            const paymentInfo = await verifyPayment(reference);
            
            // Process order
            await processOrder(paymentInfo);
          },
          onCancel: () => {
            setIsProcessing(false);
            toast({
              title: "Payment cancelled",
              description: "You have cancelled the payment process.",
              variant: "destructive",
            });
          },
        });
      } else if (formData.paymentMethod === 'flutterwave') {
        // In a real app, implement Flutterwave here
        const paymentInfo: PaymentInfo = {
          reference,
          status: 'success',
          payment_method: 'flutterwave',
        };
        await processOrder(paymentInfo);
      } else {
        // Bank transfer - create order first, then show dialog
        const orderData = {
          userId: user!.id,
          customerName: `${formData.firstName} ${formData.lastName}`,
          customerEmail: formData.email,
          shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
          phone: formData.phone,
          paymentMethod: 'bank-transfer',
          paymentReference: reference,
          subtotal,
          shippingCost: shipping,
          total,
        items: items.map(item => ({
          productId: item.productId, // Use the actual product ID
          productName: item.name,
          productImageUrl: item.images[0],
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }))
        };

        const order = await orderService.createOrder(orderData);
        setOrderId(order.id);
        setPendingOrderData(orderData);
        setShowBankTransferDialog(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const processOrder = async (paymentInfo: PaymentInfo) => {
    try {
      const orderData = {
        userId: user!.id,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.postalCode}`,
        phone: formData.phone,
        paymentMethod: paymentInfo.payment_method,
        paymentReference: paymentInfo.reference,
        subtotal,
        shippingCost: shipping,
        total,
        items: items.map(item => ({
          productId: item.productId, // Use the actual product ID
          productName: item.name,
          productImageUrl: item.images[0],
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
        }))
      };

      const order = await orderService.createOrder(orderData);
      setOrderId(order.id);
      
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      clearCart();
      setOrderPlaced(true);
    } catch (error) {
      console.error('Order creation error:', error);
      toast({
        title: "Order failed",
        description: "There was an error creating your order. Please contact support.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankTransferUpload = (receiptUrl: string) => {
    toast({
      title: "Order placed successfully",
      description: "Thank you for your purchase. Your payment is being verified.",
    });
    
    clearCart();
    setOrderPlaced(true);
  };
  
  // Redirect to cart if cart is empty when component mounts
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [items.length, orderPlaced, navigate]);
  
  // Render order confirmation page if order is placed
  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 md:px-6 pt-32 pb-16 max-w-3xl">
          <OrderConfirmation />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-3xl font-serif font-medium mb-8">Checkout</h1>
        
        {items.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm 
                formData={formData}
                isProcessing={isProcessing}
                handleInputChange={handleInputChange}
                handlePaymentMethodChange={handlePaymentMethodChange}
                handleSubmit={handlePlaceOrder}
              />
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary 
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                formatPrice={formatPrice}
              />
            </div>
          </div>
        )}

        {/* Bank Transfer Dialog */}
        {orderId && (
          <BankTransferDialog
            open={showBankTransferDialog}
            onOpenChange={setShowBankTransferDialog}
            orderTotal={total}
            orderId={orderId}
            onUploadComplete={handleBankTransferUpload}
          />
        )}
      </div>
    </Layout>
  );
}
