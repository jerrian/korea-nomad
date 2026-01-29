import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCities from '@/components/home/FeaturedCities';
import HowItWorks from '@/components/home/HowItWorks';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import Features from '@/components/home/Features';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedCities />
        <HowItWorks />
        <Statistics />
        <Testimonials />
        <Features />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
