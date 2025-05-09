import { HeroSlider } from '../components/home/HeroSlider';
import { ServiceGrid } from '../components/home/ServiceGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionBanner } from '../components/home/PromotionBanner';
import { NewProducts } from '../components/home/NewProducts';
import { Partners } from '../components/home/Partners';
import { BlogSection } from '../components/home/BlogSection';
import '../styles/pages/HomePage.css';

export const HomePage = () => {
  return (
    <main className="home-page">
      {/* Hero Slider Section */}
      <HeroSlider />
      
      {/* Dịch vụ Section */}
      <ServiceGrid />
      
      {/* Sản phẩm nổi bật Section */}
      <FeaturedProducts />
      
      {/* Flash Sale Section */}
      <PromotionBanner />
      
      {/* Sản phẩm mới Section */}
      <NewProducts />
      
      {/* Blog Section */}
      <BlogSection />
      
      {/* Thương hiệu Section */}
      <Partners />
    </main>
  );
};
