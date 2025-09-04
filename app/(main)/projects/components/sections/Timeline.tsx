'use client';

import { FadeIn } from '@/components/common/animations';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { forwardRef } from 'react';

const Timeline = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  // Hàm chọn ngẫu nhiên một class từ mảng trên
  const getRandomWidth = () => {
    const desktopWidthClasses = [
      'sm:w-[20%]',
      'sm:w-[25%]',
      'sm:w-[30%]',
      'sm:w-[35%]',
      'sm:w-[40%]',
    ];
    const randomIndex = Math.floor(Math.random() * desktopWidthClasses.length);
    return desktopWidthClasses[randomIndex];
  };

  return (
    <section ref={ref} id="timeline">
      {/* Sub section 1 */}
      <div className="relative min-h-screen center-both py-16">
        {/* Background image full screen */}
        <Image
          src={data.backgroundImage}
          alt="Eco Retreat Timeline Background"
          fill
          className="object-cover object-left"
          priority
        />

        <FadeIn className="relative z-20 p-6 space-y-12 center-both flex-col">
          <div
            className="text-5xl text-center"
            dangerouslySetInnerHTML={{ __html: data.timelineTitle }}
          />
          <FadeIn delay={0.4}>
            <Image
              src={data.timelineImage}
              alt="Eco Retreat Timeline Background"
              width={600}
              height={600}
              className="object-cover max-w-7xl w-full"
              priority
            />
          </FadeIn>
        </FadeIn>
      </div>

      {/* Sub section 2*/}
      <div className="relative min-h-screen py-12">
        {/* Background image full screen */}
        <Image
          src={data.backgroundImage}
          alt="Eco Retreat Timeline Background"
          fill
          className="object-cover object-left"
          priority
        />
        <div className="relative z-20 p-6 max-w-7xl w-full mx-auto">
          <h3 className="text-4xl text-lime-500 mb-8">{data.progressTitle}</h3>
          {/* Container chính sử dụng Flexbox */}
          <div className="flex flex-wrap justify-center gap-4">
            {data.progressImages.map((image: any, index: any) => {
              // Lấy một class width ngẫu nhiên cho mỗi ảnh
              const randomWidthClass = getRandomWidth();

              return (
                // Container cho mỗi ảnh, chịu trách nhiệm về chiều rộng và aspect ratio
                <div
                  key={index}
                  className={cn(
                    'relative w-full flex-grow sm:max-w-[500px] sm:min-w-[300px]',
                    randomWidthClass
                  )}
                >
                  <div className="w-full h-64 relative">
                    <Image
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Timeline.displayName = 'Timeline';
export default Timeline;
