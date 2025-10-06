'use client';

import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { Calendar, Clock, Eye, Share2, Edit, User } from 'lucide-react';
import Image from 'next/image';
import Header from '@/app/(main)/layout/header';
import { useGetPublicArticleByIdQuery } from '@/features/article/articleApi';
import LoadingScreen from '@/components/common/loading-screen';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function NewsDetailPage({ params }: any) {
  const { data: { article, relatedArticles } = {}, isLoading } =
    useGetPublicArticleByIdQuery(params.id);
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: any) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Lỗi khi copy:', err);
    }
  };

  if (isLoading) {
    return <LoadingScreen loadingText="Đang tải bài viết..." />;
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header heroId="intro" enableHidden={false} />
      <div className="container mx-auto px-4 pt-20">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              {article.category}
            </Badge>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.createdAt).toLocaleDateString('vi-VN')}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{article.views}</span>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Title */}
              <FadeIn>
                <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  {article.title}
                </h1>
              </FadeIn>

              {/* Featured Image */}
              <FadeIn delay={0.2}>
                <div className="relative mb-4">
                  <Image
                    src={article.image?.url || '/placeholder-2.webp'}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </FadeIn>

              {/* Article Actions */}
              <FadeIn delay={0.4}>
                <div className="flex items-center justify-between mb-4 bg-muted/30 rounded-lg">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{article.creator.name}</span>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-4 hidden sm:block"
                    />
                    <div className="flex items-center space-x-1">
                      <Edit className="w-4 h-4" />
                      <span>
                        Cập nhật{' '}
                        {new Date(article.updatedAt).toLocaleDateString(
                          'vn-VN'
                        )}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-8 w-8 p-0 hover:text-primary bg-transparent hover:bg-transparent relative"
                    onClick={handleShare}
                  >
                    {copied && (
                      <div className="absolute -translate-x-3/4 text-xs bg-background/80 px-2 py-1 rounded shadow">
                        Đã sao chép!
                      </div>
                    )}
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </FadeIn>

              {/* Article Content */}
              <FadeIn delay={0.6}>
                <div
                  className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </FadeIn>

              {/* Tags */}
              <FadeIn delay={0.8}>
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: any, index: any) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="hover:bg-orange-100 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              {/* Related Articles */}
              <SlideIn direction="right" delay={0.2}>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Bài viết liên quan
                    </h3>
                    <div className="space-y-4">
                      {relatedArticles.map((related: any) => (
                        <motion.div
                          key={related.id}
                          whileHover={{ x: 5 }}
                          className="flex space-x-3 cursor-pointer"
                        >
                          <Image
                            src={related.image?.url || '/placeholder-2.webp'}
                            alt={related.title}
                            width={80}
                            height={60}
                            className="rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/${related.type.toLocaleLowerCase()}/${related.id}`}
                            >
                              <h4 className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                                {related.title}
                              </h4>
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(related.createdAt).toLocaleDateString(
                                'vi-VN'
                              )}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </SlideIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
