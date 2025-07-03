"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FadeIn, ScaleIn } from "@/components/animations"
import { ArrowLeft, Mail, Phone, Linkedin, Award, Users, TrendingUp, Globe, MapPin, Calendar, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function TeamPage() {
  const leadership = [
    {
      id: 1,
      name: "Nguyễn Văn Minh",
      position: "Tổng Giám đốc",
      experience: "20+ năm kinh nghiệm BDS",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Với hơn 20 năm kinh nghiệm trong lĩnh vực bất động sản, ông Minh đã dẫn dắt IQI Vietnam phát triển từ một văn phòng nhỏ thành công ty hàng đầu với hơn 500 đại lý.",
      achievements: ["CEO of the Year 2023", "Top 10 Real Estate Leaders", "Vietnam Business Award"],
      email: "minh.nguyen@iqi.com",
      phone: "+84 901 234 567",
      linkedin: "linkedin.com/in/nguyen-van-minh",
    },
    {
      id: 2,
      name: "Trần Thị Hương",
      position: "Giám đốc Kinh doanh",
      experience: "15+ năm phát triển thị trường",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Chị Hương chịu trách nhiệm phát triển mạng lưới kinh doanh toàn quốc và xây dựng các mối quan hệ đối tác chiến lược với các chủ đầu tư hàng đầu.",
      achievements: ["Sales Director Award 2022", "Top Performer 5 years", "Market Expansion Leader"],
      email: "huong.tran@iqi.com",
      phone: "+84 902 345 678",
      linkedin: "linkedin.com/in/tran-thi-huong",
    },
    {
      id: 3,
      name: "Lê Văn Đức",
      position: "Giám đốc Đào tạo",
      experience: "12+ năm đào tạo chuyên nghiệp",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Thầy Đức phụ trách chương trình đào tạo toàn diện cho đại lý, với tỷ lệ thành công 95% và hơn 1000 đại lý được đào tạo.",
      achievements: ["Training Excellence Award", "Certified Master Trainer", "Education Innovation Award"],
      email: "duc.le@iqi.com",
      phone: "+84 903 456 789",
      linkedin: "linkedin.com/in/le-van-duc",
    },
  ]

  const departments = [
    {
      name: "Kinh doanh",
      head: "Trần Thị Hương",
      members: 45,
      description: "Phụ trách tư vấn khách hàng, phát triển thị trường và đạt chỉ tiêu doanh số",
      icon: TrendingUp,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      name: "Đào tạo",
      head: "Lê Văn Đức",
      members: 12,
      description: "Xây dựng chương trình đào tạo và phát triển năng lực cho đại lý",
      icon: Award,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Marketing",
      head: "Phạm Thị Lan",
      members: 18,
      description: "Phát triển thương hiệu, marketing digital và truyền thông",
      icon: Globe,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      name: "Hỗ trợ khách hàng",
      head: "Hoàng Văn Nam",
      members: 25,
      description: "Chăm sóc khách hàng, xử lý khiếu nại và hỗ trợ sau bán",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ]

  const topAgents = [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      title: "Senior Sales Agent",
      location: "TP.HCM",
      experience: "8 năm",
      deals: 156,
      revenue: "45 tỷ",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Căn hộ cao cấp", "Biệt thự", "BDS Quận 7"],
    },
    {
      id: 2,
      name: "Trần Văn Hùng",
      title: "International Property Specialist",
      location: "Hà Nội",
      experience: "6 năm",
      deals: 89,
      revenue: "28 tỷ",
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["BDS Singapore", "BDS Malaysia", "Đầu tư quốc tế"],
    },
    {
      id: 3,
      name: "Lê Thị Hoa",
      title: "Resort Property Expert",
      location: "Đà Nẵng",
      experience: "5 năm",
      deals: 67,
      revenue: "22 tỷ",
      rating: 4.9,
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Condotel", "Resort", "BDS nghỉ dưỡng"],
    },
    {
      id: 4,
      name: "Phạm Văn Tuấn",
      title: "Commercial Property Advisor",
      location: "TP.HCM",
      experience: "7 năm",
      deals: 134,
      revenue: "38 tỷ",
      rating: 4.7,
      image: "/placeholder.svg?height=200&width=200",
      specialties: ["Văn phòng", "Shophouse", "BDS thương mại"],
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
              ĐỘI NGŨ IQI VIETNAM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Đội ngũ chuyên nghiệp</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Gặp gỡ những con người tài năng và giàu kinh nghiệm đang dẫn dắt IQI Vietnam phát triển và mang đến những
              dịch vụ bất động sản tốt nhất cho khách hàng.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ban lãnh đạo</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những nhà lãnh đạo có tầm nhìn và kinh nghiệm sâu rộng trong ngành bất động sản
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <ScaleIn key={leader.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          width={200}
                          height={200}
                          className="rounded-full mx-auto mb-4 shadow-lg"
                        />
                      </motion.div>
                      <CardTitle className="text-xl">{leader.name}</CardTitle>
                      <p className="text-blue-600 font-semibold">{leader.position}</p>
                      <p className="text-sm text-muted-foreground">{leader.experience}</p>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{leader.bio}</p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">Thành tựu nổi bật:</h4>
                        <div className="space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-center text-xs text-muted-foreground">
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex justify-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-green-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-blue-700 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Các phòng ban</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cơ cấu tổ chức chuyên nghiệp với các phòng ban chuyên biệt
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${dept.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <dept.icon className={`w-8 h-8 ${dept.color}`} />
                      </div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Trưởng phòng: {dept.head}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-blue-600">{dept.members}</div>
                        <div className="text-sm text-muted-foreground">thành viên</div>
                      </div>
                      <p className="text-sm text-muted-foreground">{dept.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đại lý xuất sắc</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những đại lý hàng đầu với thành tích kinh doanh ấn tượng và đánh giá cao từ khách hàng
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAgents.map((agent, index) => (
              <ScaleIn key={agent.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          width={120}
                          height={120}
                          className="rounded-full mx-auto mb-4 shadow-md"
                        />
                      </motion.div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-blue-600 font-medium text-sm">{agent.title}</p>
                      <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-2">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {agent.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {agent.experience}
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-lg font-bold text-green-600">{agent.deals}</div>
                          <div className="text-xs text-muted-foreground">Giao dịch</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-orange-600">{agent.revenue}</div>
                          <div className="text-xs text-muted-foreground">Doanh số</div>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm font-medium ml-1">{agent.rating}</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Chuyên môn:</h4>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {agent.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
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

      {/* Join Team CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Muốn gia nhập đội ngũ IQI Vietnam?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Chúng tôi luôn tìm kiếm những tài năng mới để cùng phát triển và thành công trong lĩnh vực bất động sản
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/careers">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Xem cơ hội nghề nghiệp
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Liên hệ HR
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
