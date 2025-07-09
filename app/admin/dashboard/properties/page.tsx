'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Building,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Users,
  X,
  Camera,
  Save,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';
import { useState, useMemo } from 'react';

export default function PropertiesManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const itemsPerPage = 12;

  // Mock properties data
  const allProperties = [
    {
      id: 1,
      name: 'Vinhomes Grand Park',
      location: 'Quận 9, TP.HCM',
      city: 'hcmc',
      country: 'vietnam',
      type: 'Căn hộ cao cấp',
      status: 'active',
      price: 'Từ 3.2 tỷ',
      priceValue: 3200000000,
      bedrooms: '1-4 phòng ngủ',
      area: '50-120 m²',
      developer: 'Vingroup',
      completion: 'Q4/2024',
      views: 2341,
      inquiries: 45,
      leads: 12,
      sales: 8,
      images: [
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
      ],
      features: [
        'Công viên 36ha',
        'Trường học liên cấp',
        'Bệnh viện',
        'Shopping mall',
      ],
      description: 'Dự án căn hộ cao cấp với không gian xanh rộng lớn...',
      createdAt: '2023-01-15',
      updatedAt: '2024-01-10',
    },
    {
      id: 2,
      name: 'Marina Bay Residences',
      location: 'Marina Bay, Singapore',
      city: 'singapore',
      country: 'singapore',
      type: 'Luxury Apartment',
      status: 'active',
      price: 'From $1.2M',
      priceValue: 1200000,
      bedrooms: '1-3 bedrooms',
      area: '60-150 sqm',
      developer: 'CapitaLand',
      completion: 'Q2/2024',
      views: 3456,
      inquiries: 78,
      leads: 23,
      sales: 15,
      images: [
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
      ],
      features: ['Marina view', 'Sky garden', 'Infinity pool', 'Concierge'],
      description: 'Luxury waterfront living in the heart of Singapore...',
      createdAt: '2023-02-20',
      updatedAt: '2024-01-08',
    },
    {
      id: 3,
      name: 'Vinhomes Smart City',
      location: 'Nam Từ Liêm, Hà Nội',
      city: 'hanoi',
      country: 'vietnam',
      type: 'Căn hộ thông minh',
      status: 'active',
      price: 'Từ 2.8 tỷ',
      priceValue: 2800000000,
      bedrooms: '1-3 phòng ngủ',
      area: '45-110 m²',
      developer: 'Vingroup',
      completion: 'Q3/2024',
      views: 3241,
      inquiries: 67,
      leads: 18,
      sales: 11,
      images: [
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
      ],
      features: ['Smart home', 'Công viên Nhật', 'Trường quốc tế', 'IoT'],
      description: 'Khu đô thị thông minh đầu tiên tại Hà Nội...',
      createdAt: '2023-03-10',
      updatedAt: '2024-01-05',
    },
    {
      id: 4,
      name: 'Pavilion Damansara Heights',
      location: 'Damansara Heights, KL',
      city: 'kualalumpur',
      country: 'malaysia',
      type: 'Luxury Condominium',
      status: 'draft',
      price: 'From RM 800K',
      priceValue: 800000,
      bedrooms: '2-4 bedrooms',
      area: '80-200 sqm',
      developer: 'Malton Berhad',
      completion: 'Q1/2025',
      views: 1876,
      inquiries: 34,
      leads: 9,
      sales: 3,
      images: [
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
        '/placeholder-2.webp?height=200&width=300',
      ],
      features: ['KLCC view', 'Sky lounge', 'Gym', 'Security'],
      description: 'Premium condominium in prestigious Damansara Heights...',
      createdAt: '2023-04-05',
      updatedAt: '2024-01-03',
    },
  ];

  const locations = [
    { value: 'all', label: 'Tất cả địa điểm' },
    { value: 'hcmc', label: 'TP. Hồ Chí Minh' },
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'kualalumpur', label: 'Kuala Lumpur' },
    { value: 'bangkok', label: 'Bangkok' },
  ];

  const propertyTypes = [
    { value: 'all', label: 'Tất cả loại hình' },
    { value: 'apartment', label: 'Căn hộ' },
    { value: 'condo', label: 'Condominium' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const statusOptions = [
    { value: 'all', label: 'Tất cả trạng thái' },
    { value: 'active', label: 'Đang hoạt động' },
    { value: 'draft', label: 'Bản nháp' },
    { value: 'archived', label: 'Đã lưu trữ' },
  ];

  // Filter logic
  const filteredProperties = useMemo(() => {
    return allProperties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.developer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation =
        selectedLocation === 'all' || property.city === selectedLocation;
      const matchesType =
        selectedType === 'all' ||
        property.type.toLowerCase().includes(selectedType);
      const matchesStatus =
        selectedStatus === 'all' || property.status === selectedStatus;

      return matchesSearch && matchesLocation && matchesType && matchesStatus;
    });
  }, [searchTerm, selectedLocation, selectedType, selectedStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    name: '',
    location: '',
    city: '',
    country: '',
    type: '',
    status: 'draft',
    price: '',
    priceValue: 0,
    bedrooms: '',
    area: '',
    developer: '',
    completion: '',
    description: '',
    features: [],
    images: [],
    tabs: [
      { id: 'overview', name: 'Tổng quan', content: [] },
      { id: 'amenities', name: 'Tiện ích', content: [] },
      { id: 'location', name: 'Vị trí', content: [] },
    ],
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [newFeature, setNewFeature] = useState('');
  const [newTabName, setNewTabName] = useState('');
  const [newContentItem, setNewContentItem] = useState('');

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setPropertyForm((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index) => {
    setPropertyForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleAddTab = () => {
    if (newTabName.trim()) {
      const newTab = {
        id: newTabName.toLowerCase().replace(/\s+/g, '-'),
        name: newTabName.trim(),
        content: [],
      };
      setPropertyForm((prev) => ({
        ...prev,
        tabs: [...prev.tabs, newTab],
      }));
      setNewTabName('');
    }
  };

  const handleRemoveTab = (tabId) => {
    setPropertyForm((prev) => ({
      ...prev,
      tabs: prev.tabs.filter((tab) => tab.id !== tabId),
    }));
  };

  const handleAddContentItem = (tabId) => {
    if (newContentItem.trim()) {
      setPropertyForm((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === tabId
            ? { ...tab, content: [...tab.content, newContentItem.trim()] }
            : tab
        ),
      }));
      setNewContentItem('');
    }
  };

  const handleRemoveContentItem = (tabId, index) => {
    setPropertyForm((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, content: tab.content.filter((_, i) => i !== index) }
          : tab
      ),
    }));
  };

  const handleEditProperty = (property) => {
    setPropertyForm({
      ...property,
      tabs: property.tabs || [
        { id: 'overview', name: 'Tổng quan', content: [] },
        { id: 'amenities', name: 'Tiện ích', content: [] },
        { id: 'location', name: 'Vị trí', content: [] },
      ],
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setPropertyForm({
      name: '',
      location: '',
      city: '',
      country: '',
      type: '',
      status: 'draft',
      price: '',
      priceValue: 0,
      bedrooms: '',
      area: '',
      developer: '',
      completion: '',
      description: '',
      features: [],
      images: [],
      tabs: [
        { id: 'overview', name: 'Tổng quan', content: [] },
        { id: 'amenities', name: 'Tiện ích', content: [] },
        { id: 'location', name: 'Vị trí', content: [] },
      ],
    });
    setActiveTab('overview');
  };

  const PropertyFormDialog = ({ isOpen, onClose, title, property = null }) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Tên dự án</Label>
                    <Input
                      id="name"
                      value={propertyForm.name}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Nhập tên dự án"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developer">Chủ đầu tư</Label>
                    <Input
                      id="developer"
                      value={propertyForm.developer}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          developer: e.target.value,
                        }))
                      }
                      placeholder="Nhập tên chủ đầu tư"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Địa chỉ</Label>
                  <Input
                    id="location"
                    value={propertyForm.location}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Nhập địa chỉ đầy đủ"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">Thành phố</Label>
                    <Select
                      value={propertyForm.city}
                      onValueChange={(value) =>
                        setPropertyForm((prev) => ({ ...prev, city: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hcmc">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="hanoi">Hà Nội</SelectItem>
                        <SelectItem value="singapore">Singapore</SelectItem>
                        <SelectItem value="kualalumpur">
                          Kuala Lumpur
                        </SelectItem>
                        <SelectItem value="bangkok">Bangkok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Loại hình</Label>
                    <Input
                      id="type"
                      value={propertyForm.type}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          type: e.target.value,
                        }))
                      }
                      placeholder="Căn hộ cao cấp"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={propertyForm.status}
                      onValueChange={(value) =>
                        setPropertyForm((prev) => ({ ...prev, status: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                        <SelectItem value="active">Đang hoạt động</SelectItem>
                        <SelectItem value="archived">Đã lưu trữ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="price">Giá bán</Label>
                    <Input
                      id="price"
                      value={propertyForm.price}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      placeholder="Từ 3.2 tỷ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Phòng ngủ</Label>
                    <Input
                      id="bedrooms"
                      value={propertyForm.bedrooms}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          bedrooms: e.target.value,
                        }))
                      }
                      placeholder="1-4 phòng ngủ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Diện tích</Label>
                    <Input
                      id="area"
                      value={propertyForm.area}
                      onChange={(e) =>
                        setPropertyForm((prev) => ({
                          ...prev,
                          area: e.target.value,
                        }))
                      }
                      placeholder="50-120 m²"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="completion">Thời gian bàn giao</Label>
                  <Input
                    id="completion"
                    value={propertyForm.completion}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        completion: e.target.value,
                      }))
                    }
                    placeholder="Q4/2024"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mô tả dự án</Label>
                  <Textarea
                    id="description"
                    value={propertyForm.description}
                    onChange={(e) =>
                      setPropertyForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Mô tả chi tiết về dự án..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Images */}
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh dự án</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {propertyForm.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || '/placeholder-2.webp'}
                        alt={`Property ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setPropertyForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index),
                          }));
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Thêm ảnh
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Đặc điểm nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Thêm đặc điểm mới..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {propertyForm.features.map((feature, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      {feature}
                      <X
                        className="w-3 h-3 cursor-pointer"
                        onClick={() => handleRemoveFeature(index)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dynamic Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Thông tin chi tiết
                  <div className="flex gap-2">
                    <Input
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      placeholder="Tên tab mới..."
                      className="w-40"
                    />
                    <Button size="sm" onClick={handleAddTab}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-auto">
                    {propertyForm.tabs.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="relative"
                      >
                        {tab.name}
                        {propertyForm.tabs.length > 1 && (
                          <X
                            className="w-3 h-3 ml-2 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTab(tab.id);
                            }}
                          />
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {propertyForm.tabs.map((tab) => (
                    <TabsContent
                      key={tab.id}
                      value={tab.id}
                      className="space-y-4"
                    >
                      <div className="flex gap-2">
                        <Input
                          value={newContentItem}
                          onChange={(e) => setNewContentItem(e.target.value)}
                          placeholder="Thêm thông tin mới..."
                          onKeyPress={(e) =>
                            e.key === 'Enter' && handleAddContentItem(tab.id)
                          }
                        />
                        <Button onClick={() => handleAddContentItem(tab.id)}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {tab.content.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                          >
                            <span>{item}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleRemoveContentItem(tab.id, index)
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Xem trước</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  {propertyForm.images.length > 0 ? (
                    <Image
                      src={propertyForm.images[0] || '/placeholder-2.webp'}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-muted-foreground">Chưa có ảnh</span>
                  )}
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    {propertyForm.name || 'Tên dự án'}
                  </h3>
                  <p className="text-muted-foreground text-sm flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {propertyForm.location || 'Địa chỉ'}
                  </p>
                </div>

                <div className="text-xl font-bold text-primary">
                  {propertyForm.price || 'Giá bán'}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Phòng ngủ:</span>
                    <div>{propertyForm.bedrooms || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Diện tích:</span>
                    <div>{propertyForm.area || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Chủ đầu tư:</span>
                    <div>{propertyForm.developer || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Bàn giao:</span>
                    <div>{propertyForm.completion || 'N/A'}</div>
                  </div>
                </div>

                <div>
                  <Badge
                    className={
                      propertyForm.status === 'active'
                        ? 'bg-green-600'
                        : 'bg-orange-600'
                    }
                  >
                    {propertyForm.status === 'active'
                      ? 'Đang hoạt động'
                      : propertyForm.status === 'draft'
                        ? 'Bản nháp'
                        : 'Đã lưu trữ'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  // Handle save logic here
                  onClose();
                  resetForm();
                }}
              >
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onClose();
                  resetForm();
                }}
              >
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Quản lý dự án</h1>
            <p className="text-muted-foreground">
              Quản lý tất cả dự án bất động sản
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm dự án mới
          </Button>
        </div>
      </FadeIn>

      {/* Stats Cards */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tổng dự án
                  </p>
                  <p className="text-2xl font-bold">{allProperties.length}</p>
                </div>
                <Building className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Đang hoạt động
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {allProperties.filter((p) => p.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tổng lượt xem
                  </p>
                  <p className="text-2xl font-bold">
                    {allProperties
                      .reduce((sum, p) => sum + p.views, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Tổng leads
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {allProperties.reduce((sum, p) => sum + p.leads, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      {/* Search and Filters */}
      <FadeIn delay={0.2}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm dự án..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Properties Grid */}
      <FadeIn delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProperties.map((property, index) => (
            <ScaleIn key={property.id} delay={index * 0.05}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={property.images[0] || '/placeholder-2.webp'}
                    alt={property.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className={
                        property.status === 'active'
                          ? 'bg-green-600'
                          : 'bg-orange-600'
                      }
                    >
                      {property.status === 'active'
                        ? 'Hoạt động'
                        : property.status === 'draft'
                          ? 'Nháp'
                          : 'Lưu trữ'}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-1">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditProperty(property)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-1">
                      {property.name}
                    </h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {property.location}
                    </p>
                    <div className="text-lg font-bold text-primary">
                      {property.price}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{property.bedrooms}</span>
                      <span>{property.area}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {property.views}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {property.leads}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {property.developer}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScaleIn>
          ))}
        </div>
      </FadeIn>

      {/* Pagination */}
      {totalPages > 1 && (
        <FadeIn delay={0.4}>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Trang {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </FadeIn>
      )}

      {/* Add Property Dialog */}
      <PropertyFormDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title="Thêm dự án mới"
      />

      {/* Edit Property Dialog */}
      <PropertyFormDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        title="Chỉnh sửa dự án"
        property={selectedProperty}
      />
    </div>
  );
}
