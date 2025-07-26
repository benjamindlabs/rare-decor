
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CollectionBanner from '@/components/home/CollectionBanner';
import BrandStory from '@/components/home/BrandStory';
import TestimonialSection from '@/components/home/TestimonialSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import NewsletterSection from '@/components/home/NewsletterSection';
import RecentlyViewedSection from '@/components/products/RecentlyViewedSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <CollectionBanner />
      <BrandStory />
      <TestimonialSection />
      <RecentlyViewedSection />
      <InstagramFeed />
      <NewsletterSection />
    </Layout>
  );
};

export default Index;
