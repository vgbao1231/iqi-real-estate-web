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
  Plus,
  Trash2,
} from 'lucide-react';
import {
  useGetContactQuery,
  useUpdateContactMutation,
} from '@/features/contact/contactApi';
import { useEffect, useState } from 'react';

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

const defaultContactInfo = {
  mainHotline: '0764155155',
  mainEmail: 'info-vietnam@iqiglobal.com',
  website: 'https://iqiglobal.com',
  mainAddress: '67-69 Đ. Võ Nguyên Giáp, Thảo Điền, Thủ Đức, Hồ Chí Minh',
  workingHours: 'Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 17:00',
  socialMedia: [
    {
      id: '1',
      platform: 'Facebook',
      url: 'https://www.facebook.com/IQIVietnam',
    },
    {
      id: '2',
      platform: 'Instagram',
      url: 'https://www.instagram.com/iqivietnam',
    },
    {
      id: '3',
      platform: 'Youtube',
      url: 'https://www.linkedin.com/company/iqivietnam',
    },
    {
      id: '4',
      platform: 'LinkedIn',
      url: 'https://www.youtube.com/IQIVIETNAM',
    },
    { id: '5', platform: 'TikTok', url: 'https://www.tiktok.com/@iqivietnam' },
  ],
};

interface SocialMediaEntry {
  id: string;
  platform: string;
  url: string;
}

const getIconForPlatform = (platform: string) => {
  const lowerPlatform = platform.toLowerCase();
  if (lowerPlatform.includes('facebook')) return Facebook;
  if (lowerPlatform.includes('instagram')) return Instagram;
  if (lowerPlatform.includes('youtube')) return Youtube;
  if (lowerPlatform.includes('linkedin')) return Linkedin;
  if (lowerPlatform.includes('twitter') || lowerPlatform.includes('x'))
    return Twitter;
  return Globe;
};

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState<any>(defaultContactInfo);
  const { data } = useGetContactQuery();
  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  useEffect(() => {
    if (data) {
      setContactInfo(data);
    }
  }, [data]);

  const updateContactInfo = (field: keyof ContactInfo, value: any) => {
    setContactInfo((prev: any) => ({ ...prev, [field]: value }));
  };

  const addSocialMedia = () => {
    const newEntry: SocialMediaEntry = {
      id: Date.now().toString(),
      platform: '',
      url: '',
    };
    setContactInfo((prev: any) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, newEntry],
    }));
  };

  const updateSocialMedia = (
    id: string,
    field: 'platform' | 'url',
    value: string
  ) => {
    setContactInfo((prev: any) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((entry: any) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      ),
    }));
  };

  const deleteSocialMedia = (id: string) => {
    setContactInfo((prev: any) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((entry: any) => entry.id !== id),
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateContact(contactInfo).unwrap();
    } catch (error) {
      console.error('Lỗi khi lưu thông tin liên hệ:', error);
    }
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
          <Button
            disabled={isUpdating}
            className="flex items-center space-x-2"
            onClick={handleSubmit}
          >
            <Save className="h-4 w-4" />
            <span>{isUpdating ? 'Đang lưu' : 'Lưu thay đổi'}</span>
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
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Mạng xã hội</CardTitle>
                  <CardDescription>
                    Links đến các trang mạng xã hội của công ty
                  </CardDescription>
                </div>
                <Button
                  onClick={addSocialMedia}
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Thêm
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactInfo.socialMedia.map((entry: any) => {
                const Icon = getIconForPlatform(entry.platform);
                return (
                  <div
                    key={entry.id}
                    className="flex items-center gap-2 p-2 border rounded-lg"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />

                    <Input
                      value={entry.platform}
                      onChange={(e) =>
                        updateSocialMedia(entry.id, 'platform', e.target.value)
                      }
                      placeholder="Nền tảng"
                      className="w-32 h-9"
                    />

                    <Input
                      value={entry.url}
                      onChange={(e) =>
                        updateSocialMedia(entry.id, 'url', e.target.value)
                      }
                      placeholder="https://..."
                      className="flex-1 h-9"
                    />

                    <Button
                      onClick={() => deleteSocialMedia(entry.id)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              {contactInfo.socialMedia.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {`Chưa có mạng xã hội nào. Nhấn "Thêm" để thêm mới.`}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
