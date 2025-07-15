import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TabsContent } from '@radix-ui/react-tabs';
import { Map, MapPin } from 'lucide-react';

export const LocationTab = ({ property }: any) => (
  <TabsContent value="location" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="font-bold flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-red-600" />
            Vị trí địa lý
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {property.description}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">
              Địa chỉ chi tiết
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-nowrap">
                  Địa chỉ:
                </span>
                <span className="font-medium text-right">
                  {property.address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quận/Huyện:</span>
                <span className="font-medium">{property.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Thành phố:</span>
                <span className="font-medium">{property.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quốc gia:</span>
                <span className="font-medium">{property.country}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tọa độ:</span>
                <span className="font-medium text-sm">
                  {property.coordinates.lat}, {property.coordinates.lng}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg border-b pb-2">
              Bản đồ khu vực
            </h4>
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Map className="w-12 h-12 mx-auto mb-2" />
                <p>Bản đồ tương tác</p>
                <p className="text-sm">
                  Tọa độ: {property.coordinates.lat}, {property.coordinates.lng}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </TabsContent>
);
