import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, Camera, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BankTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderTotal: number;
  orderId: string;
  onUploadComplete: (receiptUrl: string) => void;
}

export default function BankTransferDialog({
  open,
  onOpenChange,
  orderTotal,
  orderId,
  onUploadComplete,
}: BankTransferDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const bankDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "Elite Furniture Store Ltd",
    accountNumber: "3025467891",
    sortCode: "011",
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, etc.)",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Missing information",
        description: "Please select a receipt image",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-receipt.${fileExt}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(fileName, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL (even though bucket is private, we'll use this for admin access)
      const { data: urlData } = supabase.storage
        .from('payment-receipts')
        .getPublicUrl(uploadData.path);

      // Create payment record
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          order_id: orderId,
          amount: orderTotal,
          payment_method: 'bank-transfer',
          receipt_url: urlData.publicUrl,
          status: 'pending',
        });

      if (paymentError) {
        throw paymentError;
      }

      // Trigger email notification
      const { error: functionError } = await supabase.functions.invoke('send-payment-notification', {
        body: {
          userEmail: user.email,
          amount: orderTotal,
          receiptUrl: urlData.publicUrl,
          orderId: orderId,
        },
      });

      if (functionError) {
        console.error('Email notification failed:', functionError);
        // Don't throw here as the main process succeeded
      }

      toast({
        title: "Receipt uploaded successfully",
        description: "Your payment is being processed. You'll receive confirmation via email.",
      });

      onUploadComplete(urlData.publicUrl);
      onOpenChange(false);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your receipt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bank Transfer Payment</DialogTitle>
          <DialogDescription>
            Please transfer {formatPrice(orderTotal)} to the account below and upload your receipt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bank Details */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <h3 className="font-medium">Bank Details</h3>
            <div className="text-sm space-y-1">
              <p><span className="font-medium">Bank:</span> {bankDetails.bankName}</p>
              <p><span className="font-medium">Account Name:</span> {bankDetails.accountName}</p>
              <p><span className="font-medium">Account Number:</span> {bankDetails.accountNumber}</p>
              <p><span className="font-medium">Sort Code:</span> {bankDetails.sortCode}</p>
              <p><span className="font-medium">Amount:</span> {formatPrice(orderTotal)}</p>
            </div>
          </div>

          {/* Receipt Upload */}
          <div className="space-y-3">
            <Label htmlFor="receipt">Upload Payment Receipt</Label>
            <div className="flex items-center gap-2">
              <Input
                id="receipt"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => document.getElementById('receipt')?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            {selectedFile && (
              <p className="text-sm text-muted-foreground">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || uploading}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading Receipt...
              </>
            ) : (
              <>
                <Camera className="mr-2 h-4 w-4" />
                Submit Payment Receipt
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}