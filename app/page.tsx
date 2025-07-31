'use client';

import { ThemeStatus } from '@/components/common/theme-status';
import Hero from '@/components/sections/hero';
import AboutUs from '@/components/sections/about-us';
import Products from '@/components/sections/products';
import Contact from '@/components/sections/contact';
import Partners from '@/components/sections/partners';
import Career from '@/components/sections/career';
import News from '@/components/sections/news';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Achievement from '@/components/sections/achievement';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      {/* Header */}
      <Header />

      {/* Hero Section with Background */}
      <Hero />

      {/* About IQI Section */}
      <AboutUs />

      {/* Products Section */}
      <Products />

      {/* News Section */}
      <News />

      {/* Career Section Preview */}
      <Career />

      {/* Partners Section - Compact Version */}
      <Partners />

      {/* Achievement */}
      <Achievement />

      {/* Contact CTA */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Theme Status (Light/Dark Mode) */}
      <ThemeStatus />
    </div>
  );
}
