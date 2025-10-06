import { FadeIn } from '@/components/common/animations';
import { motion } from 'framer-motion';

const LoadingScreen = ({ loadingText }: any) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <FadeIn className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'linear',
          }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-muted-foreground">{loadingText}</p>
      </FadeIn>
    </div>
  );
};

export default LoadingScreen;
