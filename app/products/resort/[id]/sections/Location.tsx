'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { MapPin, Lightbulb, Car, Building2, Camera, Map } from 'lucide-react';
import { forwardRef } from 'react';

const Location = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <section
        ref={ref}
        id="location"
        className="max-w-7xl mx-auto px-4 space-y-8 py-16"
      >
        <h3 className="text-2xl font-bold mb-4 flex items-center text-red-500">
          <MapPin className="w-6 h-6 mr-3" />
          Vị trí địa lý
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative h-[60vh] w-full rounded-lg overflow-hidden"
          >
            <Image
              src={property.locationMainImage || '/placeholder-2.webp'}
              alt="Vị trí chính dự án"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line"
          >
            {property.locationDescription}
          </motion.p>
        </div>

        <Separator className="my-8" />

        <h4 className="text-xl font-bold mb-4 flex items-center text-foreground">
          <Lightbulb className="w-5 h-5 mr-2" />
          Điểm nổi bật vị trí
        </h4>
        <div className="grid md:grid-cols-3 gap-6">
          {property.locationHighlights.map((highlight: any, index: any) => {
            const IconComponent =
              highlight.icon === 'Car'
                ? Car
                : highlight.icon === 'MapPin'
                  ? MapPin
                  : Building2;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="p-5 bg-card rounded-lg border-l-4 border-blue-500 shadow-md"
              >
                <h5 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <IconComponent className="w-8 h-8 text-blue-500" />
                  {highlight.title}
                </h5>
                <p className="text-sm font-medium text-muted-foreground">
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <Separator className="my-8" />

        <h4 className="font-semibold text-xl mb-4 flex items-center text-foreground">
          <Map className="w-5 h-5 mr-2" />
          Bản đồ khu vực
        </h4>
        <div className="bg-card rounded-lg h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <Map className="w-16 h-16 mx-auto mb-2 text-gray-400" />
            <p className="text-lg">Bản đồ tương tác sẽ hiển thị tại đây</p>
            <p className="text-sm">
              Tọa độ: {property.coordinates.lat}, {property.coordinates.lng}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        <h4 className="font-semibold text-xl mb-4 flex items-center text-gray-800">
          <Camera className="w-5 h-5 mr-2" />
          Hình ảnh vị trí thực tế
        </h4>
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {property.locationGallery.map((img: any, idx: any) => (
              <CarouselItem
                key={idx}
                className="pl-2 md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 + 0.4 }}
                  className="relative h-[50vh] w-full rounded-lg overflow-hidden"
                >
                  <Image
                    src={img || '/placeholder-2.webp'}
                    alt={`Vị trí ảnh ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    );
  }
);

Location.displayName = 'Location';
export default Location;
