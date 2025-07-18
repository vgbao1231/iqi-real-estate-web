'use client';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClipboardList } from 'lucide-react';
import { formatVnCurrencyShort } from '@/lib/utils';

export default function Overview({ property }: any) {
  return (
    <section id="general-overview" className="max-w-7xl mx-auto px-4 space-y-8">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-green-600">
        <ClipboardList className="w-6 h-6 mr-3" />
        Thông tin tổng quan dự án
      </h3>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="relative h-[60vh] w-full rounded-lg overflow-hidden"
        >
          <Image
            src={property.overviewImage || '/placeholder-2.webp'}
            alt="Tổng quan dự án"
            fill
            className="object-cover"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed whitespace-pre-line text-muted-foreground"
        >
          {property.overviewSummary}
        </motion.p>
      </div>

      <Separator className="my-8" />

      <h4 className="text-xl font-bold mb-4 flex items-center">
        <ClipboardList className="w-5 h-5 mr-2" />
        Chi tiết kỹ thuật
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          { label: 'Tên dự án', value: property.name },
          { label: 'Địa chỉ', value: property.address },
          { label: 'Chủ đầu tư', value: property.developer },
          { label: 'Loại hình', value: property.propertyType },
          { label: 'Nhóm sản phẩm', value: property.propertyGroup },
          { label: 'Tổng số căn/sản phẩm', value: property.totalUnits },
          {
            label: 'Diện tích',
            value: `${property.minBuildUp} - ${property.maxBuildUp} ${property.measurementUnit}`,
          },
          {
            label: 'Diện tích đất',
            value: `${property.landArea} ${property.measurementUnit}`,
          },
          {
            label: 'Phòng ngủ',
            value: `${property.minBedroom} - ${property.maxBedroom} phòng`,
          },
          {
            label: 'Phòng tắm',
            value: `${property.minBathroom} - ${property.maxBathroom} phòng`,
          },
          { label: 'Thời gian bàn giao', value: property.handoverDate },
          { label: 'Tình trạng sở hữu', value: property.tenure },
          { label: 'Giai đoạn', value: property.phase },
          { label: 'Tình trạng pháp lý', value: property.legalStatus },
          {
            label: 'Giá từ',
            value: `Từ ${formatVnCurrencyShort(property.minPrice)}`,
          },
          { label: 'Đơn vị tiền tệ', value: property.currency },
          { label: 'Trạng thái', value: property.status, badge: true },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 + 0.3 }}
            className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
          >
            <span className="font-medium text-muted-foreground">
              {item.label}
            </span>
            <span className="font-medium text-foreground">{item.value}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
