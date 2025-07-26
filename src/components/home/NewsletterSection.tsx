
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Subscription successful!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
    }
  };
  
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-sm uppercase tracking-wider text-primary-foreground/70 mb-4">Newsletter</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">Subscribe for Updates</h3>
            <p className="text-primary-foreground/80">
              Be the first to know about new collections, exclusive offers, and style tips. Join our community of fashion enthusiasts.
            </p>
          </div>
          
          <div className="bg-primary-foreground/5 backdrop-blur-sm p-8 border border-primary-foreground/10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-accent"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full premium-button bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Subscribe Now
              </Button>
              
              <p className="text-xs text-primary-foreground/60 text-center mt-4">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
