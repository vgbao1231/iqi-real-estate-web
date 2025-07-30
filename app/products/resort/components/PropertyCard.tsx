import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScaleIn } from '@/components/common/animations';
import {
  Bed,
  Bath,
  Share2,
  MapPin,
  Building2,
  Calendar,
  Star,
  Ruler,
} from 'lucide-react';
import Image from 'next/image';
import { formatVnCurrencyShort } from '@/lib/utils';
import { useState } from 'react';
import Link from 'next/link';

export const PropertyCard = ({ property, index }: any) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: any) => {
    e.stopPropagation();
    const fullUrl = `${window.location.origin}/products/vietnam/${property.id}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Lỗi khi copy:', err);
    }
  };

  return (
    <ScaleIn key={property.id} delay={index * 0.1}>
      <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-0 shadow-md h-full flex flex-col">
        <div className="relative">
          <Link href={`/products/vietnam/${property.id}`}>
            <Image
              src={property.introduction.coverImage || '/placeholder-2.webp'}
              alt={property.overview.name}
              width={400}
              height={280}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property.other.isFeatured && (
              <Badge className="bg-gradient-to-r !from-yellow-500 !to-orange-500 text-white border-0">
                <Star className="w-3 h-3 mr-1" />
                Nổi bật
              </Badge>
            )}
            {property.other.isExclusive && (
              <Badge className="bg-gradient-to-r !from-orange-500 !to-orange-600 text-white border-0">
                Độc quyền
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 backdrop-blur-sm bg-background/80 relative"
              onClick={handleShare}
            >
              {copied && (
                <div className="absolute -translate-x-3/4 text-xs bg-background/80 px-2 py-1 rounded shadow">
                  Đã sao chép!
                </div>
              )}
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6 flex-1">
          <div className="flex flex-col gap-4 h-full">
            {/* Title */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 group-hover:text-orange-600 transition-colors line-clamp-2">
                  <Link href={`/products/resort/${property.id}`}>
                    {property.overview.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                  {property.overview.address}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  Từ {formatVnCurrencyShort(property.overview.minPrice)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold flex items-center">
                  <Ruler className="w-5 h-5 text-muted-foreground mr-1" />
                  {property.overview.landArea}{' '}
                  {property.overview.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div className="grid grid-cols-3 gap-4 py-3 border-t border-border">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bed
                    strokeWidth={2.5}
                    className="w-4 h-4 text-muted-foreground mr-1"
                  />
                  <span className="font-medium">
                    {property.overview.minBedroom}-
                    {property.overview.maxBedroom} PN
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Bath
                    strokeWidth={2.5}
                    className="w-4 h-4 text-muted-foreground mr-1"
                  />
                  <span className="font-medium">
                    {property.overview.minBathroom}-
                    {property.overview.maxBathroom} PT
                  </span>
                </div>
              </div>
              {/* <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Square
                    strokeWidth={2.5}
                    className="w-4 h-4 text-muted-foreground mr-1"
                  />
                  <span className="font-medium">
                    {property.minBuildUp}-{property.maxBuildUp}{' '}
                    {property.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
                  </span>
                </div>
              </div> */}
            </div>

            {/* Features */}
            {/* <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity: any) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="text-xs bg-background"
                >
                  {amenity}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs bg-background">
                  +{property.amenities.length - 3}
                </Badge>
              )}
            </div> */}

            {/* Footer */}
            <div className="flex flex-1 mt-auto items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {property.overview.developer}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>{property.overview.handover}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};
