'use client';

import type React from 'react';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Camera, Save, Eye, EyeOff, Loader2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface PasswordValidation {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
}

export default function ProfileSettings() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    '/placeholder.svg?height=80&width=80'
  );

  const [formData, setFormData] = useState<FormData>({
    name: 'Nguyễn Văn A',
    email: 'admin@batdongsan.vn',
    phone: '0123456789',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      minLength: false,
      hasUppercase: false,
      hasLowercase: false,
      hasNumber: false,
    });

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validatePasswordRequirements = (
    password: string
  ): PasswordValidation => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
    };
  };

  const isPasswordValid = (validation: PasswordValidation): boolean => {
    return (
      validation.minLength &&
      validation.hasUppercase &&
      validation.hasLowercase &&
      validation.hasNumber
    );
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự';
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate phone
    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại không được để trống';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    // Validate password change (only if user is trying to change password)
    if (
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
      }

      if (!formData.newPassword) {
        newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
      } else if (!isPasswordValid(passwordValidation)) {
        newErrors.newPassword = 'Mật khẩu chưa đáp ứng đủ yêu cầu';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time password validation
    if (field === 'newPassword') {
      const validation = validatePasswordRequirements(value);
      setPasswordValidation(validation);
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn file ảnh (JPG, PNG, GIF)',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Lỗi',
        description: 'Kích thước file không được vượt quá 2MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);

      // Simulate upload API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setAvatarUrl(previewUrl);

      toast({
        title: 'Thành công',
        description: 'Cập nhật ảnh đại diện thành công',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật ảnh đại diện',
        variant: 'destructive',
      });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng kiểm tra lại thông tin',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Clear password fields after successful save
      setFormData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      // Reset password validation
      setPasswordValidation({
        minLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
      });

      toast({
        title: 'Thành công',
        description: 'Cập nhật thông tin thành công',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể cập nhật thông tin',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Cài đặt tài khoản</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin cá nhân và cài đặt tài khoản của bạn
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>
              Cập nhật thông tin cá nhân của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={avatarUrl || '/placeholder.svg'}
                  alt="Avatar"
                />
                <AvatarFallback className="text-lg">
                  {formData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button
                  onClick={handleAvatarChange}
                  variant="outline"
                  disabled={isUploadingAvatar}
                  className="flex items-center gap-2"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                  {isUploadingAvatar ? 'Đang tải lên...' : 'Thay đổi ảnh'}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG tối đa 2MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Form Fields */}
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input
                  id="name"
                  placeholder="Nhập họ và tên"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  placeholder="0123456789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card>
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
            <CardDescription>
              Để trống nếu không muốn thay đổi mật khẩu
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu hiện tại"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    handleInputChange('currentPassword', e.target.value)
                  }
                  className={errors.currentPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500">{errors.currentPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu mới"
                  value={formData.newPassword}
                  onChange={(e) =>
                    handleInputChange('newPassword', e.target.value)
                  }
                  className={errors.newPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-sm text-red-500">{errors.newPassword}</p>
              )}

              {/* Password Requirements - Show only when user starts typing */}
              {formData.newPassword && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Yêu cầu mật khẩu:
                  </p>
                  <PasswordRequirement
                    text="Ít nhất 8 ký tự"
                    isValid={passwordValidation.minLength}
                  />
                  <PasswordRequirement
                    text="Có ít nhất 1 chữ hoa (A-Z)"
                    isValid={passwordValidation.hasUppercase}
                  />
                  <PasswordRequirement
                    text="Có ít nhất 1 chữ thường (a-z)"
                    isValid={passwordValidation.hasLowercase}
                  />
                  <PasswordRequirement
                    text="Có ít nhất 1 số (0-9)"
                    isValid={passwordValidation.hasNumber}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu mới"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
              )}

              {/* Password Match Indicator */}
              {formData.confirmPassword && formData.newPassword && (
                <div className="mt-2">
                  <PasswordRequirement
                    text="Mật khẩu xác nhận khớp"
                    isValid={formData.newPassword === formData.confirmPassword}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function PasswordRequirement({
  text,
  isValid,
}: {
  text: string;
  isValid: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-sm',
        isValid ? 'text-green-600' : 'text-red-500'
      )}
    >
      {isValid ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
      <span>{text}</span>
    </div>
  );
}
