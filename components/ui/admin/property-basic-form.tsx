'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface PropertyBasicFormProps {
  propertyForm: any;
  activeTab: string;
  handleInputChange: (field: string, value: any) => void;
  handleNestedInputChange: (parent: string, field: string, value: any) => void;
  getFilterOptions: (category: string) => any;
}

export function PropertyBasicForm({
  propertyForm,
  activeTab,
  handleInputChange,
  handleNestedInputChange,
  getFilterOptions,
}: PropertyBasicFormProps) {
  const getPropertyTypeFields = () => {
    switch (activeTab) {
      case 'resort':
        return (
          <>
            <div>
              <Label htmlFor="rentalYield">Lợi nhuận cho thuê</Label>
              <Input
                id="rentalYield"
                value={propertyForm.rentalYield}
                onChange={(e) =>
                  handleInputChange('rentalYield', e.target.value)
                }
                placeholder="8-12% năm"
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
          </>
        );
      case 'international':
        return (
          <>
            <div>
              <Label htmlFor="investmentHighlights">Điểm nổi bật đầu tư</Label>
              <Textarea
                id="investmentHighlights"
                value={propertyForm.investmentHighlights}
                onChange={(e) =>
                  handleInputChange('investmentHighlights', e.target.value)
                }
                placeholder="Các điểm nổi bật về cơ hội đầu tư..."
                rows={3}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin cơ bản</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Tên sản phẩm *</Label>
              <Input
                id="name"
                value={propertyForm.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div>
              <Label htmlFor="developer">Chủ đầu tư *</Label>
              <Input
                id="developer"
                value={propertyForm.developer}
                onChange={(e) => handleInputChange('developer', e.target.value)}
                placeholder="Nhập tên chủ đầu tư"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Địa chỉ *</Label>
            <Input
              id="location"
              value={propertyForm.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Nhập địa chỉ đầy đủ"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">Thành phố</Label>
              <Select
                value={propertyForm.city}
                onValueChange={(value) => handleInputChange('city', value)}
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
                onValueChange={(value) => handleInputChange('district', value)}
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
                      <SelectItem key={district.value} value={district.label}>
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
                onValueChange={(value) => handleInputChange('type', value)}
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
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Từ 3.2 tỷ"
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Phòng ngủ</Label>
              <Input
                id="bedrooms"
                value={propertyForm.bedrooms}
                onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                placeholder="1-4 phòng ngủ"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms">Phòng tắm</Label>
              <Input
                id="bathrooms"
                value={propertyForm.bathrooms}
                onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                placeholder="1-3 phòng tắm"
              />
            </div>
            <div>
              <Label htmlFor="area">Diện tích</Label>
              <Input
                id="area"
                value={propertyForm.area}
                onChange={(e) => handleInputChange('area', e.target.value)}
                placeholder="50-120 m²"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
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
              <Label htmlFor="pricePerSqm">Giá/m²</Label>
              <Input
                id="pricePerSqm"
                value={propertyForm.pricePerSqm}
                onChange={(e) =>
                  handleInputChange('pricePerSqm', e.target.value)
                }
                placeholder="45 triệu/m²"
              />
            </div>
            <div>
              <Label htmlFor="status">Trạng thái</Label>
              <Select
                value={propertyForm.status}
                onValueChange={(value) => handleInputChange('status', value)}
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

          {/* Property type specific fields */}
          <div className="grid md:grid-cols-2 gap-4">
            {getPropertyTypeFields()}
          </div>
        </CardContent>
      </Card>

      {/* Developer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Thông tin chủ đầu tư</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="developerName">Tên chủ đầu tư</Label>
              <Input
                id="developerName"
                value={propertyForm.developerInfo.name}
                onChange={(e) =>
                  handleNestedInputChange(
                    'developerInfo',
                    'name',
                    e.target.value
                  )
                }
                placeholder="Vingroup"
              />
            </div>
            <div>
              <Label htmlFor="established">Thành lập</Label>
              <Input
                id="established"
                value={propertyForm.developerInfo.established}
                onChange={(e) =>
                  handleNestedInputChange(
                    'developerInfo',
                    'established',
                    e.target.value
                  )
                }
                placeholder="1993"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projects">Số dự án</Label>
              <Input
                id="projects"
                value={propertyForm.developerInfo.projects}
                onChange={(e) =>
                  handleNestedInputChange(
                    'developerInfo',
                    'projects',
                    e.target.value
                  )
                }
                placeholder="100+ dự án"
              />
            </div>
            <div>
              <Label htmlFor="rating">Đánh giá</Label>
              <Input
                id="rating"
                value={propertyForm.developerInfo.rating}
                onChange={(e) =>
                  handleNestedInputChange(
                    'developerInfo',
                    'rating',
                    e.target.value
                  )
                }
                placeholder="4.8"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
