'use client';

import { useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { X, Camera, Save, MapPin, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface PropertyFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  property?: any;
  activeTab: string;
  getFilterOptions: (category: string) => any;
}

export function PropertyFormDialog({
  isOpen,
  onClose,
  title,
  property = null,
  activeTab,
  getFilterOptions,
}: PropertyFormDialogProps) {
  const [propertyForm, setPropertyForm] = useState(() => ({
    name: property?.name || '',
    location: property?.location || '',
    city: property?.city || '',
    district: property?.district || '',
    country: property?.country || '',
    type: property?.type || '',
    status: property?.status || 'draft',
    price: property?.price || '',
    priceValue: property?.priceValue || 0,
    bedrooms: property?.bedrooms?.toString() || '',
    bathrooms: property?.bathrooms?.toString() || '',
    area: property?.area?.toString() || '',
    developer: property?.developer || '',
    completion: property?.completion || '',
    description: property?.description || '',
    features: property?.features || [],
    images: property?.images || [],
    category: property?.category || activeTab,
    rentalYield: property?.rentalYield || '',
    investmentHighlights: property?.investmentHighlights || '',
    legalStatus: property?.legalStatus || '',
    handoverCondition: property?.handoverCondition || '',
    paymentTerms: property?.paymentTerms || '',
    contactInfo: property?.contactInfo || '',
  }));

  const handleInputChange = (field: string, value: any) => {
    setPropertyForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddImage = () => {
    const newImage = '/placeholder.svg?height=400&width=600';
    setPropertyForm((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
  };

  const handleRemoveImage = (index: number) => {
    setPropertyForm((prev) => ({
      ...prev,
      images: prev.images.filter((_: string, i: number) => i !== index),
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!propertyForm.name.trim()) {
      alert('Vui lòng nhập tên dự án');
      return;
    }
    if (!propertyForm.location.trim()) {
      alert('Vui lòng nhập địa chỉ');
      return;
    }
    if (!propertyForm.developer.trim()) {
      alert('Vui lòng nhập tên chủ đầu tư');
      return;
    }

    // Save logic here
    console.log('Saving property:', propertyForm);
    alert(
      property ? 'Đã cập nhật dự án thành công!' : 'Đã thêm dự án thành công!'
    );
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
                    <Label htmlFor="name">Tên dự án *</Label>
                    <Input
                      id="name"
                      value={propertyForm.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                      placeholder="Nhập tên dự án"
                    />
                  </div>
                  <div>
                    <Label htmlFor="developer">Chủ đầu tư *</Label>
                    <Input
                      id="developer"
                      value={propertyForm.developer}
                      onChange={(e) =>
                        handleInputChange('developer', e.target.value)
                      }
                      placeholder="Nhập tên chủ đầu tư"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Địa chỉ *</Label>
                  <Input
                    id="location"
                    value={propertyForm.location}
                    onChange={(e) =>
                      handleInputChange('location', e.target.value)
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
                        handleInputChange('city', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilterOptions(activeTab).cities.map((city: any) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="district">Quận/Huyện</Label>
                    <Select
                      value={propertyForm.district}
                      onValueChange={(value) =>
                        handleInputChange('district', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilterOptions(activeTab)
                          .districts.filter(
                            (district: any) =>
                              !propertyForm.city ||
                              district.city === propertyForm.city
                          )
                          .map((district: any) => (
                            <SelectItem
                              key={district.value}
                              value={district.label}
                            >
                              {district.label}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Loại hình</Label>
                    <Select
                      value={propertyForm.type}
                      onValueChange={(value) =>
                        handleInputChange('type', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn loại hình" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilterOptions(activeTab).propertyTypes.map(
                          (type: any) => (
                            <SelectItem key={type.value} value={type.label}>
                              {type.label}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="price">Giá bán</Label>
                    <Input
                      id="price"
                      value={propertyForm.price}
                      onChange={(e) =>
                        handleInputChange('price', e.target.value)
                      }
                      placeholder="Từ 3.2 tỷ"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Phòng ngủ</Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={propertyForm.bedrooms}
                      onChange={(e) =>
                        handleInputChange('bedrooms', e.target.value)
                      }
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Phòng tắm</Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      value={propertyForm.bathrooms}
                      onChange={(e) =>
                        handleInputChange('bathrooms', e.target.value)
                      }
                      placeholder="2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Diện tích (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      value={propertyForm.area}
                      onChange={(e) =>
                        handleInputChange('area', e.target.value)
                      }
                      placeholder="75"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="completion">Thời gian bàn giao</Label>
                    <Input
                      id="completion"
                      value={propertyForm.completion}
                      onChange={(e) =>
                        handleInputChange('completion', e.target.value)
                      }
                      placeholder="Q4/2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select
                      value={propertyForm.status}
                      onValueChange={(value) =>
                        handleInputChange('status', value)
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

                {/* Additional fields for resort properties */}
                {activeTab === 'resort' && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rentalYield">Lợi nhuận cho thuê</Label>
                      <Input
                        id="rentalYield"
                        value={propertyForm.rentalYield}
                        onChange={(e) =>
                          handleInputChange('rentalYield', e.target.value)
                        }
                        placeholder="8-12%"
                      />
                    </div>
                    <div>
                      <Label htmlFor="legalStatus">Tình trạng pháp lý</Label>
                      <Input
                        id="legalStatus"
                        value={propertyForm.legalStatus}
                        onChange={(e) =>
                          handleInputChange('legalStatus', e.target.value)
                        }
                        placeholder="Sổ hồng riêng"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="description">Mô tả dự án</Label>
                  <RichTextEditor
                    value={propertyForm.description}
                    onChange={(value) =>
                      handleInputChange('description', value)
                    }
                    placeholder="Mô tả chi tiết về dự án..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Investment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin đầu tư</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="investmentHighlights">
                    Điểm nổi bật đầu tư
                  </Label>
                  <RichTextEditor
                    value={propertyForm.investmentHighlights}
                    onChange={(value) =>
                      handleInputChange('investmentHighlights', value)
                    }
                    placeholder="Các điểm nổi bật về cơ hội đầu tư..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="paymentTerms">Điều kiện thanh toán</Label>
                    <Textarea
                      id="paymentTerms"
                      value={propertyForm.paymentTerms}
                      onChange={(e) =>
                        handleInputChange('paymentTerms', e.target.value)
                      }
                      placeholder="Thông tin về các gói thanh toán..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="handoverCondition">
                      Điều kiện bàn giao
                    </Label>
                    <Textarea
                      id="handoverCondition"
                      value={propertyForm.handoverCondition}
                      onChange={(e) =>
                        handleInputChange('handoverCondition', e.target.value)
                      }
                      placeholder="Thông tin về điều kiện bàn giao..."
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="contactInfo">Thông tin liên hệ</Label>
                  <Textarea
                    id="contactInfo"
                    value={propertyForm.contactInfo}
                    onChange={(e) =>
                      handleInputChange('contactInfo', e.target.value)
                    }
                    placeholder="Thông tin liên hệ tư vấn..."
                    rows={2}
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
                  {propertyForm.images.map((image: string, index: number) => (
                    <div key={index} className="relative group">
                      <Image
                        src={image || '/placeholder.svg'}
                        alt={`Property ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg h-32 flex items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                    onClick={handleAddImage}
                  >
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
                      src={propertyForm.images[0] || '/placeholder.svg'}
                      alt="Preview"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-muted-foreground">Chưa có ảnh</span>
                    </div>
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
                    <div>
                      {propertyForm.area ? `${propertyForm.area}m²` : 'N/A'}
                    </div>
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
              <Button className="flex-1" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Lưu
              </Button>
              <Button variant="outline" onClick={handleClose}>
                Hủy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
