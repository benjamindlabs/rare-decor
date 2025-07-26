-- Create storage bucket for payment receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-receipts', 'payment-receipts', false);

-- Create RLS policies for payment receipts storage
CREATE POLICY "Allow users to upload their own payment receipts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'payment-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to view their own payment receipts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow admins to view all payment receipts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'payment-receipts' AND EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
));