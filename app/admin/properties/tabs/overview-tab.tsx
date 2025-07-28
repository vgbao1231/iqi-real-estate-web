'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Plus, X } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { KeyValueTable } from '@/components/ui/key-value-table';
import { FileUpload } from '@/components/ui/file-upload';
import { Button } from '@/components/ui/button';
import { KeyValuePair } from '@/hooks/use-project-data';

interface OverviewTabProps {
  overview: any;
  updateProject: (section: string, field: string, value: any) => void;
  addArrayItem: (section: string, field: string, item?: string) => void;
  removeArrayItem: (section: string, field: string, index: number) => void;
  updateArrayItem: (
    section: string,
    field: string,
    index: number,
    value: string
  ) => void;
}

export function OverviewTab({
  overview,
  updateProject,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}: OverviewTabProps) {
  const predefinedBasicInfoFields: KeyValuePair[] = [
    { key: 'Tên dự án', value: '', type: 'text' },
    { key: 'Slug', value: '', type: 'text' },
    { key: 'Chủ đầu tư', value: '', type: 'text' },
    { key: 'Thiết kế cảnh quan', value: '', type: 'text' },
    { key: 'Diện tích (m²)', value: 0, type: 'number' },
    { key: 'Tổng số sản phẩm', value: 0, type: 'number' },
    { key: 'Bàn giao', value: '', type: 'text' },
    { key: 'Địa chỉ', value: '', type: 'text' },
    { key: 'Thành phố', value: '', type: 'text' },
    { key: 'Quận/Huyện', value: '', type: 'text' },
    { key: 'Quốc gia', value: 'Vietnam', type: 'text' },
    { key: 'Nhóm sản phẩm', value: '', type: 'text' },
    { key: 'Phòng ngủ tối thiểu', value: 0, type: 'number' },
    { key: 'Phòng ngủ tối đa', value: 0, type: 'number' },
    { key: 'Phòng tắm tối thiểu', value: 0, type: 'number' },
    { key: 'Phòng tắm tối đa', value: 0, type: 'number' },
    {
      key: 'Loại hình',
      value: '',
      type: 'select',
      options: [
        'Căn hộ',
        'Biệt thự',
        'Nhà phố',
        'Văn phòng',
        'Khu đô thị sinh thái',
      ],
    },
    {
      key: 'Trạng thái',
      value: '',
      type: 'select',
      options: [
        'Đang lên kế hoạch',
        'Đang xây dựng',
        'Đang bán',
        'Đang mở bán',
        'Hoàn thành',
      ],
    },
    { key: 'Pháp lý', value: '', type: 'text' },
    { key: 'Tình trạng sở hữu', value: '', type: 'text' },
    {
      key: 'Đơn vị tiền tệ',
      value: 'VND',
      type: 'select',
      options: ['VND', 'USD', 'EUR'],
    },
    { key: 'Giai đoạn', value: '', type: 'text' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin tổng quan</CardTitle>
        <CardDescription>Cập nhật thông tin chi tiết dự án</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Ảnh nền"
            value={overview.backgroundImage}
            onChange={(file) =>
              updateProject('overview', 'backgroundImage', file)
            }
          />
          <FileUpload
            label="Ảnh trải nghiệm"
            value={overview.experienceImage}
            onChange={(file) =>
              updateProject('overview', 'experienceImage', file)
            }
          />
        </div>

        {/* Overview Images - Fixed 4 categories */}
        <div className="space-y-6">
          <Label className="text-base font-semibold">
            Ảnh tổng quan (4 danh mục cố định)
          </Label>

          {/* Product Overview */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                1. Sản phẩm (Product Overview)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="Ảnh sản phẩm"
                  value={overview.overviewImages[0]?.image || null}
                  onChange={(file) => {
                    const newOverviewImages = [...overview.overviewImages];
                    if (!newOverviewImages[0])
                      newOverviewImages[0] = { image: null, description: '' };
                    newOverviewImages[0].image = file;
                    updateProject(
                      'overview',
                      'overviewImages',
                      newOverviewImages
                    );
                  }}
                />
                <div className="space-y-2">
                  <Label>Mô tả sản phẩm</Label>
                  <RichTextEditor
                    value={overview.overviewImages[0]?.description || ''}
                    onChange={(value) => {
                      const newOverviewImages = [...overview.overviewImages];
                      if (!newOverviewImages[0])
                        newOverviewImages[0] = { image: null, description: '' };
                      newOverviewImages[0].description = value;
                      updateProject(
                        'overview',
                        'overviewImages',
                        newOverviewImages
                      );
                    }}
                    placeholder="Nhập mô tả về sản phẩm..."
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Area Overview */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                2. Diện tích (Area Overview)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="Ảnh diện tích"
                  value={overview.overviewImages[1]?.image || null}
                  onChange={(file) => {
                    const newOverviewImages = [...overview.overviewImages];
                    if (!newOverviewImages[1])
                      newOverviewImages[1] = { image: null, description: '' };
                    newOverviewImages[1].image = file;
                    updateProject(
                      'overview',
                      'overviewImages',
                      newOverviewImages
                    );
                  }}
                />
                <div className="space-y-2">
                  <Label>Mô tả diện tích</Label>
                  <RichTextEditor
                    value={overview.overviewImages[1]?.description || ''}
                    onChange={(value) => {
                      const newOverviewImages = [...overview.overviewImages];
                      if (!newOverviewImages[1])
                        newOverviewImages[1] = { image: null, description: '' };
                      newOverviewImages[1].description = value;
                      updateProject(
                        'overview',
                        'overviewImages',
                        newOverviewImages
                      );
                    }}
                    placeholder="Nhập mô tả về diện tích..."
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Amenity Overview */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                3. Tiện ích (Amenity Overview)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="Ảnh tiện ích"
                  value={overview.overviewImages[2]?.image || null}
                  onChange={(file) => {
                    const newOverviewImages = [...overview.overviewImages];
                    if (!newOverviewImages[2])
                      newOverviewImages[2] = { image: null, description: '' };
                    newOverviewImages[2].image = file;
                    updateProject(
                      'overview',
                      'overviewImages',
                      newOverviewImages
                    );
                  }}
                />
                <div className="space-y-2">
                  <Label>Mô tả tiện ích</Label>
                  <RichTextEditor
                    value={overview.overviewImages[2]?.description || ''}
                    onChange={(value) => {
                      const newOverviewImages = [...overview.overviewImages];
                      if (!newOverviewImages[2])
                        newOverviewImages[2] = { image: null, description: '' };
                      newOverviewImages[2].description = value;
                      updateProject(
                        'overview',
                        'overviewImages',
                        newOverviewImages
                      );
                    }}
                    placeholder="Nhập mô tả về tiện ích..."
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Location Overview */}
          <Card className="p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">
                4. Vị trí (Location Overview)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FileUpload
                  label="Ảnh vị trí"
                  value={overview.overviewImages[3]?.image || null}
                  onChange={(file) => {
                    const newOverviewImages = [...overview.overviewImages];
                    if (!newOverviewImages[3])
                      newOverviewImages[3] = { image: null, description: '' };
                    newOverviewImages[3].image = file;
                    updateProject(
                      'overview',
                      'overviewImages',
                      newOverviewImages
                    );
                  }}
                />
                <div className="space-y-2">
                  <Label>Mô tả vị trí</Label>
                  <RichTextEditor
                    value={overview.overviewImages[3]?.description || ''}
                    onChange={(value) => {
                      const newOverviewImages = [...overview.overviewImages];
                      if (!newOverviewImages[3])
                        newOverviewImages[3] = { image: null, description: '' };
                      newOverviewImages[3].description = value;
                      updateProject(
                        'overview',
                        'overviewImages',
                        newOverviewImages
                      );
                    }}
                    placeholder="Nhập mô tả về vị trí..."
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Separator />

        <KeyValueTable
          title="Thông tin cơ bản"
          data={overview.basicInfo}
          onChange={(data) => updateProject('overview', 'basicInfo', data)}
          predefinedFields={predefinedBasicInfoFields}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Nhà thầu</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('overview', 'contractors')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm nhà thầu
            </Button>
          </div>
          {overview.contractors.map((contractor: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={contractor}
                onChange={(e) =>
                  updateArrayItem(
                    'overview',
                    'contractors',
                    index,
                    e.target.value
                  )
                }
                placeholder="Nhập tên nhà thầu"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  removeArrayItem('overview', 'contractors', index)
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Kiến trúc sư</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addArrayItem('overview', 'architects')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm kiến trúc sư
            </Button>
          </div>
          {overview.architects.map((architect: string, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                value={architect}
                onChange={(e) =>
                  updateArrayItem(
                    'overview',
                    'architects',
                    index,
                    e.target.value
                  )
                }
                placeholder="Nhập tên kiến trúc sư"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeArrayItem('overview', 'architects', index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
