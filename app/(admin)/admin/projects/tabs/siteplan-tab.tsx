'use client';

import type React from 'react';

import { useState, useRef, useEffect, useMemo, memo } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { MapPin, Save, X } from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { throttle } from 'lodash';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface Marker {
  id: number;
  longitude: number;
  latitude: number;
  tooltip: string;
  panoramaTarget: string | File;
}

interface View360Item {
  id: number;
  image: string | File;
  markers: Marker[];
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

const Viewer360Preview = memo(function Viewer360Preview({
  siteplan,
  updateProject,
  current360Index,
  setCurrent360Index,
}: any) {
  const [editingMarker, setEditingMarker] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);

  // Handle click on 360 image to add marker
  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !siteplan.view360[current360Index]) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate relative coordinates (0-1 range)
    const relativeX = x / rect.width;
    const relativeY = y / rect.height;

    // Calculate actual image coordinates
    const actualX = relativeX * imageRef.current.naturalWidth;
    const actualY = relativeY * imageRef.current.naturalHeight;

    // Convert to radiant coordinates
    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;
    const longitude = (((actualX / imageWidth) * 360 - 180) * Math.PI) / 180;
    const latitude = ((90 - (actualY / imageHeight) * 180) * Math.PI) / 180;

    const currentView = siteplan.view360[current360Index];
    const newMarker: Marker = {
      id: (currentView.markers?.length || 0) + 1,
      longitude: longitude,
      latitude: latitude,
      tooltip: `Marker ${(currentView.markers?.length || 0) + 1}`,
      panoramaTarget: '',
    };

    const updatedView360 = [...siteplan.view360];
    updatedView360[current360Index] = {
      ...currentView,
      markers: [...(currentView.markers || []), newMarker],
    };

    updateProject('siteplan', 'view360', updatedView360);
    setEditingMarker(newMarker.id);
  };

  // Render marker on image
  const renderMarker = (marker: Marker) => {
    // Dùng imageRect từ state thay vì biến rect cũ
    if (!imageRect || !imageRef.current?.naturalWidth) return null;

    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;

    const actualX =
      (((marker.longitude * 180) / Math.PI + 180) / 360) * imageWidth;
    const actualY =
      ((90 - (marker.latitude * 180) / Math.PI) / 180) * imageHeight;

    // Sử dụng imageRect.width và imageRect.height từ state
    const displayX = (actualX / imageWidth) * imageRect.width;
    const displayY = (actualY / imageHeight) * imageRect.height;

    // JSX để render marker không thay đổi
    return (
      <div
        key={marker.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${displayX}px`,
          top: `${displayY}px`,
        }}
      >
        <div className="relative group">
          <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg center-both cursor-pointer hover:bg-orange-600 transition-colors">
            <MapPin className="w-2 h-2 text-white" />
          </div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {marker.tooltip}
          </div>
        </div>
      </div>
    );
  };

  // Handle clicking on 360 image thumbnail to switch editing
  const handle360ImageSelect = (index: number) => {
    setCurrent360Index(index);
    setEditingMarker(null);
  };

  const view360 = siteplan.view360 || [];
  const currentView = view360?.[current360Index];
  const currentImageMarkers = currentView?.markers || [];
  const imageUrl = useMemo(
    () =>
      // Sử dụng optional chaining (?.) bên trong hook để an toàn hơn
      currentView?.image
        ? currentView.image instanceof File
          ? URL.createObjectURL(currentView.image)
          : currentView.image.url || '/placeholder.svg'
        : '/placeholder.svg',
    // Phụ thuộc vào `currentView?.image` để chỉ tính toán lại khi ảnh thay đổi
    [currentView?.image]
  );

  useEffect(() => {
    const imageElement = imageRef.current;

    // Chỉ thực thi nếu có element và có một ảnh hợp lệ (không phải placeholder)
    if (!imageElement || !currentView?.image) {
      return; // Dừng lại nếu chưa có ảnh thật
    }

    const updateRect = throttle(() => {
      setImageRect(imageElement.getBoundingClientRect());
    }, 100);
    const observer = new ResizeObserver(updateRect);

    observer.observe(imageElement);

    // Dọn dẹp khi component unmount hoặc KHI imageUrl THAY ĐỔI
    return () => {
      observer.disconnect();
    };
  }, [imageUrl, currentView?.image]);

  return (
    <>
      {view360.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {view360.map((viewItem: any, index: any) => (
            <div
              key={viewItem.id}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                index === current360Index
                  ? 'border-orange-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handle360ImageSelect(index)}
            >
              <Image
                src={
                  viewItem.image
                    ? viewItem.image instanceof File
                      ? URL.createObjectURL(viewItem.image)
                      : viewItem.image.url || '/placeholder.svg'
                    : '/placeholder.svg'
                }
                alt={`360 View ${index + 1}`}
                fill
                className="object-cover"
              />
              {/* Marker count badge */}
              {viewItem.markers.length > 0 && (
                <div className="absolute top-1 right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {viewItem.markers.length}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 360 Image with Markers */}
      {currentView && (
        <div className="relative bg-gray-100">
          <Image
            ref={imageRef}
            src={imageUrl}
            alt="360 View"
            width={1920}
            height={1080}
            className="w-full h-auto cursor-crosshair"
            onClick={handleImageClick}
            onLoad={() => {
              if (imageRef.current) {
                setImageRect(imageRef.current.getBoundingClientRect());
              }
            }}
          />

          {/* Render Markers for current image only */}
          {imageRect &&
            currentImageMarkers.map((marker: Marker) => renderMarker(marker))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <strong>Hướng dẫn:</strong> Click vào ảnh 360 để thêm marker. Click
          vào thumbnail ảnh khác để chuyển sang chỉnh sửa ảnh đó. Marker sẽ liên
          kết đến các ảnh 360 khác để tạo tour ảo.
        </p>
      </div>
    </>
  );
});

export function SiteplanTab({
  siteplan,
  updateProject,
  handleSave,
}: SiteplanTabProps) {
  const [current360Index, setCurrent360Index] = useState(0);
  const [editingMarker, setEditingMarker] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageRect, setImageRect] = useState<DOMRect | null>(null);

  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  // Handle siteplan images change
  const handleSiteplanImagesChange = (files: File[]) => {
    updateProject('siteplan', 'siteplanImages', files);
  };

  // Handle 360 images change - preserve existing markers and clean up invalid panoramaTargets
  const handle360ImagesChange = (files: File[]) => {
    const existingView360 = siteplan.view360 || [];

    // Create new view360 array, preserving existing markers where possible
    const newView360: View360Item[] = files.map((file, index) => {
      // Try to find existing view360 item at this index
      const existingItem = existingView360[index];

      return {
        id: index + 1,
        image: file,
        markers: existingItem?.markers || [], // Preserve existing markers
      };
    });

    // Clean up panoramaTargets that reference deleted images
    const cleanedView360 = newView360.map((viewItem) => ({
      ...viewItem,
      markers: viewItem.markers.map((marker: Marker) => {
        // Check if panoramaTarget still exists in the new view360 array
        const targetExists = newView360.some(
          (v, idx) => getImageId(v.image, idx) === marker.panoramaTarget
        );

        return {
          ...marker,
          panoramaTarget: targetExists ? marker.panoramaTarget : '', // Clear if target doesn't exist
        };
      }),
    }));

    updateProject('siteplan', 'view360', cleanedView360);

    // Reset current index if it's out of bounds
    if (current360Index >= files.length) {
      setCurrent360Index(Math.max(0, files.length - 1));
    }
  };

  // Update marker
  const updateMarker = (markerId: number, field: keyof Marker, value: any) => {
    const updatedView360 = [...siteplan.view360];
    const currentView = updatedView360[current360Index];

    updatedView360[current360Index] = {
      ...currentView,
      markers: currentView.markers.map((marker: Marker) =>
        marker.id === markerId ? { ...marker, [field]: value } : marker
      ),
    };

    updateProject('siteplan', 'view360', updatedView360);
  };

  // Delete marker
  const deleteMarker = (markerId: number) => {
    const updatedView360 = [...siteplan.view360];
    const currentView = updatedView360[current360Index];

    updatedView360[current360Index] = {
      ...currentView,
      markers: currentView.markers.filter(
        (marker: Marker) => marker.id !== markerId
      ),
    };

    updateProject('siteplan', 'view360', updatedView360);
    setEditingMarker(null);
  };

  // Get image identifier for comparison (used for panoramaTarget matching)
  const getImageId = (image: string | File, index: number) => {
    if (typeof image === 'string') {
      return image;
    }
    // For File objects, use a combination of name, size, and index as identifier
    return `${image.name}_${image.size}_${index}`;
  };

  // Render marker on image
  const renderMarker = (marker: Marker) => {
    // Dùng imageRect từ state thay vì biến rect cũ
    if (!imageRect || !imageRef.current?.naturalWidth) return null;

    const imageWidth = imageRef.current.naturalWidth;
    const imageHeight = imageRef.current.naturalHeight;

    const actualX =
      (((marker.longitude * 180) / Math.PI + 180) / 360) * imageWidth;
    const actualY =
      ((90 - (marker.latitude * 180) / Math.PI) / 180) * imageHeight;

    // Sử dụng imageRect.width và imageRect.height từ state
    const displayX = (actualX / imageWidth) * imageRect.width;
    const displayY = (actualY / imageHeight) * imageRect.height;

    // JSX để render marker không thay đổi
    return (
      <div
        key={marker.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{
          left: `${displayX}px`,
          top: `${displayY}px`,
        }}
      >
        <div className="relative group">
          <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg center-both cursor-pointer hover:bg-orange-600 transition-colors">
            <MapPin className="w-2 h-2 text-white" />
          </div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {marker.tooltip}
          </div>
        </div>
      </div>
    );
  };

  // Handle clicking on 360 image thumbnail to switch editing
  const handle360ImageSelect = (index: number) => {
    setCurrent360Index(index);
    setEditingMarker(null);
  };

  const siteplanImages = siteplan.siteplanImages || [];
  const view360 = siteplan.view360 || [];
  const currentView = view360?.[current360Index];
  const currentImageMarkers = currentView?.markers || [];
  const imageUrl = useMemo(() => {
    const img = currentView?.image;
    return img
      ? img instanceof File
        ? URL.createObjectURL(img)
        : img.url || '/placeholder.svg'
      : '/placeholder.svg';
  }, [currentView?.image]);

  useEffect(() => {
    const imageElement = imageRef.current;

    // Chỉ thực thi nếu có element và có một ảnh hợp lệ (không phải placeholder)
    if (!imageElement || !currentView?.image) {
      return; // Dừng lại nếu chưa có ảnh thật
    }

    const updateRect = throttle(() => {
      setImageRect(imageElement.getBoundingClientRect());
    }, 100);
    const observer = new ResizeObserver(updateRect);

    observer.observe(imageElement);

    // Dọn dẹp khi component unmount hoặc KHI imageUrl THAY ĐỔI
    return () => {
      observer.disconnect();
    };
  }, [imageUrl, currentView?.image]);

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
            Upload ảnh 360 và thêm marker liên kết
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <MultiFileUpload
            label="Ảnh 360 View"
            value={view360.map((v: any) => v.image)}
            onChange={handle360ImagesChange}
          />

          {/* 360 View Interface */}
          {view360.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  Chỉnh sửa 360 View
                </Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Ảnh {current360Index + 1} / {view360.length} (
                    {currentImageMarkers.length} marker)
                  </span>
                </div>
              </div>

              {/* 360 Images Thumbnail Grid */}
              <Viewer360Preview
                siteplan={siteplan}
                updateProject={updateProject}
                current360Index={current360Index}
                setCurrent360Index={setCurrent360Index}
              />

              {/* Marker List for current image */}
              {currentImageMarkers.length > 0 && (
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Marker của ảnh {current360Index + 1} (
                    {currentImageMarkers.length} marker)
                  </Label>
                  <div className="space-y-3">
                    {currentImageMarkers.map(
                      (marker: Marker, index: number) => (
                        <div
                          key={marker.id}
                          className="border rounded-lg p-4 bg-white"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-4 h-4 bg-orange-500 rounded-full border border-white center-both">
                                <span className="text-xs text-white font-bold">
                                  {index + 1}
                                </span>
                              </div>
                              <span className="font-medium">
                                Marker {index + 1}
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMarker(marker.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`marker-tooltip-${marker.id}`}>
                                Tooltip
                              </Label>
                              <Input
                                id={`marker-tooltip-${marker.id}`}
                                value={marker.tooltip}
                                onChange={(e) =>
                                  updateMarker(
                                    marker.id,
                                    'tooltip',
                                    e.target.value
                                  )
                                }
                                placeholder="Nhập tooltip cho marker"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`marker-target-${marker.id}`}>
                                Liên kết đến ảnh 360 khác
                              </Label>
                              <Select
                                value={
                                  marker.panoramaTarget
                                    ? view360
                                        .findIndex(
                                          (v: any, idx: any) =>
                                            getImageId(v.image, idx) ===
                                            marker.panoramaTarget
                                        )
                                        .toString()
                                    : 'none'
                                }
                                onValueChange={(value) => {
                                  if (value === 'none') {
                                    updateMarker(
                                      marker.id,
                                      'panoramaTarget',
                                      ''
                                    );
                                  } else {
                                    const targetIndex = Number.parseInt(value);
                                    const targetImage =
                                      view360[targetIndex]?.image;
                                    updateMarker(
                                      marker.id,
                                      'panoramaTarget',
                                      getImageId(targetImage, targetIndex)
                                    );
                                  }
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Chọn ảnh 360 đích" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">
                                    Không liên kết
                                  </SelectItem>
                                  {view360.map(
                                    (viewItem: any, imgIndex: any) => {
                                      // Only show other images, not the current one
                                      if (imgIndex === current360Index)
                                        return null;
                                      return (
                                        <SelectItem
                                          key={viewItem.id}
                                          value={imgIndex.toString()}
                                        >
                                          Ảnh 360 - {imgIndex + 1}
                                        </SelectItem>
                                      );
                                    }
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="mt-3 text-xs text-gray-500 grid grid-cols-1 gap-2">
                            <div>
                              <strong>Radiant:</strong> Longitude:{' '}
                              {marker.longitude.toFixed(4)}, Latitude:{' '}
                              {marker.latitude.toFixed(4)}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
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
