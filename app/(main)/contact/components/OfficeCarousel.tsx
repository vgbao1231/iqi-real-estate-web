import {
  Carousel,
  CarouselPrevious,
  CarouselNext,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import OfficeCard from './OfficeCard';

export default function OfficeCarousel({ offices }: { offices: any[] }) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full md:px-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {offices.length} văn phòng
          </span>
        </div>
        <div className="flex space-x-2">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>

      <CarouselContent className="-ml-2 md:-ml-4">
        {offices.map((office, index) => (
          <CarouselItem
            key={index}
            className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
          >
            <OfficeCard office={office} delay={0} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
