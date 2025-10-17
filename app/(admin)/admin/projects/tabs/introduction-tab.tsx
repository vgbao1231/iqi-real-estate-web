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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X, Save, Building2 } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';
import { memo } from 'react';
import Image from 'next/image';

import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface IntroductionTabProps {
  project: any;
  updateProject: (...args: (string | any)[]) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

export const IntroductionTab = memo(function IntroductionTab({
  project,
  updateProject,
  handleSave,
}: IntroductionTabProps) {
  const { introduction } = project;
  const articleCategories: any = useSelector(
    (state: RootState) => state.enum.articleCategories ?? []
  );
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const handleLogoUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        const newLogos = [...introduction.logoImages, ...files];
        updateProject('introduction', 'logoImages', newLogos);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-8">
      {/* Section 0: Core Project Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="h-5 w-5" />
            <span>Thông tin cơ bản dự án</span>
          </CardTitle>
          <CardDescription>
            Thông tin chính của dự án (bắt buộc)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Name & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="flex items-center">
                Tên dự án <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="projectName"
                value={project.name}
                onChange={(e) => updateProject('name', e.target.value)}
                placeholder="VD: Eco Retreat"
                className="font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectSlug" className="flex items-center">
                Slug (URL) <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="projectSlug"
                value={project.slug}
                onChange={(e) => updateProject('slug', e.target.value)}
                placeholder="eco-retreat"
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                URL: /projects/{project.slug || '...'}
              </p>
            </div>
          </div>

          {/* Category & Project Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center">
                Danh mục <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={project.category}
                onValueChange={(value) => updateProject('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {}
                  <SelectItem value="Việt Nam">Việt Nam</SelectItem>
                  <SelectItem value="Quốc tế">Quốc tế</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType" className="flex items-center">
                Loại hình dự án <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={project.projectType}
                onValueChange={(value) => updateProject('projectType', value)}
              >
                <SelectTrigger id="projectType">
                  <SelectValue placeholder="Chọn loại hình" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Căn hộ">Căn hộ</SelectItem>
                  <SelectItem value="Biệt thự">Biệt thự</SelectItem>
                  <SelectItem value="Nhà phố">Nhà phố</SelectItem>
                  <SelectItem value="Đất nền">Đất nền</SelectItem>
                  <SelectItem value="Khu đô thị">Khu đô thị</SelectItem>
                  <SelectItem value="Khu đô thị sinh thái">
                    Khu đô thị sinh thái
                  </SelectItem>
                  <SelectItem value="Khu nghỉ dưỡng">Khu nghỉ dưỡng</SelectItem>
                  <SelectItem value="Văn phòng">Văn phòng</SelectItem>
                  <SelectItem value="Khác">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center">
                Quốc gia <span className="text-red-500 ml-1">*</span>
              </Label>
              <Select
                value={project.country}
                onValueChange={(value) => updateProject('country', value)}
              >
                <SelectTrigger id="country">
                  <SelectValue placeholder="Chọn quốc gia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vietnam">Việt Nam</SelectItem>
                  <SelectItem value="Singapore">Singapore</SelectItem>
                  <SelectItem value="Thailand">Thái Lan</SelectItem>
                  <SelectItem value="Malaysia">Malaysia</SelectItem>
                  <SelectItem value="Philippines">Philippines</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="USA">Mỹ</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="UK">Anh</SelectItem>
                  <SelectItem value="Other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="flex items-center">
                Thành phố <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="city"
                value={project.city}
                onChange={(e) => updateProject('city', e.target.value)}
                placeholder="VD: TP.HCM"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="district" className="flex items-center">
                Quận/Huyện <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="district"
                value={project.district}
                onChange={(e) => updateProject('district', e.target.value)}
                placeholder="VD: Quận 9"
              />
            </div>
          </div>

          <Separator />

          {/* Display Settings */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">Cài đặt hiển thị</Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dự án nổi bật</Label>
                  <p className="text-sm text-muted-foreground">
                    Hiển thị dự án trong danh sách nổi bật
                  </p>
                </div>
                <Switch
                  checked={project.isFeatured}
                  onCheckedChange={(checked) =>
                    updateProject('isFeatured', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dự án độc quyền</Label>
                  <p className="text-sm text-muted-foreground">
                    Đánh dấu là dự án độc quyền
                  </p>
                </div>
                <Switch
                  checked={project.isExclusive}
                  onCheckedChange={(checked) =>
                    updateProject('isExclusive', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hiển thị trên web</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép hiển thị dự án trên website
                  </p>
                </div>
                <Switch
                  checked={project.visibleOnWeb}
                  onCheckedChange={(checked) =>
                    updateProject('visibleOnWeb', checked)
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.isFeatured && <Badge variant="secondary">Nổi bật</Badge>}
              {project.isExclusive && (
                <Badge variant="secondary">Độc quyền</Badge>
              )}
              {project.visibleOnWeb && (
                <Badge variant="secondary">Hiển thị web</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Cover Section with Logo Management */}
      <Card>
        <CardHeader>
          <CardTitle>1. Phần bìa</CardTitle>
          <CardDescription>
            Ảnh bìa với header, logo và tiêu đề chính
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cover Section Settings */}
          <div className="space-y-6">
            <FileUpload
              label="Ảnh nền bìa (Cover Background)"
              value={introduction.coverImage}
              onChange={(file) =>
                updateProject('introduction', 'coverImage', file)
              }
            />

            <div className="space-y-2">
              <Label htmlFor="coverTitle">Tiêu đề bìa (Cover Title)</Label>
              <Input
                id="coverTitle"
                value={introduction.coverTitle}
                onChange={(e) =>
                  updateProject('introduction', 'coverTitle', e.target.value)
                }
                placeholder="Nhập tiêu đề trang bìa"
              />
            </div>

            <Separator />

            {/* Logo Selection */}
            <div className="space-y-4">
              {/* Logo Management */}
              <div className="space-y-4">
                <Label>Logo (Không giới hạn số lượng)</Label>

                {introduction.logoImages.length === 0 ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
                    onClick={handleLogoUpload}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm mb-2">
                      Chưa có logo nào. Nhấn vào đây để thêm logo.
                    </p>
                    <p className="text-xs text-gray-400">
                      Hỗ trợ chọn nhiều ảnh cùng lúc
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {introduction.logoImages.map(
                        (logo: any, index: number) => {
                          const logoName =
                            logo instanceof File
                              ? logo.name
                              : typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo?.url?.split('/').pop() || 'Logo';

                          return (
                            <div
                              key={index}
                              className="relative group border rounded-lg overflow-hidden bg-white"
                            >
                              <Image
                                src={
                                  logo instanceof File
                                    ? URL.createObjectURL(logo)
                                    : logo?.url || logo || '/placeholder.svg'
                                }
                                alt={`Logo ${index + 1}`}
                                className="w-full h-20 object-contain p-2"
                                width={200} // bạn có thể tuỳ chỉnh width/height
                                height={80}
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all center-both">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    const newLogos =
                                      introduction.logoImages.filter(
                                        (_: any, i: number) => i !== index
                                      );
                                    updateProject(
                                      'introduction',
                                      'logoImages',
                                      newLogos
                                    );
                                    if (
                                      introduction.headerLogoIndex >=
                                      newLogos.length
                                    ) {
                                      updateProject(
                                        'introduction',
                                        'headerLogoIndex',
                                        Math.max(0, newLogos.length - 1)
                                      );
                                    }
                                    if (
                                      introduction.centerLogoIndex >=
                                      newLogos.length
                                    ) {
                                      updateProject(
                                        'introduction',
                                        'centerLogoIndex',
                                        Math.max(0, newLogos.length - 1)
                                      );
                                    }
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="p-2 bg-gray-50">
                                <p className="text-xs text-gray-600 truncate">
                                  {logoName}
                                </p>
                              </div>
                            </div>
                          );
                        }
                      )}

                      {/* Add more logos placeholder */}
                      <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors cursor-pointer flex flex-col items-center justify-center h-20"
                        onClick={handleLogoUpload}
                      >
                        <Upload className="h-6 w-6 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Thêm logo</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {introduction.logoImages.length > 0 && (
                <div className="flex items-center gap-8">
                  <div className="space-y-2 flex-1">
                    <Label>Logo cho header</Label>
                    <Select
                      value={introduction.headerLogoIndex?.toString() || '0'}
                      onValueChange={(value) =>
                        updateProject(
                          'introduction',
                          'headerLogoIndex',
                          Number.parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn logo cho header" />
                      </SelectTrigger>
                      <SelectContent>
                        {introduction.logoImages.map(
                          (logo: any, index: number) => {
                            const logoName =
                              typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo.name;
                            return (
                              <SelectItem key={index} value={index.toString()}>
                                Logo {index + 1} - {logoName}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 flex-1">
                    <Label>Logo cho giữa trang</Label>
                    <Select
                      value={introduction.coverLogoIndex?.toString() || '0'}
                      onValueChange={(value) =>
                        updateProject(
                          'introduction',
                          'coverLogoIndex',
                          Number.parseInt(value)
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn logo cho giữa trang" />
                      </SelectTrigger>
                      <SelectContent>
                        {introduction.logoImages.map(
                          (logo: any, index: number) => {
                            const logoName =
                              typeof logo === 'string'
                                ? logo.split('/').pop()
                                : logo.name;
                            return (
                              <SelectItem key={index} value={index.toString()}>
                                Logo {index + 1} - {logoName}
                              </SelectItem>
                            );
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {introduction.logoImages.length === 0 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Vui lòng thêm ít nhất một logo để có thể chọn logo cho
                    header và trang bìa.
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Introduction Section */}
      <Card>
        <CardHeader>
          <CardTitle>2. Phần giới thiệu</CardTitle>
          <CardDescription>Nội dung giới thiệu chi tiết</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields arranged to match preview layout */}
          <FileUpload
            label="Ảnh nền giới thiệu (Introduction Background)"
            value={introduction.introductionBackground}
            onChange={(file) =>
              updateProject('introduction', 'introductionBackground', file)
            }
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Content */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="introductionTitle">
                  Tiêu đề giới thiệu (Introduction Title)
                </Label>
                <RichTextEditor
                  value={introduction.introductionTitle}
                  onChange={(value) =>
                    updateProject('introduction', 'introductionTitle', value)
                  }
                  placeholder="Nhập tiêu đề phần giới thiệu..."
                />
              </div>

              <div className="space-y-2">
                <Label>Mô tả giới thiệu (Introduction Description)</Label>
                <RichTextEditor
                  value={introduction.introductionDescription}
                  onChange={(value) =>
                    updateProject(
                      'introduction',
                      'introductionDescription',
                      value
                    )
                  }
                  placeholder="Nhập mô tả giới thiệu..."
                />
              </div>
            </div>

            {/* Right side - Image */}
            <div className="space-y-4">
              <FileUpload
                label="Ảnh giới thiệu (Introduction Image)"
                value={introduction.introductionImage}
                onChange={(file) =>
                  updateProject('introduction', 'introductionImage', file)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Launch Section (formerly Hero Section) */}
      <Card>
        <CardHeader>
          <CardTitle>3. Phần ra mắt</CardTitle>
          <CardDescription>Nội dung ra mắt với carousel ảnh</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Form Fields arranged to match preview layout */}
          <div className="space-y-6">
            {/* Form Fields arranged to match preview layout */}
            <FileUpload
              label="Ảnh nền ra mắt (Launch Background)"
              value={introduction.launchBackground}
              onChange={(file) =>
                updateProject('introduction', 'launchBackground', file)
              }
            />
            {/* Launch Images (Left) and Content (Right) - matching preview layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Launch Images Carousel */}
              <div className="space-y-4">
                <MultiFileUpload
                  label="Ảnh ra mắt (Launch Images)"
                  value={introduction.launchImages}
                  onChange={(files) =>
                    updateProject('introduction', 'launchImages', files)
                  }
                />
              </div>

              {/* Right side - Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="launchTitle">
                    Tiêu đề ra mắt (Launch Title)
                  </Label>
                  <RichTextEditor
                    value={introduction.launchTitle}
                    onChange={(value) =>
                      updateProject('introduction', 'launchTitle', value)
                    }
                    placeholder="Nhập tiêu đề ra mắt..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Mô tả ra mắt (Launch Description)</Label>
                  <RichTextEditor
                    value={introduction.launchDescription}
                    onChange={(value) =>
                      updateProject('introduction', 'launchDescription', value)
                    }
                    placeholder="Nhập mô tả ra mắt..."
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Video Section */}
      <Card>
        <CardHeader>
          <CardTitle>4. Video giới thiệu</CardTitle>
          <CardDescription>Video giới thiệu dự án</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Video Input */}
          <div className="space-y-2">
            <Label htmlFor="introductionVideo">
              Video giới thiệu (Introduction Video)
            </Label>
            <div className="flex space-x-2">
              <Input
                id="introductionVideo"
                value={introduction.introductionVideo}
                onChange={(e) =>
                  updateProject(
                    'introduction',
                    'introductionVideo',
                    e.target.value
                  )
                }
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1"
              />
              <span className="text-sm text-gray-500 self-center">hoặc</span>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateProject('introduction', 'introductionVideo', file);
                    }
                  }}
                />
                <Button variant="outline" type="button">
                  <Upload className="h-4 w-4 mr-2" />
                  Tải video
                </Button>
              </label>
            </div>
            <p className="text-xs text-gray-500">
              Hỗ trợ YouTube URL (https://www.youtube.com/watch?v=...) hoặc tải
              file video trực tiếp
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end">
        <Button
          onClick={() =>
            handleSave(
              updateProjectTab,
              uploadImage,
              'introduction',
              introduction
            )
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading
              ? 'Đang lưu...'
              : 'Lưu thông tin giới thiệu'}
          </span>
        </Button>
      </div>
    </div>
  );
});
