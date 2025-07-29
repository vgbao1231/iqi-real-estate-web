import { ScaleIn } from '@/components/common/animations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Image from 'next/image';

export default function OfficeCard({
  office,
  delay,
}: {
  office: any;
  delay: number;
}) {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'head':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'consultation':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getBadgeText = (type: string) => {
    switch (type) {
      case 'head':
        return 'Trụ sở chính';
      case 'consultation':
        return 'Tư vấn';
      default:
        return 'Văn phòng';
    }
  };

  return (
    <ScaleIn delay={delay} className="h-full pt-1.5">
      <Card className="hover:shadow-lg h-full transition-all hover:-translate-y-1">
        <CardHeader className="p-0">
          <Image
            src={office.image || '/placeholder-2.webp?height=200&width=300'}
            alt={office.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <CardTitle className="text-lg leading-tight">
              {office.name}
            </CardTitle>
            <Badge
              className={`ml-2 text-nowrap ${getBadgeStyle(office.type)} text-xs`}
            >
              {getBadgeText(office.type)}
            </Badge>
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
              <span className="text-sm leading-relaxed">{office.address}</span>
            </div>

            {office.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-semibold">{office.phone}</span>
              </div>
            )}

            {office.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{office.email}</span>
              </div>
            )}

            {office.hours && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{office.hours}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <Button
              variant="outline"
              className="w-full bg-muted-card hover:bg-accent-card border-border text-sm hover:scale-105"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Bản đồ
            </Button>
            {office.phone && (
              <Button
                className="inline-flex aspect-square w-12 p-0 rounded-md text-white bg-green-600 hover:bg-green-700 hover:scale-105"
                onClick={() =>
                  window.open(`tel:${office.phone.replace(/[^\d]/g, '')}`)
                }
              >
                <Phone className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
}
