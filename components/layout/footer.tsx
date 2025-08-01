import { FadeIn } from '@/components/common/animations';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  Globe,
  ArrowRight,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
  Music,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import { contact } from '@/lib/contact-data';

export default function Footer() {
  const navLinks = [
    { href: '/about', label: 'Về chúng tôi' },
    { href: '/products/vietnam', label: 'Bất động sản Việt Nam' },
    { href: '/products/international', label: 'Bất động sản Quốc tế' },
    { href: '/consultation', label: 'Tư vấn miễn phí' },
    { href: '/careers', label: 'Tuyển dụng' },
    { href: '/contact', label: 'Liên hệ' },
  ];

  const socialLinks = [
    {
      href: contact.website,
      label: contact.websiteDisplay,
      icon: ExternalLink,
    },
    {
      href: 'https://facebook.com/IQIVietnam',
      label: 'IQI Vietnam',
      icon: Facebook,
    },
    {
      href: 'https://instagram.com/iqivietnam',
      label: 'instagram.com/iqivietnam',
      icon: Instagram,
    },
    {
      href: 'https://linkedin.com/company/iqivietnam',
      label: 'linkedin.com/company/iqivietnam',
      icon: Linkedin,
    },
    {
      href: 'https://youtube.com/IQIVIETNAM',
      label: 'youtube.com/IQIVIETNAM',
      icon: Youtube,
    },
    {
      href: 'https://tiktok.com/@iqivietnam',
      label: 'tiktok.com/@iqivietnam',
      icon: Music,
    },
  ];

  const contactInfo = [
    {
      label: 'Hotline',
      value: contact.hotline,
      href: `tel:${contact.hotline}`,
      icon: Phone,
    },
    {
      label: 'Email',
      value: contact.email,
      href: `mailto:${contact.email}`,
      icon: Mail,
    },
    {
      label: 'Website',
      value: contact.websiteDisplay,
      href: contact.website,
      icon: Globe,
    },
  ];

  return (
    <footer className="bg-accent">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 py-12 max-w-7xl">
        {/* Company Info */}
        <FadeIn delay={0.1} className="lg:col-span-3">
          <div className="flex items-center mb-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="center-both relative w-48 h-24"
            >
              <Image
                src="/logo-detail-light.png"
                alt="logo"
                fill
                className="object-contain hidden dark:block"
              />

              {/* Logo for light mode */}
              <Image
                src="/logo-detail-dark.png"
                alt="logo"
                fill
                className="object-contain dark:hidden"
              />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold">IQI VIETNAM</h3>
              <p className="text-orange-400 text-sm font-medium">
                BEYOND REAL ESTATE
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
            Đối tác bất động sản đáng tin cậy, cung cấp dịch vụ toàn diện từ tư
            vấn đến đầu tư bất động sản tại Việt Nam và quốc tế.
          </p>

          {/* Contact Info */}
          <div className="space-y-4">
            {contactInfo.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-orange-400/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-400/30 transition-colors">
                  <item.icon className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{item.label}</p>
                  <a
                    href={item.href}
                    target={item.label === 'Website' ? '_blank' : undefined}
                    rel={
                      item.label === 'Website'
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    className="hover:text-orange-400 transition-colors font-medium"
                  >
                    {item.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Quick Links */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <div>
            <h4 className="text-lg font-semibold mb-6 ml-6 text-orange-400">
              Liên kết nhanh
            </h4>
            <ul className="space-y-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Social Media */}
        <FadeIn delay={0.3} className="lg:col-span-2">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-orange-400 mb-4 ml-6">
              {`IQI Vietnam's Channels`}
            </h4>
            <div className="space-y-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-orange-400 transition-colors duration-200 group"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border text-center py-2">
        <p className="text-muted-foreground text-sm">
          © 2025 IQI Vietnam. All rights reserved. | Beyond Real Estate
        </p>
      </div>
    </footer>
  );
}
