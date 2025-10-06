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
import { Upload, X, Play, Save, ChevronDown } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';
import { memo, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn, convertToEmbedUrl } from '@/lib/utils';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';

interface IntroductionTabProps {
  introduction: any;
  updateProject: (section: string, field: string, value: any) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

// Cover Section Preview Component
const CoverSectionPreview = memo(function CoverSectionPreview({
  introduction,
}: {
  introduction: any;
}) {
  const {
    coverImage,
    logoImages,
    headerLogoIndex,
    coverLogoIndex,
    coverTitle,
  } = introduction;

  const sections = useMemo(
    () => [
      { id: 'introduction', label: 'Giới thiệu' },
      { id: 'overview', label: 'Tổng quan' },
      { id: 'amenity', label: 'Tiện ích' },
      { id: 'location', label: 'Vị trí' },
      { id: 'siteplan', label: 'Mặt bằng' },
      { id: 'production', label: 'Sản phẩm' },
      { id: 'policy', label: 'Chính sách' },
      { id: 'timeline', label: 'Tiến độ' },
      { id: 'agency', label: 'Đại lý' },
      {
        id: 'toolbar',
        label: 'Công cụ',
        dropdown: [
          {
            href: '/360-view',
            label: '360 view',
          },
          {
            href: '/invitation',
            label: 'Thiệp mời',
          },
        ],
      },
    ],
    []
  );

  return (
    <div className="container mx-auto relative min-h-[60vh] w-full max-w-7xl center-both">
      {/* Header */}
      <header className="absolute top-0 z-10 w-full bg-background py-2 shadow-md">
        <div className="mx-auto overflow-x-auto px-4 scrollbar-hide">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative h-14 w-24 cursor-pointer"
            >
              <Image
                src={
                  logoImages[headerLogoIndex]
                    ? logoImages[headerLogoIndex] instanceof File
                      ? URL.createObjectURL(logoImages[headerLogoIndex])
                      : logoImages[headerLogoIndex].url
                    : '/placeholder.svg'
                }
                alt="Eco Retreat Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <nav className="hidden items-center gap-2 md:flex">
              {sections.map(
                (item) =>
                  item.label && (
                    <div className="relative group" key={item.id}>
                      <Button
                        variant="ghost"
                        className="text-xs font-bold uppercase p-1 group/menu gap-1"
                      >
                        {item.label}
                        {item.dropdown && (
                          <ChevronDown className="w-2 h-2 transition-all duration-300 group-hover/menu:rotate-180" />
                        )}
                      </Button>
                      {item.dropdown && (
                        <div className="absolute top-full left-0 w-fit bg-background border rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 text-foreground">
                          <div className="py-2">
                            {item.dropdown.map((subnav: any) => (
                              <div
                                key={subnav.href}
                                className="group/item block py-2 px-4"
                              >
                                <p className="font-bold text-nowrap uppercase group-hover/item:text-orange-500">
                                  {subnav.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
              )}
            </nav>
          </div>
        </div>
      </header>
      {/* Background image full screen */}
      <Image
        src={
          coverImage
            ? coverImage instanceof File
              ? URL.createObjectURL(coverImage)
              : coverImage.url
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
        <div className="w-full min-w-32 h-32 relative center-both">
          <Image
            src={
              logoImages[coverLogoIndex]
                ? logoImages[coverLogoIndex] instanceof File
                  ? URL.createObjectURL(logoImages[coverLogoIndex])
                  : logoImages[coverLogoIndex].url
                : '/placeholder.svg'
            }
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-4xl mx-auto">
          <div className="text-4xl drop-shadow-lg text-nowrap py-2 font-bold bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent">
            {coverTitle}
          </div>
        </div>
      </div>
    </div>
  );
});

// Introduction Section Preview Component
const IntroductionSectionPreview = memo(function IntroductionSectionPreview({
  introduction,
}: {
  introduction: any;
}) {
  const {
    introductionBackground,
    introductionImage,
    introductionTitle,
    introductionDescription,
  } = introduction;

  return (
    <div className="container mx-auto relative min-h-[60vh] w-full max-w-7xl center-both">
      {/* Background image full screen */}
      <Image
        src={
          introductionBackground
            ? introductionBackground instanceof File
              ? URL.createObjectURL(introductionBackground)
              : introductionBackground.url
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
              ? introductionImage instanceof File
                ? URL.createObjectURL(introductionImage)
                : introductionImage.url
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
});

// Launch Section Preview Component (formerly Hero Section)
const LaunchSectionPreview = memo(function LaunchSectionPreview({
  introduction,
}: {
  introduction: any;
}) {
  const { launchTitle, launchDescription, launchImages, launchBackground } =
    introduction;
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
    <div className="container mx-auto relative min-h-[60vh] w-full max-w-7xl center-both">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={
            launchBackground
              ? launchBackground instanceof File
                ? URL.createObjectURL(launchBackground)
                : launchBackground.url
              : '/placeholder.svg'
          }
          alt="Eco Retreat Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="absolute -inset-1 z-10 backdrop-blur-md bg-white/80 dark:bg-transparent dark:backdrop-brightness-[40%]" />
      <div className="relative z-20 h-full w-full center-both flex-col md:flex-row max-w-7xl py-8 px-12 gap-12">
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
                    <div className="relative h-[50vh] w-full overflow-hidden">
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
                        className="object-cover"
                      />
                    </div>
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
            {/* Tên sản phẩm */}
            <div
              className="text-2xl font-bold italic md:text-3xl text-shadow-soft"
              dangerouslySetInnerHTML={{ __html: launchTitle }}
            />
            {/* Danh sách mô tả chi tiết */}
            <div
              className="text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: launchDescription }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

// Video Section Preview Component
const VideoSectionPreview = memo(function VideoSectionPreview({
  introduction,
}: {
  introduction: any;
}) {
  const isYouTube =
    introduction.introductionVideo &&
    introduction.introductionVideo.includes('youtube');
  const videoSrc = introduction.introductionVideo || '';

  return (
    <div className=" bg-gray-900 rounded-lg overflow-hidden">
      <div className="w-full min-h-[60vh] aspect-video center-both">
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
                  videoSrc instanceof File
                    ? URL.createObjectURL(videoSrc)
                    : videoSrc.url
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
});

export const IntroductionTab = memo(function IntroductionTab({
  introduction,
  updateProject,
  handleSave,
}: IntroductionTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

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
          <div className="bg-gray-50 rounded-lg">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Xem trước:
            </Label>
            <CoverSectionPreview introduction={introduction} />
          </div>

          <Separator />

          {/* Cover Section Settings */}
          <div className="space-y-6">
            <FileUpload
              label="Ảnh nền bìa (Cover Background)"
              value={introduction.coverImage}
              onChange={(file) =>
                updateProject('introduction', 'coverImage', file)
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
                      {introduction.logoImages.map(
                        (logo: any, index: number) => {
                          const logoName =
                            logo instanceof File
                              ? logo.name
                              : typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo?.url?.split('/').pop() || 'Logo';

                          return (
                            <div
                              key={index}
                              className="relative group border rounded-lg overflow-hidden bg-white"
                            >
                              <Image
                                src={
                                  logo instanceof File
                                    ? URL.createObjectURL(logo)
                                    : logo?.url || logo || '/placeholder.svg'
                                }
                                alt={`Logo ${index + 1}`}
                                className="w-full h-20 object-contain p-2"
                                width={200} // bạn có thể tuỳ chỉnh width/height
                                height={80}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all center-both">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    const newLogos =
                                      introduction.logoImages.filter(
                                        (_: any, i: number) => i !== index
                                      );
                                    updateProject(
                                      'introduction',
                                      'logoImages',
                                      newLogos
                                    );
                                    if (
                                      introduction.headerLogoIndex >=
                                      newLogos.length
                                    ) {
                                      updateProject(
                                        'introduction',
                                        'headerLogoIndex',
                                        Math.max(0, newLogos.length - 1)
                                      );
                                    }
                                    if (
                                      introduction.centerLogoIndex >=
                                      newLogos.length
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
                        }
                      )}

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
              {introduction.logoImages.length > 0 && (
                <div className="flex items-center gap-8">
                  <div className="space-y-2 flex-1">
                    <Label>Logo cho header</Label>
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

                  <div className="space-y-2 flex-1">
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
                </div>
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
            {/* Form Fields arranged to match preview layout */}
            <FileUpload
              label="Ảnh nền ra mắt (Launch Background)"
              value={introduction.launchBackground}
              onChange={(file) =>
                updateProject('introduction', 'launchBackground', file)
              }
            />
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
                  <RichTextEditor
                    value={introduction.launchTitle}
                    onChange={(value) =>
                      updateProject('introduction', 'launchTitle', value)
                    }
                    placeholder="Nhập tiêu đề ra mắt..."
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
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end">
        <Button
          onClick={() =>
            handleSave(
              updateProjectTab,
              uploadImage,
              'introduction',
              introduction
            )
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading
              ? 'Đang lưu...'
              : 'Lưu thông tin giới thiệu'}
          </span>
        </Button>
      </div>
    </div>
  );
});
