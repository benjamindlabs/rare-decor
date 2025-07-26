
interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  trxref: string;
  message: string;
}

interface PaystackHandlerConfig {
  key: string;
  email: string;
  amount: number;
  ref?: string;
  currency?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  onClose?: () => void;
  callback?: (response: PaystackResponse) => void;
}

interface PaystackHandler {
  openIframe: () => void;
}

interface PaystackPopObject {
  setup: (config: PaystackHandlerConfig) => PaystackHandler;
}

interface Window {
  PaystackPop: PaystackPopObject;
}
