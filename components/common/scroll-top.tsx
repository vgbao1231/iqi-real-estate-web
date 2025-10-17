'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const PROGRESS_TRACK_COLOR = '#ffe8db';
const PROGRESS_BAR_COLOR = '#ff9b59';

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const percent = Math.min((scrollY / totalHeight) * 100, 100);
      setScrollPercent(percent);
      setShowButton(scrollY > 800);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 22;
  const circumference = 2 * Math.PI * radius;

  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Lên đầu trang"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          // Thay đổi vị trí và kích thước cho responsive
          className="fixed bottom-12 md:bottom-14 right-4 z-50 rounded-full w-10 h-10 md:w-12 md:h-12 bg-white text-orange-500 shadow-lg center-both"
        >
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 48 48"
            aria-hidden="true" // Thêm aria-hidden vì SVG chỉ mang tính trang trí
          >
            <circle
              cx="24"
              cy="24"
              r={radius} // Giả sử biến 'radius' được tính toán trong component
              fill="none"
              stroke={PROGRESS_TRACK_COLOR}
              strokeWidth="3"
            />
            <circle
              cx="24"
              cy="24"
              r={radius} // Giả sử biến 'radius' được tính toán trong component
              fill="none"
              stroke={PROGRESS_BAR_COLOR}
              strokeWidth="3"
              strokeDasharray={circumference} // Giả sử biến 'circumference' được tính toán
              strokeDashoffset={circumference * (1 - scrollPercent / 100)} // Giả sử biến 'scrollPercent' được tính toán
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
              style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
            />
          </svg>
          {/* Thay đổi kích thước icon cho responsive */}
          <ChevronUp className="relative z-10 w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
