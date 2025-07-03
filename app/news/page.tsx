"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FadeIn, ScaleIn } from "@/components/animations"
import { ArrowLeft, Search, Calendar, Eye, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function NewsPage() {
  const featuredNews = [
    {
      id: 1,
      title: "Thị trường BDS TP.HCM Q4/2024: Tăng trưởng ổn định 8.5%",
      excerpt: "Phân khúc căn hộ cao cấp dẫn đầu với mức tăng giá 12%, trong khi nhà phố và biệt thự tăng 6.2%...",
      category: "Thị trường",
      date: "15/12/2024",
      readTime: "5 phút đọc",
      views: "2.1K",
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: 2,
      title: "Luật Đất đai 2024: Những thay đổi quan trọng người mua cần biết",
      excerpt: "Luật Đất đai mới có hiệu lực từ 1/8/2024 với nhiều điểm mới về quyền sở hữu, chuyển nhượng...",
      category: "Pháp lý",
      date: "12/12/2024",
      readTime: "7 phút đọc",
      views: "3.5K",
      image: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
  ]

  const allNews = [
    {
      id: 3,
      title: "Xu hướng đầu tư BDS nghỉ dưỡng 2025: Cơ hội và thách thức",
      excerpt: "Phân tích chi tiết về thị trường BDS nghỉ dưỡng với những dự báo và khuyến nghị đầu tư...",
      category: "Xu hướng",
      date: "10/12/2024",
      readTime: "6 phút đọc",
      views: "1.8K",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Lãi suất vay mua nhà giảm: Cơ hội vàng cho người mua BDS",
      excerpt: "Các ngân hàng đồng loạt giảm lãi suất vay mua nhà xuống mức thấp nhất trong 2 năm qua...",
      category: "Tài chính",
      date: "08/12/2024",
      readTime: "4 phút đọc",
      views: "2.7K",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Dự án hạ tầng mới: Tác động tích cực đến giá BDS khu vực",
      excerpt: "Tuyến metro số 2 và các dự án giao thông trọng điểm sẽ thúc đẩy phát triển BDS...",
      category: "Hạ tầng",
      date: "05/12/2024",
      readTime: "5 phút đọc",
      views: "1.9K",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Căn hộ studio: Xu hướng mới của giới trẻ thành thị",
      excerpt: "Phân khúc căn hộ studio ngày càng được ưa chuộng bởi tính linh hoạt và giá cả phù hợp...",
      category: "Thị trường",
      date: "03/12/2024",
      readTime: "4 phút đọc",
      views: "1.5K",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 7,
      title: "Đầu tư BDS cho thuê: Bí quyết tối ưu lợi nhuận",
      excerpt: "Hướng dẫn chi tiết cách chọn BDS cho thuê, tính toán ROI và quản lý hiệu quả...",
      category: "Đầu tư",
      date: "01/12/2024",
      readTime: "8 phút đọc",
      views: "3.2K",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 8,
      title: "Smart home: Công nghệ thay đổi cách sống hiện đại",
      excerpt: "Các giải pháp nhà thông minh đang trở thành tiêu chuẩn mới trong BDS cao cấp...",
      category: "Công nghệ",
      date: "28/11/2024",
      readTime: "6 phút đọc",
      views: "2.1K",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const categories = ["Tất cả", "Thị trường", "Pháp lý", "Xu hướng", "Tài chính", "Hạ tầng", "Đầu tư", "Công nghệ"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              TIN TỨC BẤT ĐỘNG SẢN
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tin tức & Phân tích thị trường</h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Cập nhật những thông tin mới nhất về thị trường bất động sản, xu hướng đầu tư và các phân tích chuyên sâu
              từ đội ngũ chuyên gia IQI Vietnam.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Tìm kiếm tin tức..." className="pl-10" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category, index) => (
                  <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={index === 0 ? "default" : "outline"}
                      size="sm"
                      className={index === 0 ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {category}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tin nổi bật</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredNews.map((article, index) => (
              <ScaleIn key={article.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={500}
                          height={300}
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-green-600 text-white">{article.category}</Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                      <p className="text-muted-foreground line-clamp-3">{article.excerpt}</p>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {article.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                        </div>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href={`/news/${article.id}`}>
                          <Button className="w-full bg-green-600 hover:bg-green-700">Đọc tiếp</Button>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <FadeIn className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tất cả tin tức</h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allNews.map((article, index) => (
              <ScaleIn key={article.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="overflow-hidden h-full">
                    <div className="relative">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                      <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {article.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {article.views}
                        </span>
                      </div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href={`/news/${article.id}`}>
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            Đọc thêm
                          </Button>
                        </Link>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          <FadeIn delay={0.8} className="text-center mt-12">
            <Button variant="outline" size="lg">
              Xem thêm tin tức
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Đăng ký nhận tin tức mới nhất</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Nhận thông tin cập nhật về thị trường bất động sản và các cơ hội đầu tư hấp dẫn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Nhập email của bạn..." className="bg-white text-gray-900 border-0" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-green-600 hover:bg-gray-100">Đăng ký</Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
