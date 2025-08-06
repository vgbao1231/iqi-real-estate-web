'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Save,
  Phone,
} from 'lucide-react';

interface SocialMedia {
  facebook: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  twitter: string;
  tiktok: string;
}

interface ContactInfo {
  mainHotline: string;
  mainEmail: string;
  website: string;
  mainAddress: string;
  workingHours: string;
  socialMedia: SocialMedia;
}

const defaultContactInfo: ContactInfo = {
  mainHotline: '1900 636 999',
  mainEmail: 'info@dongtayland.com',
  website: 'https://dongtayland.com',
  mainAddress: '123 Nguyễn Huệ, Quận 1, TP.HCM',
  workingHours: 'Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 17:00',
  socialMedia: {
    facebook: 'https://facebook.com/dongtayland',
    instagram: 'https://instagram.com/dongtayland',
    youtube: 'https://youtube.com/@dongtayland',
    linkedin: 'https://linkedin.com/company/dongtayland',
    twitter: 'https://twitter.com/dongtayland',
    tiktok: 'https://tiktok.com/@dongtayland',
  },
};

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  tiktok: Globe, // Using Globe as TikTok icon placeholder
};

export default function ContactManagement() {
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(defaultContactInfo);

  const updateContactInfo = (field: keyof ContactInfo, value: any) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const updateSocialMedia = (platform: keyof SocialMedia, value: string) => {
    setContactInfo((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Phone className="h-8 w-8 text-orange-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Quản lý thông tin liên hệ
              </h1>
              <p className="text-gray-600">
                Cập nhật thông tin liên hệ của công ty
              </p>
            </div>
          </div>
          <Button className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Lưu thay đổi</span>
          </Button>
        </div>
      </div>

      <div className="container mx-auto w-full px-4 py-6">
        <div className="flex justify-center gap-8">
          {/* Basic Information */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
              <CardDescription>
                Thông tin liên hệ chính của công ty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mainHotline">Hotline chính</Label>
                  <Input
                    id="mainHotline"
                    value={contactInfo.mainHotline}
                    onChange={(e) =>
                      updateContactInfo('mainHotline', e.target.value)
                    }
                    placeholder="1900 636 999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mainEmail">Email chính</Label>
                  <Input
                    id="mainEmail"
                    type="email"
                    value={contactInfo.mainEmail}
                    onChange={(e) =>
                      updateContactInfo('mainEmail', e.target.value)
                    }
                    placeholder="info@company.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={contactInfo.website}
                  onChange={(e) => updateContactInfo('website', e.target.value)}
                  placeholder="https://company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mainAddress">Địa chỉ văn phòng chính</Label>
                <Input
                  id="mainAddress"
                  value={contactInfo.mainAddress}
                  onChange={(e) =>
                    updateContactInfo('mainAddress', e.target.value)
                  }
                  placeholder="123 Nguyễn Huệ, Quận 1, TP.HCM"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workingHours">Giờ làm việc</Label>
                <Input
                  id="workingHours"
                  value={contactInfo.workingHours}
                  onChange={(e) =>
                    updateContactInfo('workingHours', e.target.value)
                  }
                  placeholder="Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 17:00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Mạng xã hội</CardTitle>
              <CardDescription>
                Links đến các trang mạng xã hội của công ty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(contactInfo.socialMedia).map(
                ([platform, url]) => {
                  const Icon =
                    socialIcons[platform as keyof typeof socialIcons];
                  return (
                    <div key={platform} className="space-y-2">
                      <Label className="flex items-center capitalize">
                        <Icon className="h-4 w-4 mr-2" />
                        {platform}
                      </Label>
                      <Input
                        value={url}
                        onChange={(e) =>
                          updateSocialMedia(
                            platform as keyof SocialMedia,
                            e.target.value
                          )
                        }
                        placeholder={`https://${platform}.com/company`}
                      />
                    </div>
                  );
                }
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
