
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { PaymentInfo } from '@/types';

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  paymentMethod: 'paystack' | 'flutterwave' | 'bank-transfer';
};

interface CheckoutFormProps {
  formData: CheckoutFormData;
  isProcessing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePaymentMethodChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function CheckoutForm({
  formData,
  isProcessing,
  handleInputChange,
  handlePaymentMethodChange,
  handleSubmit
}: CheckoutFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8">
        {/* Shipping Information */}
        <div>
          <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input 
                id="city" 
                value={formData.city}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input 
                id="state" 
                value={formData.state}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input 
                id="postalCode" 
                value={formData.postalCode}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
        </div>
        
        {/* Payment Method */}
        <div>
          <h2 className="text-xl font-medium mb-4">Payment Method</h2>
          <RadioGroup 
            value={formData.paymentMethod} 
            onValueChange={handlePaymentMethodChange}
          >
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="paystack" id="paystack" />
              <Label htmlFor="paystack">Paystack</Label>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <RadioGroupItem value="flutterwave" id="flutterwave" />
              <Label htmlFor="flutterwave">Flutterwave</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" />
              <Label htmlFor="bank-transfer">Bank Transfer</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="premium-button mt-8 w-full md:w-auto"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>Place Order</>
        )}
      </Button>
    </form>
  );
}
