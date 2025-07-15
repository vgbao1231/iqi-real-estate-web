import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TabsContent } from '@radix-ui/react-tabs';
import { Info } from 'lucide-react';

export const SpecificationTab = ({ property }: any) => (
  <TabsContent value="specifications" className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>
          <h3 className="font-bold flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Thông số kĩ thuật
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {property.description}
        </p>
      </CardContent>
    </Card>
  </TabsContent>
);
