'use client';

import { FadeIn } from '@/components/common/animations';
import Image from 'next/image';
import { forwardRef } from 'react';

const Timeline = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  // Render layout cho từng số lượng ảnh cụ thể
  const renderLayout = () => {
    const count = data.progressImages.length;

    // 2 tấm: grid 2x1
    if (count === 2) {
      return (
        <div className="grid grid-cols-2 gap-4 h-[400px]">
          {data.progressImages.map((image: string, index: number) => (
            <ImageCard key={index} image={image} index={index} />
          ))}
        </div>
      );
    }

    // 3 tấm: grid 3x1
    if (count === 3) {
      return (
        <div className="grid grid-cols-3 gap-4 h-[400px]">
          {data.progressImages.map((image: string, index: number) => (
            <ImageCard key={index} image={image} index={index} />
          ))}
        </div>
      );
    }

    // 4 tấm: 2 dòng, 1 tấm ở trên và 3 tấm ở dưới
    if (count === 4) {
      return (
        <div className="space-y-4">
          {/* Dòng 1: 1 ảnh */}
          <div className="grid grid-cols-1 gap-4 h-[300px]">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <ImageCard image={data.progressImages[0]} index={0} />
              </div>
            </div>
          </div>
          {/* Dòng 2: 3 ảnh */}
          <div className="grid grid-cols-3 gap-4 h-[250px]">
            {data.progressImages
              .slice(1, 4)
              .map((image: string, index: number) => (
                <ImageCard key={index + 1} image={image} index={index + 1} />
              ))}
          </div>
        </div>
      );
    }

    // 5 tấm: 2 dòng, 2 tấm ở trên và 3 tấm ở dưới
    if (count === 5) {
      return (
        <div className="space-y-4">
          {/* Dòng 1: 2 ảnh */}
          <div className="grid grid-cols-2 gap-4 h-[300px]">
            {data.progressImages
              .slice(0, 2)
              .map((image: string, index: number) => (
                <ImageCard key={index} image={image} index={index} />
              ))}
          </div>
          {/* Dòng 2: 3 ảnh */}
          <div className="grid grid-cols-3 gap-4 h-[250px]">
            {data.progressImages
              .slice(2, 5)
              .map((image: string, index: number) => (
                <ImageCard key={index + 2} image={image} index={index + 2} />
              ))}
          </div>
        </div>
      );
    }

    // 6 tấm: 2 dòng, 3 tấm mỗi dòng
    if (count === 6) {
      console.log('run');

      return (
        <div className="space-y-4">
          {/* Dòng 1: 3 ảnh */}
          <div className="grid grid-cols-3 gap-4 h-[300px]">
            {data.progressImages
              .slice(0, 3)
              .map((image: string, index: number) => (
                <ImageCard key={index} image={image} index={index} />
              ))}
          </div>
          {/* Dòng 2: 3 ảnh */}
          <div className="grid grid-cols-3 gap-4 h-[300px]">
            {data.progressImages
              .slice(3, 6)
              .map((image: string, index: number) => (
                <ImageCard key={index + 3} image={image} index={index + 3} />
              ))}
          </div>
        </div>
      );
    }

    // 7+ tấm: lặp lại như bố cục 5 tấm + bố cục ảnh còn lại
    if (count >= 7) {
      const result = [];
      let currentIndex = 0;

      // Lặp lại các nhóm 5 ảnh
      while (currentIndex + 5 <= count) {
        const group = data.progressImages.slice(currentIndex, currentIndex + 5);

        result.push(
          <div key={`group-${currentIndex}`} className="space-y-4">
            {/* Dòng 1: 2 ảnh */}
            <div className="grid grid-cols-2 gap-4 h-[300px]">
              {group.slice(0, 2).map((image: string, index: number) => (
                <ImageCard
                  key={currentIndex + index}
                  image={image}
                  index={currentIndex + index}
                />
              ))}
            </div>
            {/* Dòng 2: 3 ảnh */}
            <div className="grid grid-cols-3 gap-4 h-[250px]">
              {group.slice(2).map((image: string, index: number) => (
                <ImageCard
                  key={currentIndex + index + 2}
                  image={image}
                  index={currentIndex + index + 2}
                />
              ))}
            </div>
          </div>
        );

        currentIndex += 5;
      }

      // Render phần còn lại (1-4 ảnh)
      const remaining = data.progressImages.length - currentIndex;
      const leftoverImages = data.progressImages.slice(currentIndex);

      if (remaining === 1) {
        result.push(
          <div key="remain-1" className="h-[300px] flex justify-center">
            <div className="w-full max-w-md">
              <ImageCard image={leftoverImages[0]} index={currentIndex} />
            </div>
          </div>
        );
      } else if (remaining === 2) {
        result.push(
          <div key="remain-2" className="grid grid-cols-2 gap-4 h-[300px]">
            {leftoverImages.map((image: any, i: number) => (
              <ImageCard
                key={currentIndex + i}
                image={image}
                index={currentIndex + i}
              />
            ))}
          </div>
        );
      } else if (remaining === 3) {
        result.push(
          <div key="remain-3" className="grid grid-cols-3 gap-4 h-[300px]">
            {leftoverImages.map((image: any, i: number) => (
              <ImageCard
                key={currentIndex + i}
                image={image}
                index={currentIndex + i}
              />
            ))}
          </div>
        );
      } else if (remaining === 4) {
        result.push(
          <div key="remain-4" className="space-y-4">
            {/* 1 ảnh trên */}
            <div className="flex justify-center h-[300px]">
              <div className="w-full max-w-md">
                <ImageCard image={leftoverImages[0]} index={currentIndex} />
              </div>
            </div>
            {/* 3 ảnh dưới */}
            <div className="grid grid-cols-3 gap-4 h-[250px]">
              {leftoverImages.slice(1).map((image: any, i: number) => (
                <ImageCard
                  key={currentIndex + i + 1}
                  image={image}
                  index={currentIndex + i + 1}
                />
              ))}
            </div>
          </div>
        );
      }

      return <div className="space-y-4">{result}</div>;
    }
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
        <div className="relative z-20 p-6 max-w-7xl w-full mx-[auto]">
          <h3 className="text-4xl text-lime-500 mb-8">{data.progressTitle}</h3>
          {renderLayout()}
        </div>
      </div>
    </section>
  );
});

const ImageCard = ({ image, index }: any) => (
  <FadeIn
    delay={index * 0.15}
    className="group relative overflow-hidden rounded-sm bg-white shadow-xl hover:shadow-2xl cursor-pointer h-full"
  >
    <div className="relative w-full h-full">
      <Image
        src={image || '/placeholder-2.webp'}
        alt={`Gallery image ${index + 1}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
      />
    </div>
  </FadeIn>
);

Timeline.displayName = 'Timeline';
export default Timeline;
