'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Play } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn, convertToEmbedUrl } from '@/lib/utils';
import { motion } from 'framer-motion';

interface IntroductionTabProps {
  introduction: any;
  updateProject: (section: string, field: string, value: any) => void;
}

// Cover Section Preview Component
function CoverSectionPreview({ introduction }: { introduction: any }) {
  const {
    coverBackground,
    logoImages,
    headerLogoIndex,
    coverLogoIndex,
    coverTitle,
  } = introduction;

  const navigationItems = [
    'GIỚI THIỆU',
    'TỔNG QUAN',
    'VỊ TRÍ',
    'SẢN PHẨM',
    'TIỆN ÍCH',
    'CHÍNH SÁCH',
    'TIẾN ĐỘ',
    'ĐẠI LÝ',
  ];

  return (
    <div className="container mx-auto relative h-[60vh] w-full max-w-7xl center-both">
      {/* Header */}
      <header className="absolute top-0 z-10 w-full bg-background py-2 shadow-md">
        <div className="mx-auto overflow-x-auto px-4 scrollbar-hide">
          <div className="flex items-center justify-between">
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-24 h-14 relative center-both ml-32 cursor-pointer"
            >
              <Image
                src={
                  logoImages[headerLogoIndex]
                    ? URL.createObjectURL(logoImages[headerLogoIndex])
                    : '/placeholder.svg'
                }
                alt="Eco Retreat Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <nav className="flex justify-end mr-24">
              {navigationItems.map((item, idx) => (
                <Button
                  key={idx}
                  variant="ghost"
                  className="text-foreground text-sm font-bold hover:bg-transparent uppercase p-2"
                >
                  {item}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>
      {/* Background image full screen */}
      <Image
        src={
          coverBackground
            ? URL.createObjectURL(coverBackground)
            : '/placeholder.svg'
        }
        alt="Eco Retreat Cover Background"
        fill
        className="object-cover text-shadow-lg shadow-md"
        priority
      />

      <div className="bg-gradient-to-b from-transparent via-black/20 to-transparent absolute inset-0 z-10"></div>
      <div className="relative z-20 center-both flex-col gap-2 p-8 text-center text-white">
        {/* Logo */}
        <div className="w-full min-w-24 h-32 relative center-both">
          <Image
            src={
              logoImages[coverLogoIndex]
                ? URL.createObjectURL(logoImages[coverLogoIndex])
                : '/placeholder.svg'
            }
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-4xl mx-auto">
          <div className="text-3xl drop-shadow-lg md:text-5xl text-nowrap py-4 font-bold bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent">
            {coverTitle}
          </div>
        </div>
      </div>
    </div>
  );
}

// Introduction Section Preview Component
function IntroductionSectionPreview({ introduction }: { introduction: any }) {
  const {
    introductionBackground,
    introductionImage,
    introductionTitle,
    introductionDescription,
  } = introduction;

  return (
    <div className="container mx-auto relative h-[60vh] w-full max-w-7xl center-both">
      {/* Background image full screen */}
      <Image
        src={
          introductionBackground
            ? URL.createObjectURL(introductionBackground)
            : '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />

      {/* Content */}
      <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 px-16 gap-8">
        {/* Left content */}
        <div className="md:w-1/2 text-white space-y-4">
          <div
            className="text-lg space-y-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: introductionTitle }}
          />

          <div
            className="text-lg space-y-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: introductionDescription }}
          />
        </div>

        {/* Right hero image */}
        <Image
          src={
            introductionImage
              ? URL.createObjectURL(introductionImage)
              : '/placeholder.svg'
          }
          alt="Logo"
          width={500}
          height={400}
          className="object-contain w-auto h-[50vh] shadow-lg rounded-sm"
          priority
        />
      </div>
    </div>
  );
}

// Launch Section Preview Component (formerly Hero Section)
function LaunchSectionPreview({ introduction }: { introduction: any }) {
  const { launchTitle, launchDescription, launchImages } = introduction;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

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
    <div className="container mx-auto relative h-[60vh] w-full max-w-7xl center-both">
      <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 px-12 gap-6">
        {/* Left content */}
        <div className="relative md:w-1/2 w-full h-[50vh] center-both">
          {launchImages.length > 0 ? (
            <Carousel
              className="w-full"
              setApi={setCarouselApi}
              opts={{ loop: true }}
            >
              <CarouselContent>
                {launchImages.map((img: any, idx: number) => (
                  <CarouselItem key={idx} className="pl-0">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 + 0.4 }}
                      className="relative h-[50vh] w-full overflow-hidden"
                    >
                      <Image
                        src={
                          img ? URL.createObjectURL(img) : '/placeholder.svg'
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
                {launchImages.map((_: any, i: any) => (
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
              className="object-contain w-auto h-[50vh] shadow-lg rounded-sm"
              priority
            />
          )}
        </div>

        {/* Right content */}
        <div className="md:w-1/2 space-y-6">
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="text-center space-y-1">
              {/* Tên sản phẩm */}
              <div
                className="font-bold italic"
                dangerouslySetInnerHTML={{ __html: launchTitle }}
              />
            </div>

            {/* Danh sách mô tả chi tiết */}
            <div
              className="text-lg ml-4 text-center"
              dangerouslySetInnerHTML={{ __html: launchDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Video Section Preview Component
function VideoSectionPreview({ introduction }: { introduction: any }) {
  const isYouTube =
    introduction.introductionVideo &&
    introduction.introductionVideo.includes('youtube');
  const videoSrc = introduction.introductionVideo || '';

  return (
    <div className=" bg-gray-900 rounded-lg overflow-hidden">
      <div className="w-full h-[60vh] aspect-video center-both">
        {videoSrc ? (
          isYouTube ? (
            <iframe
              src={convertToEmbedUrl(videoSrc) ?? ''}
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <video controls className="w-full h-full object-cover">
              <source
                src={
                  typeof videoSrc === 'string'
                    ? videoSrc
                    : URL.createObjectURL(videoSrc)
                }
                type="video/mp4"
              />
            </video>
          )
        ) : (
          <div className="text-center text-gray-400">
            <Play className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg">Video giới thiệu sẽ hiển thị ở đây</p>
            <p className="text-sm">Hỗ trợ YouTube URL hoặc file video</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function IntroductionTab({
  introduction,
  updateProject,
}: IntroductionTabProps) {
  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        const newLogos = [...introduction.logoImages, ...files];
        updateProject('introduction', 'logoImages', newLogos);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-8">
      {/* Section 1: Cover Section with Logo Management */}
      <Card>
        <CardHeader>
          <CardTitle>1. Phần bìa</CardTitle>
          <CardDescription>
            Ảnh bìa với header, logo và tiêu đề chính
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <CoverSectionPreview introduction={introduction} />
          </div>

          <Separator />

          {/* Logo Management */}
          <div className="space-y-4">
            <Label>Logo (Không giới hạn số lượng)</Label>

            {introduction.logoImages.length === 0 ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                onClick={handleLogoUpload}
              >
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm mb-2">
                  Chưa có logo nào. Nhấn vào đây để thêm logo.
                </p>
                <p className="text-xs text-gray-400">
                  Hỗ trợ chọn nhiều ảnh cùng lúc
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {introduction.logoImages.map((logo: any, index: number) => {
                    const logoSrc =
                      typeof logo === 'string'
                        ? logo
                        : URL.createObjectURL(logo);
                    const logoName =
                      typeof logo === 'string'
                        ? logo.split('/').pop()
                        : logo.name;

                    return (
                      <div
                        key={index}
                        className="relative group border rounded-lg overflow-hidden bg-white"
                      >
                        <img
                          src={logoSrc || '/placeholder.svg'}
                          alt={`Logo ${index + 1}`}
                          className="w-full h-20 object-contain p-2"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              const newLogos = introduction.logoImages.filter(
                                (_: any, i: number) => i !== index
                              );
                              updateProject(
                                'introduction',
                                'logoImages',
                                newLogos
                              );
                              // Reset logo indices if they're out of bounds
                              if (
                                introduction.headerLogoIndex >= newLogos.length
                              ) {
                                updateProject(
                                  'introduction',
                                  'headerLogoIndex',
                                  Math.max(0, newLogos.length - 1)
                                );
                              }
                              if (
                                introduction.centerLogoIndex >= newLogos.length
                              ) {
                                updateProject(
                                  'introduction',
                                  'centerLogoIndex',
                                  Math.max(0, newLogos.length - 1)
                                );
                              }
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="p-2 bg-gray-50">
                          <p className="text-xs text-gray-600 truncate">
                            {logoName}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add more logos placeholder */}
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center h-20"
                    onClick={handleLogoUpload}
                  >
                    <Upload className="h-6 w-6 text-gray-400 mb-1" />
                    <span className="text-xs text-gray-500">Thêm logo</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cover Section Settings */}
          <div className="space-y-6">
            <FileUpload
              label="Ảnh nền bìa (Cover Background)"
              value={introduction.coverBackground}
              onChange={(file) =>
                updateProject('introduction', 'coverBackground', file)
              }
            />

            <div className="space-y-2">
              <Label htmlFor="coverTitle">Tiêu đề bìa (Cover Title)</Label>
              <Input
                id="coverTitle"
                value={introduction.coverTitle}
                onChange={(e) =>
                  updateProject('introduction', 'coverTitle', e.target.value)
                }
                placeholder="Nhập tiêu đề trang bìa"
              />
            </div>

            <Separator />

            {/* Logo Selection */}
            <div className="space-y-4">
              {introduction.logoImages.length > 0 && (
                <>
                  <div className="space-y-2">
                    <Label>Logo cho header (bên trái)</Label>
                    <Select
                      value={introduction.headerLogoIndex?.toString() || '0'}
                      onValueChange={(value) =>
                        updateProject(
                          'introduction',
                          'headerLogoIndex',
                          Number.parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn logo cho header" />
                      </SelectTrigger>
                      <SelectContent>
                        {introduction.logoImages.map(
                          (logo: any, index: number) => {
                            const logoName =
                              typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo.name;
                            return (
                              <SelectItem key={index} value={index.toString()}>
                                Logo {index + 1} - {logoName}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Logo cho giữa trang</Label>
                    <Select
                      value={introduction.coverLogoIndex?.toString() || '0'}
                      onValueChange={(value) =>
                        updateProject(
                          'introduction',
                          'coverLogoIndex',
                          Number.parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn logo cho giữa trang" />
                      </SelectTrigger>
                      <SelectContent>
                        {introduction.logoImages.map(
                          (logo: any, index: number) => {
                            const logoName =
                              typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo.name;
                            return (
                              <SelectItem key={index} value={index.toString()}>
                                Logo {index + 1} - {logoName}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {introduction.logoImages.length === 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Vui lòng thêm ít nhất một logo để có thể chọn logo cho
                    header và trang bìa.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle>2. Phần giới thiệu</CardTitle>
          <CardDescription>Nội dung giới thiệu chi tiết</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <IntroductionSectionPreview introduction={introduction} />
          </div>

          <Separator />

          {/* Form Fields arranged to match preview layout */}
          <FileUpload
            label="Ảnh nền giới thiệu (Introduction Background)"
            value={introduction.introductionBackground}
            onChange={(file) =>
              updateProject('introduction', 'introductionBackground', file)
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Content */}
            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-900">
                Bên trái - Nội dung
              </Label>

              <div className="space-y-2">
                <Label htmlFor="introductionTitle">
                  Tiêu đề giới thiệu (Introduction Title)
                </Label>
                <RichTextEditor
                  value={introduction.introductionTitle}
                  onChange={(value) =>
                    updateProject('introduction', 'introductionTitle', value)
                  }
                  placeholder="Nhập tiêu đề phần giới thiệu..."
                />
              </div>

              <div className="space-y-2">
                <Label>Mô tả giới thiệu (Introduction Description)</Label>
                <RichTextEditor
                  value={introduction.introductionDescription}
                  onChange={(value) =>
                    updateProject(
                      'introduction',
                      'introductionDescription',
                      value
                    )
                  }
                  placeholder="Nhập mô tả giới thiệu..."
                />
              </div>
            </div>

            {/* Right side - Image */}
            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-900">
                Bên phải - Ảnh
              </Label>

              <FileUpload
                label="Ảnh giới thiệu (Introduction Image)"
                value={introduction.introductionImage}
                onChange={(file) =>
                  updateProject('introduction', 'introductionImage', file)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Launch Section (formerly Hero Section) */}
      <Card>
        <CardHeader>
          <CardTitle>3. Phần ra mắt</CardTitle>
          <CardDescription>Nội dung ra mắt với carousel ảnh</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <LaunchSectionPreview introduction={introduction} />
          </div>

          <Separator />

          {/* Form Fields arranged to match preview layout */}
          <div className="space-y-6">
            {/* Launch Images (Left) and Content (Right) - matching preview layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Launch Images Carousel */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-900">
                  Bên trái - Ảnh ra mắt (Carousel)
                </Label>
                <MultiFileUpload
                  label="Ảnh ra mắt (Launch Images)"
                  value={introduction.launchImages}
                  onChange={(files) =>
                    updateProject('introduction', 'launchImages', files)
                  }
                />
              </div>

              {/* Right side - Content */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-gray-900">
                  Bên phải - Nội dung
                </Label>

                <div className="space-y-2">
                  <Label htmlFor="launchTitle">
                    Tiêu đề ra mắt (Launch Title)
                  </Label>
                  <Input
                    id="launchTitle"
                    value={introduction.launchTitle}
                    onChange={(e) =>
                      updateProject(
                        'introduction',
                        'launchTitle',
                        e.target.value
                      )
                    }
                    placeholder="Nhập tiêu đề ra mắt"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả ra mắt (Launch Description)</Label>
                  <RichTextEditor
                    value={introduction.launchDescription}
                    onChange={(value) =>
                      updateProject('introduction', 'launchDescription', value)
                    }
                    placeholder="Nhập mô tả ra mắt..."
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Video Section */}
      <Card>
        <CardHeader>
          <CardTitle>4. Video giới thiệu</CardTitle>
          <CardDescription>Video giới thiệu dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Live Preview */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <VideoSectionPreview introduction={introduction} />
          </div>

          <Separator />

          {/* Video Input */}
          <div className="space-y-2">
            <Label htmlFor="introductionVideo">
              Video giới thiệu (Introduction Video)
            </Label>
            <div className="flex space-x-2">
              <Input
                id="introductionVideo"
                value={introduction.introductionVideo}
                onChange={(e) =>
                  updateProject(
                    'introduction',
                    'introductionVideo',
                    e.target.value
                  )
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1"
              />
              <span className="text-sm text-gray-500 self-center">hoặc</span>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateProject('introduction', 'introductionVideo', file);
                    }
                  }}
                />
                <Button variant="outline" type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải video
                </Button>
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Hỗ trợ YouTube URL (https://www.youtube.com/watch?v=...) hoặc tải
              file video trực tiếp
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
