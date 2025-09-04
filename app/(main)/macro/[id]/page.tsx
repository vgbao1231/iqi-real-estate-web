'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { Calendar, Clock, Eye, Share2, BookmarkPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from '@/app/(main)/layout/header';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  // Mock data - trong thực tế sẽ fetch từ API
  const article = {
    id: params.id,
    title: 'Thị trường BDS TP.HCM Q4/2025: Tăng trưởng ổn định 8.5%',
    content: `
  <p class="text-base leading-relaxed mb-4">
    Thị trường bất động sản TP.HCM trong quý 4/2025 đã ghi nhận mức tăng trưởng 
    <span class="font-semibold">8.5%</span> so với cùng kỳ năm trước, với 
    phân khúc căn hộ cao cấp dẫn đầu xu hướng tăng giá.
  </p>
  
  <h2 class="text-xl md:text-2xl font-bold mt-8 mb-3">Phân khúc căn hộ cao cấp dẫn đầu</h2>
  <p class="mb-4">
    Theo báo cáo từ Hiệp hội Bất động sản TP.HCM, phân khúc căn hộ cao cấp đã tăng trưởng 
    <span class="font-semibold">12%</span> về giá bán, trong khi nhà phố và biệt thự tăng 6.2%. 
    Điều này cho thấy sự phân hóa rõ rệt trong thị trường.
  </p>
  <p class="mb-4">
    Các dự án tại khu vực trung tâm như Quận 1, Quận 3, và Quận 7 tiếp tục thu hút sự quan tâm 
    của nhà đầu tư nhờ vào vị trí đắc địa và hạ tầng hoàn thiện.
  </p>

  <h2 class="text-xl md:text-2xl font-bold mt-8 mb-3">Nguồn cung mới tăng mạnh</h2>
  <p class="mb-4">
    Quý 4/2025 chứng kiến sự gia tăng đáng kể về nguồn cung mới với 15 dự án được mở bán, 
    tổng cộng hơn 8,000 căn hộ ra thị trường. Điều này giúp cân bằng cung cầu và ổn định giá cả.
  </p>
  <p class="mb-4">
    Đặc biệt, các dự án tại khu Đông như Thủ Đức, Quận 9 đang trở thành tâm điểm với mức giá hợp lý 
    và tiềm năng phát triển cao.
  </p>

  <h2 class="text-xl md:text-2xl font-bold mt-8 mb-3">Dự báo cho năm 2025</h2>
  <p class="mb-4">
    Các chuyên gia dự báo thị trường BDS TP.HCM sẽ tiếp tục tăng trưởng ổn định trong năm 2025 với mức tăng khoảng 6-8%. 
    Các yếu tố hỗ trợ bao gồm:
  </p>
  <ul class="list-disc list-inside space-y-2 mb-4">
    <li>Hạ tầng giao thông được cải thiện với các tuyến metro mới</li>
    <li>Chính sách hỗ trợ người mua nhà lần đầu</li>
    <li>Dòng vốn FDI tiếp tục đổ vào thị trường BDS</li>
    <li>Nhu cầu ở thực tăng cao do dân số trẻ</li>
  </ul>

  <p class="mb-4">
    Tuy nhiên, nhà đầu tư cần <span class="font-semibold">thận trọng</span> và lựa chọn dự án có 
    <span class="font-semibold">pháp lý rõ ràng</span>, <span class="font-semibold">vị trí tốt</span> 
    và <span class="font-semibold">chủ đầu tư uy tín</span> để đảm bảo tính thanh khoản và lợi nhuận trong tương lai.
  </p>
`,

    category: 'Thị trường',
    date: '15/12/2025',
    readTime: '5 phút đọc',
    views: '2.1K',
    likes: 156,
    comments: 23,
    image: '/placeholder-2.webp?height=400&width=800',
    author: {
      name: 'Nguyễn Minh Tuấn',
      title: 'Chuyên gia phân tích BDS',
      avatar: '/placeholder-2.webp?height=50&width=50',
      bio: '15+ năm kinh nghiệm trong lĩnh vực bất động sản, chuyên gia phân tích thị trường tại IQI Vietnam',
    },
    tags: ['Thị trường', 'TP.HCM', 'Căn hộ', 'Đầu tư', '2025'],
    relatedArticles: [
      {
        id: 2,
        title: 'Luật Đất đai 2025: Những thay đổi quan trọng',
        image: '/placeholder-2.webp?height=150&width=200',
        date: '12/12/2025',
      },
      {
        id: 3,
        title: 'Xu hướng đầu tư BDS nghỉ dưỡng 2025',
        image: '/placeholder-2.webp?height=150&width=200',
        date: '10/12/2025',
      },
      {
        id: 4,
        title: 'Lãi suất vay mua nhà giảm: Cơ hội vàng',
        image: '/placeholder-2.webp?height=150&width=200',
        date: '08/12/2025',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header heroId="intro" enableHidden={false} />
      <div className="container mx-auto px-4 pt-20">
        <FadeIn>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Badge className="bg-orange-100 text-orange-800">
              {article.category}
            </Badge>
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
                    src={article.image || '/placeholder-2.webp'}
                    alt={article.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </FadeIn>

              {/* Article Actions */}
              <FadeIn delay={0.4}>
                <div className="flex items-center justify-end mb-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      <BookmarkPlus className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 text-muted-foreground hover:text-orange-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                  </div>
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
                    {article.tags.map((tag, index) => (
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

              {/* Author Info */}
              <FadeIn delay={1.0}>
                <Card className="mt-8">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          src={article.author.avatar || '/placeholder-2.webp'}
                        />
                        <AvatarFallback>
                          {article.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold">
                          {article.author.name}
                        </h4>
                        <p className="text-orange-500 font-medium mb-2">
                          {article.author.title}
                        </p>
                        <p className="text-muted-foreground">
                          {article.author.bio}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                      {article.relatedArticles.map((related, index) => (
                        <motion.div
                          key={related.id}
                          whileHover={{ x: 5 }}
                          className="flex space-x-3 cursor-pointer"
                        >
                          <Image
                            src={related.image || '/placeholder-2.webp'}
                            alt={related.title}
                            width={80}
                            height={60}
                            className="rounded object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <Link href={`/news/${related.id}`}>
                              <h4 className="text-sm font-medium line-clamp-2 hover:text-orange-500 transition-colors">
                                {related.title}
                              </h4>
                            </Link>
                            <p className="text-xs text-muted-foreground mt-1">
                              {related.date}
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
