'use client';

import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { FadeIn } from '@/components/animations';
import { Search, Phone, Home } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ThemeStatus } from '@/components/theme-status';
import Hero from '@/sections/hero';
import About from '@/sections/about';
import Products from '@/sections/products';
import Contact from '@/sections/contact';
import Partners from '@/sections/partners';
import Career from '@/sections/career';
import News from '@/sections/news';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center"
              >
                <Home className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-xl font-bold">IQI Vietnam</span>
            </Link>

            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm nhanh..."
                    className="pl-10 w-48 bg-muted/50"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Hotline: 1900 1234"
                    className="pl-10 w-48 bg-muted/50"
                    readOnly
                  />
                </div>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with Background */}
      <Hero />

      {/* About IQI Section */}
      <About />

      {/* Products Section */}
      <Products />

      {/* News Section */}
      <News />

      {/* Career Section Preview */}
      <Career />

      {/* Partners Section - Compact Version */}
      <Partners />

      {/* Contact CTA */}
      <Contact />

      {/* Footer */}
      <footer className="bg-muted/50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Về IQI */}
            <FadeIn delay={0.1}>
              <div>
                <h3 className="text-lg font-bold mb-4">Về IQI</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Giới thiệu IQI Vietnam
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about/juwai"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Juwai IQI và IQI Atlas
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Thông tin liên hệ
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Sản phẩm */}
            <FadeIn delay={0.2}>
              <div>
                <h3 className="text-lg font-bold mb-4">Sản phẩm</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/products/international"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Bất động sản Quốc tế
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/hcmc"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Tp.HCM
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/hanoi"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Hà Nội
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/resort"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Bất động sản Nghỉ dưỡng
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Tin tức */}
            <FadeIn delay={0.3}>
              <div>
                <h3 className="text-lg font-bold mb-4">Tin tức</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/news/market"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Thông tin thị trường
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news/real-estate"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Tin tức bất động sản
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news/trends"
                      className="text-muted-foreground hover:text-orange-600 transition-colors"
                    >
                      Xu hướng nhà đầu tư
                    </Link>
                  </li>
                </ul>
              </div>
            </FadeIn>

            {/* Social media */}
            <FadeIn delay={0.4}>
              <div>
                <h3 className="text-lg font-bold mb-4">Social media</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">IQI Vietnam</span>
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.5,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 1,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 1.5,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Juwai IQI</span>
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 0.7,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 1.2,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: 1.7,
                        }}
                        className="w-2 h-2 bg-foreground rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.6}>
            <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 IQI Vietnam. Tất cả quyền được bảo lưu.</p>
            </div>
          </FadeIn>
        </div>
      </footer>
      <ThemeStatus />
    </div>
  );
}
