'use client';

import { Badge } from '@/components/ui/badge';
import { ClipboardList } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { formatVnCurrencyShort } from '@/lib/utils';

const Overview = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    const leftColumn = [
      { label: 'Tên dự án', value: property.name },
      { label: 'Chủ đầu tư', value: property.developer },
      { label: 'Nhóm sản phẩm', value: property.propertyGroup },
      { label: 'Diện tích', value: `${property.landArea} m²` },
      {
        label: 'Phòng ngủ',
        value: `${property.minBedroom} - ${property.maxBedroom} phòng`,
      },
      { label: 'Thời gian bàn giao', value: property.handoverDate },
      { label: 'Giai đoạn', value: property.phase },
      {
        label: 'Giá từ',
        value: `Từ ${formatVnCurrencyShort(property.minPrice)}`,
        className: 'text-yellow-400',
      },
      {
        label: 'Trạng thái',
        value: <Badge>{property.status}</Badge>,
        isLast: true,
      },
    ];

    const rightColumn = [
      { label: 'Địa chỉ', value: property.address },
      { label: 'Loại hình', value: property.propertyType },
      { label: 'Tổng số căn/sản phẩm', value: property.totalUnits },
      { label: 'Diện tích đất', value: `${property.landArea} m²` },
      {
        label: 'Phòng tắm',
        value: `${property.minBathroom} - ${property.maxBathroom} phòng`,
      },
      { label: 'Tình trạng sở hữu', value: property.tenure },
      { label: 'Tình trạng pháp lý', value: property.legalStatus },
      { label: 'Đơn vị tiền tệ', value: property.currency },
      {
        label: 'Lượt xem',
        value: property.views.toLocaleString(),
        className: 'text-blue-400',
        isLast: true,
      },
    ];

    return (
      <section
        ref={ref}
        id="general-overview"
        className="relative min-h-screen"
      >
        <div className="absolute inset-0">
          <Image
            src={property.overviewImage || '/placeholder.svg'}
            alt="Project Overview"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/40 to-black/20"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="w-full text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="bg-red-500/20 hover:bg-red-500/30 text-red-300 border-red-400/30 mb-6">
                <ClipboardList className="w-4 h-4 mr-2" />
                Thông tin chi tiết
              </Badge>
              <h2 className="text-5xl md:text-6xl font-bold mb-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                Tổng Quan Dự Án
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                {property.overviewSummary.trim()}
              </p>
            </motion.div>

            {/* Detailed Information Table */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center">
                  <ClipboardList className="w-6 h-6 mr-3" />
                  Chi tiết kỹ thuật
                </h3>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                  {[leftColumn, rightColumn].map((column, colIdx) => (
                    <div key={colIdx}>
                      {column.map(
                        ({ label, value, className, isLast }, idx) => (
                          <div
                            key={idx}
                            className={`flex justify-between items-center py-3 ${
                              isLast ? '' : 'border-b border-white/20'
                            }`}
                          >
                            <span className="text-gray-300 font-medium">
                              {label}
                            </span>
                            <span
                              className={`font-semibold text-right ${className || ''}`}
                            >
                              {value}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
);

Overview.displayName = 'Overview';
export default Overview;
