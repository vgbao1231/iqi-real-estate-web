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
import { Upload, ImageIcon, X } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import { Button } from '@/components/ui/button';

interface IntroductionTabProps {
  introduction: any;
  updateProject: (section: string, field: string, value: any) => void;
}

export function IntroductionTab({
  introduction,
  updateProject,
}: IntroductionTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin giới thiệu</CardTitle>
        <CardDescription>Cập nhật thông tin giới thiệu dự án</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Ảnh bìa"
            value={introduction.coverImage}
            onChange={(file) =>
              updateProject('introduction', 'coverImage', file)
            }
          />
          <FileUpload
            label="Ảnh tiêu đề"
            value={introduction.titleImage}
            onChange={(file) =>
              updateProject('introduction', 'titleImage', file)
            }
          />
          <FileUpload
            label="Ảnh hero"
            value={introduction.heroImage}
            onChange={(file) =>
              updateProject('introduction', 'heroImage', file)
            }
          />
          <FileUpload
            label="Ảnh nền"
            value={introduction.backgroundImage}
            onChange={(file) =>
              updateProject('introduction', 'backgroundImage', file)
            }
          />
        </div>

        {/* Logo Images - Max 3 */}
        <div className="space-y-2">
          <Label>Logo (Tối đa 3 ảnh: Có màu, Light mode, Dark mode)</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="space-y-2">
                <Label className="text-sm text-gray-600">
                  {index === 0
                    ? 'Logo có màu'
                    : index === 1
                      ? 'Logo light mode'
                      : 'Logo dark mode'}
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  {introduction.logoImages[index] ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="h-4 w-4" />
                        <span className="text-sm text-gray-600">
                          {introduction.logoImages[index].name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newLogos = [...introduction.logoImages];
                          newLogos[index] = null;
                          updateProject(
                            'introduction',
                            'logoImages',
                            newLogos.filter(Boolean)
                          );
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const newLogos = [...introduction.logoImages];
                            newLogos[index] = file;
                            updateProject(
                              'introduction',
                              'logoImages',
                              newLogos.filter(Boolean)
                            );
                          }
                        }}
                      />
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Tải lên logo
                        </span>
                      </div>
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Introduction Images - Unlimited */}
        <MultiFileUpload
          label="Ảnh giới thiệu (Không giới hạn số lượng)"
          value={introduction.introductionImages}
          onChange={(files) =>
            updateProject('introduction', 'introductionImages', files)
          }
        />

        {/* Video */}
        <div className="space-y-2">
          <Label htmlFor="introductionVideo">
            Video giới thiệu (URL YouTube hoặc file)
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
        </div>

        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              value={introduction.title}
              onChange={(e) =>
                updateProject('introduction', 'title', e.target.value)
              }
              placeholder="Nhập tiêu đề dự án"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="launchTitle">Tiêu đề ra mắt</Label>
            <Input
              id="launchTitle"
              value={introduction.launchTitle}
              onChange={(e) =>
                updateProject('introduction', 'launchTitle', e.target.value)
              }
              placeholder="Nhập tiêu đề ra mắt"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="launchSubtitle">Phụ đề ra mắt</Label>
          <Input
            id="launchSubtitle"
            value={introduction.launchSubtitle}
            onChange={(e) =>
              updateProject('introduction', 'launchSubtitle', e.target.value)
            }
            placeholder="Nhập phụ đề ra mắt"
          />
        </div>

        <div className="space-y-2">
          <Label>Mô tả dự án</Label>
          <RichTextEditor
            value={introduction.description}
            onChange={(value) =>
              updateProject('introduction', 'description', value)
            }
            placeholder="Nhập mô tả chi tiết về dự án..."
          />
        </div>

        <div className="space-y-2">
          <Label>Nội dung ra mắt</Label>
          <RichTextEditor
            value={introduction.launchText}
            onChange={(value) =>
              updateProject('introduction', 'launchText', value)
            }
            placeholder="Nhập nội dung ra mắt với các điểm nổi bật..."
          />
        </div>
      </CardContent>
    </Card>
  );
}
