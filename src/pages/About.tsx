
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-6">About Rare Home Decor</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-foreground/80 text-lg mb-4">
                Founded with a vision to create premium home décor that makes a statement, Rare Home Decor is more than just a brand - it's a philosophy that celebrates artistry, excellence, and authentic expression.
              </p>
              <p className="text-foreground/80 text-lg mb-4">
                Our designs combine modern aesthetics with timeless values, creating pieces that are both fashionable and meaningful.
              </p>
              <p className="text-foreground/80 text-lg">
                Each item in our collection is crafted with precision and passion, using high-quality materials that ensure both beauty and durability.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1974&auto=format&fit=crop" 
                alt="Rare Home Decor Piece" 
                className="w-full h-auto premium-card"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-medium mb-4">Our Mission</h2>
            <p className="text-foreground/80 text-lg mb-6">
              At Rare Home Decor, our mission is to inspire individuals to create spaces that reflect their unique identity with confidence and purpose. We believe that interior design is a powerful form of self-expression, and our goal is to provide high-quality décor that transforms houses into distinctive homes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-secondary/20 p-6 premium-card">
                <h3 className="text-xl font-medium mb-2">Quality</h3>
                <p>We never compromise on the quality of our materials or craftsmanship. Each piece is designed to last and provide exceptional beauty.</p>
              </div>
              <div className="bg-secondary/20 p-6 premium-card">
                <h3 className="text-xl font-medium mb-2">Authenticity</h3>
                <p>Our designs are created with purpose and meaning, reflecting our commitment to genuine artistic expression and timeless style.</p>
              </div>
              <div className="bg-secondary/20 p-6 premium-card">
                <h3 className="text-xl font-medium mb-2">Community</h3>
                <p>We're building more than a brand - we're creating a community of design enthusiasts who share our vision for beautiful living.</p>
              </div>
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl font-serif font-medium mb-4">The Team</h2>
            <p className="text-foreground/80 text-lg mb-8">
              Rare Home Decor was founded by a team of passionate designers and entrepreneurs who saw the need for meaningful, high-quality interior pieces that speak to both style and substance.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 overflow-hidden rounded-full mb-4">
                  <img 
                    src="/lovable-uploads/d94f3b47-42ad-4afe-9e52-c71890d38c2d.png" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium">Creative Director</h3>
                <p className="text-foreground/70">Visionary behind our unique designs</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-48 h-48 overflow-hidden rounded-full mb-4">
                  <img 
                    src="/lovable-uploads/db2113fd-b6c1-4f8c-b05b-baa12d58e06e.png" 
                    alt="Team Member" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium">Head of Production</h3>
                <p className="text-foreground/70">Ensures the highest quality standards</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <h2 className="text-2xl font-serif font-medium mb-6">Experience Our Collection</h2>
            <div className="flex justify-center gap-4">
              <Link to="/collections">
                <Button className="premium-button">
                  View Collections
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
