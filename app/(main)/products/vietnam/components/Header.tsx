import { Badge } from '@/components/ui/badge';

import { FadeIn } from '@/components/common/animations';
import { Home } from 'lucide-react';
import Header from '@/app/(main)/layout/header';

export const ProductIntroSection = ({ filteredProperties }: any) => (
  <FadeIn>
    <Header heroId="intro" />
    <div
      id="intro"
      className="bg-gradient-to-br from-yellow-500 to-orange-500 dark:from-orange-400 dark:to-orange-600 text-white relative overflow-hidden"
    >
      <div className="relative container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Home className="w-8 h-8 mr-3" />
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2 hover:bg-orange-500">
              BẤT ĐỘNG SẢN VIỆT NAM
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight drop-shadow-md py-2">
            Bất động sản Việt Nam
          </h1>

          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Khám phá toàn bộ dự án bất động sản chất lượng cao trên khắp Việt
            Nam. Từ Bắc vào Nam, từ thành phố đến nghỉ dưỡng - tất cả đều có tại
            đây.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-4 max-w-2xl mx-auto text-orange-100">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {filteredProperties.length}+
              </div>
              <div className="text-white/80">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">8</div>
              <div className="text-white/80">Thành phố</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-white/80">Đối tác</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);
