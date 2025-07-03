"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, ScaleIn } from "@/components/animations"
import { ArrowLeft, Building, Globe, Handshake, Award, CheckCircle, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function PartnersPage() {
  const developerPartners = [
    {
      id: 1,
      name: "Vinhomes",
      type: "Chủ đầu tư hàng đầu",
      description: "Tập đoàn bất động sản lớn nhất Việt Nam với các dự án iconic như Vinhomes Central Park, Times City",
      logo: "/placeholder.svg?height=100&width=150",
      projects: 25,
      partnership: "2018",
      revenue: "500+ tỷ",
      specialties: ["Căn hộ cao cấp", "Biệt thự", "Shophouse"],
      achievements: ["Đối tác chiến lược", "Top Revenue Partner", "Excellence Award 2023"],
    },
    {
      id: 2,
      name: "Novaland",
      type: "Nhà phát triển BDS",
      description: "Chuyên phát triển các dự án cao cấp tại TP.HCM và các tỉnh thành lớn",
      logo: "/placeholder.svg?height=100&width=150",
      projects: 18,
      partnership: "2019",
      revenue: "300+ tỷ",
      specialties: ["Căn hộ", "Khu đô thị", "BDS nghỉ dưỡng"],
      achievements: ["Strategic Partner", "Best Collaboration", "Growth Partner 2023"],
    },
    {
      id: 3,
      name: "Masterise Homes",
      type: "Chủ đầu tư cao cấp",
      description: "Chuyên phát triển các dự án bất động sản hạng sang tại trung tâm TP.HCM",
      logo: "/placeholder.svg?height=100&width=150",
      projects: 12,
      partnership: "2020",
      revenue: "250+ tỷ",
      specialties: ["Luxury apartments", "Premium towers", "Mixed-use"],
      achievements: ["Premium Partner", "Luxury Specialist", "Innovation Award"],
    },
  ]

  const internationalPartners = [
    {
      id: 1,
      name: "Juwai IQI",
      type: "Mạng lưới BDS quốc tế",
      description: "Tập đoàn bất động sản lớn nhất Đông Nam Á với mạng lưới 20+ quốc gia",
      logo: "/placeholder.svg?height=100&width=150",
      countries: 20,
      agents: "40,000+",
      partnership: "2015",
      specialties: ["Cross-border investment", "International properties", "Global network"],
      achievements: ["Founding Member", "Regional Excellence", "Global Recognition"],
    },
    {
      id: 2,
      name: "PropTech Asia",
      type: "Nền tảng công nghệ BDS",
      description: "Nền tảng công nghệ hàng đầu cung cấp giải pháp PropTech cho thị trường châu Á",
      logo: "/placeholder.svg?height=100&width=150",
      countries: 8,
      agents: "15,000+",
      partnership: "2021",
      specialties: ["Technology solutions", "Digital marketing", "Data analytics"],
      achievements: ["Tech Innovation Partner", "Digital Transformation", "AI Excellence"],
    },
  ]

  const bankingPartners = [
    {
      id: 1,
      name: "Vietcombank",
      type: "Ngân hàng thương mại",
      description: "Ngân hàng lớn nhất Việt Nam, cung cấp các gói vay ưu đãi cho khách hàng IQI",
      logo: "/placeholder.svg?height=80&width=120",
      loanRate: "6.5%/năm",
      maxLoan: "85%",
      partnership: "2017",
      benefits: ["Lãi suất ưu đãi", "Thủ tục nhanh", "Hỗ trợ 24/7"],
    },
    {
      id: 2,
      name: "Techcombank",
      type: "Ngân hàng số",
      description: "Ngân hàng tiên phong về công nghệ với quy trình vay online hiện đại",
      logo: "/placeholder.svg?height=80&width=120",
      loanRate: "6.8%/năm",
      maxLoan: "80%",
      partnership: "2019",
      benefits: ["Vay online", "Duyệt nhanh", "Không phí phạt trả trước"],
    },
    {
      id: 3,
      name: "MB Bank",
      type: "Ngân hàng bán lẻ",
      description: "Chuyên cung cấp các sản phẩm tài chính cá nhân với lãi suất cạnh tranh",
      logo: "/placeholder.svg?height=80&width=120",
      loanRate: "6.9%/năm",
      maxLoan: "80%",
      partnership: "2020",
      benefits: ["Lãi suất thả nổi", "Ân hạn gốc", "Tư vấn miễn phí"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-950/20 dark:to-gray-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
              ĐỐI TÁC CHIẾN LƯỢC
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mạng lưới đối tác</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              IQI Vietnam tự hào hợp tác với những thương hiệu uy tín hàng đầu trong và ngoài nước, mang đến cho khách
              hàng những sản phẩm và dịch vụ tốt nhất.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Lợi ích từ mạng lưới đối tác</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Building,
                title: "Sản phẩm đa dạng",
                desc: "Tiếp cận hàng nghìn dự án từ các chủ đầu tư uy tín",
                color: "text-blue-600",
                bg: "bg-blue-100 dark:bg-blue-900/30",
              },
              {
                icon: Globe,
                title: "Mạng lưới quốc tế",
                desc: "Kết nối với 20+ quốc gia và vùng lãnh thổ",
                color: "text-green-600",
                bg: "bg-green-100 dark:bg-green-900/30",
              },
              {
                icon: Handshake,
                title: "Ưu đãi độc quyền",
                desc: "Chính sách giá và ưu đãi đặc biệt cho khách hàng",
                color: "text-orange-600",
                bg: "bg-orange-100 dark:bg-orange-900/30",
              },
              {
                icon: Award,
                title: "Chất lượng đảm bảo",
                desc: "Cam kết chất lượng từ những đối tác hàng đầu",
                color: "text-purple-600",
                bg: "bg-purple-100 dark:bg-purple-900/30",
              },
            ].map((benefit, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${benefit.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                      </div>
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Developer Partners - Horizontal Scrollable Carousel */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Chủ đầu tư uy tín</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hợp tác với những chủ đầu tư hàng đầu Việt Nam
            </p>
          </FadeIn>

          {/* Scrollable Container */}
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide">
              {developerPartners.map((partner, index) => (
                <ScaleIn key={partner.id} delay={index * 0.1} className="flex-none w-80">
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="h-full w-80">
                      <CardHeader className="text-center pb-4">
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Image
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            width={120}
                            height={80}
                            className="mx-auto mb-3"
                          />
                        </motion.div>
                        <CardTitle className="text-xl">{partner.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {partner.type}
                        </Badge>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{partner.description}</p>

                        <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{partner.projects}</div>
                            <div className="text-xs text-muted-foreground">Dự án</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{partner.revenue}</div>
                            <div className="text-xs text-muted-foreground">Doanh số</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-orange-600">{partner.partnership}</div>
                            <div className="text-xs text-muted-foreground">Từ năm</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {partner.specialties.slice(0, 3).map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-1">
                          {partner.achievements.slice(0, 2).map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: Math.ceil(developerPartners.length / 3) }).map((_, index) => (
                <div key={index} className="w-2 h-2 bg-muted rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Partners - Horizontal Scrollable */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đối tác quốc tế</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Mạng lưới toàn cầu với 20+ quốc gia</p>
          </FadeIn>

          <div className="relative">
            <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory scrollbar-hide">
              {internationalPartners.map((partner, index) => (
                <ScaleIn key={partner.id} delay={index * 0.2} className="flex-none w-96">
                  <motion.div whileHover={{ y: -5 }}>
                    <Card className="text-center w-96">
                      <CardHeader>
                        <motion.div whileHover={{ scale: 1.1 }}>
                          <Image
                            src={partner.logo || "/placeholder.svg"}
                            alt={partner.name}
                            width={120}
                            height={80}
                            className="mx-auto mb-4"
                          />
                        </motion.div>
                        <CardTitle className="text-xl">{partner.name}</CardTitle>
                        <Badge variant="secondary">{partner.type}</Badge>
                      </CardHeader>

                      <CardContent>
                        <p className="text-muted-foreground mb-4 text-sm">{partner.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xl font-bold text-blue-600">{partner.countries}</div>
                            <div className="text-sm text-muted-foreground">Quốc gia</div>
                          </div>
                          <div>
                            <div className="text-xl font-bold text-green-600">{partner.agents}</div>
                            <div className="text-sm text-muted-foreground">Đại lý</div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          {partner.achievements.slice(0, 2).map((achievement, idx) => (
                            <div key={idx} className="flex items-center justify-center text-sm text-muted-foreground">
                              <Award className="w-4 h-4 mr-2 text-orange-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </ScaleIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Banking Partners - Compact Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đối tác tài chính</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Lãi suất ưu đãi từ các ngân hàng hàng đầu</p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {bankingPartners.map((bank, index) => (
              <ScaleIn key={bank.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader className="pb-4">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={bank.logo || "/placeholder.svg"}
                          alt={bank.name}
                          width={100}
                          height={60}
                          className="mx-auto mb-3"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{bank.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {bank.type}
                      </Badge>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Lãi suất:</span>
                          <span className="font-bold text-green-600">{bank.loanRate}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Vay tối đa:</span>
                          <span className="font-bold text-blue-600">{bank.maxLoan}</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {bank.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-3 h-3 mr-2 text-green-600" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Thành tựu hợp tác</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Đối tác chiến lược", icon: Handshake },
              { number: "20+", label: "Quốc gia kết nối", icon: Globe },
              { number: "1000+", label: "Dự án hợp tác", icon: Building },
              { number: "95%", label: "Mức độ hài lòng", icon: Star },
            ].map((stat, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <stat.icon className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-orange-600 mb-2">{stat.number}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Become Partner CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Muốn trở thành đối tác của IQI Vietnam?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Gia nhập mạng lưới đối tác của chúng tôi để cùng phát triển và thành công trong thị trường bất động sản
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100">
                  Đăng ký hợp tác
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-600 bg-transparent"
                >
                  Tìm hiểu thêm
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
