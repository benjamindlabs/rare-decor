
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function BrandStory() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="relative">
              <img 
                src="/lovable-uploads/8b136831-bf1a-4344-b2c6-3eaa746511a6.png" 
                alt="Our Story" 
                className="w-full aspect-[4/3] object-cover premium-card"
              />
              <div className="absolute -bottom-6 -right-6 bg-accent w-32 h-32 flex items-center justify-center">
                <span className="font-serif text-lg text-accent-foreground">Since 2023</span>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-up">
            <h2 className="text-sm uppercase tracking-wider text-foreground/70 mb-4">Our Story</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-medium mb-6">Rare Home Decor: Premium Interior Design</h3>
            <div className="space-y-4 text-foreground/80">
              <p>
                Founded on principles of exceptional quality and timeless design, Rare Home Decor creates premium interior pieces for the modern home that places value on craftsmanship and authentic style.
              </p>
              <p>
                Each piece in our collection is thoughtfully designed with attention to detail and constructed from the finest materials, ensuring longevity and unparalleled beauty.
              </p>
              <p>
                We believe that true style transcends trends, which is why we focus on creating home essentials that stand the test of time both in durability and aesthetic.
              </p>
            </div>
            <Link to="/about">
              <Button className="premium-button mt-8">
                Our Journey
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
