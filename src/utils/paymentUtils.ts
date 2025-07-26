
import { PaymentInfo } from '@/types';

// The public key would typically come from an environment variable
// For this implementation, we're using a dummy key
const PAYSTACK_PUBLIC_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

export type PaystackConfig = {
  reference: string;
  email: string;
  amount: number; // in kobo (multiply Naira value by 100)
  publicKey?: string;
  firstname?: string;
  lastname?: string;
  onSuccess: (reference: string) => void;
  onCancel: () => void;
};

export const initializePaystack = async (config: PaystackConfig): Promise<void> => {
  // Load Paystack inline script if not already loaded
  if (!window.PaystackPop) {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    document.body.appendChild(script);

    // Wait for script to load
    await new Promise<void>((resolve) => {
      script.onload = () => resolve();
    });
  }

  // Initialize Paystack payment
  const handler = window.PaystackPop.setup({
    key: config.publicKey || PAYSTACK_PUBLIC_KEY,
    email: config.email,
    amount: config.amount,
    ref: config.reference,
    firstname: config.firstname,
    lastname: config.lastname,
    onClose: () => {
      config.onCancel();
    },
    callback: (response: { reference: string }) => {
      config.onSuccess(response.reference);
    },
  });

  handler.openIframe();
};

export const generateReference = (): string => {
  return `tr-${Math.floor(Math.random() * 1000000000)}`;
};

export const verifyPayment = async (reference: string): Promise<PaymentInfo> => {
  // In a real app, you would verify this on your backend
  // For demo purposes, we'll simulate a successful payment
  return {
    reference,
    status: 'success',
    payment_method: 'paystack',
  };
};
