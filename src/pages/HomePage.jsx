import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionBanner } from '../components/home/PromotionBanner';
import { NewProducts } from '../components/home/NewProducts';
import { Partners } from '../components/home/Partners';
import { BlogSection } from '../components/home/BlogSection';

export const HomePage = () => {
  return (
    <main className="home-page w-full">
      {/* Hero Slider Section */}
      <HeroSlider />
      
      {/* Dịch vụ Section */}
      <CategoryGrid />
      
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
