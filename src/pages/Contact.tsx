
import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      toast({
        variant: "destructive",
        title: "Please fill all required fields",
        description: "Name, email and message are required.",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setLoading(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-center mb-6">Get In Touch</h1>
          <p className="text-foreground/80 text-lg text-center max-w-2xl mx-auto mb-12">
            We'd love to hear from you. Whether you have a question about our products, need support, or want to discuss a collaboration, our team is here to help.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="space-y-8">
                <div className="bg-secondary/20 premium-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">
                      <MapPin className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Our Location</h3>
                      <p className="text-foreground/70">123 Fashion Street</p>
                      <p className="text-foreground/70">Benin City, Edo State, Nigeria</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/20 premium-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">
                      <Mail className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Email Us</h3>
                      <p className="text-foreground/70">info@godfirstson.com</p>
                      <p className="text-foreground/70">support@godfirstson.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/20 premium-card p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0">
                      <Phone className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">Call Us</h3>
                      <p className="text-foreground/70">+234 123 456 7890</p>
                      <p className="text-foreground/70">Mon-Fri, 9am-5pm</p>
                    </div>
                  </div>
                </div>
                
                <div className="premium-card overflow-hidden h-80">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126928.36650199929!2d5.521931343095482!3d6.337389158438099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1040d650cbad9bff%3A0x51dac2bcd722ae8e!2sBenin%20City%2C%20Edo!5e0!3m2!1sen!2sng!4v1697560121091!5m2!1sen!2sng" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Map of Benin City, Edo State, Nigeria"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2 order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="premium-card p-8 bg-secondary/10">
                <h2 className="text-2xl font-serif font-medium mb-6">Send Us a Message</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mb-6">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject of your message"
                  />
                </div>
                
                <div className="space-y-2 mb-6">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    rows={6}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="premium-button w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
