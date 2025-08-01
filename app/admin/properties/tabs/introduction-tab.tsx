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
  Upload,
  ImageIcon,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';

interface IntroductionTabProps {
  introduction: any;
  updateProject: (section: string, field: string, value: any) => void;
}

// Cover Section Preview Component
function CoverSectionPreview({ introduction }: any) {
  console.log(introduction);

  return (
    <section id="hero" className="relative min-h-screen center-both">
      {/* Background image full screen */}
      <Image
        src={introduction.coverImage ?? '/placeholder.svg'}
        alt="Eco Retreat Cover Background"
        fill
        className="object-cover text-shadow-lg shadow-md"
        priority
      />

      <div className="bg-gradient-to-b from-transparent via-black/20 to-transparent absolute inset-0 z-10"></div>
      <div className="relative z-20 center-both flex-col gap-2 p-8 text-center text-white">
        {/* Logo */}
        <div className="w-72 h-44 relative center-both">
          <Image
            src={introduction.logoImages[1] ?? '/placeholder.svg'}
            alt="Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 max-w-4xl mx-auto">
          <div className="text-3xl drop-shadow-lg md:text-5xl text-nowrap py-4 font-bold bg-gradient-to-r !from-white !via-orange-200 !to-white bg-clip-text text-transparent">
            {introduction.title}
          </div>
        </div>
      </div>
    </section>
  );
}

// Introduction Section Preview Component
function IntroductionSectionPreview({ introduction }: { introduction: any }) {
  const introImageSrc =
    typeof introduction.introductionImage === 'string'
      ? introduction.introductionImage
      : introduction.introductionImage
        ? URL.createObjectURL(introduction.introductionImage)
        : '/placeholder.svg?height=300&width=400&text=Introduction+Image';

  const backgroundSrc =
    typeof introduction.introductionBackground === 'string'
      ? introduction.introductionBackground
      : introduction.introductionBackground
        ? URL.createObjectURL(introduction.introductionBackground)
        : '';

  return (
    <div
      className="w-full rounded-lg overflow-hidden"
      style={{
        background: backgroundSrc
          ? `url(${backgroundSrc}) center/cover`
          : 'linear-gradient(to right, #065f46, #059669)',
      }}
    >
      <div className="flex items-center min-h-80">
        {/* Content - Left */}
        <div className="w-1/2 p-8 text-white">
          <h2 className="text-2xl font-bold mb-4 leading-tight">
            {introduction.introductionTitle ||
              "ĐÔ THỊ 'RỪNG RETREAT' ĐẦU TIÊN TẠI VIỆT NAM"}
          </h2>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                introduction.introductionDescription ||
                'Nhập mô tả giới thiệu...',
            }}
          />
        </div>

        {/* Image - Right */}
        <div className="w-1/2 p-4">
          <img
            src={introImageSrc || '/placeholder.svg'}
            alt="Introduction"
            className="w-full h-72 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

// Launch Section Preview Component (formerly Hero Section)
function LaunchSectionPreview({ introduction }: { introduction: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundSrc =
    typeof introduction.launchBackground === 'string'
      ? introduction.launchBackground
      : introduction.launchBackground
        ? URL.createObjectURL(introduction.launchBackground)
        : '/placeholder.svg?height=400&width=800&text=Launch+Background';

  const launchImages = introduction.launchImages || [];
  const currentImageSrc =
    launchImages.length > 0
      ? typeof launchImages[currentImageIndex] === 'string'
        ? launchImages[currentImageIndex]
        : URL.createObjectURL(launchImages[currentImageIndex])
      : '/placeholder.svg?height=300&width=400&text=Launch+Image';

  const nextImage = () => {
    if (launchImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % launchImages.length);
    }
  };

  const prevImage = () => {
    if (launchImages.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + launchImages.length) % launchImages.length
      );
    }
  };

  return (
    <div
      className="relative w-full h-80 rounded-lg overflow-hidden bg-cover bg-center flex items-center"
      style={{ backgroundImage: `url(${backgroundSrc})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 w-full px-8 flex items-center justify-between">
        {/* Launch Images Carousel - Left */}
        <div className="w-1/2 pr-4 relative">
          <img
            src={currentImageSrc || '/placeholder.svg'}
            alt="Launch"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          {launchImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {launchImages.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content - Right */}
        <div className="w-1/2 pl-4 text-white">
          <h1 className="text-3xl font-bold text-green-400 mb-4">
            {introduction.launchTitle || 'RETREAT ISLAND'}
          </h1>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: introduction.launchDescription || 'Nhập mô tả launch...',
            }}
          />
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
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="aspect-video flex items-center justify-center">
        {videoSrc ? (
          isYouTube ? (
            <iframe
              src={videoSrc.replace('watch?v=', 'embed/')}
              className="w-full h-full"
              frameBorder="0"
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
  return (
    <div className="space-y-8">
      {/* Section 1: General Information */}
      <Card>
        <CardHeader>
          <CardTitle>1. Thông tin chung</CardTitle>
          <CardDescription>Logo và các ảnh cơ bản của dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUpload
              label="Ảnh bìa"
              value={introduction.coverImage}
              onChange={(file) =>
                updateProject('introduction', 'coverImage', file)
              }
            />
            <FileUpload
              label="Ảnh tiêu đề"
              value={introduction.titleImage}
              onChange={(file) =>
                updateProject('introduction', 'titleImage', file)
              }
            />
          </div>

          {/* Logo Images - Max 3 */}
          <div className="space-y-2">
            <Label>Logo (Tối đa 3 ảnh: Có màu, Light mode, Dark mode)</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="space-y-2">
                  <Label className="text-sm text-gray-600">
                    {index === 0
                      ? 'Logo có màu'
                      : index === 1
                        ? 'Logo light mode'
                        : 'Logo dark mode'}
                  </Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    {introduction.logoImages[index] ? (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <ImageIcon className="h-4 w-4" />
                          <span className="text-sm text-gray-600">
                            {typeof introduction.logoImages[index] === 'string'
                              ? (introduction.logoImages[index] as string)
                                  .split('/')
                                  .pop()
                              : (introduction.logoImages[index] as File).name}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const newLogos = [...introduction.logoImages];
                            newLogos.splice(index, 1);
                            updateProject(
                              'introduction',
                              'logoImages',
                              newLogos
                            );
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const newLogos = [...introduction.logoImages];
                              newLogos[index] = file;
                              updateProject(
                                'introduction',
                                'logoImages',
                                newLogos
                              );
                            }
                          }}
                        />
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="h-6 w-6 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            Tải lên logo
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Cover Section */}
      <Card>
        <CardHeader>
          <CardTitle>2. Cover Section - Phần bìa</CardTitle>
          <CardDescription>Ảnh bìa với logo và tiêu đề chính</CardDescription>
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

          {/* Form Fields */}
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
                placeholder="VD: Trải nghiệm nghỉ dưỡng giữa thiên nhiên"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle>3. Introduction Section - Phần giới thiệu</CardTitle>
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
                <Input
                  id="introductionTitle"
                  value={introduction.introductionTitle}
                  onChange={(e) =>
                    updateProject(
                      'introduction',
                      'introductionTitle',
                      e.target.value
                    )
                  }
                  placeholder="VD: ĐÔ THỊ 'RỪNG RETREAT' ĐẦU TIÊN TẠI VIỆT NAM"
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

              <FileUpload
                label="Ảnh nền giới thiệu (Introduction Background)"
                value={introduction.introductionBackground}
                onChange={(file) =>
                  updateProject('introduction', 'introductionBackground', file)
                }
              />
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

      {/* Section 4: Launch Section (formerly Hero Section) */}
      <Card>
        <CardHeader>
          <CardTitle>4. Launch Section - Phần ra mắt</CardTitle>
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
            {/* Background Image - Full width */}
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
                    placeholder="VD: RETREAT ISLAND"
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

      {/* Section 5: Video Section */}
      <Card>
        <CardHeader>
          <CardTitle>5. Video Section - Phần video giới thiệu</CardTitle>
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
