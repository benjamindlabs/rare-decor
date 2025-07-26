
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold tracking-tight">God <span className="text-accent">First</span> Son</h2>
            <p className="text-primary-foreground/80 text-sm">
              Premium men's fashion for those who demand excellence. Crafted with precision and passion.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-foreground/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-foreground/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary-foreground/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Shop Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-medium">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/collections/new-arrivals" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collections/best-sellers" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collections/sale" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-medium">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-primary-foreground/80 text-sm hover:text-primary-foreground transition-colors">
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-medium">Newsletter</h3>
            <p className="text-primary-foreground/80 text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-primary-foreground/10 border-primary-foreground/20 focus:border-accent"
              />
              <Button className="premium-button bg-accent text-accent-foreground hover:bg-accent/90 mt-2">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} God First Son. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-primary-foreground/60 text-sm hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
