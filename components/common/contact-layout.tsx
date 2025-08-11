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
    <div className="relative w-full min-h-96 p-12">
      {/* Background image full screen */}
      <Image
        src={
          contactBackground instanceof File || contactBackground instanceof Blob
            ? URL.createObjectURL(contactBackground)
            : contactBackground || '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="relative z-20 flex items-center justify-center gap-8 px-4 md:px-12 md:justify-around">
        {/* Left side - Company info */}
        <div className="p-6 text-white flex flex-col justify-center">
          <div className="space-y-3">
            <Image
              src={
                logoImage
                  ? typeof logoImage === 'string'
                    ? logoImage
                    : URL.createObjectURL(logoImage)
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
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4" />
              <span>{contactData.hotline}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4" />
              <span>{contactData.email}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-4 w-4 mt-0.5" />
              <span className={compact ? 'text-sm' : 'text-lg'}>
                {contactData.address}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Contact form */}
        <div className="p-4 flex items-center">
          <ContactForm position="right" compact={compact} />
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
    <div className="relative mx-auto w-full min-h-96 rounded-lg overflow-hidden flex p-12">
      {/* Background image full screen */}
      <Image
        src={
          contactBackground
            ? typeof contactBackground === 'string'
              ? contactBackground
              : URL.createObjectURL(contactBackground)
            : '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="relative z-20 center-both w-full text-white">
        {/* Logo */}
        <Image
          src={
            logoImage
              ? typeof logoImage === 'string'
                ? logoImage
                : URL.createObjectURL(logoImage)
              : '/placeholder.svg'
          }
          alt="logo"
          width={120}
          height={40}
          className={cn('object-contain w-32 h-16', !logoImage && 'shadow-md')}
        />

        {/* Contact info */}
        <div className="w-1/2 space-y-2 px-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>{contactData.hotline}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-3 w-3" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.website}
            </span>
          </div>
        </div>

        {/* Contact form */}
        <div className="w-1/4">
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
    <div className="relative w-full min-h-80 rounded-lg center-both flex-col text-white p-12">
      {/* Background image full screen */}
      <Image
        src={
          contactBackground
            ? typeof contactBackground === 'string'
              ? contactBackground
              : URL.createObjectURL(contactBackground)
            : '/placeholder.svg'
        }
        alt="Background"
        fill
        className="object-cover object-left"
        priority
      />
      <div className="relactive z-20 text-center space-y-6 w-full max-w-md">
        <div className="center-both">
          <Image
            src={
              logoImage
                ? typeof logoImage === 'string'
                  ? logoImage
                  : URL.createObjectURL(logoImage)
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
        </div>
        <div className="space-y-3">
          <div className="text-xl font-bold">{contactData.hotline}</div>
          <div className={compact ? 'text-sm' : 'text-lg'}>
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
    <div className="relative w-full rounded-lg p-12">
      <Image
        src={
          contactBackground
            ? typeof contactBackground === 'string'
              ? contactBackground
              : URL.createObjectURL(contactBackground)
            : '/placeholder.svg'
        }
        alt="Logo"
        fill
        className="object-cover object-left"
        priority
      />
      {/* Content */}
      <div className="relative z-20 h-full flex-1 flex justify-center gap-8 px-4 md:px-12 md:justify-around text-white">
        {/* Contact info */}
        <div className="col-span-2 flex flex-col gap-2">
          {/* Header */}
          <Image
            src={
              logoImage
                ? typeof logoImage === 'string'
                  ? logoImage
                  : URL.createObjectURL(logoImage)
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
            <Mail className="h-3 w-3" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.email}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-3 w-3" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.website}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-3 w-3 mt-0.5" />
            <span className={compact ? 'text-sm' : 'text-lg'}>
              {contactData.address}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            {socialLinks
              .filter((link) => link.url) // Chỉ giữ lại những link có URL hợp lệ
              .map(({ key, url, Icon, className }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className={`w-6 h-6 hover:scale-105 rounded flex items-center justify-center text-white ${className}`}
                  >
                    <Icon className="w-3 h-3" />
                  </Button>
                </a>
              ))}
          </div>
          <div className="font-semibold opacity-90 mt-auto">
            Hotline 24/7: {contactData.hotline}
          </div>
        </div>

        {/* Contact form */}
        <div className="col-span-1">
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
