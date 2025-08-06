'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface AmenityTabProps {
  amenity: any;
  updateProject: (section: string, field: string, value: any) => void;
}

function AmenityPreview({ amenity }: { amenity: any }) {
  const { title, description, amenityImages } = amenity;
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
    <div className="h-[70vh] mx-auto center-both flex-col gap-6 px-8">
      <div
        className="font-bold text-center"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div
        className="max-w-4xl text-center text-foreground/80 space-y-2"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {amenityImages.length > 0 ? (
        <Carousel
          className="w-full"
          setApi={setCarouselApi}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {amenityImages.map((img: any, idx: number) => (
              <CarouselItem key={idx} className="pl-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.4 }}
                  className="relative h-[55vh] w-full overflow-hidden"
                >
                  <Image
                    src={img ? URL.createObjectURL(img) : '/placeholder.svg'}
                    alt={`Ảnh ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {amenityImages.map((_: any, i: any) => (
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
          className="object-cover w-full h-[55vh] shadow-lg rounded-sm"
          priority
        />
      )}
    </div>
  );
}

export function AmenityTab({ amenity, updateProject }: AmenityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tiện ích</CardTitle>
        <CardDescription>Cập nhật thông tin tiện ích dự án</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Xem trước:
          </Label>
          <AmenityPreview amenity={amenity} />
        </div>

        <MultiFileUpload
          label="Ảnh tiện ích"
          value={amenity.amenityImages}
          onChange={(files) => updateProject('amenity', 'amenityImages', files)}
        />

        <div className="space-y-2">
          <Label>Tiêu đề tiện ích</Label>
          <RichTextEditor
            value={amenity.title}
            onChange={(value) => updateProject('amenity', 'title', value)}
            placeholder="Nhập tiêu đề tiện ích"
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả tiện ích</Label>
          <RichTextEditor
            value={amenity.description}
            onChange={(value) => updateProject('amenity', 'description', value)}
            placeholder="Nhập mô tả tiện ích"
          />
        </div>
      </CardContent>
    </Card>
  );
}
