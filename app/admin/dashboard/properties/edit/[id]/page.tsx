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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/common/animations';

import {
  ArrowLeft,
  Plus,
  X,
  Camera,
  Save,
  Eye,
  MapPin,
  Bed,
  Square,
  Calendar,
  Star,
  CheckCircle,
  Edit3,
  Trash2,
  Type,
  AlignLeft,
  List,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function EditPropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newItem, setNewItem] = useState('');
  const [newTabName, setNewTabName] = useState('');
  const [contentType, setContentType] = useState('bullet');

  // Mock data - trong thực tế sẽ fetch từ API dựa trên params.id
  const [propertyData, setPropertyData] = useState({
    id: params.id,
    name: 'Vinhomes Grand Park',
    location: 'Nguyễn Xiển, Long Thạnh Mỹ, Quận 9, TP.HCM',
    city: 'hcmc',
    type: 'Căn hộ cao cấp',
    status: 'active',
    price: 'Từ 3.2 tỷ',
    pricePerSqm: '45 triệu/m²',
    bedrooms: '1-4 phòng ngủ',
    area: '50-120 m²',
    developer: 'Vingroup',
    completion: 'Q4/2024',
    description:
      'Vinhomes Grand Park là khu đô thị sinh thái thông minh quy mô lớn nhất khu Đông TP.HCM, với không gian xanh rộng lớn 36ha, tiện ích đầy đủ và vị trí thuận lợi kết nối dễ dàng với trung tâm thành phố.',
    images: [
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
      '/placeholder-2.webp?height=400&width=600',
    ],
    features: [
      'Công viên trung tâm 36ha',
      'Trường học liên cấp Vinschool',
      'Bệnh viện đa khoa Vinmec',
      'Trung tâm thương mại Vincom',
      'Hồ bơi Olympic',
      'Khu thể thao đa năng',
    ],
    tabs: [
      {
        id: 'overview',
        name: 'Tổng quan',
        content: [
          {
            type: 'title',
            value: 'Mô tả dự án',
          },
          {
            type: 'paragraph',
            value:
              'Vinhomes Grand Park là khu đô thị sinh thái thông minh quy mô lớn nhất khu Đông TP.HCM, mang đến không gian sống đẳng cấp với tầm nhìn panorama ra sông. Dự án được thiết kế bởi kiến trúc sư nổi tiếng thế giới với tiêu chuẩn 5 sao.',
          },
          {
            type: 'info-section',
            title: 'Thông tin cơ bản',
            items: [
              { label: 'Loại hình', value: 'Căn hộ cao cấp' },
              { label: 'Diện tích', value: '50-120 m²' },
              { label: 'Phòng ngủ', value: '1-4 phòng ngủ' },
              { label: 'Hoàn thành', value: 'Q4/2024' },
            ],
          },
          {
            type: 'info-section',
            title: 'Chủ đầu tư',
            items: [
              { label: 'Tên', value: 'Vingroup' },
              { label: 'Thành lập', value: '1993' },
              { label: 'Dự án', value: '200+ dự án' },
              { label: 'Quốc gia', value: '30+ quốc gia' },
            ],
          },
        ],
      },
      {
        id: 'amenities',
        name: 'Tiện ích',
        content: [
          {
            type: 'title',
            value: 'Điểm nổi bật',
          },
          {
            type: 'bullet-list',
            items: [
              'Hồ bơi Olympic tiêu chuẩn quốc tế',
              'Trung tâm thương mại Vincom Mega Mall',
              'Khu vui chơi trẻ em an toàn',
              'Khu thể thao đa năng hiện đại',
              'Công viên BBQ ngoài trời',
            ],
          },
          {
            type: 'paragraph',
            value:
              'Hệ thống tiện ích đẳng cấp 5 sao với đầy đủ các dịch vụ phục vụ cuộc sống hàng ngày của cư dân.',
          },
        ],
      },
      {
        id: 'location',
        name: 'Vị trí',
        content: [
          {
            type: 'paragraph',
            value:
              'Dự án tọa lạc tại vị trí đắc địa khu Đông TP.HCM, kết nối thuận tiện với trung tâm thành phố và các khu vực quan trọng.',
          },
          {
            type: 'bullet-list',
            items: [
              'Cách trung tâm Q1 chỉ 30 phút lái xe',
              'Gần sân bay Tân Sơn Nhất 25 phút',
              'Kết nối với khu công nghệ cao',
              'Gần đại học Quốc gia TP.HCM',
            ],
          },
        ],
      },
      {
        id: 'education',
        name: 'Giáo dục',
        content: [
          {
            type: 'title',
            value: 'Hệ thống giáo dục',
          },
          {
            type: 'bullet-list',
            items: [
              'Trường mầm non Vinschool',
              'Trường tiểu học quốc tế',
              'Trường THCS chất lượng cao',
              'Gần các trường đại học danh tiếng',
            ],
          },
        ],
      },
    ],
  });

  const handleEditField = (field, value) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddFeature = () => {
    if (newItem.trim()) {
      setPropertyData((prev) => ({
        ...prev,
        features: [...prev.features, newItem.trim()],
      }));
      setNewItem('');
    }
  };

  const handleRemoveFeature = (index) => {
    setPropertyData((prev) => ({
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
      setPropertyData((prev) => ({
        ...prev,
        tabs: [...prev.tabs, newTab],
      }));
      setNewTabName('');
    }
  };

  const handleRemoveTab = (tabId) => {
    setPropertyData((prev) => ({
      ...prev,
      tabs: prev.tabs.filter((tab) => tab.id !== tabId),
    }));
  };

  const handleAddContentItem = (tabId) => {
    if (newItem.trim()) {
      let newContent;
      switch (contentType) {
        case 'title':
          newContent = { type: 'title', value: newItem.trim() };
          break;
        case 'paragraph':
          newContent = { type: 'paragraph', value: newItem.trim() };
          break;
        case 'bullet':
          newContent = { type: 'bullet-list', items: [newItem.trim()] };
          break;
        case 'info':
          newContent = {
            type: 'info-section',
            title: 'Thông tin mới',
            items: [{ label: 'Label', value: newItem.trim() }],
          };
          break;
        default:
          newContent = { type: 'bullet-list', items: [newItem.trim()] };
      }

      setPropertyData((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === tabId
            ? { ...tab, content: [...tab.content, newContent] }
            : tab
        ),
      }));
      setNewItem('');
    }
  };

  const handleRemoveContentItem = (tabId, index) => {
    setPropertyData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, content: tab.content.filter((_, i) => i !== index) }
          : tab
      ),
    }));
  };

  const handleEditContentItem = (tabId, contentIndex, field, newValue) => {
    setPropertyData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              content: tab.content.map((item, i) =>
                i === contentIndex ? { ...item, [field]: newValue } : item
              ),
            }
          : tab
      ),
    }));
  };

  const handleAddBulletItem = (tabId, contentIndex) => {
    if (newItem.trim()) {
      setPropertyData((prev) => ({
        ...prev,
        tabs: prev.tabs.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                content: tab.content.map((item, i) =>
                  i === contentIndex && item.type === 'bullet-list'
                    ? { ...item, items: [...item.items, newItem.trim()] }
                    : item
                ),
              }
            : tab
        ),
      }));
      setNewItem('');
    }
  };

  const handleRemoveBulletItem = (tabId, contentIndex, bulletIndex) => {
    setPropertyData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              content: tab.content.map((item, i) =>
                i === contentIndex && item.type === 'bullet-list'
                  ? {
                      ...item,
                      items: item.items.filter((_, bi) => bi !== bulletIndex),
                    }
                  : item
              ),
            }
          : tab
      ),
    }));
  };

  const handleAddInfoItem = (tabId, contentIndex) => {
    setPropertyData((prev) => ({
      ...prev,
      tabs: prev.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              content: tab.content.map((item, i) =>
                i === contentIndex && item.type === 'info-section'
                  ? {
                      ...item,
                      items: [
                        ...item.items,
                        { label: 'Label mới', value: 'Giá trị mới' },
                      ],
                    }
                  : item
              ),
            }
          : tab
      ),
    }));
  };

  const DoubleClickEditField = ({
    value,
    onSave,
    className = '',
    multiline = false,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onSave(editValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          {multiline ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              rows={3}
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              autoFocus
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSave();
                } else if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
            />
          )}
        </div>
      );
    }

    return (
      <div
        className={`cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors ${className}`}
        onDoubleClick={() => setIsEditing(true)}
        title="Double-click để chỉnh sửa"
      >
        {value}
      </div>
    );
  };

  const EditableField = ({
    value,
    onSave,
    className = '',
    multiline = false,
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(value);

    const handleSave = () => {
      onSave(editValue);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setEditValue(value);
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="flex items-center space-x-2">
          {multiline ? (
            <Textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              rows={3}
            />
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
            />
          )}
          <Button size="sm" onClick={handleSave}>
            <Save className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      );
    }

    return (
      <div className={`group flex items-center space-x-2 ${className}`}>
        <span className="flex-1">{value}</span>
        <Button
          size="sm"
          variant="ghost"
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
        >
          <Edit3 className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  const renderContentItem = (item, tabId, contentIndex) => {
    switch (item.type) {
      case 'title':
        return (
          <div className="group relative">
            <h3 className="text-xl font-bold mb-2">
              <DoubleClickEditField
                value={item.value}
                onSave={(value) =>
                  handleEditContentItem(tabId, contentIndex, 'value', value)
                }
              />
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );

      case 'paragraph':
        return (
          <div className="group relative">
            <div className="text-gray-700 leading-relaxed mb-4">
              <DoubleClickEditField
                value={item.value}
                onSave={(value) =>
                  handleEditContentItem(tabId, contentIndex, 'value', value)
                }
                multiline={true}
              />
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );

      case 'bullet-list':
        return (
          <div className="group relative mb-4">
            <div className="space-y-2">
              {item.items.map((bulletItem, bulletIndex) => (
                <div
                  key={bulletIndex}
                  className="flex items-center space-x-2 group/bullet"
                >
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <DoubleClickEditField
                    value={bulletItem}
                    onSave={(value) => {
                      const newItems = [...item.items];
                      newItems[bulletIndex] = value;
                      handleEditContentItem(
                        tabId,
                        contentIndex,
                        'items',
                        newItems
                      );
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="opacity-0 group-hover/bullet:opacity-100 transition-opacity"
                    onClick={() =>
                      handleRemoveBulletItem(tabId, contentIndex, bulletIndex)
                    }
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              ))}
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  placeholder="Thêm điểm mới..."
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' &&
                    handleAddBulletItem(tabId, contentIndex)
                  }
                />
                <Button
                  size="sm"
                  onClick={() => handleAddBulletItem(tabId, contentIndex)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );

      case 'info-section':
        return (
          <div className="group relative mb-6">
            <h4 className="font-semibold mb-3">
              <DoubleClickEditField
                value={item.title}
                onSave={(value) =>
                  handleEditContentItem(tabId, contentIndex, 'title', value)
                }
              />
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {item.items.map((infoItem, infoIndex) => (
                <div
                  key={infoIndex}
                  className="flex justify-between group/info"
                >
                  <span className="font-medium">
                    <DoubleClickEditField
                      value={infoItem.label}
                      onSave={(value) => {
                        const newItems = [...item.items];
                        newItems[infoIndex] = {
                          ...newItems[infoIndex],
                          label: value,
                        };
                        handleEditContentItem(
                          tabId,
                          contentIndex,
                          'items',
                          newItems
                        );
                      }}
                    />
                    :
                  </span>
                  <span>
                    <DoubleClickEditField
                      value={infoItem.value}
                      onSave={(value) => {
                        const newItems = [...item.items];
                        newItems[infoIndex] = {
                          ...newItems[infoIndex],
                          value: value,
                        };
                        handleEditContentItem(
                          tabId,
                          contentIndex,
                          'items',
                          newItems
                        );
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 bg-transparent"
              onClick={() => handleAddInfoItem(tabId, contentIndex)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Thêm thông tin
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveContentItem(tabId, contentIndex)}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard/properties">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Chỉnh sửa dự án</h1>
              <p className="text-muted-foreground">
                ID: {propertyData.id} • Cập nhật thông tin dự án
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Xem trước
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Lưu thay đổi
            </Button>
          </div>
        </div>
      </FadeIn>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <FadeIn>
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <DoubleClickEditField
                    value={propertyData.name}
                    onSave={(value) => handleEditField('name', value)}
                    className="text-3xl font-bold"
                  />
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        propertyData.status === 'active'
                          ? 'bg-green-600'
                          : 'bg-orange-600'
                      }
                    >
                      {propertyData.status === 'active'
                        ? 'Hoạt động'
                        : 'Bản nháp'}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <DoubleClickEditField
                      value={propertyData.location}
                      onSave={(value) => handleEditField('location', value)}
                    />
                  </span>
                  <Badge variant="outline">{propertyData.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Thành phố</Label>
                    <Select
                      value={propertyData.city}
                      onValueChange={(value) => handleEditField('city', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hcmc">TP. Hồ Chí Minh</SelectItem>
                        <SelectItem value="hanoi">Hà Nội</SelectItem>
                        <SelectItem value="international">Quốc tế</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Trạng thái</Label>
                    <Select
                      value={propertyData.status}
                      onValueChange={(value) =>
                        handleEditField('status', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Bản nháp</SelectItem>
                        <SelectItem value="active">Hoạt động</SelectItem>
                        <SelectItem value="sold">Đã bán</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Image Gallery */}
          <FadeIn delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh dự án</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {propertyData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || '/placeholder-2.webp'}
                        alt={`Property ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          <Camera className="w-4 h-4 mr-2" />
                          Thay đổi
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <Plus className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-500">Thêm ảnh</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Property Details Tabs */}
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Chi tiết dự án</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Tên tab mới"
                      value={newTabName}
                      onChange={(e) => setNewTabName(e.target.value)}
                      className="w-40"
                    />
                    <Button size="sm" onClick={handleAddTab}>
                      <Plus className="w-4 h-4 mr-1" />
                      Tab
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    {propertyData.tabs.slice(0, 4).map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="relative group"
                      >
                        {tab.name}
                        {propertyData.tabs.length > 1 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute -top-2 -right-2 h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveTab(tab.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {propertyData.tabs.map((tab) => (
                    <TabsContent
                      key={tab.id}
                      value={tab.id}
                      className="space-y-6"
                    >
                      <div className="space-y-6">
                        {tab.content.map((item, index) => (
                          <div key={index}>
                            {renderContentItem(item, tab.id, index)}
                          </div>
                        ))}

                        {/* Add new content */}
                        <div className="border-t pt-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Select
                              value={contentType}
                              onValueChange={setContentType}
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="title">
                                  <div className="flex items-center">
                                    <Type className="w-4 h-4 mr-2" />
                                    Tiêu đề
                                  </div>
                                </SelectItem>
                                <SelectItem value="paragraph">
                                  <div className="flex items-center">
                                    <AlignLeft className="w-4 h-4 mr-2" />
                                    Đoạn văn
                                  </div>
                                </SelectItem>
                                <SelectItem value="bullet">
                                  <div className="flex items-center">
                                    <List className="w-4 h-4 mr-2" />
                                    Danh sách
                                  </div>
                                </SelectItem>
                                <SelectItem value="info">
                                  <div className="flex items-center">
                                    <Square className="w-4 h-4 mr-2" />
                                    Thông tin
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              placeholder={
                                contentType === 'title'
                                  ? 'Nhập tiêu đề...'
                                  : contentType === 'paragraph'
                                    ? 'Nhập nội dung đoạn văn...'
                                    : contentType === 'info'
                                      ? 'Nhập thông tin...'
                                      : 'Nhập nội dung...'
                              }
                              value={newItem}
                              onChange={(e) => setNewItem(e.target.value)}
                              onKeyPress={(e) =>
                                e.key === 'Enter' &&
                                handleAddContentItem(tab.id)
                              }
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddContentItem(tab.id)}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Features */}
          <FadeIn delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Điểm nổi bật</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  {propertyData.features.map((feature, index) => (
                    <div
                      key={index}
                      className="group flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <DoubleClickEditField
                        value={feature}
                        onSave={(value) => {
                          const newFeatures = [...propertyData.features];
                          newFeatures[index] = value;
                          handleEditField('features', newFeatures);
                        }}
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveFeature(index)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Thêm điểm nổi bật..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button size="sm" onClick={handleAddFeature}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price & Basic Info */}
          <FadeIn delay={0.4}>
            <Card className="sticky top-8">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <DoubleClickEditField
                  value={propertyData.price}
                  onSave={(value) => handleEditField('price', value)}
                  className="text-2xl font-bold text-white"
                />
                <DoubleClickEditField
                  value={propertyData.pricePerSqm}
                  onSave={(value) => handleEditField('pricePerSqm', value)}
                  className="opacity-90 text-white"
                />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <Bed className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                    <DoubleClickEditField
                      value={propertyData.bedrooms}
                      onSave={(value) => handleEditField('bedrooms', value)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Square className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                    <DoubleClickEditField
                      value={propertyData.area}
                      onSave={(value) => handleEditField('area', value)}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Calendar className="w-5 h-5 mx-auto mb-1 text-orange-600" />
                    <DoubleClickEditField
                      value={propertyData.completion}
                      onSave={(value) => handleEditField('completion', value)}
                      className="text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div>
                    <Label className="text-sm font-medium">Mô tả</Label>
                    <DoubleClickEditField
                      value={propertyData.description}
                      onSave={(value) => handleEditField('description', value)}
                      multiline={true}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Chủ đầu tư</Label>
                    <DoubleClickEditField
                      value={propertyData.developer}
                      onSave={(value) => handleEditField('developer', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Quick Actions */}
          <FadeIn delay={0.5}>
            <Card>
              <CardHeader>
                <CardTitle>Thao tác nhanh</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Xem trang chi tiết
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Camera className="w-4 h-4 mr-2" />
                  Quản lý hình ảnh
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Change History */}
          <FadeIn delay={0.6}>
            <Card>
              <CardHeader>
                <CardTitle>Lịch sử thay đổi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Cập nhật giá:</span>
                    <span className="text-muted-foreground">2 giờ trước</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thêm hình ảnh:</span>
                    <span className="text-muted-foreground">1 ngày trước</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tạo dự án:</span>
                    <span className="text-muted-foreground">3 ngày trước</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Tips */}
          <FadeIn delay={0.7}>
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-600">
                  💡 Gợi ý chỉnh sửa
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>• Double-click vào text để chỉnh sửa nhanh</p>
                <p>• Chọn loại nội dung trước khi thêm vào tab</p>
                <p>• Sử dụng "Xem trước" để kiểm tra thay đổi</p>
                <p>• Nhớ lưu thường xuyên để tránh mất dữ liệu</p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
