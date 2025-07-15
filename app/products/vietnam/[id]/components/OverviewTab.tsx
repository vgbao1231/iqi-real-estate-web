import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TabsContent } from '@radix-ui/react-tabs';
import { Bed, Bath, Square, CheckCircle, Ruler, Star } from 'lucide-react';

export const OverviewTab = ({ property }: any) => (
  <TabsContent value="overview" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="font-bold flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-600" />
            Mô tả dự án
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {property.description}
        </p>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Bed className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold leading-none">
                {property.minBedroom}-{property.maxBedroom}
              </div>
              <div className="text-sm text-muted-foreground">Phòng ngủ</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Bath className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold leading-none">
                {property.minBathroom}-{property.maxBathroom}
              </div>
              <div className="text-sm text-muted-foreground">Phòng tắm</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
              <Ruler className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="font-semibold leading-none">
                {property.landArea}{' '}
                {property.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
              </div>
              <div className="text-sm text-muted-foreground">Diện tích</div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <Square className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="font-semibold leading-none">
                {property.landArea}{' '}
                {property.measurementUnit === 'sqm' ? 'm²' : 'ft²'}
              </div>
              <div className="text-sm text-muted-foreground">Diện tích đất</div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Đặc điểm nổi bật</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {property.features.map((feature: any, index: any) => (
              <div key={index} className="flex items-center text-sm">
                <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);
