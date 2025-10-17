import { SlideIn } from '@/components/common/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { contact } from '@/lib/contact-data';
import { motion } from 'framer-motion';
import {
  Mail,
  Globe,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const socialLinks = [
  {
    key: 'facebook',
    Icon: Facebook,
    className: 'bg-blue-600 hover:bg-blue-700',
    url: contact.channels.find((c: any) => c.url.includes('facebook'))?.url,
  },
  {
    key: 'instagram',
    Icon: Instagram,
    className: 'bg-pink-600 hover:bg-pink-700',
    url: contact.channels.find((c: any) => c.url.includes('instagram'))?.url,
  },
  {
    key: 'youtube',
    Icon: Youtube,
    className: 'bg-red-600 hover:bg-red-700',
    url: contact.channels.find((c: any) => c.url.includes('youtube'))?.url,
  },
];

export default function Contact() {
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
  return (
    <section className="py-8 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ scale: [1, 1.3, 1] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute -top-16 right-1/3 w-56 h-56 bg-white/20 dark:bg-white/10 rounded-full blur-md"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: 'linear',
        }}
        className="absolute -bottom-16 left-10 w-48 h-48 bg-white/20 dark:bg-white/10 rounded-full blur-md"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf4e6]/60 to-orange-300 dark:from-gray-800/40 dark:via-gray-850/60 dark:to-gray-900/40"></div>
      <SlideIn direction="right" className="absolute inset-0 z-10">
        <Image
          src="https://iqiglobal-web-revamp.s3.ap-southeast-1.amazonaws.com/laravel/img/home/house-with-vector-background.webp"
          alt="Nền bất động sản"
          fill
          className="object-contain object-right-bottom top-5 pt-24"
          priority
        />
      </SlideIn>

      <div className="relative z-20 center-both h-full container mx-auto p-6">
        {/* Left */}
        <div className="flex w-full flex-col gap-2 md:w-1/2">
          <Image
            src="/logo-detail-light.png"
            alt="logo"
            width={120}
            height={40}
            className="object-contain hidden dark:block w-32 h-16"
          />

          {/* Logo for light mode */}
          <Image
            src="/logo-detail-dark.png"
            alt="logo"
            width={120}
            height={40}
            className="object-contain dark:hidden w-32 h-16"
          />
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4" /> {/* Icon to hơn một chút */}
            <span className="text-base md:text-lg">{contact.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="text-base md:text-lg">{contact.website}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="mt-1 h-4 w-4 flex-shrink-0" />{' '}
            {/* Căn icon tốt hơn */}
            <span className="text-base md:text-lg">{contact.address}</span>
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
                    className={`flex h-8 w-8 items-center justify-center rounded hover:scale-105 ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                </a>
              ))}
          </div>
          <div className="mt-auto pt-4 font-semibold opacity-90">
            Hotline 24/7: {contact.hotline}
          </div>
        </div>

        {/* Right */}
        <div
          className={`bg-card backdrop-blur-sm rounded-lg p-4 shadow-lg w-full md:w-1/3`}
        >
          <div className="mb-4">
            <h3 className={`font-bold text-foreground text-lg`}>
              Đăng ký tư vấn
            </h3>
            <p className={`text-muted-foreground text-base`}>
              Nhận thông tin chi tiết về dự án
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Họ và tên *"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className={`border-border h-10`}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="email"
                placeholder="Email *"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className={`border-border h-10`}
                required
              />
              <Input
                type="tel"
                placeholder="Số điện thoại *"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className={`border-border h-10`}
                required
              />
            </div>

            <div>
              <Textarea
                placeholder="Nội dung cần tư vấn..."
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                className={`border-border resize-none h-20`}
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className={`w-full bg-orange-500 hover:bg-orange-600 text-white h-10`}
            >
              Gửi thông tin
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
