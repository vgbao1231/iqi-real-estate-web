'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Edit, Trash2, Eye, Building2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { PropertyForm } from './components/PropertyForm';

export default function AdminPropertysPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  // Mock property data (replace with actual data fetching in a real app)
  const [properties, setPropertys] = useState([
    {
      id: '1',
      category: 'vietnam',
      name: 'Vinhomes Grand Park',
      images: ['/placeholder-2.webp?height=100&width=150'],
      description:
        'Khu đô thị sinh thái thông minh quy mô lớn nhất khu Đông TP.HCM',
      slug: 'vinhomes-grand-park',
      phase: 'Phase 1',
      propertyType: 'Căn hộ',
      propertyGroup: 'Residential',
      tenure: 'Leasehold',
      completion: '2024-12-31',
      technicalImage: null,
      technicalDescription: '',
      measurementUnit: 'm²',
      currency: 'VND',
      minPrice: 3200000000,
      maxPrice: 8500000000,
      landArea: 2710000,
      minBuildUp: 50,
      maxBuildUp: 120,
      minBedroom: 1,
      maxBedroom: 4,
      minBathroom: 1,
      maxBathroom: 3,
      amenityClusters: [],
      features: ['Công viên 36ha', 'Vinschool', 'Vinmec'],
      locationImage: null,
      locationDescription: 'Vị trí chiến lược phía Đông TP.HCM',
      address: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
      country: 'Vietnam',
      district: 'Quận 9',
      city: 'TP.HCM',
      lat: 10.8411,
      lng: 106.8066,
      locationHighlights: [],
      overallFloorPlanImage: null,
      overallFloorPlanDescription: '',
      subAreaFloorPlans: [],
      products: [],
      developer: 'Vingroup',
      listedOn: '2023-01-15',
      lastUpdated: '2024-07-15',
      totalUnits: '10,000+',
      handoverDate: 'Q4/2024 - Q2/2025',
      legalStatus: 'Đã có sổ hồng',
      views: 12345,
      isFeatured: true,
      isExclusive: false,
      enableLiveSales: true,
      visibleOnWeb: true,
    },
    {
      id: '2',
      category: 'international',
      name: 'Marina Bay Residences',
      images: ['/placeholder-2.webp?height=100&width=150'],
      description: 'Luxury apartments with stunning views of Marina Bay',
      slug: 'marina-bay-residences',
      phase: 'Completed',
      propertyType: 'Luxury Apartment',
      propertyGroup: 'Residential',
      tenure: 'Leasehold',
      completion: '2010-01-01',
      technicalImage: null,
      technicalDescription: '',
      measurementUnit: 'sqft',
      currency: 'SGD',
      minPrice: 2800000,
      maxPrice: 10000000,
      landArea: 10000,
      minBuildUp: 800,
      maxBuildUp: 3000,
      minBedroom: 1,
      maxBedroom: 5,
      minBathroom: 1,
      maxBathroom: 5,
      amenityClusters: [],
      features: ['Infinity Pool', 'Gym', 'Concierge Service'],
      locationImage: null,
      locationDescription: 'Prime location in Marina Bay, Singapore',
      address: '18 Marina Blvd, Singapore',
      country: 'Singapore',
      district: 'Downtown Core',
      city: 'Singapore',
      lat: 1.2766,
      lng: 103.8545,
      locationHighlights: [],
      overallFloorPlanImage: null,
      overallFloorPlanDescription: '',
      subAreaFloorPlans: [],
      products: [],
      developer: 'Keppel Land',
      listedOn: '2008-05-01',
      lastUpdated: '2024-06-20',
      totalUnits: '428',
      handoverDate: 'Q1/2010',
      legalStatus: 'Completed',
      views: 8765,
      isFeatured: false,
      isExclusive: true,
      enableLiveSales: false,
      visibleOnWeb: true,
    },
  ]);

  const filteredPropertys = useMemo(() => {
    return properties.filter(
      (property) =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [properties, searchTerm]);

  const handleAddPropertyClick = () => {
    setEditingProperty(null); // Clear any previous editing data
    setShowForm(true);
  };

  const handleEditPropertyClick = (id: string) => {
    const projectToEdit = properties.find((p) => p.id === id);
    if (projectToEdit) {
      setEditingProperty(projectToEdit);
      setShowForm(true);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleSubmitFormSuccess = (updatedProperty: any) => {
    if (updatedProperty.id) {
      // Update existing property
      setPropertys((prev) =>
        prev.map((p) =>
          p.id === updatedProperty.id ? { ...updatedProperty, id: p.id } : p
        )
      );
    } else {
      // Add new property (assign a new ID for mock data)
      setPropertys((prev) => [
        { ...updatedProperty, id: Date.now().toString() },
        ...prev,
      ]);
    }
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      setPropertys((prev) => prev.filter((p) => p.id !== id));
      toast({
        title: 'Dự án đã xóa!',
        description: 'Dự án đã được xóa thành công.',
        variant: 'destructive',
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'vietnam':
        return 'Việt Nam';
      case 'international':
        return 'Quốc tế';
      case 'resort':
        return 'Nghỉ dưỡng';
      default:
        return 'Khác';
    }
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <PropertyForm
          initialData={editingProperty}
          onCancel={handleCancelForm}
          onSubmitSuccess={handleSubmitFormSuccess}
        />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Quản lý dự án Bất động sản</h1>
            <Button onClick={handleAddPropertyClick}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm dự án mới
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-6 h-6" /> Danh sách dự án
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, địa chỉ, chủ đầu tư..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên dự án</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Chủ đầu tư</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPropertys.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="h-24 text-center text-muted-foreground"
                      >
                        Không tìm thấy dự án nào.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPropertys.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">
                          {property.name}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {getCategoryLabel(property.category)}
                          </Badge>
                        </TableCell>
                        <TableCell>{property.address}</TableCell>
                        <TableCell>{property.developer}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              property.visibleOnWeb
                                ? 'bg-green-500 hover:bg-green-600'
                                : 'bg-gray-500 hover:bg-gray-600'
                            }
                          >
                            {property.visibleOnWeb ? 'Hiển thị' : 'Ẩn'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                router.push(`/products/vietnam/${property.id}`)
                              }
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Xem</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                handleEditPropertyClick(property.id)
                              }
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Sửa</span>
                            </Button>
                            <Button
                              variant="destructive"
                              size="icon"
                              onClick={() => handleDelete(property.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Xóa</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
