import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { partners } from '@/lib/partner-data';
import { Building2, Globe, Landmark, Users } from 'lucide-react';

export function PartnersStats() {
  const totalPartners =
    partners.developer.length +
    partners.international.length +
    partners.bank.length;

  const stats = [
    {
      title: 'Tổng đối tác',
      value: totalPartners.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Chủ đầu tư',
      value: partners.developer.length.toString(),
      icon: Building2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Đối tác quốc tế',
      value: partners.international.length.toString(),
      icon: Globe,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Đối tác ngân hàng',
      value: partners.bank.length.toString(),
      icon: Landmark,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
