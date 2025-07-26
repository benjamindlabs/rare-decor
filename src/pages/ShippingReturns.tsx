import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  RotateCcw, 
  Shield, 
  Clock, 
  DollarSign, 
  Package,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShippingReturns() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping & Returns Policy</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            We're committed to providing you with a seamless shopping experience. 
            Learn about our shipping options, return policy, and customer guarantees.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Truck className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold mb-1">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">On orders over $75</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <RotateCcw className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold mb-1">30-Day Returns</h3>
              <p className="text-sm text-muted-foreground">Hassle-free returns</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold mb-1">Quality Guarantee</h3>
              <p className="text-sm text-muted-foreground">2-year warranty</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-semibold mb-1">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">1-2 business days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Shipping Policy */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="h-6 w-6 mr-2 text-primary" />
                  Shipping Policy
                </CardTitle>
                <CardDescription>
                  We offer multiple shipping options to meet your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Options */}
                <div>
                  <h4 className="font-semibold mb-3">Shipping Options</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Standard Shipping</div>
                        <div className="text-sm text-muted-foreground">5-7 business days</div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">FREE</Badge>
                        <div className="text-xs text-muted-foreground">Orders over $75</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Express Shipping</div>
                        <div className="text-sm text-muted-foreground">2-3 business days</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$15.00</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Overnight Shipping</div>
                        <div className="text-sm text-muted-foreground">1 business day</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">$35.00</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Time */}
                <div>
                  <h4 className="font-semibold mb-3">Processing Time</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">In-stock items: 1-2 business days</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm">Custom items: 2-3 weeks</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Areas */}
                <div>
                  <h4 className="font-semibold mb-3">Shipping Areas</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">United States (all 50 states)</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Canada</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">International shipping coming soon</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Returns Policy */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="h-6 w-6 mr-2 text-primary" />
                  Returns & Exchanges
                </CardTitle>
                <CardDescription>
                  Easy returns and exchanges for your peace of mind
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Return Window */}
                <div>
                  <h4 className="font-semibold mb-3">Return Window</h4>
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="font-medium text-lg">30 Days</div>
                    <div className="text-sm text-muted-foreground">
                      From the date of delivery to start your return
                    </div>
                  </div>
                </div>

                {/* Return Conditions */}
                <div>
                  <h4 className="font-semibold mb-3">Return Conditions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Items must be unused and in original condition</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Original packaging and tags must be included</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Return authorization required</span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                      <span className="text-sm">Custom/personalized items cannot be returned</span>
                    </div>
                  </div>
                </div>

                {/* Return Process */}
                <div>
                  <h4 className="font-semibold mb-3">How to Return</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</div>
                      <div>
                        <div className="font-medium">Request Return Authorization</div>
                        <div className="text-sm text-muted-foreground">Log into your account or contact support</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</div>
                      <div>
                        <div className="font-medium">Package & Ship</div>
                        <div className="text-sm text-muted-foreground">Use provided return label and packaging</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</div>
                      <div>
                        <div className="font-medium">Receive Refund</div>
                        <div className="text-sm text-muted-foreground">Processed within 3-5 business days</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund Information */}
                <div>
                  <h4 className="font-semibold mb-3">Refund Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Full refund to original payment method</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm">Free return shipping for defective items</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                      <span className="text-sm">Exchanges processed faster than refunds</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customer Guarantee */}
        <Card className="mt-12">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center">
              <Shield className="h-6 w-6 mr-2 text-primary" />
              Our Quality Guarantee
            </CardTitle>
            <CardDescription>
              We stand behind every product we sell
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">2-Year Warranty</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  All furniture items come with a comprehensive 2-year warranty against manufacturing defects. 
                  Accessories and decor items include a 1-year warranty.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Satisfaction Promise</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  If you're not completely satisfied with your purchase, we'll work with you to make it right. 
                  Your happiness is our priority.
                </p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Button asChild>
                <Link to="/contact">Contact Customer Service</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}