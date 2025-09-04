'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Home, Plus } from 'lucide-react';
import { ProductItemCard } from '@/components/ui/product-item-card';
import { Button } from '@/components/ui/button';
import type { ProductItem } from '@/hooks/use-project-data';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';

interface ProductionTabProps {
  production: any;
  updateProject: (section: string, field: string, value: any) => void;
  addProduct: () => void;
  updateProductField: (
    index: number,
    field: keyof ProductItem,
    value: any
  ) => void;
  removeProduct: (index: number) => void;
}

function ProductionPreview({ production }: { production: any }) {
  const { products } = production;

  return (
    <div className="min-h-[60vh] max-w-7xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 center-both text-orange-400">
        <Home className="w-6 h-6 mr-3" />
        Sản phẩm & Loại hình
      </h3>

      <div className="flex items-center justify-center flex-wrap gap-8">
        {products.length > 0 ? (
          products.map((product: any, index: number) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group shadow-lg min-w-[45%] max-w-[50%] max-h-[500px] flex-1"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={
                    product.image
                      ? typeof product.image === 'string'
                        ? product.image
                        : URL.createObjectURL(product.image)
                      : '/placeholder.svg'
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h4 className="text-2xl font-bold mb-2 text-orange-300">
                  {product.name}
                </h4>
                <div
                  className="text-shadow-md"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="relative overflow-hidden rounded-lg group shadow-lg min-w-[45%] max-w-[50%] max-h-[500px] flex-1">
            <div className="aspect-[4/3] relative">
              <Image
                src="/placeholder.svg"
                alt="placeholder"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FurniturePreview({ production }: { production: any }) {
  const { furnitureImages } = production;
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const index = carouselApi.selectedScrollSnap();
      setCurrentImageIndex(index);
    };

    onSelect();
    carouselApi.on('select', onSelect);
    carouselApi.on('reInit', onSelect);

    // Auto slide every 3 seconds
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

  return (
    <div className="min-h-[60vh] w-full center-both">
      {furnitureImages.length > 0 ? (
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {furnitureImages.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.4 }}
                  className="relative h-[60vh] w-full overflow-hidden"
                >
                  <Image
                    src={
                      img
                        ? typeof img === 'string'
                          ? img
                          : URL.createObjectURL(img)
                        : '/placeholder.svg'
                    }
                    alt={`Ảnh ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {furnitureImages.map((_: any, i: any) => (
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
      ) : (
        <Image
          src="/placeholder.svg"
          alt="Logo"
          width={500}
          height={400}
          className="object-cover w-full h-[60vh] shadow-lg rounded-sm"
          priority
        />
      )}
    </div>
  );
}

export function ProductionTab({
  production,
  updateProject,
  addProduct,
  updateProductField,
  removeProduct,
}: ProductionTabProps) {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>1. Thông tin sản phẩm</CardTitle>
          <CardDescription>
            Cập nhật thông tin các sản phẩm của dự án
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <ProductionPreview production={production} />
          </div>

          {/* Products List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">
                Danh sách sản phẩm
              </Label>
              <Button variant="outline" size="sm" onClick={addProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm sản phẩm
              </Button>
            </div>
            {production.products.length === 0 ? (
              <div className="p-4 text-center text-gray-500 text-sm border rounded-lg">
                {`Chưa có sản phẩm nào. Nhấn "Thêm sản phẩm" để bắt đầu.`}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {production.products.map(
                  (product: ProductItem, index: number) => (
                    <ProductItemCard
                      key={product.id}
                      product={product}
                      index={index}
                      onUpdate={updateProductField}
                      onRemove={removeProduct}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>2. Nội thất</CardTitle>
          <CardDescription>
            Ảnh sơ bộ về nội thất của các sản phẩm
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <FurniturePreview production={production} />
          </div>
          {/* Furnitures List */}
          <MultiFileUpload
            label="Ảnh nội thất (Không giới hạn số lượng)"
            value={production.furnitureImages}
            onChange={(files) =>
              updateProject('production', 'furnitureImages', files)
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
