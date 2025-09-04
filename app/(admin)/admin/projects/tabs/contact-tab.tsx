'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { FileUpload } from '@/components/ui/file-upload';
import { Separator } from '@/components/ui/separator';
import { Layout, Phone, Mail, MapPin, Globe, Check } from 'lucide-react';
import { contact as contactData } from '@/lib/contact-data';
import { LayoutPreview } from '@/components/common/contact-layout';

interface ContactTabProps {
  contact: any;
  updateProject: (section: string, field: string, value: any) => void;
}

// Mock contact data from contact management
const mockContactData = contactData;

// Layout configurations
const layoutConfigs = [
  {
    id: 'layout-1',
    name: 'Truyền thống',
    description: 'Logo trên, thông tin dưới, form bên phải',
    formPosition: 'right',
  },
  {
    id: 'layout-2',
    name: 'Hiện đại',
    description: 'Logo trái, thông tin giữa, form phải',
    formPosition: 'right',
  },
  {
    id: 'layout-3',
    name: 'Tối giản',
    description: 'Thông tin cốt lõi, form ở giữa',
    formPosition: 'center',
  },
  {
    id: 'layout-4',
    name: 'Đầy đủ',
    description: 'Tất cả thông tin, form cuối trang',
    formPosition: 'bottom',
  },
];

// Simplified Layout Demo Components for Dialog
function TraditionalLayoutDemo() {
  return (
    <div className="w-full h-32 bg-gray-100 border rounded-lg flex text-gray-600 text-xs">
      {/* Left side - Company info */}
      <div className="w-2/3 p-3 flex flex-col justify-center">
        <div className="w-16 h-3 bg-gray-300 rounded mb-2"></div>
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Phone className="h-2 w-2" />
            <div className="w-20 h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <Mail className="h-2 w-2" />
            <div className="w-24 h-2 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-2 w-2" />
            <div className="w-28 h-2 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Right side - Form placeholder */}
      <div className="w-1/3 p-2 flex items-center">
        <div className="w-full bg-white border rounded p-2 space-y-1">
          <div className="text-xs font-medium text-gray-700">Form tư vấn</div>
          <div className="w-full h-1.5 bg-gray-200 rounded"></div>
          <div className="w-full h-1.5 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-blue-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function ModernLayoutDemo() {
  return (
    <div className="w-full h-32 bg-gray-100 border rounded-lg center-both p-3 text-gray-600 text-xs">
      {/* Logo */}
      <div className="w-1/4">
        <div className="w-12 h-3 bg-gray-300 rounded"></div>
      </div>

      {/* Contact info */}
      <div className="w-1/2 space-y-1 px-2">
        <div className="flex items-center space-x-1">
          <Phone className="h-2 w-2" />
          <div className="w-16 h-2 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <Mail className="h-2 w-2" />
          <div className="w-20 h-2 bg-gray-300 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <Globe className="h-2 w-2" />
          <div className="w-18 h-2 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Form */}
      <div className="w-1/4">
        <div className="w-full bg-white border rounded p-2 space-y-1">
          <div className="text-xs font-medium text-gray-700">Form</div>
          <div className="w-full h-1.5 bg-gray-200 rounded"></div>
          <div className="w-full h-1.5 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-blue-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function MinimalLayoutDemo() {
  return (
    <div className="w-full h-32 bg-gray-100 border rounded-lg flex flex-col items-center justify-center text-gray-600 text-xs p-3">
      <div className="text-center space-y-2 w-full max-w-24">
        <div className="w-16 h-3 bg-gray-300 rounded mx-auto"></div>
        <div className="space-y-1">
          <div className="w-20 h-2 bg-gray-300 rounded mx-auto"></div>
          <div className="w-24 h-2 bg-gray-300 rounded mx-auto"></div>
        </div>
        <div className="w-full bg-white border rounded p-2 space-y-1">
          <div className="text-xs font-medium text-gray-700 text-center">
            Form tư vấn
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded"></div>
          <div className="w-full h-3 bg-blue-500 rounded"></div>
        </div>
      </div>
    </div>
  );
}

function FullLayoutDemo() {
  return (
    <div className="w-full h-32 bg-gray-100 border rounded-lg p-2 text-gray-600 text-xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="w-12 h-2.5 bg-gray-300 rounded"></div>
        <div className="text-right">
          <div className="w-16 h-2 bg-gray-300 rounded mb-0.5"></div>
          <div className="w-12 h-1.5 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-2 h-20">
        {/* Contact info */}
        <div className="col-span-2 space-y-1">
          <div className="flex items-center space-x-1">
            <Mail className="h-1.5 w-1.5" />
            <div className="w-16 h-1.5 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <Globe className="h-1.5 w-1.5" />
            <div className="w-20 h-1.5 bg-gray-300 rounded"></div>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="h-1.5 w-1.5" />
            <div className="w-24 h-1.5 bg-gray-300 rounded"></div>
          </div>
          <div className="flex space-x-0.5 mt-1">
            <div className="w-2 h-2 bg-gray-400 rounded"></div>
            <div className="w-2 h-2 bg-gray-400 rounded"></div>
            <div className="w-2 h-2 bg-gray-400 rounded"></div>
          </div>
        </div>

        {/* Form */}
        <div className="col-span-1">
          <div className="w-full bg-white border rounded p-1.5 space-y-1">
            <div className="text-xs font-medium text-gray-700">Form</div>
            <div className="w-full h-1 bg-gray-200 rounded"></div>
            <div className="w-full h-1 bg-gray-200 rounded"></div>
            <div className="w-full h-2 bg-blue-500 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LayoutDemo({ layoutId }: { layoutId: string }) {
  switch (layoutId) {
    case 'layout-1':
      return <TraditionalLayoutDemo />;
    case 'layout-2':
      return <ModernLayoutDemo />;
    case 'layout-3':
      return <MinimalLayoutDemo />;
    case 'layout-4':
      return <FullLayoutDemo />;
    default:
      return <TraditionalLayoutDemo />;
  }
}

export function ContactTab({ contact, updateProject }: ContactTabProps) {
  const [isLayoutDialogOpen, setIsLayoutDialogOpen] = useState(false);
  const currentLayout = contact.layoutId || 'layout-1';
  const selectedLayoutConfig =
    layoutConfigs.find((layout) => layout.id === currentLayout) ||
    layoutConfigs[0];

  const handleLayoutSelect = (layoutId: string) => {
    updateProject('contact', 'layoutId', layoutId);
    setIsLayoutDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin liên hệ & Bố cục</CardTitle>
        <CardDescription>
          Cấu hình hiển thị thông tin liên hệ và form đăng ký tư vấn cho dự án
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Live Preview */}
        <div className="bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-medium text-gray-700">
              Xem trước bố cục hiện tại:
            </Label>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Layout className="h-3 w-3" />
              <span>{selectedLayoutConfig.name}</span>
            </Badge>
          </div>
          <LayoutPreview
            layoutId={currentLayout}
            contact={contact}
            contactData={mockContactData}
            compact
          />
        </div>

        <Separator />

        {/* Layout Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-semibold">Bố cục hiển thị</Label>
              <p className="text-sm text-gray-600 mt-1">
                {selectedLayoutConfig.description}
              </p>
            </div>
            <Dialog
              open={isLayoutDialogOpen}
              onOpenChange={setIsLayoutDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Layout className="h-4 w-4" />
                  <span>Chọn bố cục</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Layout className="h-5 w-5" />
                    <span>Chọn bố cục hiển thị</span>
                  </DialogTitle>
                  <DialogDescription>Nhấn vào bố cục để chọn</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  {layoutConfigs.map((layout) => (
                    <div
                      key={layout.id}
                      className={`relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden border-2 ${
                        currentLayout === layout.id
                          ? 'border-blue-500 shadow-lg'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => handleLayoutSelect(layout.id)}
                    >
                      {/* Demo Preview */}
                      <div className="p-3">
                        <LayoutDemo layoutId={layout.id} />
                        {currentLayout === layout.id && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-500 text-white flex items-center space-x-1">
                              <Check className="h-3 w-3" />
                              <span>Đang chọn</span>
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="p-3 bg-gray-50 border-t">
                        <h4 className="font-medium text-sm">{layout.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {layout.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Separator />

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUpload
            label="Logo công ty"
            value={contact.logoImage}
            onChange={(file) => updateProject('contact', 'logoImage', file)}
          />
          <FileUpload
            label="Ảnh nền"
            value={contact.contactBackground}
            onChange={(file) =>
              updateProject('contact', 'contactBackground', file)
            }
          />
        </div>

        {/* Contact Data Source Info */}
        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900">
                Nguồn dữ liệu liên hệ
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Thông tin liên hệ được lấy từ trang{' '}
                <strong>Quản lý liên hệ</strong>. Để thay đổi thông tin như
                hotline, email, địa chỉ, vui lòng cập nhật tại trang quản lý
                liên hệ.
              </p>
              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
                <div>
                  <strong>Hotline:</strong> {mockContactData.hotline}
                </div>
                <div>
                  <strong>Email:</strong> {mockContactData.email}
                </div>
                <div>
                  <strong>Website:</strong> {mockContactData.website}
                </div>
                <div>
                  <strong>Địa chỉ:</strong> {mockContactData.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
