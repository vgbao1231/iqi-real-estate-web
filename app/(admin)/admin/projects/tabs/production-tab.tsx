'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Home, Plus, Save } from 'lucide-react';
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
import { useState, useEffect, useCallback, memo } from 'react';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { FurnitureUpload } from '@/components/ui/furniture-upload';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { FileUpload } from '@/components/ui/file-upload';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface ProductionTabProps {
  production: any;
  updateProject: (section: string, field: string, value: any) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

const ProductionPreview = memo(function ProductionPreview({
  production,
}: {
  production: any;
}) {
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
                      ? product.image instanceof File
                        ? URL.createObjectURL(product.image)
                        : product.image.url
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
});

const FurniturePreview = memo(function FurniturePreview({
  production,
}: {
  production: any;
}) {
  const { furnitures, furnitureBackground } = production;
  const [carouselApi1, setCarouselApi1] = useState<CarouselApi>();
  const [carouselApi2, setCarouselApi2] = useState<CarouselApi>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function rotate(arr: any, k = 2) {
    return arr.slice(k).concat(arr.slice(0, k));
  }

  useEffect(() => {
    if (!carouselApi1 || !carouselApi2) return;

    const sync1 = () => {
      if (!carouselApi1) return;
      carouselApi1.scrollTo(carouselApi2.selectedScrollSnap());
      setCurrentImageIndex(carouselApi2.selectedScrollSnap());
    };

    const sync2 = () => {
      if (!carouselApi2) return;
      carouselApi2.scrollTo(carouselApi1.selectedScrollSnap());
      setCurrentImageIndex(carouselApi1.selectedScrollSnap());
    };

    carouselApi2.on('select', sync1);
    carouselApi1.on('select', sync2);

    // Auto slide every 5 seconds, 1 is enought cause already had sync
    const interval = setInterval(() => {
      if (!carouselApi1.canScrollNext()) {
        carouselApi1.scrollTo(0); // Quay lại ảnh đầu nếu hết
      } else {
        carouselApi1.scrollNext();
      }
    }, 5000);

    // cleanup
    return () => {
      carouselApi1.off('select', sync1);
      carouselApi2.off('select', sync2);
      clearInterval(interval);
    };
  }, [carouselApi1, carouselApi2]);

  return (
    <div className="relative md:min-h-screen w-full px-4 md:px-12 py-12 md:py-24 flex flex-col justify-center gap-8 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            furnitureBackground
              ? furnitureBackground instanceof File
                ? URL.createObjectURL(furnitureBackground)
                : furnitureBackground.url
              : '/placeholder.svg'
          }
          alt="Eco Retreat Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute inset-0 z-10 backdrop-blur-md bg-white/50 dark:bg-transparent dark:backdrop-brightness-[40%]" />

      {/* Content */}
      <div className="relative z-20 flex items-end w-full gap-4">
        {furnitures.length <= 3 ? (
          <Gallery>
            <Carousel
              className="w-full"
              setApi={setCarouselApi1}
              opts={{ loop: true, slidesToScroll: 1 }}
            >
              <CarouselContent>
                {(furnitures.length > 0
                  ? furnitures
                  : [{ title: 'Placeholder', image: null }]
                ).map((item: any, idx: number) => (
                  <CarouselItem key={idx}>
                    <h4 className="font-bold text-3xl mb-4 truncate whitespace-nowrap">
                      {item.title}
                    </h4>
                    <div className="relative h-[80vh] w-full overflow-hidden">
                      <Image
                        src={
                          item.image
                            ? item.image instanceof File
                              ? URL.createObjectURL(item.image)
                              : item.image.url
                            : '/placeholder.svg'
                        }
                        alt={item.title || `Ảnh ${idx + 1}`}
                        fill
                        priority
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </Gallery>
        ) : (
          <>
            <Gallery>
              <Carousel
                className="w-1/2 shrink-0"
                setApi={setCarouselApi1}
                opts={{ loop: true, slidesToScroll: 1 }}
              >
                <CarouselContent>
                  {furnitures.map((item: any, idx: number) => (
                    <CarouselItem key={idx}>
                      <h4 className="font-bold text-3xl mb-4 truncate whitespace-nowrap">
                        {item.title}
                      </h4>
                      <div className="relative h-[60vh] w-full overflow-hidden">
                        <Item
                          original={item.image || '/placeholder.svg'} // ảnh gốc
                          thumbnail={item.image || '/placeholder.svg'} // ảnh thumbnail
                          width="1220"
                          height="1080"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref as any}
                              onClick={open}
                              src={
                                item.image
                                  ? item.image instanceof File
                                    ? URL.createObjectURL(item.image)
                                    : item.image.url
                                  : '/placeholder.svg'
                              }
                              alt={item.title || `Ảnh ${idx + 1}`}
                              fill
                              priority
                              className="object-cover"
                            />
                          )}
                        </Item>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Dots */}
                <div className="z-10 absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 md:hidden">
                  {furnitures.map((_: any, i: any) => (
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

            <Gallery>
              <Carousel
                className="w-2/3 shrink-0 hidden md:block"
                setApi={setCarouselApi2}
                opts={{ loop: true, slidesToScroll: 1 }}
              >
                <CarouselContent>
                  {rotate(furnitures).map((item: any, idx: number) => (
                    <CarouselItem key={idx} className="pl-4 basis-[33.4%]">
                      <h4 className="font-bold text-2xl mb-2 truncate whitespace-nowrap">
                        {item.title}
                      </h4>
                      <div className="relative h-[60vh] w-full overflow-hidden">
                        <Item
                          original={item.image || '/placeholder.svg'} // ảnh gốc
                          thumbnail={item.image || '/placeholder.svg'} // ảnh thumbnail
                          width="1920"
                          height="1080"
                        >
                          {({ ref, open }) => (
                            <Image
                              ref={ref as any}
                              onClick={open}
                              src={
                                item.image
                                  ? item.image instanceof File
                                    ? URL.createObjectURL(item.image)
                                    : item.image.url
                                  : '/placeholder.svg'
                              }
                              alt={`Ảnh ${idx + 1}`}
                              fill
                              priority
                              className="object-cover"
                            />
                          )}
                        </Item>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </Gallery>
          </>
        )}
      </div>

      {/* Custom nút điều khiển cả 2 */}
      <div className="relative z-20 flex items-center gap-4">
        <Button
          className="w-11 h-11 bg-muted-foreground/30 backdrop-blur-sm rounded-full center-both text-white hover:bg-muted-foreground/50 transition-colors pointer-events-auto"
          onClick={() => {
            carouselApi1?.scrollNext();
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          className="w-11 h-11 bg-muted-foreground/30 backdrop-blur-sm rounded-full center-both text-white hover:bg-muted-foreground/50 transition-colors pointer-events-auto"
          onClick={() => {
            carouselApi1?.scrollPrev();
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
        <h4 className="font-bold text-2xl">
          {currentImageIndex + 1}/{furnitures.length}
        </h4>
      </div>
    </div>
  );
});

export function ProductionTab({
  production,
  updateProject,
  handleSave,
}: ProductionTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const addProduct = useCallback(() => {
    updateProject('production', 'products', [
      ...production.products,
      { id: Date.now().toString(), name: '', image: null, description: '' },
    ]);
  }, [production.products, updateProject]);

  const updateProductField = useCallback(
    (index: number, field: keyof ProductItem, value: any) => {
      const newProducts = production.products.map((product: any, i: any) =>
        i === index ? { ...product, [field]: value } : product
      );

      updateProject('production', 'products', newProducts);
    },
    [production.products, updateProject]
  );

  const removeProduct = useCallback(
    (index: number) => {
      const newProducts = production.products.filter(
        (_: any, i: any) => i !== index
      );

      updateProject('production', 'products', newProducts);
    },
    [production.products, updateProject]
  );

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

          <div className="space-y-4">
            <Label className="text-base font-semibold">Ảnh nền nội thất</Label>
            <FileUpload
              label="Ảnh nền cho phần nội thất"
              value={production.furnitureBackground}
              onChange={(file) =>
                updateProject('production', 'furnitureBackground', file)
              }
            />
          </div>

          {/* Furnitures List */}
          <FurnitureUpload
            label="Ảnh nội thất"
            value={production.furnitures}
            onChange={(furnitures: any) =>
              updateProject('production', 'furnitures', furnitures)
            }
          />
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'production', production)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading
              ? 'Đang lưu...'
              : 'Lưu thông tin sản phẩm'}
          </span>
        </Button>
      </div>
    </div>
  );
}
