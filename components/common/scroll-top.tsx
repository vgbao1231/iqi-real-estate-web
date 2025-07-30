import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '../ui/button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Hiện nút khi scroll xuống quá 200px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="outline"
      className="fixed bottom-6 right-6 z-50 text-primary hover:bg-orange-500 hover:text-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Scroll to top"
    >
      <ArrowUp />
    </Button>
  );
};

export default ScrollToTopButton;
