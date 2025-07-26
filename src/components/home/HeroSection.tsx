
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/lovable-uploads/3715ffc9-60de-482a-9383-2dcc463f150e.png',
    title: 'Artful Living',
    subtitle: 'Curated Luxury',
    cta: 'Shop Now',
    link: '/collections/new-arrivals',
  },
  {
    id: 2,
    image: '/lovable-uploads/9d70f530-d010-4605-9a77-efc7d1ca3027.png',
    title: 'Timeless Elegance',
    subtitle: 'Statement Pieces',
    cta: 'Explore',
    link: '/collections/premium',
  },
  {
    id: 3,
    image: '/lovable-uploads/2233233c-03c9-4cc9-86d9-625dcd2b5bc3.png',
    title: 'Modern Classics',
    subtitle: 'Contemporary Design',
    cta: 'Discover',
    link: '/collections/classic',
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
            <div className="text-center max-w-3xl px-6 space-y-6">
              <div className={`transition-all duration-700 delay-200 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-xl md:text-2xl font-light uppercase tracking-widest mb-2">{slide.subtitle}</p>
                <h2 className="text-4xl md:text-6xl xl:text-7xl font-serif font-bold">{slide.title}</h2>
              </div>
              
              <div className={`transition-all duration-700 delay-500 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <Link to={slide.link}>
                  <Button className="premium-button bg-white text-primary hover:bg-white/90 mt-6">
                    {slide.cta} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
