'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Loader2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function ProductCard({ product, onAddToCart, onViewDetail }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await onAddToCart(product);
      setIsSuccess(true);
      // Reset success state after animation
      setTimeout(() => setIsSuccess(false), 2000);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
            <Image
              src={product.images[0]?.url || '/placeholder.svg'}
              alt={product.name}
              width={400}
              height={400}
              onClick={() => onViewDetail(product)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            />
            {product.images.length > 1 && (
              <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
                +{product.images.length - 1} ảnh
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base mb-2 line-clamp-1">
            {product.name}
          </CardTitle>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="mb-3">
            <span className="text-lg font-bold text-orange-500">
              {product.price.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className={`w-full relative transition-all duration-300 ${
              isSuccess
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-orange-500 hover:bg-orange-600'
            }`}
            size="sm"
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
                Đã thêm!
              </motion.div>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Thêm vào giỏ
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
