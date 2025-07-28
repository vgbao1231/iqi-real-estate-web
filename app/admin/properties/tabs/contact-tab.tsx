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
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { FileUpload } from '@/components/ui/file-upload';

interface ContactTabProps {
  contact: any;
  updateProject: (section: string, field: string, value: any) => void;
}

export function ContactTab({ contact, updateProject }: ContactTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin liên hệ & Đại lý</CardTitle>
        <CardDescription>
          Cập nhật thông tin liên hệ và chi tiết đại lý
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Logo"
            value={contact.logoImage}
            onChange={(file) => updateProject('contact', 'logoImage', file)}
          />
          <FileUpload
            label="Ảnh nền"
            value={contact.backgroundImage}
            onChange={(file) =>
              updateProject('contact', 'backgroundImage', file)
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hotline">Hotline</Label>
          <Input
            id="hotline"
            value={contact.hotline}
            onChange={(e) =>
              updateProject('contact', 'hotline', e.target.value)
            }
            placeholder="Nhập số hotline"
          />
        </div>

        <Separator />

        <h3 className="text-lg font-semibold">Thông tin đại lý</h3>
        <FileUpload
          label="Ảnh đại lý"
          value={contact.agencyImage}
          onChange={(file) => updateProject('contact', 'agencyImage', file)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="agencyTitle">Tiêu đề đại lý</Label>
            <Input
              id="agencyTitle"
              value={contact.title}
              onChange={(e) =>
                updateProject('contact', 'title', e.target.value)
              }
              placeholder="Nhập tiêu đề đại lý"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agencySubtitle">Phụ đề đại lý</Label>
            <Input
              id="agencySubtitle"
              value={contact.subtitle}
              onChange={(e) =>
                updateProject('contact', 'subtitle', e.target.value)
              }
              placeholder="Nhập phụ đề đại lý"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mô tả đại lý</Label>
          <RichTextEditor
            value={contact.description}
            onChange={(value) => updateProject('contact', 'description', value)}
            placeholder="Nhập mô tả đại lý"
          />
        </div>
      </CardContent>
    </Card>
  );
}
