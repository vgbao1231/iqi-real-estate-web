import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Partners() {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-8">
          <Badge className="mb-4 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
            ĐỐI TÁC TIN CẬY
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Được tin tưởng bởi những thương hiệu hàng đầu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hợp tác với 50+ đối tác uy tín trong và ngoài nước
          </p>
        </FadeIn>

        {/* Compact Partner Logos */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center mb-8">
          {[
            {
              name: 'Vinhomes',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
            {
              name: 'Novaland',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
            {
              name: 'Masterise',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
            {
              name: 'Juwai IQI',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
            {
              name: 'Vietcombank',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
            {
              name: 'Techcombank',
              logo: '/placeholder-2.webp?height=60&width=100',
            },
          ].map((partner, index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <div className="bg-card p-3 rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 group hover:scale-105">
                <Image
                  src={partner.logo || '/placeholder-2.webp'}
                  alt={partner.name}
                  width={100}
                  height={60}
                  className="mx-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </ScaleIn>
          ))}
        </div>

        {/* Quick Stats */}
        <FadeIn delay={0.6}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-muted-foreground">Đối tác</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">20+</div>
              <div className="text-sm text-muted-foreground">Quốc gia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-muted-foreground">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-muted-foreground">Hài lòng</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.8} className="text-center">
          <Link href="/partners">
            <Button variant="outline" className="">
              Xem tất cả đối tác
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
