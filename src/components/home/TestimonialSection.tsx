
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Alexander Wilson",
    position: "CEO, TechVentures",
    quote: "The quality of clothing from God First Son is exceptional. I've never worn more comfortable and stylish formal wear. Every piece feels like it was made specifically for me.",
    rating: 5,
    image: "/lovable-uploads/413998ef-bac8-4cd9-a0d8-c83aea75be6a.png"
  },
  {
    id: 2,
    name: "Michael Johnson",
    position: "Finance Director",
    quote: "God First Son has transformed my wardrobe. The attention to detail in their clothing is remarkable, and I always receive compliments when wearing their pieces. Worth every penny.",
    rating: 5,
    image: "/lovable-uploads/bb6c3e99-c12f-47e4-a1e7-4a8f4f88199b.png"
  },
  {
    id: 3,
    name: "David Chen",
    position: "Architect",
    quote: "As someone who values both style and comfort, I've found God First Son to be the perfect brand. Their garments are beautifully crafted and designed to last. Impressive quality.",
    rating: 4,
    image: "/lovable-uploads/99090033-62ee-42a6-9ab3-7faac52db56b.png"
  }
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm uppercase tracking-wider text-foreground/70 mb-4">Testimonials</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-medium">What Our Customers Say</h3>
        </div>
        
        <div className="relative h-[300px] md:h-[250px] overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out flex flex-col items-center text-center padding-4 ${
                index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentIndex 
                    ? 'opacity-0 -translate-x-full' 
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-accent">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <p className="text-lg md:text-xl italic max-w-3xl mb-6">"{testimonial.quote}"</p>
              
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < testimonial.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}`}
                  />
                ))}
              </div>
              
              <h4 className="font-medium text-lg">{testimonial.name}</h4>
              <p className="text-foreground/70 text-sm">{testimonial.position}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-accent w-6' : 'bg-muted'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
