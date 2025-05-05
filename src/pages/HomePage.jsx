import { HeroSlider } from '../components/home/HeroSlider';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { PromotionBanner } from '../components/home/PromotionBanner';
import { NewProducts } from '../components/home/NewProducts';
import { Partners } from '../components/home/Partners';
import { BlogSection } from '../components/home/BlogSection';

export const HomePage = () => {
  return (
    <main className="home-page">
      <HeroSlider />
      <div className="container mx-auto px-4 py-8">
        <CategoryGrid />
        <FeaturedProducts />
        <PromotionBanner />
        <NewProducts />
        <Partners />
        <BlogSection />
      </div>
    </main>
  );
};
