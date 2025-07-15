'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn, SlideIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Camera,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Share2,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { formatVnCurrencyShort } from '@/lib/utils';
import { OverviewTab } from './components/OverviewTab';
import { SpecificationTab } from './components/SpecificationTab';
import { LocationTab } from './components/LocationTab';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AnimatePresence, motion } from 'framer-motion';

const property = {
  id: 1,
  name: 'Vinhomes Grand Park',
  slug: 'vinhomes-grand-park',
  property_group: 'vietnam',
  address: 'Nguyễn Xiển, Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM',
  city: 'Thành phố Hồ Chí Minh',
  district: 'Thành phố Thủ Đức',
  price: 3200000000,
  pricePerSqm: 45000000,
  currency: 'VND',
  minPrice: 3200000000,
  maxPrice: 8500000000,
  landArea: 120,
  minBuildUp: 11,
  maxBuildUp: 33,
  minBedroom: 1,
  maxBedroom: 4,
  minBathroom: 1,
  maxBathroom: 3,
  propertyType: 'apartment',
  propertyGroup: 'vietnam',
  status: 'Sẵn sàng',
  occupancyStatus: 'Ready',
  tenure: 'Freehold',
  phase: 'Phase 1',
  isFeatured: true,
  isExclusive: false,
  enableLiveSales: true,
  visibleOnWeb: true,
  image: '/placeholder-2.webp?height=300&width=400',
  images: [
    '/placeholder-2.webp?height=300&width=400',
    '/placeholder-2.webp?height=300&width=400',
    '/placeholder-2.webp?height=300&width=400',
    '/placeholder-2.webp?height=300&width=400',
    '/placeholder-2.webp?height=300&width=400',
    '/placeholder-2.webp?height=300&width=400',
  ],
  developer: 'Vingroup',
  completion: 'Q4/2024',
  listedOn: '2024-01-15',
  amenities: [
    'Hồ bơi',
    'Gym',
    'Công viên',
    'Trường học',
    'Bệnh viện',
    'Shopping mall',
  ],
  features: [
    'Công viên trung tâm 36ha',
    'Trường học liên cấp Vinschool',
    'Bệnh viện đa khoa Vinmec',
  ],
  description:
    'Vinhomes Grand Park là khu đô thị sinh thái thông minh quy mô lớn nhất khu Đông TP.HCM',
  views: 2341,
  coordinates: { lat: 10.8411, lng: 106.8066 },
  measurementUnit: 'sqm',
  createdAt: '12/01/2025',
  updatedAt: '12/07/2025',
  createdBy: 'admin',
};

export default function VietNamPropertyDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [dialogCurrentImageIndex, setDialogCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  const handleOpenImageDialog = () => {
    setDialogCurrentImageIndex(activeImageIndex);
    setShowAllImages(true);
  };

  const handlePrevImage = () => {
    setDirection(-1); // Moving left
    setDialogCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setDirection(1); // Moving right
    setDialogCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-white">
      {/* Hero Section */}
      <FadeIn>
        <div className="relative">
          {/* Image Gallery */}
          <div className="relative h-[70vh] overflow-hidden">
            <Image
              src={property.images[activeImageIndex] || '/placeholder.svg'}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

            {/* Navigation */}
            <div className="absolute top-6 left-6 z-10">
              <Link
                href="/products/vietnam"
                className="inline-flex items-center text-white hover:text-green-200 transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại danh sách
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-6 right-6 z-10 flex space-x-3">
              <Button
                size="sm"
                variant="secondary"
                className="backdrop-blur-sm bg-background/40 hover:bg-background/60"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Chia sẻ
              </Button>
            </div>

            {/* Property Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="max-w-4xl">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.isFeatured && (
                    <Badge className="bg-gradient-to-r !from-yellow-500 !to-orange-500 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Nổi bật
                    </Badge>
                  )}
                  {property.isExclusive && (
                    <Badge className="bg-gradient-to-r !from-green-500 !to-green-600 text-white border-0">
                      Độc quyền
                    </Badge>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {property.name}
                </h1>

                <div className="flex items-center text-lg mb-4">
                  <MapPin className="w-5 h-5 mr-2" />
                  {property.address}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      Từ {formatVnCurrencyShort(property.minPrice)}
                    </div>
                    <div className="text-white/80">Giá</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      {property.landArea}
                      {property.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
                    </div>
                    <div className="text-white/80">Diện tích</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-200">
                      {property.minBedroom}-{property.maxBedroom}
                    </div>
                    <div className="text-white/80">Phòng ngủ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="absolute bottom-6 right-8 center-both gap-2 z-10">
            {property.images.slice(0, 3).map((image: any, index: any) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-12 rounded-md overflow-hidden border transition-all ${
                  activeImageIndex === index
                    ? 'border-white'
                    : 'border-white/50'
                }`}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${property.name} ${index + 1}`}
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {property.images.length > 3 && (
              <button
                onClick={handleOpenImageDialog}
                className="w-16 h-12 rounded-md bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs font-medium border-2 border-white/50"
              >
                +{property.images.length - 3}
              </button>
            )}
            {/* Image Counter */}
            <Button
              variant="secondary"
              className="backdrop-blur-sm bg-black/50 text-white hover:bg-black/70 ml-4"
              onClick={handleOpenImageDialog}
            >
              <Camera className="w-4 h-4 mr-2" />
              {activeImageIndex + 1} / {property.images.length}
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Details Tabs */}
            <FadeIn delay={0.2}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Thông số kỹ thuật
                  </TabsTrigger>
                  <TabsTrigger value="location">Vị trí</TabsTrigger>
                </TabsList>

                <OverviewTab property={property} />
                <SpecificationTab property={property} />
                <LocationTab property={property} />
              </Tabs>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Form */}
            <SlideIn direction="right">
              <Card className="bg-card border-border sticky top-8">
                <CardHeader>
                  <CardTitle>Gửi yêu cầu tư vấn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Họ và tên" />
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Số điện thoại" />
                  <textarea
                    placeholder="Tôi muốn được tư vấn về..."
                    className="w-full p-3 border border-input rounded-md bg-background resize-none"
                    rows={4}
                  />
                  <div className="flex items-start space-x-2">
                    <input type="checkbox" className="mt-1" />
                    <p className="text-xs text-muted-foreground">
                      Tôi đồng ý chia sẻ thông tin để nhận tư vấn.
                      <a
                        href="#"
                        className="text-orange-600 hover:underline ml-1"
                      >
                        Chính sách bảo mật
                      </a>
                    </p>
                  </div>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    Gửi yêu cầu
                  </Button>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Quick Info */}
            <SlideIn direction="right" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại hình:</span>
                    <span className="font-medium">{property.propertyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chủ đầu tư:</span>
                    <span className="font-medium">{property.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <Badge
                      variant={
                        property.status === 'Sẵn sàng' ? 'default' : 'secondary'
                      }
                    >
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hoàn thành:</span>
                    <span className="font-medium">{property.completion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Giai đoạn:</span>
                    <span className="font-medium">{property.phase}</span>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* System Information */}
            <SlideIn direction="right" delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin hệ thống</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày đăng:</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cập nhật:</span>
                    <span className="font-medium">
                      {new Date(property.updatedAt).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lượt xem:</span>
                    <span className="font-medium">
                      {property.views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Đăng bởi:</span>
                    <span className="font-medium">{property.createdBy}</span>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Image Gallery Dialog */}
      <Dialog open={showAllImages} onOpenChange={setShowAllImages}>
        <DialogContent className="max-w-5xl p-6">
          <DialogHeader>
            <DialogTitle>Tất cả hình ảnh của {property.name}</DialogTitle>
          </DialogHeader>
          <div className="relative w-full h-[60vh] mb-4 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={dialogCurrentImageIndex}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                  center: {
                    zIndex: 1,
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => ({
                    zIndex: 0,
                    x: direction < 0 ? 1000 : -1000,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Image
                  src={
                    property.images[dialogCurrentImageIndex] ||
                    '/placeholder.svg'
                  }
                  alt={`${property.name} - Image ${dialogCurrentImageIndex + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </motion.div>
            </AnimatePresence>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-foreground/10 hover:bg-foreground/20 font-bold rounded-full z-10"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-foreground/10 hover:bg-foreground/20 font-bold rounded-full z-10"
              onClick={handleNextImage}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white z-10">
              {dialogCurrentImageIndex + 1} / {property.images.length}
            </Badge>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {property.images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex-shrink-0 cursor-pointer border-2 rounded-lg overflow-hidden ${
                  dialogCurrentImageIndex === index
                    ? 'border-blue-600'
                    : 'border-transparent'
                }`}
                onClick={() => {
                  setDirection(index > dialogCurrentImageIndex ? 1 : -1);
                  setDialogCurrentImageIndex(index);
                }}
              >
                <Image
                  src={image || '/placeholder.svg'}
                  alt={`${property.name} thumbnail ${index + 1}`}
                  width={120}
                  height={80}
                  className="w-24 h-16 object-cover"
                />
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
