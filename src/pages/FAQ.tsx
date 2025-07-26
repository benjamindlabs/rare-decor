import Layout from '@/components/layout/Layout';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    category: "Orders & Shipping",
    faqs: [
      {
        question: "How long does shipping take?",
        answer: "We offer free standard shipping (5-7 business days) on orders over $75. Express shipping (2-3 business days) is available for $15. Orders are typically processed within 1-2 business days."
      },
      {
        question: "Do you ship internationally?",
        answer: "Currently, we ship within the United States and Canada. International shipping to other countries will be available soon. Please subscribe to our newsletter for updates."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can also view your order status by logging into your account and visiting the Order History page."
      },
      {
        question: "Can I change or cancel my order?",
        answer: "Orders can be modified or cancelled within 2 hours of placement. After this window, orders enter processing and cannot be changed. Contact our support team immediately if you need assistance."
      }
    ]
  },
  {
    category: "Returns & Exchanges",
    faqs: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for unused items in original packaging. Custom or personalized items cannot be returned unless defective. Return shipping is free for defective items."
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account, go to Order History, and select 'Return Items' next to your order. You can also contact our support team for assistance with returns."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 3-5 business days after we receive your returned items. The refund will be credited to your original payment method."
      },
      {
        question: "Can I exchange an item?",
        answer: "Yes! You can exchange items for a different size, color, or style within 30 days. Exchanges are processed faster than returns and refunds."
      }
    ]
  },
  {
    category: "Products & Quality",
    faqs: [
      {
        question: "What materials do you use?",
        answer: "We use premium, sustainable materials including solid wood, high-quality metals, and eco-friendly finishes. Each product page lists detailed material information."
      },
      {
        question: "Do you offer product warranties?",
        answer: "Yes! All our furniture comes with a 2-year warranty against manufacturing defects. Accessories have a 1-year warranty. Warranty details are included with each purchase."
      },
      {
        question: "Are assembly instructions included?",
        answer: "Most items come pre-assembled. For items requiring assembly, we include detailed instructions and all necessary hardware. Assembly service is available for an additional fee."
      },
      {
        question: "Can I see products before buying?",
        answer: "We have showrooms in select cities where you can view our products. We also offer detailed photos, 360° views, and material samples upon request."
      }
    ]
  },
  {
    category: "Account & Payment",
    faqs: [
      {
        question: "Do I need an account to place an order?",
        answer: "While you can checkout as a guest, creating an account allows you to track orders, save favorites, and enjoy faster checkout for future purchases."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. Payment is processed securely through our encrypted payment system."
      },
      {
        question: "Do you offer financing options?",
        answer: "Yes! We partner with financing companies to offer 0% APR financing for qualified customers. Options include 3, 6, and 12-month payment plans."
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use industry-standard SSL encryption and never store your payment information on our servers. All transactions are processed through secure payment gateways."
      }
    ]
  }
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, returns, and more. 
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <MessageCircle className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Get instant help from our support team</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Phone className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle>Call Us</CardTitle>
              <CardDescription>Mon-Fri, 9am-6pm EST</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button variant="outline" className="w-full">
                +1 (555) 123-4567
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Mail className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>We'll respond within 24 hours</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Send Email</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardHeader>
                <CardTitle className="text-2xl">{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Still Need Help */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle>Still Need Help?</CardTitle>
            <CardDescription>
              Our customer support team is here to help you with any questions or concerns.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/shipping-returns">Shipping & Returns Policy</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}