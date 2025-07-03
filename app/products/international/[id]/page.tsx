"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FadeIn, SlideIn, ScaleIn } from "@/components/animations"
import {
  ArrowLeft,
  MapPin,
  CheckCircle,
  TrendingUp,
  Phone,
  Mail,
  Download,
  Heart,
  Share2,
  Camera,
  Play,
  Bed,
  Square,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock data - trong thực tế sẽ fetch từ API dựa trên params.id
  const property = {
    id: params.id,
    name: "Marina Bay Residences",
    location: "Singapore",
    type: "Căn hộ cao cấp",
    price: "Từ $800,000",
    priceRange: "$800,000 - $1,500,000",
    bedrooms: "1-3 phòng ngủ",
    area: "45-120 m²",
    status: "Sẵn sàng",
    roi: "6-8%/năm",
    completion: "Q2/2024",
    developer: "CapitaLand Development",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    description: `Marina Bay Residences là dự án căn hộ cao cấp nằm tại trung tâm tài chính Singapore, 
    mang đến không gian sống đẳng cấp với tầm nhìn panorama ra vịnh Marina Bay. Dự án được thiết kế 
    bởi kiến trúc sư nổi tiếng thế giới với tiêu chuẩn 5 sao.`,

    features: [
      "View Marina Bay tuyệt đẹp",
      "Hồ bơi vô cực tầng 50",
      "Gym & Spa cao cấp 24/7",
      "Concierge service",
      "Sky garden & BBQ area",
      "Children playground",
      "24/7 Security system",
      "Smart home technology",
    ],

    unitTypes: [
      {
        type: "1 Bedroom",
        area: "45-55 m²",
        price: "$800,000 - $950,000",
        layout: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "2 Bedroom",
        area: "70-85 m²",
        price: "$1,100,000 - $1,300,000",
        layout: "/placeholder.svg?height=300&width=400",
      },
      {
        type: "3 Bedroom",
        area: "100-120 m²",
        price: "$1,400,000 - $1,500,000",
        layout: "/placeholder.svg?height=300&width=400",
      },
    ],

    amenities: [
      { category: "Thể thao & Giải trí", items: ["Hồ bơi vô cực", "Gym hiện đại", "Tennis court", "Yoga studio"] },
      { category: "Tiện ích gia đình", items: ["Khu vui chơi trẻ em", "BBQ area", "Function room", "Library"] },
      { category: "Dịch vụ", items: ["Concierge 24/7", "Valet parking", "Housekeeping", "Shuttle service"] },
      { category: "An ninh", items: ["Card access", "CCTV 24/7", "Security patrol", "Intercom system"] },
    ],

    location: {
      address: "10 Marina Boulevard, Singapore 018983",
      nearby: [
        { name: "Marina Bay Sands", distance: "2 phút đi bộ", type: "Shopping & Entertainment" },
        { name: "Raffles Place MRT", distance: "5 phút đi bộ", type: "Giao thông" },
        { name: "Singapore Flyer", distance: "8 phút đi bộ", type: "Du lịch" },
        { name: "Gardens by the Bay", distance: "10 phút đi bộ", type: "Công viên" },
      ],
    },

    investment: {
      rentalYield: "4-6%",
      capitalGrowth: "3-5%",
      totalROI: "6-8%",
      paymentPlan: "20% đặt cọc, 80% khi nhận nhà",
      financing: "Hỗ trợ vay đến 75%",
    },

    developer: {
      name: "CapitaLand Development",
      established: "1963",
      projects: "200+ dự án",
      countries: "30+ quốc gia",
      description: "Một trong những nhà phát triển BDS hàng đầu châu Á",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/products/international"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại BDS Quốc tế
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.name}</h1>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location.address}
                  </span>
                  <Badge variant="outline">{property.type}</Badge>
                  <Badge className={property.status === "Sẵn sàng" ? "bg-green-600" : "bg-orange-600"}>
                    {property.status}
                  </Badge>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Yêu thích
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <FadeIn>
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <Image
                        src={property.images[currentImageIndex] || "/placeholder.svg"}
                        alt={property.name}
                        width={800}
                        height={500}
                        className="w-full h-96 object-cover rounded-t-lg"
                      />
                    </motion.div>
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <Badge className="bg-black/70 text-white">
                        <Camera className="w-3 h-3 mr-1" />
                        {property.images.length} ảnh
                      </Badge>
                      <Badge className="bg-black/70 text-white">
                        <Play className="w-3 h-3 mr-1" />
                        Video 360°
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex space-x-2 overflow-x-auto">
                      {property.images.map((image, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          className={`flex-shrink-0 cursor-pointer border-2 rounded-lg ${
                            currentImageIndex === index ? "border-blue-600" : "border-transparent"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`${property.name} ${index + 1}`}
                            width={100}
                            height={60}
                            className="w-20 h-12 object-cover rounded"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Property Details Tabs */}
            <FadeIn delay={0.2}>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                  <TabsTrigger value="units">Căn hộ</TabsTrigger>
                  <TabsTrigger value="amenities">Tiện ích</TabsTrigger>
                  <TabsTrigger value="location">Vị trí</TabsTrigger>
                  <TabsTrigger value="investment">Đầu tư</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mô tả dự án</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-6">{property.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Thông tin cơ bản</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Loại hình:</span>
                              <span className="font-medium">{property.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Diện tích:</span>
                              <span className="font-medium">{property.area}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Phòng ngủ:</span>
                              <span className="font-medium">{property.bedrooms}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Hoàn thành:</span>
                              <span className="font-medium">{property.completion}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Chủ đầu tư</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Tên:</span>
                              <span className="font-medium">{property.developer.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Thành lập:</span>
                              <span className="font-medium">{property.developer.established}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Dự án:</span>
                              <span className="font-medium">{property.developer.projects}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Quốc gia:</span>
                              <span className="font-medium">{property.developer.countries}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Điểm nổi bật</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-3">
                        {property.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="units" className="space-y-6">
                  <div className="grid gap-6">
                    {property.unitTypes.map((unit, index) => (
                      <ScaleIn key={index} delay={index * 0.1}>
                        <Card>
                          <CardContent className="p-6">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="text-xl font-bold mb-4">{unit.type}</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <Square className="w-4 h-4 text-muted-foreground" />
                                      <span>{unit.area}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Bed className="w-4 h-4 text-muted-foreground" />
                                      <span>{unit.type.split(" ")[0]} phòng ngủ</span>
                                    </div>
                                  </div>
                                  <div className="text-2xl font-bold text-green-600">{unit.price}</div>
                                  <Button className="w-full">Xem chi tiết căn hộ</Button>
                                </div>
                              </div>
                              <div>
                                <Image
                                  src={unit.layout || "/placeholder.svg"}
                                  alt={`${unit.type} Layout`}
                                  width={400}
                                  height={300}
                                  className="w-full h-48 object-cover rounded-lg"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScaleIn>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="amenities" className="space-y-6">
                  {property.amenities.map((category, index) => (
                    <ScaleIn key={index} delay={index * 0.1}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{category.category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-3">
                            {category.items.map((item, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </ScaleIn>
                  ))}
                </TabsContent>

                <TabsContent value="location" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Địa chỉ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start space-x-2 mb-4">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                        <span>{property.location.address}</span>
                      </div>
                      <div className="bg-muted/50 h-64 rounded-lg flex items-center justify-center">
                        <span className="text-muted-foreground">Bản đồ tương tác</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tiện ích xung quanh</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {property.location.nearby.map((place, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                            <div>
                              <div className="font-semibold">{place.name}</div>
                              <div className="text-sm text-muted-foreground">{place.type}</div>
                            </div>
                            <Badge variant="outline">{place.distance}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="investment" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Phân tích đầu tư</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span>Rental Yield:</span>
                            <span className="font-bold text-green-600">{property.investment.rentalYield}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span>Capital Growth:</span>
                            <span className="font-bold text-blue-600">{property.investment.capitalGrowth}</span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <span>Total ROI:</span>
                            <span className="font-bold text-orange-600">{property.investment.totalROI}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Phương thức thanh toán</h4>
                            <p className="text-muted-foreground">{property.investment.paymentPlan}</p>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Hỗ trợ tài chính</h4>
                            <p className="text-muted-foreground">{property.investment.financing}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Contact */}
            <SlideIn direction="right">
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="text-3xl font-bold text-green-600">{property.priceRange}</div>
                  <div className="text-muted-foreground">ROI: {property.roi}</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <Bed className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm">{property.bedrooms}</div>
                    </div>
                    <div>
                      <Square className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm">{property.area}</div>
                    </div>
                    <div>
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <div className="text-sm">{property.roi}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi tư vấn: 1900 1234
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Mail className="w-4 h-4 mr-2" />
                        Đăng ký xem nhà
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Tải brochure
                      </Button>
                    </motion.div>
                  </div>
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
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <Badge className={property.status === "Sẵn sàng" ? "bg-green-600" : "bg-orange-600"}>
                      {property.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hoàn thành:</span>
                    <span className="font-medium">{property.completion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Chủ đầu tư:</span>
                    <span className="font-medium">{property.developer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Loại hình:</span>
                    <span className="font-medium">{property.type}</span>
                  </div>
                </CardContent>
              </Card>
            </SlideIn>

            {/* Similar Properties */}
            <SlideIn direction="right" delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Dự án tương tự</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "One Raffles Place", price: "Từ $900K", location: "Singapore" },
                    { name: "The Sail @ Marina Bay", price: "Từ $1.2M", location: "Singapore" },
                    { name: "Marina One Residences", price: "Từ $850K", location: "Singapore" },
                  ].map((similar, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg cursor-pointer"
                    >
                      <Image
                        src="/placeholder.svg?height=60&width=80"
                        alt={similar.name}
                        width={80}
                        height={60}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{similar.name}</div>
                        <div className="text-xs text-muted-foreground">{similar.location}</div>
                        <div className="text-sm text-green-600 font-bold">{similar.price}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </div>
      </div>
    </div>
  )
}
