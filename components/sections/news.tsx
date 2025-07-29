import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowRight,
  Calendar,
  Newspaper,
  Target,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function News() {
  return (
    <section className="py-8 md:p-12">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            TIN TỨC BẤT ĐỘNG SẢN
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cập nhật thị trường mới nhất
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Theo dõi những diễn biến mới nhất của thị trường bất động sản và xu
            hướng đầu tư thông minh.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: TrendingUp,
              badge: 'Thị trường',
              title: 'Giá BDS Q4/2024 tăng 8.5%',
              desc: 'Thị trường bất động sản TP.HCM ghi nhận mức tăng trưởng ổn định trong quý 4, với phân khúc căn hộ cao cấp dẫn đầu.',
              date: '15/12/2024',
              delay: 0.2,
            },
            {
              icon: Newspaper,
              badge: 'Tin tức',
              title: 'Luật Đất đai mới có hiệu lực',
              desc: 'Những thay đổi quan trọng trong Luật Đất đai 2024 ảnh hưởng đến quyền lợi của người mua bất động sản.',
              date: '12/12/2024',
              delay: 0.4,
            },
            {
              icon: Target,
              badge: 'Xu hướng',
              title: 'Đầu tư BDS nghỉ dưỡng 2025',
              desc: 'Phân tích xu hướng đầu tư bất động sản nghỉ dưỡng và những cơ hội sinh lời hấp dẫn trong năm 2025.',
              date: '10/12/2024',
              delay: 0.6,
            },
          ].map((item, index) => (
            <ScaleIn key={index} delay={item.delay}>
              <motion.div whileHover={{ y: -10 }} className="h-full">
                <Card className="h-full flex flex-col shadow-md">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <item.icon className="w-5 h-5 text-green-600" />
                      <Badge variant="secondary">{item.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1">
                    <p className="text-muted-foreground mb-4 flex-1">
                      {item.desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {item.date}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button size="sm" variant="outline">
                          Đọc thêm
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        <FadeIn delay={0.8} className="text-center">
          <Link href="/news">
            <Button className="bg-green-600 hover:bg-green-700">
              Xem tất cả tin tức
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
