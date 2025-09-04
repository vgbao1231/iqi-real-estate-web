'use client';

import Image from 'next/image';
import { forwardRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { formatVnCurrencyShort } from '@/lib/utils';

const Overview = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  const inforColumns = data.basicInfo
    ?.filter((item: any) => !item.hidden) // Filter by 'id'
    .map((item: any) => {
      let value = item.value;

      if (item.type === 'range' && Array.isArray(value)) {
        value = `${value[0]} - ${value[1]}`;
      }

      if (item.type === 'number') {
        value = Number(value)?.toLocaleString();
      }

      // Custom logic using 'id'
      if (item.id === 'status') {
        // Use item.id === 'status'
        value = <Badge>{item.value}</Badge>;
      }

      if (item.id === 'land_area') {
        // Use item.id === 'land_area'
        value = `${item.value} ${data.basicInfo.find((i: any) => i.id === 'measurement_unit').value === 'sqm' ? 'm²' : 'ft²'}`;
      }

      if (item.id === 'price') {
        value = `Từ ${formatVnCurrencyShort(item.value[0])}`;
      }

      return {
        label: item.key, // Keep item.key for the display label
        value,
      };
    });

  const half = Math.ceil(inforColumns.length / 2);
  const columns = [inforColumns.slice(0, half), inforColumns.slice(half)];

  return (
    <section ref={ref} id="overview" className="relative">
      {/* Sub section 1 */}
      <div className="relative min-h-[80vh] center-both">
        {/* Background image full screen */}
        <Image
          src={data.overviewBackground}
          alt="Eco Retreat Overview Background"
          fill
          className="object-cover object-right"
          priority
        />
        <div className="absolute z-10 inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 md:px-32">
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
            className="relative w-full md:w-2/5 h-auto md:h-[85vh] center-both"
          >
            <Image
              src={data.experienceImage}
              alt="Eco Retreat Experience Background"
              width={800}
              height={600}
              className="object-contain w-full h-auto"
              priority
            />
          </SlideIn>

          {/* Right content */}
          <div className="w-full md:w-3/5 space-y-6">
            <SlideIn direction="right">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold italic text-orange-300 mb-8">
                  Thông tin tổng quan
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                  {columns.map((column, colIdx) => (
                    <div key={colIdx}>
                      {column.map(({ label, value }: any, idx: any) => {
                        const globalIndex = colIdx * column.length + idx;
                        return (
                          <SlideIn
                            direction="right"
                            key={idx}
                            delay={globalIndex * 0.05}
                            className={`flex justify-between items-center py-3 gap-4 ${
                              idx !== column.length - 1
                                ? 'border-b border-border'
                                : 'border-b border-border md:border-0'
                            }`}
                          >
                            <span className="text-muted-foreground font-medium text-nowrap">
                              {label}
                            </span>
                            <span className="font-semibold text-right text-ellipsis overflow-hidden whitespace-nowrap">
                              {value}
                            </span>
                          </SlideIn>
                        );
                      })}
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
