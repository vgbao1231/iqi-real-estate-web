import { FadeIn } from '@/components/common/animations';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Home,
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
      href: 'https://iqiglobal.com',
      label: 'iqiglobal.com',
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

  return (
    <footer className="bg-popover">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 py-12 md:px-16">
          {/* Company Info */}
          <FadeIn delay={0.1} className="lg:col-span-3">
            <div className="flex items-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-4"
              >
                <Home className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">IQI VIETNAM</h3>
                <p className="text-orange-400 text-sm font-medium">
                  BEYOND REAL ESTATE
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
              Đối tác bất động sản đáng tin cậy, cung cấp dịch vụ toàn diện từ
              tư vấn đến đầu tư bất động sản tại Việt Nam và quốc tế.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-600/30 transition-colors">
                  <Phone className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Hotline</p>
                  <a
                    href="tel:0764155155"
                    className="hover:text-orange-400 transition-colors font-medium"
                  >
                    0764155155
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-600/30 transition-colors">
                  <Mail className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <a
                    href="mailto:info-vietnam@iqiglobal.com"
                    className="hover:text-orange-400 transition-colors font-medium"
                  >
                    info-vietnam@iqiglobal.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center group"
              >
                <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-600/30 transition-colors">
                  <Globe className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Website</p>
                  <a
                    href="https://iqiglobal.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors font-medium"
                  >
                    iqiglobal.com
                  </a>
                </div>
              </motion.div>
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
        <FadeIn delay={0.4}>
          <div className="border-t border-border text-center py-2">
            <p className="text-muted-foreground text-sm">
              © 2024 IQI Vietnam. All rights reserved. | Beyond Real Estate
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}
