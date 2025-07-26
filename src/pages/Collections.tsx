
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Updated collection data with new images
const collections = [
  {
    id: "classic",
    name: "Classic Elegance",
    description: "Our signature collection featuring timeless designs on premium materials with sophisticated appeal.",
    image: "/lovable-uploads/67a6ad43-8e7c-4baa-beb3-ddeea6ce8b57.png",
    featured: true
  },
  {
    id: "premium",
    name: "Premium Luxe",
    description: "Refined pieces featuring premium craftsmanship and luxurious materials.",
    image: "/lovable-uploads/072c43ba-3554-4e9c-af4d-45ceaf191e70.png",
    featured: true
  },
  {
    id: "modern",
    name: "Modern Minimalist",
    description: "Contemporary designs with clean lines and sophisticated simplicity.",
    image: "/lovable-uploads/322d52aa-e747-4154-91f0-65cd6a8dbbd1.png",
    featured: false
  },
  {
    id: "artisan",
    name: "Artisan Collection",
    description: "Handcrafted pieces that combine unique artistry with functional design.",
    image: "/lovable-uploads/2b5d7082-d451-4dae-a78b-d33b95244b7f.png",
    featured: false
  }
];

export default function Collections() {
  const [activeCollection, setActiveCollection] = useState(collections[0]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-center mb-6">Our Collections</h1>
        <p className="text-foreground/80 text-lg text-center max-w-3xl mx-auto mb-16">
          Explore our carefully curated collections, each designed with purpose and crafted with premium materials for ultimate comfort and style.
        </p>
        
        {/* Featured Collections */}
        <div className="mb-24">
          <h2 className="text-2xl font-serif font-medium mb-10 text-center">Featured Collections</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {collections.filter(c => c.featured).map((collection) => (
              <div key={collection.id} className="group relative overflow-hidden premium-card aspect-[4/3]">
                <img 
                  src={collection.image} 
                  alt={collection.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl md:text-3xl font-serif mb-2">{collection.name}</h3>
                  <p className="text-white/80 mb-6">{collection.description}</p>
                  <Link to={`/collections/${collection.id}`}>
                    <Button className="premium-button bg-white text-primary hover:bg-white/90">
                      Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Collection Showcase */}
        <div className="mb-20">
          <h2 className="text-2xl font-serif font-medium mb-10 text-center">All Collections</h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {collections.map((collection) => (
              <button
                key={collection.id}
                className={`px-6 py-3 transition-all ${
                  activeCollection.id === collection.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
                onClick={() => setActiveCollection(collection)}
              >
                {collection.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-serif font-medium mb-4">{activeCollection.name}</h3>
              <p className="text-foreground/80 text-lg mb-6">{activeCollection.description}</p>
              
              {activeCollection.id === "classic" && (
                <div className="space-y-4 mb-8">
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Premium natural materials</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Artisan craftsmanship</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Timeless aesthetic</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Luxurious details</p>
                </div>
              )}
              
              {activeCollection.id === "premium" && (
                <div className="space-y-4 mb-8">
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Exclusive designer pieces</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Premium craftsmanship</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Rare materials</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Unparalleled comfort</p>
                </div>
              )}
              
              {activeCollection.id === "modern" && (
                <div className="space-y-4 mb-8">
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Clean geometric designs</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Innovative materials</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Minimalist aesthetic</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Functional versatility</p>
                </div>
              )}
              
              {activeCollection.id === "artisan" && (
                <div className="space-y-4 mb-8">
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Hand-finished details</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Unique artistic elements</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> Natural materials</p>
                  <p className="flex items-center"><span className="w-2 h-2 bg-accent rounded-full mr-2"></span> One-of-a-kind pieces</p>
                </div>
              )}
              
              <Link to={`/collections/${activeCollection.id}`}>
                <Button className="premium-button">
                  Shop This Collection <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="premium-card overflow-hidden order-1 lg:order-2">
              <img 
                src={activeCollection.image} 
                alt={activeCollection.name} 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Lookbook Section with new images */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-serif font-medium mb-6">Seasonal Lookbook</h2>
          <p className="text-foreground/80 max-w-3xl mx-auto mb-12">
            Explore our latest styles and see how our pieces can be styled together for a complete look.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="premium-card overflow-hidden">
              <img 
                src="/lovable-uploads/072c43ba-3554-4e9c-af4d-45ceaf191e70.png" 
                alt="Luxury Sofa" 
                className="w-full h-auto"
              />
            </div>
            <div className="premium-card overflow-hidden">
              <img 
                src="/lovable-uploads/1530f3e8-1b60-4022-9438-0f345444179b.png" 
                alt="Coffee Table" 
                className="w-full h-auto"
              />
            </div>
            <div className="premium-card overflow-hidden">
              <img 
                src="/lovable-uploads/322d52aa-e747-4154-91f0-65cd6a8dbbd1.png" 
                alt="Floor Lamp" 
                className="w-full h-auto"
              />
            </div>
            <div className="premium-card overflow-hidden">
              <img 
                src="/lovable-uploads/67a6ad43-8e7c-4baa-beb3-ddeea6ce8b57.png" 
                alt="Dining Set" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
