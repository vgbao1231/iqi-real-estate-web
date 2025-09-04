'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building,
  Headphones,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Video,
  Youtube,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import OfficeCarousel from './components/OfficeCarousel';
import { contact } from '@/lib/contact-data';
import IntroSection from '@/app/(main)/components/intro-section';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'Hotline 24/7',
      description: 'Gọi ngay để được tư vấn miễn phí',
      contact: contact.hotline,
      action: () => window.open(`tel:${contact.hotline}`),
      actionText: 'Gọi ngay',
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: MessageCircle,
      title: 'Chat trực tuyến',
      description: 'Nhắn tin và nhận phản hồi trong 5 phút',
      contact: 'Chat ngay',
      action: () => window.open(`https://zalo.me/${contact.hotline}`),
      actionText: 'Bắt đầu chat',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Gửi email chi tiết về nhu cầu của bạn',
      contact: ' info-vietnam@iqiglobal.com',
      action: () =>
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Liên hệ từ website&body=Chào IQI Vietnam, tôi muốn...`
        ),
      actionText: 'Gửi email',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const contactLinks = [
    {
      label: 'Website',
      value: contact.website,
      icon: <Globe size={20} />,
      href: contact.website,
    },
    {
      label: 'Facebook',
      value: 'IQI Vietnam',
      icon: <Facebook size={20} />,
      href: 'https://www.facebook.com/iqivietnam',
    },
    {
      label: 'Instagram',
      value: 'instagram.com/iqivietnam',
      icon: <Instagram size={20} />,
      href: 'https://www.instagram.com/iqivietnam',
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/company/iqivietnam',
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/company/iqivietnam',
    },
    {
      label: 'YouTube',
      value: 'youtube.com/IQIVIETNAM',
      icon: <Youtube size={20} />,
      href: 'https://www.youtube.com/@IQIVIETNAM',
    },
    {
      label: 'TikTok',
      value: 'tiktok.com/@iqivietnam',
      icon: <Video size={20} />,
      href: 'https://www.tiktok.com/@iqivietnam',
    },
    {
      label: 'Email',
      value: contact.email,
      icon: <Mail size={20} />,
      href: `mailto:${contact.email}`,
    },
    {
      label: 'Phone',
      value: contact.hotline,
      icon: <Phone size={20} />,
      href: 'tel:+84764155155',
    },
  ];

  const offices = {
    headOffices: [
      {
        city: 'TP.HCM',
        district: 'Phường An Khánh',
        offices: [
          {
            name: 'Trụ sở chính',
            address:
              'Tầng M, City Gates, 67-69 Võ Nguyên Giáp, Phường An Khánh, TP.HCM',
            phone: '(028) 3821 1234',
            email: 'hcm@iqi.com',
            hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
            image: '/placeholder-2.webp?height=200&width=300',
          },
          {
            name: 'Văn phòng 2',
            address:
              'Venice 3, VES02C New City, 17 Mai Chí Thọ, Phường An Khánh, TP.HCM',
            phone: '(028) 3821 1235',
            email: 'hcm2@iqi.com',
            hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
            image: '/placeholder-2.webp?height=200&width=300',
          },
        ],
      },
      {
        city: 'Hà Nội',
        address:
          'Tầng 14, Lancaster Luminaire, 1152 Đường Láng, Phường Láng, Hà Nội',
        phone: '(024) 3936 1234',
        email: 'hanoi@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
      {
        city: 'Nghệ An',
        address:
          'An Phát Complex, Đại lộ Vinh - Cửa Lò, Phường Vinh Phú, Nghệ An',
        phone: '(0238) 3888 1234',
        email: 'nghean@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
      {
        city: 'Đà Nẵng',
        address: 'Tầng 4, 305 Núi Thành, Phường Hải Châu, Đà Nẵng',
        phone: '(0236) 3888 1234',
        email: 'danang@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
    ],
    consultationOffices: [
      {
        city: 'TP.HCM',
        district: 'Phường Thủ Dầu Một',
        name: 'Văn phòng tư vấn KĐT Artisan Park',
        address: 'Số 163, Phạm Văn Đồng, Phường Thủ Dầu Một, TP.HCM',
        phone: '(028) 3821 1236',
        email: 'artisan@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
      {
        city: 'TP.HCM',
        district: 'Phường Long Bình',
        name: 'Văn phòng Vinhomes Grand Park',
        address:
          'The Beverly Solari - BS1501.S12, Số 512 Nguyễn Xiển, Phường Long Bình, TP.HCM',
        phone: '(028) 3821 1237',
        email: 'grandpark@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
      {
        city: 'TP.HCM',
        district: 'Phường Vũng Tàu',
        name: 'Văn phòng tư vấn Chung cư Gateway',
        address:
          'Tòa B - GB01.11, Đường Nguyễn Hữu Cảnh, Phường Vũng Tàu, TP.HCM',
        phone: '(028) 3821 1238',
        email: 'gateway@iqi.com',
        hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
        image: '/placeholder-2.webp?height=200&width=300',
      },
    ],
  };

  const quickActions = [
    {
      icon: Phone,
      title: 'Gọi Hotline',
      description: contact.hotline,
      action: () => window.open(`tel:${contact.hotline}`),
      color: 'bg-green-500 hover:bg-green-700',
    },
    {
      icon: MessageCircle,
      title: 'Chat Zalo',
      description: 'Nhắn tin ngay',
      action: () => window.open(`https://zalo.me/${contact.hotline}`),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Mail,
      title: 'Gửi Email',
      description: contact.email,
      action: () =>
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Liên hệ từ website&body=Chào IQI Vietnam, tôi muốn...`
        ),
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IntroSection
        title="Liên hệ với IQI Vietnam"
        description="Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư vấn miễn phí từ đội ngũ chuyên gia"
      />

      {/* Quick Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-12">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Liên hệ nhanh
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chọn cách thức liên hệ phù hợp với bạn
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${method.bg} rounded-full center-both mx-auto mb-4`}
                      >
                        <method.icon className={`w-8 h-8 ${method.color}`} />
                      </div>
                      <CardTitle className="text-xl">{method.title}</CardTitle>
                      <p className="text-muted-foreground">
                        {method.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-bold mb-4">
                        {method.contact}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button className="w-full" onClick={method.action}>
                          {method.actionText}
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {/* Quick Action Buttons */}
          <FadeIn delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className={`${action.color} text-white`}
                    onClick={action.action}
                  >
                    <action.icon className="w-5 h-5 mr-2" />
                    <div>
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs opacity-90">
                        {action.description}
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative min-h-screen py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <Card className="sticky top-12">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="w-6 h-6 mr-2 text-orange-500" />
                    Gửi tin nhắn
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Điền form bên dưới và chúng tôi sẽ phản hồi trong vòng 24h
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Họ và tên *</label>
                      <Input
                        placeholder="Nhập họ tên"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Số điện thoại *
                      </label>
                      <Input
                        placeholder="Nhập số điện thoại"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      placeholder="Nhập email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tiêu đề</label>
                    <Input
                      placeholder="Tiêu đề tin nhắn"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Nội dung *</label>
                    <Textarea
                      placeholder="Mô tả chi tiết nhu cầu hoặc câu hỏi của bạn..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Gửi tin nhắn
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Company Info */}
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="w-5 h-5 mr-2 text-blue-600" />
                      Thông tin công ty
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold">IQI Vietnam Co., Ltd</h4>
                      <p className="text-muted-foreground text-sm">
                        Công ty bất động sản hàng đầu Việt Nam với hơn 15 năm
                        kinh nghiệm
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          500+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Đại lý
                        </div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-500">
                          20+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Văn phòng
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-orange-600" />
                      Giờ làm việc
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Thứ 2 - Thứ 6:</span>
                        <span className="font-semibold">8:30 - 17:30</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thứ 7:</span>
                        <span className="font-semibold">8:30 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chủ nhật:</span>
                        <span className="text-muted-foreground">Nghỉ</span>
                      </div>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="flex items-center text-green-700 dark:text-green-300">
                          <Headphones className="w-4 h-4 mr-2" />
                          <span className="font-semibold">
                            Hotline 24/7: {contact.hotlineDisplay}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.6}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-purple-600" />
                      Mạng xã hội
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      {contactLinks.map((link, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 border border-border rounded-lg flex items-center bg-muted-card hover:bg-accent-card transition-all gap-3"
                          >
                            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                              {link.icon}
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">{link.label}</span>
                              <p className="text-gray-400 text-sm break-all">
                                {link.value}
                              </p>
                            </div>
                          </a>
                        </FadeIn>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Văn phòng của chúng tôi
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hệ thống văn phòng trên toàn quốc để phục vụ bạn tốt nhất
            </p>
          </FadeIn>

          <div className="space-y-12">
            {/* Head Offices */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <Building className="w-6 h-6 text-blue-600" />
                  <h3 className="text-2xl font-bold">Trụ sở chính</h3>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    {offices.headOffices.reduce(
                      (total, office) =>
                        total + (office.offices ? office.offices.length : 1),
                      0
                    )}{' '}
                    văn phòng
                  </Badge>
                </div>
              </div>

              <OfficeCarousel
                offices={offices.headOffices.flatMap((office) => {
                  if (office.offices) {
                    return office.offices.map((subOffice) => ({
                      ...subOffice,
                      city: office.city,
                      type: 'head',
                    }));
                  } else {
                    return [
                      {
                        name: `Trụ sở ${office.city}`,
                        address: office.address,
                        phone: office.phone,
                        email: office.email,
                        hours: office.hours,
                        image: office.image,
                        city: office.city,
                        type: 'head',
                      },
                    ];
                  }
                })}
              />
            </div>

            {/* Consultation Offices */}
            <div>
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold">Văn phòng tư vấn</h3>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                    {offices.consultationOffices.length} văn phòng
                  </Badge>
                </div>
              </div>

              <OfficeCarousel
                offices={offices.consultationOffices.map((office) => ({
                  ...office,
                  type: 'consultation',
                }))}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
