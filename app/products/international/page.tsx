"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, SlideIn, ScaleIn } from "@/components/animations"
import { ArrowLeft, MapPin, DollarSign, Home, Users, Star, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function InternationalPropertiesPage() {
  const properties = [
    {
      id: 1,
      name: "Marina Bay Residences",
      location: "Singapore",
      type: "Căn hộ cao cấp",
      price: "Từ $800,000",
      bedrooms: "1-3 phòng ngủ",
      area: "45-120 m²",
      features: ["View Marina Bay", "Hồ bơi vô cực", "Gym 24/7", "Concierge"],
      image: "/placeholder.svg?height=300&width=400",
      status: "Sẵn sàng",
      roi: "6-8%/năm",
    },
    {
      id: 2,
      name: "Johor Bahru Waterfront",
      location: "Malaysia",
      type: "Condotel nghỉ dưỡng",
      price: "Từ $300,000",
      bedrooms: "1-2 phòng ngủ",
      area: "35-80 m²",
      features: ["Bãi biển riêng", "Casino", "Golf course", "Shopping mall"],
      image: "/placeholder.svg?height=300&width=400",
      status: "Đang xây dựng",
      roi: "8-10%/năm",
    },
    {
      id: 3,
      name: "Melbourne Central Towers",
      location: "Australia",
      type: "Nhà phố hiện đại",
      price: "Từ $600,000",
      bedrooms: "2-4 phòng ngủ",
      area: "80-150 m²",
      features: ["Gần trường học", "Giao thông thuận lợi", "Khu an ninh", "Sân vườn"],
      image: "/placeholder.svg?height=300&width=400",
      status: "Sẵn sàng",
      roi: "5-7%/năm",
    },
    {
      id: 4,
      name: "Bangkok Sky Residences",
      location: "Thailand",
      type: "Căn hộ dịch vụ",
      price: "Từ $200,000",
      bedrooms: "Studio-2 phòng ngủ",
      area: "25-65 m²",
      features: ["Trung tâm thành phố", "Sky bar", "Spa", "Business center"],
      image: "/placeholder.svg?height=300&width=400",
      status: "Sắp mở bán",
      roi: "7-9%/năm",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              BẤT ĐỘNG SẢN QUỐC TẾ
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Đầu tư Bất động sản Quốc tế</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Khám phá những cơ hội đầu tư bất động sản hấp dẫn tại các thị trường phát triển như Singapore, Malaysia,
              Australia và Thailand với cam kết lợi nhuận ổn định.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Why International Investment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tại sao đầu tư BDS Quốc tế?</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: DollarSign,
                title: "Lợi nhuận ổn định",
                desc: "ROI từ 5-10%/năm, cao hơn gửi tiết kiệm",
                color: "text-green-600",
                bg: "bg-green-100 dark:bg-green-900/30",
              },
              {
                icon: Home,
                title: "Đa dạng hóa tài sản",
                desc: "Phân tán rủi ro đầu tư ra nhiều thị trường",
                color: "text-blue-600",
                bg: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                icon: Users,
                title: "Cơ hội định cư",
                desc: "Nhiều quốc gia có chính sách hỗ trợ định cư",
                color: "text-purple-600",
                bg: "bg-purple-100 dark:bg-purple-900/30",
              },
              {
                icon: Star,
                title: "Tiềm năng tăng giá",
                desc: "Thị trường phát triển với triển vọng tốt",
                color: "text-orange-600",
                bg: "bg-orange-100 dark:bg-orange-900/30",
              },
            ].map((item, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <item.icon className={`w-8 h-8 ${item.color}`} />
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Properties Listing */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Dự án nổi bật</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những dự án bất động sản quốc tế được lựa chọn kỹ lưỡng với tiềm năng sinh lời cao
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {properties.map((property, index) => (
              <ScaleIn key={property.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-gray-900">{property.location}</Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant={property.status === "Sẵn sàng" ? "default" : "secondary"}
                          className={property.status === "Sẵn sàng" ? "bg-green-600" : ""}
                        >
                          {property.status}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl mb-2">{property.name}</CardTitle>
                          <p className="text-muted-foreground flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {property.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{property.price}</div>
                          <div className="text-sm text-green-600">ROI: {property.roi}</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Loại hình:</span>
                            <div className="font-semibold">{property.type}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Phòng ngủ:</span>
                            <div className="font-semibold">{property.bedrooms}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Diện tích:</span>
                            <div className="font-semibold">{property.area}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Tiện ích nổi bật:</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {property.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center text-sm text-muted-foreground">
                                <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                            <Link href={`/products/international/${property.id}`}>
                              <Button className="w-full bg-orange-600 hover:bg-orange-700">Xem chi tiết</Button>
                            </Link>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline">Liên hệ</Button>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quy trình đầu tư</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi hỗ trợ bạn từ A-Z trong quá trình đầu tư bất động sản quốc tế
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Tư vấn & Lựa chọn", desc: "Phân tích nhu cầu và tư vấn dự án phù hợp" },
              { step: "02", title: "Thẩm định & Đánh giá", desc: "Kiểm tra pháp lý và đánh giá tiềm năng" },
              { step: "03", title: "Ký kết & Thanh toán", desc: "Hỗ trợ thủ tục và thanh toán an toàn" },
              { step: "04", title: "Quản lý & Vận hành", desc: "Dịch vụ quản lý và cho thuê sau đầu tư" },
            ].map((item, index) => (
              <SlideIn key={index} direction="up" delay={index * 0.2}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold"
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sẵn sàng đầu tư BDS Quốc tế?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Liên hệ với chuyên gia của chúng tôi để được tư vấn chi tiết về các cơ hội đầu tư
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Tư vấn miễn phí ngay
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
