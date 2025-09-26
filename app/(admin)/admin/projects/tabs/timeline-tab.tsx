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
import { Save } from 'lucide-react';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';
import { MultiFileUpload } from '@/components/ui/multi-file-upload';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useUpdateProjectTabMutation } from '@/features/project/projectApi';
import { useUploadImageMutation } from '@/features/upload/uploadApi';
import { memo } from 'react';

// Preview component for timeline
const TimelinePreview = memo(function TimelinePreview({ timeline }: any) {
  const {
    backgroundImage,
    timelineTitle,
    timelineImage,
    progressTitle,
    progressImages,
  } = timeline;

  const getRandomWidth = () => {
    const desktopWidthClasses = [
      'sm:w-[20%]',
      'sm:w-[25%]',
      'sm:w-[30%]',
      'sm:w-[35%]',
      'sm:w-[40%]',
    ];
    const randomIndex = Math.floor(Math.random() * desktopWidthClasses.length);
    return desktopWidthClasses[randomIndex];
  };

  return (
    <>
      <div className="relative min-h-[60vh] center-both py-12">
        {/* Background image full screen */}
        <Image
          src={
            backgroundImage
              ? backgroundImage instanceof File
                ? URL.createObjectURL(backgroundImage)
                : backgroundImage.url
              : '/placeholder.svg'
          }
          alt="Eco Retreat Timeline Background"
          fill
          className="object-cover object-left"
          priority
        />

        <div className="relative z-20 p-6 space-y-8 center-both flex-col">
          <div
            className="text-5xl text-center"
            dangerouslySetInnerHTML={{ __html: timelineTitle }}
          />
          <div className="relative h-[40vh] min-w-[60vw]">
            <Image
              src={
                timelineImage
                  ? timelineImage instanceof File
                    ? URL.createObjectURL(timelineImage)
                    : timelineImage.url
                  : '/placeholder.svg'
              }
              alt="Eco Retreat Timeline Background"
              fill
              className={cn('object-contain', !timelineImage && 'shadow-md')}
              priority
            />
          </div>
        </div>
      </div>
      <div className="relative min-h-[60vh] py-12">
        {/* Background image full screen */}
        <Image
          src={
            backgroundImage
              ? backgroundImage instanceof File
                ? URL.createObjectURL(backgroundImage)
                : backgroundImage.url
              : '/placeholder.svg'
          }
          alt="Eco Retreat Timeline Background"
          fill
          className="object-cover object-left"
          priority
        />
        <div className="relative z-20 p-6 max-w-7xl w-full mx-auto">
          <h3 className="text-4xl text-lime-500 mb-8">{progressTitle}</h3>
          {/* Container chính sử dụng Flexbox */}
          <div className="flex flex-wrap justify-center gap-4">
            {progressImages.map((image: any, index: any) => {
              // Lấy một class width ngẫu nhiên cho mỗi ảnh
              const randomWidthClass = getRandomWidth();

              return (
                // Container cho mỗi ảnh, chịu trách nhiệm về chiều rộng và aspect ratio
                <div
                  key={index}
                  className={cn(
                    'relative w-full flex-grow sm:max-w-[500px] sm:min-w-[300px]',
                    randomWidthClass
                  )}
                >
                  <div className="w-full h-64 relative">
                    <Image
                      src={
                        image
                          ? image instanceof File
                            ? URL.createObjectURL(image)
                            : image.url
                          : '/placeholder.svg'
                      }
                      alt={`Gallery image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
});

interface TimelineTabProps {
  timeline: any;
  updateProject: (section: string, field: string, value: any) => void;
  handleSave: (updateApi: any, uploadApi: any, tab: string, data: any) => void;
}

export function TimelineTab({
  timeline,
  updateProject,
  handleSave,
}: TimelineTabProps) {
  const [updateProjectTab, { isLoading }] = useUpdateProjectTabMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  return (
    <div className="space-y-6">
      {/* Timeline Section */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Cập nhật thông tin timeline dự án</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Preview */}
          <TimelinePreview timeline={timeline} />

          <Separator className="my-4" />

          <div className="space-y-6">
            <div className="space-y-4">
              <FileUpload
                label="Ảnh nền"
                value={timeline.backgroundImage}
                onChange={(file) =>
                  updateProject('timeline', 'backgroundImage', file)
                }
              />
              <div className="space-y-2">
                <Label>Tiêu đề timeline</Label>
                <RichTextEditor
                  value={timeline.timelineTitle}
                  onChange={(value) =>
                    updateProject('timeline', 'timelineTitle', value)
                  }
                  placeholder="Nhập tiêu đề timeline"
                />
              </div>
              <FileUpload
                label="Ảnh timeline"
                value={timeline.timelineImage}
                onChange={(file) =>
                  updateProject('timeline', 'timelineImage', file)
                }
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="progressTitle">Tiêu đề tiến độ</Label>
                <Input
                  id="progressTitle"
                  value={timeline.progressTitle}
                  onChange={(e) =>
                    updateProject('timeline', 'progressTitle', e.target.value)
                  }
                  placeholder="Nhập tiêu đề tiến độ"
                />
              </div>

              <MultiFileUpload
                label="Ảnh tiến độ"
                value={timeline.progressImages}
                onChange={(files) =>
                  updateProject('timeline', 'progressImages', files)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button - Fixed at bottom */}
      <div className="flex justify-end pt-6 border-t">
        <Button
          onClick={() =>
            handleSave(updateProjectTab, uploadImage, 'timeline', timeline)
          }
          disabled={isLoading || isUploading}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>
            {isLoading || isUploading ? 'Đang lưu...' : 'Lưu thông tin khác'}
          </span>
        </Button>
      </div>
    </div>
  );
}
