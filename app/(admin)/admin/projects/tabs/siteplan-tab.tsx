'use client';

import type React from 'react';

import { useState, useEffect, memo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Save } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface Marker {
  id: number;
  longitude: number;
  latitude: number;
  tooltip: string;
  panoramaTarget: string | File;
}
interface SiteplanTabProps {
  siteplan: any;
  updateProject: (section: string, field: string, value: any) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

const SiteplanPreview = memo(function SiteplanPreview({ siteplanImages }: any) {
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

    return () => {
      carouselApi.off('select', onSelect);
      carouselApi.off('reInit', onSelect);
    };
  }, [carouselApi]);

  return (
    <>
      {siteplanImages.length > 1 ? (
        // 👉 Nhiều ảnh => Carousel
        <div className="min-h-[60vh] w-full center-both">
          <Carousel
            className="w-full"
            setApi={setCarouselApi}
            opts={{ loop: true }}
          >
            <CarouselContent>
              {siteplanImages.map((img: any, idx: number) => (
                <CarouselItem key={idx} className="pl-0">
                  <div className="relative h-[70vh] w-full overflow-hidden">
                    <Image
                      src={
                        img
                          ? img instanceof File
                            ? URL.createObjectURL(img)
                            : img.url
                          : '/placeholder.svg'
                      }
                      alt={`Ảnh ${idx + 1}`}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Dots */}
            <div className="z-10 absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
              {siteplanImages.map((_: any, i: any) => (
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
        </div>
      ) : (
        <Image
          src={
            siteplanImages[0]
              ? siteplanImages[0] instanceof File
                ? URL.createObjectURL(siteplanImages[0])
                : siteplanImages[0].url
              : '/placeholder.svg'
          }
          alt="Ảnh mặt bằng"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      )}
    </>
  );
});

export function SiteplanTab({
  siteplan,
  updateProject,
  handleSave,
}: SiteplanTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  // Handle siteplan images change
  const handleSiteplanImagesChange = (files: File[]) => {
    updateProject('siteplan', 'siteplanImages', files);
  };

  const siteplanImages = siteplan.siteplanImages || [];

  return (
    <div className="space-y-8">
      {/* Section 1: Siteplan Images */}
      <Card>
        <CardHeader>
          <CardTitle>Mặt bằng</CardTitle>
          <CardDescription>
            Upload và quản lý ảnh mặt bằng dự án
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Siteplan Carousel */}
          {siteplanImages.length > 0 && (
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Xem trước Mặt bằng
              </Label>

              {/* Main Image Display */}
              <SiteplanPreview siteplanImages={siteplanImages} />
            </div>
          )}
          <MultiFileUpload
            label="Ảnh mặt bằng"
            value={siteplanImages}
            onChange={handleSiteplanImagesChange}
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Section 2: 360 View */}
      <Card>
        <CardHeader>
          <CardTitle>360 View</CardTitle>
          <CardDescription>
            Đường dẫn tới trang 360 view của dự án
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Input
            id="embedCode"
            value={siteplan.view360}
            onChange={(e) =>
              updateProject('siteplan', 'view360', e.target.value)
            }
            placeholder="https://360.eco-retreat.com.vn/plan"
          />
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'siteplan', siteplan)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading
              ? 'Đang lưu...'
              : 'Lưu thông tin mặt bằng'}
          </span>
        </Button>
      </div>
    </div>
  );
}
