import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/common/animations';
import { ArrowRight, Building2, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

export default function Article() {
  const { theme, setTheme } = useTheme();
  console.log(theme);

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

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto mb-12">
          <SpotlightCard
            className={cn(
              'group cursor-pointer transition-all duration-300 h-full',
              theme === 'dark'
                ? 'bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-600/40'
                : 'bg-gradient-to-br from-cyan-100 to-blue-200 border border-cyan-300 hover:from-cyan-200/90 hover:to-blue-300/90'
            )}
            onClick={() => (window.location.href = '/macro')}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="pb-4">
                <div
                  className={cn(
                    'w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors',
                    theme === 'dark' ? 'bg-cyan-500/20' : 'bg-cyan-300/50'
                  )}
                >
                  <Building2
                    className={cn(
                      'w-10 h-10',
                      theme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
                    )}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Tin Tức Vĩ Mô</h3>
                <div
                  className={cn(
                    'w-16 h-1 rounded-full',
                    theme === 'dark' ? 'bg-cyan-400' : 'bg-cyan-600'
                  )}
                ></div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Phân tích chính sách, xu hướng thị trường và các yếu tố kinh
                  tế vĩ mô ảnh hưởng đến BĐS Việt Nam
                </p>
                <Button
                  className={cn(
                    'px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all w-full',
                    theme === 'dark'
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-white'
                      : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  )}
                >
                  Xem tin vĩ mô
                </Button>
              </div>
            </div>
          </SpotlightCard>

          <SpotlightCard
            className={cn(
              'group cursor-pointer transition-all duration-300 h-full',
              theme === 'dark'
                ? 'bg-gradient-to-br from-teal-500/20 to-green-600/30 border border-teal-500/30 hover:from-teal-500/30 hover:to-green-600/40'
                : 'bg-gradient-to-br from-teal-100 to-green-200 border border-teal-300 hover:from-teal-200/90 hover:to-green-300/90'
            )}
            onClick={() => (window.location.href = '/micro')}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="pb-4">
                <div
                  className={cn(
                    'w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-500/30 transition-colors',
                    theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-300/50'
                  )}
                >
                  <Newspaper
                    className={cn(
                      'w-10 h-10',
                      theme === 'dark' ? 'text-teal-400' : 'text-teal-700'
                    )}
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Tin Tức Vi Mô</h3>
                <div
                  className={cn(
                    'w-16 h-1 rounded-full',
                    theme === 'dark' ? 'bg-teal-400' : 'bg-teal-600'
                  )}
                ></div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Thông tin chi tiết về dự án, giao dịch thực tế, giá cả và tin
                  tức từng khu vực, phân khúc
                </p>
                <Button
                  className={cn(
                    'px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all w-full',
                    theme === 'dark'
                      ? 'bg-teal-500 hover:bg-teal-400 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white'
                  )}
                >
                  Xem tin vi mô
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </div>

        <FadeIn delay={0.8} className="text-center">
          <Link href="/article">
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
