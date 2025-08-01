'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils'; // nếu bạn đang dùng hàm tiện ích này
import React from 'react';

type OutroSectionProps = {
  title?: string;
  subtitle?: string;
  primary?: {
    label: string;
    href: string;
    variant?: any;
  };
  secondary?: {
    label: string;
    href: string;
    variant?: any;
  };
  className?: string;
};

export default function OutroSection({
  title = 'Bạn có câu hỏi về IQI Vietnam?',
  subtitle = 'Liên hệ với chúng tôi để được tư vấn chi tiết về các dịch vụ và cơ hội hợp tác',
  primary = {
    label: 'Liên hệ ngay',
    href: '/contact',
  },
  secondary,
  className = '',
}: OutroSectionProps) {
  return (
    <section
      className={cn(
        'py-16 md:px-12 bg-gradient-to-r from-orange-400/90 to-orange-500 dark:from-orange-500 dark:to-orange-600 text-white',
        className
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">{subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Primary Button */}
          {primary && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={primary.href}>
                <Button
                  size="lg"
                  variant={primary.variant || 'default'}
                  className="bg-white text-orange-600 hover:bg-gray-100"
                >
                  {primary.label}
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Secondary Button (nếu có) */}
          {secondary && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={secondary.href}>
                <Button
                  size="lg"
                  variant={secondary.variant || 'outline'}
                  className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent"
                >
                  {secondary.label}
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
