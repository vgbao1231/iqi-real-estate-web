'use client';

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
import { useGetPublicArticlesQuery } from '@/features/article/articleApi';
import LoadingScreen from '@/components/common/loading-screen';
import { cn, formatPriceRange } from '@/lib/utils';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

export default function MacroNewsPage() {
  const articleCategories: any =
    useSelector((state: RootState) => state.enum.articleCategories) ?? [];

  const { data: { articles = [], featuredProjects = [] } = {}, isLoading } =
    useGetPublicArticlesQuery();
  const featuredArticles = articles.filter(
    (article: any) => article.isFeatured
  );
  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);
  const pathname = usePathname();

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedArticles,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination({ data: articles, itemsPerPage: 6 });

  const getValue = (project: any, id: string) =>
    project.overview.basicInfo.find((item: any) => item.id === id)?.value;

  if (isLoading) {
    return <LoadingScreen loadingText="Đang tải tin tức vĩ mô..." />;
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
          <FadeIn
            className={cn(
              'grid grid-cols-1 lg:grid-cols-3 gap-6 h-80',
              featuredArticles.length > 1
                ? 'lg:grid-cols-3'
                : 'lg:grid-cols-1 h-104'
            )}
          >
            {/* Main Featured Article */}
            <FadeIn className="lg:col-span-2 pl-4 h-full">
              <Card className="overflow-hidden h-full group hover:shadow-2xl transition-all duration-500">
                <Link
                  href={`${pathname}/${featuredArticles[0].id}`}
                  className="relative h-full overflow-hidden"
                >
                  <Image
                    src={featuredArticles[0].image?.url || '/placeholder.svg'}
                    alt={featuredArticles[0].title}
                    fill
                    priority
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
                      {articleCategories.find(
                        (ac: any) => ac.value === featuredArticles[0].category
                      )?.label || featuredArticles[0].category}
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
            {featuredArticles.length > 1 && (
              <FadeIn className="space-y-3.5 max-h-[calc(2*10rem)] overflow-hidden hover:overflow-y-auto pr-4">
                {featuredArticles.slice(1).map((article: any, idx: any) => (
                  <>
                    <motion.div
                      key={article.id}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="overflow-hidden group border-0 shadow-none">
                        <Link
                          href={`${pathname}/${article.id}`}
                          className="flex"
                        >
                          <div className="relative w-36 aspect-square">
                            <Image
                              src={article.image?.url || '/placeholder.svg'}
                              alt={article.title}
                              fill
                              priority
                              className="object-cover"
                            />
                          </div>

                          {/* Nội dung bên phải */}
                          <div className="p-4 flex flex-col flex-1">
                            <Badge className="mb-3 text-white bg-orange-500 w-fit center-both">
                              {articleCategories.find(
                                (ac: any) => ac.value === article.category
                              )?.label || article.category}
                            </Badge>
                            <h3 className="font-semibold line-clamp-2 group-hover:text-orange-500 transition-colors">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.createdAt).toLocaleDateString(
                                  'vi-VN'
                                )}
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
            )}
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
                  {paginatedArticles.map((article: any) => (
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
                            src={article.image?.url || '/placeholder.svg'}
                            alt={article.title}
                            fill
                            priority
                            className="object-cover transition-transform duration-500"
                          />
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"
                          />
                          <Badge className="absolute top-3 left-3 text-white bg-orange-500 hover:bg-orange-600 transition-colors">
                            {articleCategories.find(
                              (ac: any) => ac.value === article.category
                            )?.label || article.category}
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
                                {new Date(article.createdAt).toLocaleDateString(
                                  'vi-VN'
                                )}
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
