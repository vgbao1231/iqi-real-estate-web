'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Layout Preview Components (for main preview)
export function TraditionalLayoutPreview({
  contact,
  contactData,
  compact,
}: {
  contact: any;
  contactData: any;
  compact: any;
}) {
  const { logoImage, contactBackground } = contact;
  return (
    <div className="relative w-full min-h-96 p-6 md:p-12">
      {/* Background image full screen */}
      <Image
        src={
          contactBackground instanceof File
            ? URL.createObjectURL(contactBackground)
            : contactBackground?.url || '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="absolute inset-0 z-10 backdrop-blur-sm" />

      {/* Wrapper */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 md:px-12 md:justify-around">
        {/* Left side - Company info */}
        <div className="p-4 md:p-6 text-white flex flex-col justify-center items-center md:items-start">
          <div className="space-y-3 text-center md:text-left">
            <Image
              src={
                logoImage
                  ? logoImage instanceof File
                    ? URL.createObjectURL(logoImage)
                    : logoImage.url
                  : '/placeholder.svg'
              }
              alt="logo"
              width={120}
              height={40}
              className={cn(
                'object-contain w-28 h-14 md:w-32 md:h-16',
                !logoImage && 'shadow-md'
              )}
            />
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Phone className="h-4 w-4" />
              <span>{contactData.hotline}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <Mail className="h-4 w-4" />
              <span>{contactData.email}</span>
            </div>
            <div className="flex items-start justify-center md:justify-start space-x-3">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span className={compact ? 'text-sm' : 'text-lg'}>
                {contactData.address}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Contact form */}
        <div className="w-full md:w-1/4">
          <ContactForm position="bottom" compact={compact} />
        </div>
      </div>
    </div>
  );
}

export function ModernLayoutPreview({
  contact,
  contactData,
  compact,
}: {
  contact: any;
  contactData: any;
  compact: any;
}) {
  const { logoImage, contactBackground } = contact;

  return (
    <div className="relative mx-auto w-full min-h-96 overflow-hidden flex flex-col md:flex-row p-6 md:p-12">
      {/* Background image */}
      <Image
        src={
          contactBackground
            ? contactBackground instanceof File
              ? URL.createObjectURL(contactBackground)
              : contactBackground.url
            : '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="absolute inset-0 z-10 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row md:items-center w-full text-white gap-6 md:gap-12">
        {/* Logo */}
        <div className="flex justify-center md:justify-start">
          <Image
            src={
              logoImage
                ? logoImage instanceof File
                  ? URL.createObjectURL(logoImage)
                  : logoImage.url
                : '/placeholder.svg'
            }
            alt="logo"
            width={120}
            height={40}
            className={cn(
              'object-contain w-28 h-14 md:w-32 md:h-16',
              !logoImage && 'shadow-md'
            )}
          />
        </div>

        {/* Contact info */}
        <div className="w-full md:w-1/2 space-y-2 px-2 md:px-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>{contactData.hotline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.website}
            </span>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-full md:w-1/4">
          <ContactForm position="right" compact={compact} />
        </div>
      </div>
    </div>
  );
}

export function MinimalLayoutPreview({
  contact,
  contactData,
  compact,
}: {
  contact: any;
  contactData: any;
  compact: any;
}) {
  const { logoImage, contactBackground } = contact;

  return (
    <div className="relative w-full min-h-80 rounded-lg center-both flex-col text-white p-6 sm:p-12">
      {/* Background image full screen */}
      <Image
        src={
          contactBackground
            ? contactBackground instanceof File
              ? URL.createObjectURL(contactBackground)
              : contactBackground.url
            : '/placeholder.svg'
        }
        alt="Background"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="absolute inset-0 z-10 backdrop-blur-sm" />
      <div className="relative z-20 text-center space-y-4 sm:space-y-6 w-full max-w-xs sm:max-w-md">
        <div className="flex items-center justify-center">
          <Image
            src={
              logoImage
                ? logoImage instanceof File
                  ? URL.createObjectURL(logoImage)
                  : logoImage.url
                : '/placeholder.svg'
            }
            alt="logo"
            width={120}
            height={40}
            className={cn(
              'object-contain w-24 h-12 sm:w-32 sm:h-16',
              !logoImage && 'shadow-md'
            )}
          />
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="text-lg sm:text-xl font-bold">
            {contactData.hotline}
          </div>
          <div
            className={cn(
              compact ? 'text-xs sm:text-sm' : 'text-base sm:text-lg'
            )}
          >
            {contactData.email}
          </div>
        </div>
        <ContactForm position="center" compact={compact} />
      </div>
    </div>
  );
}

export function FullLayoutPreview({
  contact,
  contactData,
  compact,
}: {
  contact: any;
  contactData: any;
  compact: any;
}) {
  const { logoImage, contactBackground } = contact;

  const socialLinks = [
    {
      key: 'facebook',
      Icon: Facebook,
      className: 'bg-blue-600 hover:bg-blue-700',
      url: contactData.channels.find((c: any) => c.url.includes('facebook'))
        ?.url,
    },
    {
      key: 'instagram',
      Icon: Instagram,
      className: 'bg-pink-600 hover:bg-pink-700',
      url: contactData.channels.find((c: any) => c.url.includes('instagram'))
        ?.url,
    },
    {
      key: 'youtube',
      Icon: Youtube,
      className: 'bg-red-600 hover:bg-red-700',
      url: contactData.channels.find((c: any) => c.url.includes('youtube'))
        ?.url,
    },
  ];
  return (
    <div className="relative w-full p-4 md:p-8 lg:p-12">
      <Image
        src={
          contactBackground
            ? contactBackground instanceof File
              ? URL.createObjectURL(contactBackground)
              : contactBackground.url
            : '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="absolute inset-0 z-10 backdrop-blur-sm" />

      {/* Content */}
      {/* 2. Thay đổi hướng flex và thêm gap */}
      <div className="relative z-20 center-both h-full flex-col gap-12 md:flex-row">
        {/* Contact info */}
        {/* 3. Bỏ col-span và thêm width cho responsive */}
        <div className="flex w-full flex-col gap-2 text-white md:w-1/2">
          {/* Header */}
          <Image
            src={
              logoImage
                ? logoImage instanceof File
                  ? URL.createObjectURL(logoImage)
                  : logoImage.url
                : '/placeholder.svg'
            }
            alt="logo"
            width={120}
            height={40}
            className={cn(
              'object-contain w-32 h-16',
              !logoImage && 'shadow-md'
            )}
          />
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" /> {/* Icon to hơn một chút */}
            <span className={compact ? 'text-sm' : 'text-base md:text-lg'}>
              {contactData.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className={compact ? 'text-sm' : 'text-base md:text-lg'}>
              {contactData.website}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />{' '}
            {/* Căn icon tốt hơn */}
            <span className={compact ? 'text-sm' : 'text-base md:text-lg'}>
              {contactData.address}
            </span>
          </div>
          <div className="mt-2 flex items-center space-x-2">
            {socialLinks
              .filter((link) => link.url)
              .map(({ key, url, Icon, className }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className={`flex h-8 w-8 items-center justify-center rounded text-white hover:scale-105 ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
          </div>
          <div className="mt-auto pt-4 font-semibold opacity-90">
            Hotline 24/7: {contactData.hotline}
          </div>
        </div>

        {/* Contact form */}
        {/* 3. Bỏ col-span và thêm width cho responsive */}
        <div className="w-full md:w-2/5 lg:w-1/3">
          <ContactForm position="right" compact={compact} />
        </div>
      </div>
    </div>
  );
}

// Contact Form Component
function ContactForm({
  position = 'right',
  compact = false,
}: {
  position?: string;
  compact?: boolean;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const formClasses = compact
    ? 'space-y-3'
    : position === 'bottom'
      ? 'space-y-4 max-w-2xl mx-auto'
      : 'space-y-4';

  return (
    <div
      className={`bg-background/95 backdrop-blur-sm rounded-lg p-4 ${compact ? 'border border-white/20' : 'shadow-lg'}`}
    >
      <div className="mb-4">
        <h3
          className={`font-bold text-foreground ${compact ? 'text-sm' : 'text-lg'}`}
        >
          Đăng ký tư vấn
        </h3>
        <p
          className={`text-muted-foreground ${compact ? 'text-sm' : 'text-base'}`}
        >
          Nhận thông tin chi tiết về dự án
        </p>
      </div>

      <form onSubmit={handleSubmit} className={formClasses}>
        <div>
          <Input
            placeholder="Họ và tên *"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className={`border-border ${compact ? 'h-8 text-sm' : 'h-10'}`}
            required
          />
        </div>

        <div
          className={
            compact
              ? 'grid grid-cols-2 gap-2'
              : 'grid grid-cols-1 md:grid-cols-2 gap-4'
          }
        >
          <Input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className={`border-border ${compact ? 'h-8 text-sm' : 'h-10'}`}
            required
          />
          <Input
            type="tel"
            placeholder="Số điện thoại *"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            className={`border-border ${compact ? 'h-8 text-sm' : 'h-10'}`}
            required
          />
        </div>

        <div>
          <Textarea
            placeholder="Nội dung cần tư vấn..."
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            className={`border-border resize-none ${compact ? 'h-16 text-sm' : 'h-20'}`}
            rows={compact ? 2 : 3}
          />
        </div>

        <Button
          type="submit"
          className={`w-full bg-orange-500 hover:bg-orange-600 text-white ${compact ? 'h-8 text-sm' : 'h-10'}`}
        >
          Gửi thông tin
        </Button>
      </form>
    </div>
  );
}

export function LayoutPreview({
  layoutId,
  contact,
  contactData,
  compact,
}: {
  layoutId: string;
  contact: any;
  contactData: any;
  compact?: any;
}) {
  switch (layoutId) {
    case 'layout-1':
      return (
        <TraditionalLayoutPreview
          contact={contact}
          contactData={contactData}
          compact={compact}
        />
      );
    case 'layout-2':
      return (
        <ModernLayoutPreview
          contact={contact}
          contactData={contactData}
          compact={compact}
        />
      );
    case 'layout-3':
      return (
        <MinimalLayoutPreview
          contact={contact}
          contactData={contactData}
          compact={compact}
        />
      );
    case 'layout-4':
      return (
        <FullLayoutPreview
          contact={contact}
          contactData={contactData}
          compact={compact}
        />
      );
    default:
      return (
        <TraditionalLayoutPreview
          contact={contact}
          contactData={contactData}
          compact={compact}
        />
      );
  }
}
