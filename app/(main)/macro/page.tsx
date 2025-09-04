'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Eye, TrendingUp, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePagination } from '@/hooks/use-pagination';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/app/(main)/layout/header';
import { Pagination } from '@/components/ui/pagination';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { usePathname } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

// Articles data
const articles = [
  {
    id: 1,
    title: 'Thị trường BDS Việt Nam Q4/2025: Tăng trưởng ổn định 8.5%',
    description:
      'Báo cáo tổng quan thị trường bất động sản toàn quốc với những con số và xu hướng đáng chú ý trong quý 4/2025. Phân khúc căn hộ cao cấp dẫn đầu với mức tăng giá 12%.',
    category: 'Thị trường',
    date: '15/12/2025',
    readTime: '8 phút đọc',
    views: 5200,
    image:
      '/placeholder.svg?height=400&width=600&text=Vietnam+real+estate+market+growth+chart+analysis',
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Chính sách tiền tệ 2025: Tác động đến thị trường BDS',
    description:
      'Phân tích sâu về các quyết định lãi suất của Ngân hàng Nhà nước và tác động trực tiếp đến khả năng tiếp cận vốn vay mua nhà.',
    category: 'Chính sách',
    date: '14/12/2025',
    readTime: '6 phút đọc',
    views: 4800,
    image:
      '/placeholder.svg?height=400&width=600&text=monetary+policy+interest+rates+economic+impact',
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Đầu tư BDS khu vực Đông Nam Á: Cơ hội và thách thức',
    description:
      'Tổng quan về dòng vốn FDI vào lĩnh vực bất động sản các nước ASEAN, với Việt Nam dẫn đầu về tốc độ tăng trưởng.',
    category: 'Đầu tư',
    date: '13/12/2025',
    readTime: '10 phút đọc',
    views: 6100,
    image:
      '/placeholder.svg?height=400&width=600&text=Southeast+Asia+real+estate+investment+trends',
    isFeatured: true,
  },
  {
    id: 4,
    title: 'GDP Việt Nam tăng 6.8%: Động lực từ bất động sản',
    description:
      'Phân tích mối tương quan giữa tăng trưởng GDP và thị trường bất động sản trong 9 tháng đầu năm 2025.',
    category: 'Kinh tế',
    date: '12/12/2025',
    readTime: '5 phút đọc',
    views: 3200,
    image:
      '/placeholder.svg?height=300&width=400&text=GDP+growth+economic+indicators+real+estate+correlation',
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Lạm phát và sức mua bất động sản: Báo cáo tháng 12',
    description:
      'Tác động của chỉ số CPI đến khả năng mua nhà của các tầng lớp thu nhập khác nhau.',
    category: 'Thị trường',
    date: '11/12/2025',
    readTime: '7 phút đọc',
    views: 2900,
    image:
      '/placeholder.svg?height=300&width=400&text=inflation+impact+real+estate+purchasing+power',
    isFeatured: false,
  },
  {
    id: 6,
    title: 'FDI vào BDS tăng 15%: Xu hướng đầu tư nước ngoài',
    description:
      'Thống kê chi tiết về nguồn vốn đầu tư trực tiếp nước ngoài vào lĩnh vực bất động sản.',
    category: 'Đầu tư',
    date: '10/12/2025',
    readTime: '6 phút đọc',
    views: 4100,
    image:
      '/placeholder.svg?height=300&width=400&text=foreign+direct+investment+FDI+real+estate+Vietnam',
    isFeatured: false,
  },
  {
    id: 7,
    title: 'Trái phiếu doanh nghiệp BDS: Rủi ro và cơ hội',
    description:
      'Đánh giá thị trường trái phiếu bất động sản sau các quy định mới của Chính phủ.',
    category: 'Tài chính',
    date: '09/12/2025',
    readTime: '8 phút đọc',
    views: 3700,
    image:
      '/placeholder.svg?height=300&width=400&text=corporate+bonds+real+estate+financial+market',
    isFeatured: false,
  },
  {
    id: 8,
    title: 'Chính sách đất đai mới: Tác động đến giá BDS',
    description:
      'Phân tích các thay đổi trong Luật Đất đai và ảnh hưởng đến thị trường bất động sản.',
    category: 'Chính sách',
    date: '08/12/2025',
    readTime: '9 phút đọc',
    views: 5300,
    image:
      '/placeholder.svg?height=300&width=400&text=land+policy+regulations+real+estate+impact',
    isFeatured: false,
  },
  {
    id: 9,
    title: 'Thị trường cho thuê văn phòng: Phục hồi mạnh mẽ',
    description:
      'Tỷ lệ lấp đầy văn phòng tại TP.HCM và Hà Nội đạt mức cao nhất trong 2 năm qua.',
    category: 'Thị trường',
    date: '07/12/2025',
    readTime: '4 phút đọc',
    views: 2800,
    image:
      '/placeholder.svg?height=300&width=400&text=office+rental+market+recovery+occupancy+rates',
    isFeatured: false,
  },
  {
    id: 10,
    title: 'Xu hướng đầu tư BDS công nghiệp 2025',
    description:
      'Dự báo về các khu công nghiệp và nhà xưởng cho thuê trong năm tới.',
    category: 'Đầu tư',
    date: '06/12/2025',
    readTime: '7 phút đọc',
    views: 3500,
    image:
      '/placeholder.svg?height=300&width=400&text=industrial+real+estate+investment+trends+2025',
    isFeatured: false,
  },
  {
    id: 11,
    title: 'Tín dụng BDS: Ngân hàng nới lỏng điều kiện',
    description:
      'Các chính sách tín dụng mới của ngân hàng đối với vay mua nhà và đầu tư BDS.',
    category: 'Tài chính',
    date: '05/12/2025',
    readTime: '6 phút đọc',
    views: 4200,
    image:
      '/placeholder.svg?height=300&width=400&text=real+estate+credit+bank+lending+policies',
    isFeatured: false,
  },
  {
    id: 12,
    title: 'Phân tích chu kỳ thị trường BDS Việt Nam',
    description:
      'Nghiên cứu về các chu kỳ tăng trưởng và điều chỉnh của thị trường bất động sản.',
    category: 'Phân tích',
    date: '04/12/2025',
    readTime: '10 phút đọc',
    views: 6800,
    image:
      '/placeholder.svg?height=300&width=400&text=real+estate+market+cycle+analysis+Vietnam',
    isFeatured: true,
  },
  {
    id: 13,
    title: 'Smart City và tương lai BDS đô thị',
    description:
      'Tác động của công nghệ thông minh đến quy hoạch và phát triển bất động sản.',
    category: 'Công nghệ',
    date: '03/12/2025',
    readTime: '8 phút đọc',
    views: 3900,
    image:
      '/placeholder.svg?height=300&width=400&text=smart+city+urban+real+estate+technology+future',
    isFeatured: false,
  },
  {
    id: 14,
    title: 'Thị trường BDS nghỉ dưỡng: Phục hồi sau COVID',
    description:
      'Xu hướng đầu tư vào bất động sản du lịch và nghỉ dưỡng trong giai đoạn mới.',
    category: 'Du lịch',
    date: '02/12/2025',
    readTime: '5 phút đọc',
    views: 2600,
    image:
      '/placeholder.svg?height=300&width=400&text=resort+real+estate+tourism+recovery+post+covid',
    isFeatured: false,
  },
  {
    id: 15,
    title: 'ESG trong đầu tư BDS: Xu hướng bền vững',
    description:
      'Tiêu chí môi trường, xã hội và quản trị trong các dự án bất động sản hiện đại.',
    category: 'Bền vững',
    date: '01/12/2025',
    readTime: '9 phút đọc',
    views: 4700,
    image:
      '/placeholder.svg?height=300&width=400&text=ESG+sustainable+real+estate+investment+green+building',
    isFeatured: false,
  },
];

// Featured articles từ articles
const featuredArticles = articles.filter((article) => article.isFeatured);

const popularArticles = [...articles]
  .sort((a, b) => b.views - a.views)
  .slice(0, 3);

export default function MacroNewsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedArticles,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination({ data: articles, itemsPerPage: 6 });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <FadeIn className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
            }}
            className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Đang tải tin tức vĩ mô...</p>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header heroId="intro" enableHidden={false} />

      <section
        id="intro"
        className="relative py-12 pt-24 bg-gradient-to-br from-orange-500/90 to-orange-600/90 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-500" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center text-white">
            <FadeIn>
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                TIN TỨC VĨ MÔ
              </Badge>
            </FadeIn>
            <FadeIn delay={0.2} className="text-4xl md:text-5xl font-bold mb-4">
              Phân tích thị trường & Xu hướng kinh tế
            </FadeIn>
            <FadeIn
              delay={0.4}
              className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
            >
              Cập nhật những thông tin chuyên sâu về thị trường bất động sản,
              chính sách kinh tế và cơ hội đầu tư từ góc nhìn vĩ mô
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      <section className="pt-12">
        <div className="container mx-auto">
          <FadeIn className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Article */}
            <FadeIn className="lg:col-span-2 pl-4">
              <Card className="overflow-hidden h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <Link
                  href={`${pathname}/${featuredArticles[0].id}`}
                  className="relative h-80 overflow-hidden"
                >
                  <Image
                    src={featuredArticles[0].image || '/placeholder.svg'}
                    alt={featuredArticles[0].title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <Badge className="mb-3 text-white bg-orange-500">
                      {featuredArticles[0].category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight group-hover:text-orange-100 transition-colors">
                      {featuredArticles[0].title}
                    </h2>
                    <p className="text-gray-200 mb-4 line-clamp-2">
                      {featuredArticles[0].description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-300">
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1"
                      >
                        <Calendar className="h-4 w-4" />
                        {featuredArticles[0].date}
                      </motion.span>
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        {featuredArticles[0].views}
                      </motion.span>
                    </div>
                  </motion.div>
                </Link>
              </Card>
            </FadeIn>

            {/* Side Featured Articles */}
            <FadeIn className="space-y-3.5 max-h-[calc(2*10rem)] overflow-hidden hover:overflow-y-auto pr-4">
              {featuredArticles.slice(1).map((article, idx) => (
                <>
                  <motion.div
                    key={article.id}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="overflow-hidden group border-0 shadow-none">
                      <Link href={`${pathname}/${article.id}`} className="flex">
                        <div className="relative w-36 aspect-square">
                          <Image
                            src={article.image || '/placeholder.svg'}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Nội dung bên phải */}
                        <div className="p-4 flex flex-col flex-1">
                          <Badge className="mb-3 text-white bg-orange-500 w-fit center-both">
                            {article.category}
                          </Badge>
                          <h3 className="font-semibold line-clamp-2 group-hover:text-orange-500 transition-colors">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {article.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.views}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Card>
                  </motion.div>
                  {idx !== featuredArticles.length - 2 && (
                    <Separator className="bg-border/60" />
                  )}
                </>
              ))}
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <FadeIn className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Tất cả tin tức</h2>
                <div className="text-sm text-muted-foreground">
                  Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, articles.length)} trong
                  tổng số {articles.length} bài viết
                </div>
              </FadeIn>

              <AnimatePresence mode="wait">
                <FadeIn
                  key={currentPage}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                >
                  {paginatedArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 },
                      }}
                      whileHover={{
                        y: -8,
                        transition: { type: 'spring', stiffness: 300 },
                      }}
                      className="h-full"
                    >
                      <Card className="group hover:shadow-xl transition-all duration-500 h-full hover:border-orange-200 dark:hover:border-orange-500/60">
                        <Link
                          href={`${pathname}/${article.id}`}
                          className="relative h-48 overflow-hidden rounded-t-lg"
                        >
                          <Image
                            src={article.image || '/placeholder.svg'}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"
                          />
                          <Badge className="absolute top-3 left-3 text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                            {article.category}
                          </Badge>
                        </Link>
                        <CardContent className="p-6">
                          <Link
                            href={`${pathname}/${article.id}`}
                            className="text-xl font-semibold mb-3 group-hover:text-orange-500 transition-colors line-clamp-2"
                          >
                            {article.title}
                          </Link>
                          <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
                            {article.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {article.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {article.views}
                              </span>
                            </div>
                            <Link href={`${pathname}/${article.id}`}>
                              <motion.div
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:text-orange-500 border border-transparent hover:border-border"
                                >
                                  Đọc thêm
                                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </Button>
                              </motion.div>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </FadeIn>
              </AnimatePresence>

              {/* Pagination */}
              <Pagination
                displayResult={false}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                className="mt-8"
              />
            </div>

            <SlideIn direction="up">
              <div className="sticky top-24 space-y-8">
                {/* Popular Articles */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <TrendingUp className="h-5 w-5 text-orange-500" />
                      </motion.div>
                      Đọc nhiều nhất
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-4">
                    {popularArticles.map((article, index) => (
                      <Link key={article.id} href={`${pathname}/${article.id}`}>
                        <motion.div
                          className="flex gap-3 group cursor-pointer p-2 px-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 border border-transparent hover:border-orange-200 dark:hover:border-orange-600 transition-colors"
                          whileHover={{ x: 5 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold bg-orange-100 text-orange-500 dark:bg-orange-900/40 dark:text-orange-400"
                          >
                            {index + 1}
                          </motion.div>

                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-2group-hover:text-orange-500 dark:group-hover:text-orange-400">
                              {article.title}
                            </h4>
                            <p className="text-sm mt-1 flex items-center gap-1 text-muted-foreground dark:text-gray-400">
                              <Eye className="h-3 w-3" />
                              {article.views} lượt xem
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                {/* Featured Projects */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        <Star className="h-5 w-5 text-orange-500" />
                      </motion.div>
                      Dự án nổi bật
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-4">
                    {[
                      {
                        id: 1,
                        name: 'Vinhomes Grand Park',
                        location: 'TP.HCM',
                        category: 'residential',
                        type: 'Siêu đô thị',
                        price: '2.5 - 4.2 tỷ',
                      },
                      {
                        id: 2,
                        name: 'The Manor Central Park',
                        location: 'Hà Nội',
                        category: 'international',
                        type: 'Căn hộ cao cấp',
                        price: '3.8 - 6.5 tỷ',
                      },
                      {
                        id: 3,
                        name: 'Aqua City',
                        location: 'Đồng Nai',
                        category: 'resort',
                        type: 'Đô thị sinh thái',
                        price: '1.8 - 3.2 tỷ',
                      },
                    ].map((project) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ x: 5 }}
                        className="group cursor-pointer p-2 px-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 border border-transparent hover:border-orange-200 dark:hover:border-orange-600 transition-colors"
                      >
                        <Link
                          href={`/projects/${project.category}/${project.id}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold group-hover:text-orange-500 transition-colors duration-300">
                                {project.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {project.location}
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-xs text-muted-foreground">
                                  {project.type}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-orange-500 mt-1">
                                {project.price}
                              </p>
                            </div>
                            <motion.div
                              whileHover={{ x: 3 }}
                              className="flex-shrink-0"
                            >
                              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 transition-colors duration-300" />
                            </motion.div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>
    </div>
  );
}
