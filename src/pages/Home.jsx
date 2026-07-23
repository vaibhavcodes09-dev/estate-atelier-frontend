import Hero from '@/components/home/Hero';
import FeaturedCities from '@/components/home/FeaturedCities';
import PropertyCategories from '@/components/home/PropertyCategories';
import FeaturedProperties from '@/components/home/FeaturedProperties';
import StatsBand from '@/components/home/StatsBand';
import Services from '@/components/home/Services';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import MarketInsights from '@/components/home/MarketInsights';
import Tools from '@/components/home/Tools';
import Testimonials from '@/components/home/Testimonials';
import Developers from '@/components/home/Developers';
import FAQ from '@/components/home/FAQ';
import CTABanner from '@/components/home/CTABanner';
import LeadForm from '@/components/forms/LeadForm';

// Home page — assembles all existing landing-page sections.
// This is the same composition that was previously in pages/Home.jsx,
// now rendered inside MainLayout via the router.
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCities />
      <PropertyCategories />
      <FeaturedProperties />
      <StatsBand />
      <Services />
      <WhyChooseUs />
      <MarketInsights />
      <Tools />
      <Testimonials />
      <Developers />
      <FAQ />
      <CTABanner />
      <LeadForm />
    </>
  );
}
