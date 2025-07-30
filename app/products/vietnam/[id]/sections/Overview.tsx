'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/common/animations';

const Overview = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const inforColumns = [
    { label: 'Tên dự án', value: data.name },
    { label: 'Chủ đầu tư', value: data.developer },
    { label: 'Loại hình', value: data.propertyType },
    { label: 'Nhóm sản phẩm', value: data.propertyGroup },
    {
      label: 'Đơn vị thiết kế cảnh quan',
      value: data.landscapeDesigner,
    },
    {
      label: 'Đơn vị thi công',
      value: data.contractors?.join(', '),
    },
    {
      label: 'Đơn vị thiết kế kiến trúc',
      value: data.architects?.join(', '),
      isLast: true,
    },
    {
      label: 'Tổng số căn/sản phẩm',
      value: data.totalUnits?.toLocaleString(),
    },
    {
      label: 'Diện tích đất',
      value: `${data.landArea} ${data.measurementUnit === 'sqm' ? 'm²' : 'ft²'}`,
    },
    {
      label: 'Phòng ngủ',
      value: `${data.minBedroom} - ${data.maxBedroom} phòng`,
    },
    {
      label: 'Phòng tắm',
      value: `${data.minBathroom} - ${data.maxBathroom} phòng`,
    },
    { label: 'Tình trạng sở hữu', value: data.tenure },
    { label: 'Tình trạng pháp lý', value: data.legal },
    { label: 'Thời gian bàn giao', value: data.handover },
    { label: 'Giai đoạn', value: data.phase },
    { label: 'Đơn vị tiền tệ', value: data.currency },
    { label: 'Địa chỉ', value: data.address },
    { label: 'Thành phố', value: data.city },
    { label: 'Quận/Huyện', value: data.district },
    {
      label: 'Trạng thái',
      value: <Badge>{data.status}</Badge>,
    },
  ];

  const half = Math.ceil(inforColumns.length / 2);
  const columns = [inforColumns.slice(0, half), inforColumns.slice(half)];

  return (
    <section ref={ref} id="overview" className="relative">
      {/* Sub section 1 */}
      <div className="relative min-h-[80vh] center-both">
        {/* Background image full screen */}
        <Image
          src={data.backgroundImage}
          alt="Eco Retreat Overview Background"
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 px-32">
          {data.overviewImages.map((item: any, idx: number) => (
            <FadeIn
              key={idx}
              delay={idx * 0.15}
              className="border border-lime-500 overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-square">
                <Image
                  src={item.image}
                  alt="Eco Retreat Overview Background"
                  className="object-contain"
                  fill
                  priority
                />
              </div>

              <div
                className="text-base text-white px-6 py-4 italic"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Sub section 2 */}
      <div className="relative min-h-screen center-both">
        <div className="h-full w-full center-both flex-col md:flex-row max-w-[85vw] py-8 gap-12">
          {/* Left content */}
          <SlideIn
            direction="left"
            className="relative w-full md:w-2/5 h-[85vh] center-both"
          >
            <Image
              src={data.experienceImage}
              alt="Eco Retreat Experience Background"
              fill
              className="object-contain"
              priority
            />
          </SlideIn>

          {/* Right content */}
          <div className="md:w-3/5 space-y-6">
            <SlideIn direction="right">
              <div>
                <h3 className="text-5xl font-bold italic text-orange-300 mb-8">
                  Thông tin tổng quan
                </h3>

                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                  {columns.map((column, colIdx) => (
                    <div key={colIdx}>
                      {column.map(({ label, value }, idx) => (
                        <div
                          key={idx}
                          className={`flex justify-between items-center py-3 gap-4 ${
                            idx !== column.length - 1
                              ? 'border-b border-border'
                              : ''
                          }`}
                        >
                          <span className="text-muted-foreground font-medium text-nowrap">
                            {label}
                          </span>
                          <span className="font-semibold text-right text-ellipsis overflow-hidden whitespace-nowrap">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
});

Overview.displayName = 'Overview';
export default Overview;
