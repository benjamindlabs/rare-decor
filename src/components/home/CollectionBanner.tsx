
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function CollectionBanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Banner */}
          <div className="relative overflow-hidden group premium-card aspect-square md:aspect-[4/5]">
            <img 
              src="/lovable-uploads/0073d9b1-b3f4-476b-be2e-67b1e8b45d21.png" 
              alt="Classic Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-serif font-medium mb-2">Classic Collection</h3>
                <p className="text-white/80 mb-4">Our signature pieces and premium essentials</p>
                <Link to="/collections/classic">
                  <Button className="premium-button bg-white text-primary hover:bg-white/90">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Second Banner */}
          <div className="relative overflow-hidden group premium-card aspect-square md:aspect-[4/5]">
            <img 
              src="/lovable-uploads/e85212de-a244-40e4-bcf6-ea0a40ddb55a.png" 
              alt="Premium Collection" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="text-2xl font-serif font-medium mb-2">Premium Collection</h3>
                <p className="text-white/80 mb-4">Luxurious designs for refined spaces</p>
                <Link to="/collections/premium">
                  <Button className="premium-button bg-white text-primary hover:bg-white/90">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
