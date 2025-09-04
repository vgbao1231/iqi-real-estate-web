'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Gallery, Item } from 'react-photoswipe-gallery';
import Image from 'next/image';

interface ProductDetailDialogProps {
  product: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddToCart: any;
}

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
  onAddToCart,
}: ProductDetailDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const nextImage = () => {
    if (product && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    setIsAdding(true);
    try {
      await onAddToCart(product);
      setIsSuccess(true);
      // Reset success state and close dialog after showing success
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 1500);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentImageIndex(index);
    };

    onSelect();
    carouselApi.on('select', onSelect);
    carouselApi.on('reInit', onSelect);

    // Auto slide every 5 seconds
    const interval = setInterval(() => {
      if (!carouselApi.canScrollNext()) {
        carouselApi.scrollTo(0); // Quay lại ảnh đầu nếu hết
      } else {
        carouselApi.scrollNext();
      }
    }, 5000);

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
      clearInterval(interval);
    };
  }, [carouselApi]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%] md:max-w-4xl max-h-[70vh] md:max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <Gallery>
              <Carousel
                setApi={setCarouselApi}
                opts={{ loop: true, slidesToScroll: 1 }}
              >
                <CarouselContent>
                  {product.images.map((image: any, idx: number) => (
                    <CarouselItem key={idx} className="mr-2">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 + 0.4 }}
                        className="relative aspect-square w-full rounded-lg overflow-hidden"
                      >
                        <Item
                          original={image || '/placeholder-2.webp'} // ảnh gốc
                          thumbnail={image || '/placeholder-2.webp'} // ảnh thumbnail
                          width="1920"
                          height="1080"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref as any}
                              onClick={open}
                              src={image || '/placeholder-2.webp'}
                              alt={`Ảnh ${idx + 1}`}
                              fill
                              priority
                              className="object-cover"
                            />
                          )}
                        </Item>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Dots */}
                <div className="z-10 absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
                  {product.images.map((_: any, i: any) => (
                    <div
                      key={i}
                      className={cn(
                        'h-2 w-2 rounded-full bg-white transition-all',
                        i === currentImageIndex ? 'w-4' : 'bg-gray-300'
                      )}
                    />
                  ))}
                </div>
              </Carousel>
            </Gallery>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => carouselApi?.scrollTo(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                      currentImageIndex === index
                        ? 'border-orange-600'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image || '/placeholder.svg'}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {product.price.toLocaleString('vi-VN')}đ
              </div>
              <p className="text-sm text-gray-500">
                * Chưa bao gồm phí vận chuyển
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                className={`w-full transition-all duration-300 ${
                  isSuccess
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-orange-600 hover:bg-orange-700'
                }`}
                size="lg"
                disabled={isAdding}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang thêm...
                  </>
                ) : isSuccess ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Đã thêm thành công!
                  </motion.div>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm vào giỏ hàng
                  </>
                )}
              </Button>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">Thông tin sản phẩm:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Sản phẩm chính hãng IQI Vietnam</li>
                <li>• Chất lượng cao, bền đẹp</li>
                <li>• Bảo hành theo chính sách của IQI</li>
                <li>• Giao hàng toàn quốc</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
