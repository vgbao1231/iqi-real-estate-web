'use client';

import { ThemeStatus } from '@/app/(main)/components/theme-status';
import Header from '@/app/(main)/layout/header';
import Footer from '@/app/(main)/layout/footer';
import Contact from '@/app/(main)/sections/contact';
import AboutUs from '@/app/(main)/sections/about-us';
import Career from '@/app/(main)/sections/career';
import Hero from '@/app/(main)/sections/hero';
import News from '@/app/(main)/sections/news';
import Partners from '@/app/(main)/sections/partners';
import Products from '@/app/(main)/sections/products';
import AchievementSection from '@/app/(main)/components/achievement-section';

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
      <AchievementSection />

      {/* Contact CTA */}
      <Contact />

      {/* Footer */}
      <Footer />

      {/* Theme Status (Light/Dark Mode) */}
      <ThemeStatus />
    </div>
  );
}
