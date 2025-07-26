import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PaymentNotificationRequest {
  userEmail: string;
  amount: number;
  receiptUrl: string;
  orderId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail, amount, receiptUrl, orderId }: PaymentNotificationRequest = await req.json();

    console.log("Sending payment notification for:", { userEmail, amount, orderId });

    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
      }).format(price);
    };

    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Elite Furniture <noreply@elitelfurniture.com>",
      to: ["admin@elitefurniture.com"], // Replace with actual admin email
      subject: `New Bank Transfer Payment - ${formatPrice(amount)}`,
      html: `
        <h1>New Bank Transfer Payment Received</h1>
        <p><strong>Customer Email:</strong> ${userEmail}</p>
        <p><strong>Amount:</strong> ${formatPrice(amount)}</p>
        ${orderId ? `<p><strong>Order ID:</strong> ${orderId}</p>` : ''}
        <p><strong>Receipt:</strong> <a href="${receiptUrl}" target="_blank">View Receipt</a></p>
        <p>Please verify the payment and update the order status accordingly.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Elite Furniture Store</p>
      `,
    });

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Elite Furniture <noreply@elitefurniture.com>",
      to: [userEmail],
      subject: "Payment Receipt Received - Elite Furniture",
      html: `
        <h1>Thank you for your payment!</h1>
        <p>We have received your bank transfer receipt for ${formatPrice(amount)}.</p>
        <p>Your payment is currently being verified and will be processed within 24 hours.</p>
        <p>You will receive an email confirmation once your payment has been verified.</p>
        <br>
        <p>If you have any questions, please contact our customer service team.</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Elite Furniture Store</p>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);
    console.log("Customer email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmail: adminEmailResponse, 
        customerEmail: customerEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-payment-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);