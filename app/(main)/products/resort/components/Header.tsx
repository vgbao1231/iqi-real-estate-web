import { Badge } from '@/components/ui/badge';

import { FadeIn } from '@/components/common/animations';
import { Home } from 'lucide-react';
import Header from '@/app/(main)/layout/header';
import { partners } from '@/lib/partner-data';

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
              BẤT ĐỘNG SẢN NGHỈ DƯỠNG
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight drop-shadow-md bg-gradient-to-r !from-white !via-orange-100 !to-white bg-clip-text text-transparent py-2">
            Bất động sản Nghỉ Dưỡng
          </h1>

          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Khám phá những resort và condotel hàng đầu tại các điểm đến du lịch
            tuyệt vời
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
              <div className="text-3xl font-bold">6+</div>
              <div className="text-white/80">Thành phố</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {partners.developer.length}+
              </div>
              <div className="text-white/80">Đối tác</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);
