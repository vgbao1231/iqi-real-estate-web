'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Calendar,
  Eye,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo, useEffect } from 'react';
import Header from '@/app/(main)/layout/header';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { usePagination } from '@/hooks/use-pagination';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { motion } from 'framer-motion';
import { formatPriceRange, formatViews } from '@/lib/utils';
import { Pagination } from '@/components/ui/pagination';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useGetPublicArticlesQuery } from '@/features/article/articleApi';

// const allNews = [
//   {
//     id: 1,
//     title: 'Dự án Vinhomes Grand Park: Cập nhật tiến độ tháng 12',
//     description:
//       'Thông tin chi tiết về tiến độ xây dựng, bàn giao và các chính sách bán hàng mới nhất của dự án. Hiện tại, dự án đã hoàn thành 85% hạ tầng kỹ thuật và dự kiến bàn giao đợt đầu vào quý 2/2025...',
//     category: 'Hạ tầng',
//     date: '14/12/2025',
//     readTime: '5 phút đọc',
//     views: 3200,
//     price: '2.8 - 4.2 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: true,
//   },
//   {
//     id: 2,
//     title: 'Masteri Thảo Điền: Giá bán và chính sách ưu đãi Q4',
//     description:
//       'Cập nhật bảng giá mới nhất và các chương trình khuyến mãi hấp dẫn cho khách hàng quan tâm. Chủ đầu tư đưa ra gói hỗ trợ lãi suất 0% trong 24 tháng đầu cho khách hàng mua trong tháng 12...',
//     category: 'Tài chính',
//     date: '13/12/2025',
//     readTime: '4 phút đọc',
//     views: 2800,
//     price: '3.5 - 6.8 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: true,
//   },
//   {
//     id: 3,
//     title: 'Căn hộ The Sun Avenue: Phân tích lợi nhuận cho thuê',
//     description:
//       'Bài viết phân tích chi tiết về khả năng sinh lời từ việc cho thuê căn hộ tại dự án The Sun Avenue, bao gồm giá thuê trung bình, tỷ lệ lấp đầy, ưu thế về vị trí, cùng những yếu tố ảnh hưởng trực tiếp đến lợi nhuận lâu dài của nhà đầu tư.',
//     category: 'Đầu tư',
//     date: '11/12/2025',
//     readTime: '6 phút đọc',
//     views: 2100,
//     price: '2.2 - 3.8 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: true,
//   },
//   {
//     id: 4,
//     title: 'Shophouse Phú Mỹ Hưng: Cơ hội đầu tư cuối năm',
//     description:
//       'Bài viết khảo sát thị trường shophouse tại khu vực Phú Mỹ Hưng, phân tích sức hút về vị trí, tiềm năng kinh doanh và khả năng tăng giá, từ đó đưa ra đánh giá về những cơ hội đầu tư đáng chú ý vào cuối năm 2025.',
//     category: 'Thị trường',
//     date: '09/12/2025',
//     readTime: '7 phút đọc',
//     views: 1900,
//     price: '8 - 15 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: false,
//   },
//   {
//     id: 5,
//     title: 'Biệt thự Ecopark: So sánh giá với các dự án cùng phân khúc',
//     description:
//       'Bài viết phân tích và so sánh giá bán, hệ thống tiện ích, không gian sống và tiềm năng phát triển của biệt thự Ecopark so với các dự án biệt thự khác trong cùng phân khúc cao cấp tại khu vực lân cận.',
//     category: 'Xu hướng',
//     date: '07/12/2025',
//     readTime: '8 phút đọc',
//     views: 1700,
//     price: '12 - 25 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: false,
//   },
//   {
//     id: 6,
//     title: 'Căn hộ Landmark 81: Thị trường cho thuê cao cấp',
//     description:
//       'Bài viết cung cấp cái nhìn tổng quan về thị trường cho thuê căn hộ cao cấp tại Landmark 81, phân tích nhóm khách hàng mục tiêu, mức giá thuê phổ biến, cùng những yếu tố tạo nên sức hút vượt trội so với các dự án khác.',
//     category: 'Pháp lý',
//     date: '05/12/2025',
//     readTime: '5 phút đọc',
//     views: 1500,
//     price: '8 - 20 tỷ',
//     image: '/placeholder.svg',
//     isFeatured: true,
//   },
//   {
//     id: 7,
//     title: 'Ứng dụng AI trong quản lý bất động sản',
//     description:
//       'Bài viết tìm hiểu về những ứng dụng thực tiễn của trí tuệ nhân tạo trong lĩnh vực bất động sản, từ quản lý dữ liệu khách hàng, tối ưu hóa giá bán cho đến dự đoán xu hướng thị trường và nâng cao trải nghiệm của nhà đầu tư.',
//     category: 'Công nghệ',
//     date: '03/12/2025',
//     readTime: '6 phút đọc',
//     views: 1300,
//     price: 'N/A',
//     image: '/placeholder.svg?height=250&width=400',
//     isFeatured: true,
//   },
// ];

// const filterCategories = [
//   'Tất cả',
//   'Thị trường',
//   'Pháp lý',
//   'Xu hướng',
//   'Tài chính',
//   'Hạ tầng',
//   'Đầu tư',
//   'Công nghệ',
// ];

export default function MicroNewsPage() {
  const articleCategories: any =
    useSelector((state: RootState) => state.enum.articleCategories) ?? [];
  const { data: { articles = [], featuredProjects = [] } = {}, isLoading } =
    useGetPublicArticlesQuery();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const pathname = usePathname();

  const filteredNews = useMemo(
    () =>
      articles.filter((article: any) => {
        const matchesFilter =
          activeFilter === 'all' || article.category === activeFilter;
        const matchesSearch =
          searchTerm === '' ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
      }),
    [activeFilter, searchTerm, articles]
  );

  const featuredNews = useMemo(
    () => filteredNews.filter((article: any) => article.isFeatured),
    [filteredNews]
  );

  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views) // sắp xếp giảm dần theo views
    .slice(0, 3); // lấy top 3 bài viết

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedNews,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination({ data: filteredNews, itemsPerPage: 5 });
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    carouselApi.on('select', updateCarouselState);
    carouselApi.on('reInit', updateCarouselState);
    updateCarouselState();

    return () => {
      carouselApi.off('select', updateCarouselState);
      carouselApi.off('reInit', updateCarouselState);
    };
  }, [carouselApi]);

  const scrollPrev = () => carouselApi?.scrollPrev();
  const scrollNext = () => carouselApi?.scrollNext();

  const getValue = (project: any, id: string) =>
    project.overview.basicInfo.find((item: any) => item.id === id)?.value;

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
          <p className="text-muted-foreground">Đang tải tin tức vi mô...</p>
        </FadeIn>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Header */}
      <Header heroId="intro" enableHidden={false} />

      {/* Page Header */}
      <section id="intro" className="relative py-12 pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-500" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn className="text-center text-white">
            <FadeIn>
              <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                TIN TỨC VI MÔ
              </Badge>
            </FadeIn>
            <FadeIn delay={0.2} className="text-4xl md:text-5xl font-bold mb-4">
              Hoạt động doanh nghiệp & biến động thị trường
            </FadeIn>
            <FadeIn
              delay={0.4}
              className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed"
            >
              Cập nhật báo cáo tài chính, kết quả kinh doanh và các biến động vi
              mô từ từng doanh nghiệp để nắm bắt cơ hội đầu tư kịp thời.
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Filter Bar with working functionality */}
      <section className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {articleCategories.map((category: any) => (
                <Button
                  key={category.value}
                  variant={
                    activeFilter === category.value ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => setActiveFilter(category.value)}
                  className={`${
                    activeFilter === category.value
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'border-border hover:border-orange-500 hover:text-orange-500'
                  }`}
                >
                  {category.label}
                </Button>
              ))}
            </div>
            <div className="relative lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
              <Input
                placeholder="Tìm theo dự án, khu vực..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      {featuredNews.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto pl-4">
            {featuredNews.length > 0 && (
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Tin tức nổi bật</h2>
                  {featuredNews.length > 3 && (
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="p-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="p-2"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <Carousel
                    className="w-full"
                    setApi={setCarouselApi}
                    opts={{
                      loop: false,
                      align: 'start',
                      slidesToScroll: 1,
                    }}
                  >
                    <CarouselContent className="-ml-6 py-2">
                      {featuredNews.map((article: any) => (
                        <CarouselItem
                          key={article.id}
                          className="pl-6 md:basis-1/2 lg:basis-1/3"
                        >
                          <motion.div
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
                            <Card className="overflow-hidden h-full group">
                              <Link
                                href={`${pathname}/${article.id}`}
                                className="relative"
                              >
                                <Image
                                  src={article.image || '/placeholder.svg'}
                                  alt={article.title}
                                  width={600}
                                  height={300}
                                  className="w-full h-64 object-cover"
                                />
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-orange-500 text-white">
                                    {article.category}
                                  </Badge>
                                </div>
                              </Link>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-xl line-clamp-2 group-hover:text-orange-500 transition-colors">
                                  <Link href={`${pathname}/${article.id}`}>
                                    {article.title}
                                  </Link>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                  {article.description}
                                </p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 mt-auto">
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(
                                      article.createdAt
                                    ).toLocaleDateString('vi-VN')}
                                  </span>
                                  <span className="flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {formatViews(article.views)}
                                  </span>
                                </div>
                                <Link href={`${pathname}/${article.id}`}>
                                  <Button className="w-full bg-orange-500 hover:bg-orange-600">
                                    Xem chi tiết
                                  </Button>
                                </Link>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Articles Grid */}
            <div className="lg:col-span-3">
              <div className="rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">
                    {activeFilter === 'Tất cả'
                      ? 'Tất cả tin tức'
                      : `Tin tức ${activeFilter}`}
                    {searchTerm && (
                      <span className="text-base font-normal text-muted-foreground ml-2">
                        - Kết quả cho &quot;{searchTerm}&quot;
                      </span>
                    )}
                  </h3>
                  <div className="text-sm text-muted-foreground">
                    {filteredNews.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Hiển thị {(currentPage - 1) * itemsPerPage + 1}-
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredNews.length
                        )}{' '}
                        trong tổng số {filteredNews.length} bài viết
                      </div>
                    )}
                  </div>
                </div>

                {filteredNews.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground mb-4">
                      <Search className="w-12 h-12 mx-auto mb-4" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Không tìm thấy kết quả
                    </h3>
                    <p className="text-muted-foreground">
                      {searchTerm
                        ? `Không có bài viết nào phù hợp với "${searchTerm}"`
                        : `Không có bài viết nào trong danh mục "${activeFilter}"`}
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setActiveFilter('Tất cả');
                        setSearchTerm('');
                      }}
                      className="mt-4"
                    >
                      Xem tất cả tin tức
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {paginatedNews.map((article: any, idx) => (
                      <>
                        <motion.div
                          key={article.id}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                          }}
                          whileHover={{
                            x: 6,
                            transition: { type: 'spring', stiffness: 200 },
                          }}
                        >
                          <Card className="group border-0 bg-background shadow-none">
                            <div className="md:flex gap-6">
                              {/* Ảnh bên trái */}
                              <Link
                                href={`${pathname}/${article.id}`}
                                className="aspect-[4/3] h-52 relative flex-shrink-0 overflow-hidden rounded-md"
                              >
                                <Image
                                  src={article.image || '/placeholder.svg'}
                                  alt={article.title}
                                  fill
                                  priority
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </Link>

                              {/* Nội dung bên phải */}
                              <div className="flex-1 p-6 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs border border-border bg-card"
                                  >
                                    {article.category}
                                  </Badge>
                                </div>

                                <Link
                                  href={`${pathname}/${article.id}`}
                                  className="text-xl font-bold mb-2 line-clamp-2 hover:text-orange-500 transition-colors"
                                >
                                  {article.title}
                                </Link>

                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                  {article.description}
                                </p>

                                <div className="flex items-center justify-between">
                                  <div className="flex items-center text-xs text-muted-foreground space-x-3">
                                    <span className="flex items-center">
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {new Date(
                                        article.createdAt
                                      ).toLocaleDateString('vi-VN')}
                                    </span>
                                    <span className="flex items-center">
                                      <Eye className="w-3 h-3 mr-1" />
                                      {formatViews(article.views)}
                                    </span>
                                  </div>

                                  <Link href={`${pathname}/${article.id}`}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="hover:text-orange-500 border border-transparent hover:border-border"
                                    >
                                      Đọc thêm
                                    </Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                        {idx !== paginatedNews.length - 1 && (
                          <Separator className="bg-border/60" />
                        )}
                      </>
                    ))}
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
                )}
              </div>
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
                              {formatViews(article.views)} lượt xem
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
                    {featuredProjects.map((project: any) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ x: 5 }}
                        className="group cursor-pointer p-2 px-3 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/10 border border-transparent hover:border-orange-200 dark:hover:border-orange-600 transition-colors"
                      >
                        <Link
                          href={`/projects/${getValue(project, 'category')}/${project.id}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold group-hover:text-orange-500 transition-colors duration-300">
                                {getValue(project, 'project_name')}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                  {getValue(project, 'city')}
                                </span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                <span className="text-xs text-muted-foreground">
                                  {getValue(project, 'project_type')}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-orange-500 mt-1">
                                {formatPriceRange(getValue(project, 'price'))}
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
