import { Badge } from '@/components/ui/badge';

import { FadeIn } from '@/components/common/animations';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export const Header = ({ filteredProperties }: any) => (
  <FadeIn>
    <div className="bg-gradient-to-r !from-teal-500 !to-cyan-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Link>

          <div className="flex items-center justify-center mb-4">
            <Home className="w-8 h-8 mr-3" />
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2 hover:bg-teal-600">
              BẤT ĐỘNG SẢN NGHỈ DƯỠNG
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight drop-shadow-md bg-gradient-to-r !from-white !via-teal-100 !to-white bg-clip-text text-transparent py-2">
            Bất động sản Nghỉ Dưỡng
          </h1>

          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
            Khám phá những resort và condotel hàng đầu tại các điểm đến du lịch
            tuyệt vời
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-200">
                {filteredProperties.length}+
              </div>
              <div className="text-white/80">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-200">8</div>
              <div className="text-white/80">Thành phố</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-teal-200">50+</div>
              <div className="text-white/80">Đối tác</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
);
