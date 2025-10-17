'use client';

import { Play, ChevronDown } from 'lucide-react';
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

export const IntroductionPreview = memo(function IntroductionPreview({
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
    introductionBackground,
    introductionImage,
    introductionTitle,
    introductionDescription,
    launchTitle,
    launchDescription,
    launchImages,
    launchBackground,
    introductionVideo,
  } = introduction;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isYouTube =
    introduction.introductionVideo &&
    introduction.introductionVideo.includes('youtube');

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
      <div className="container mx-auto relative min-h-screen w-full max-w-7xl center-both">
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
      <div className="container mx-auto relative min-h-screen w-full max-w-7xl center-both">
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
      <div className="container mx-auto relative min-h-screen w-full max-w-7xl center-both">
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
      <div className=" bg-gray-900 rounded-lg overflow-hidden">
        <div className="w-full min-h-screen aspect-video center-both">
          {introductionVideo ? (
            isYouTube ? (
              <iframe
                src={convertToEmbedUrl(introductionVideo) ?? ''}
                className="w-full h-full"
                allowFullScreen
              />
            ) : (
              <video controls className="w-full h-full object-cover">
                <source
                  src={
                    introductionVideo instanceof File
                      ? URL.createObjectURL(introductionVideo)
                      : introductionVideo.url
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
    </>
  );
});
