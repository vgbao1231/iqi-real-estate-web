'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Building,
  Headphones,
  Globe,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
      contact: '1900 1234',
      action: 'Gọi ngay',
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: MessageCircle,
      title: 'Chat trực tuyến',
      description: 'Nhắn tin và nhận phản hồi trong 5 phút',
      contact: 'Chat ngay',
      action: 'Bắt đầu chat',
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Gửi email chi tiết về nhu cầu của bạn',
      contact: 'info@iqi.com',
      action: 'Gửi email',
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const offices = [
    {
      city: 'TP. Hồ Chí Minh',
      address: 'Tầng 15, Tòa nhà Vietcombank, 5 Công Trường Mê Linh, Quận 1',
      phone: '(028) 3821 1234',
      email: 'hcm@iqi.com',
      hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
      image: '/placeholder-2.webp?height=200&width=300',
    },
    {
      city: 'Hà Nội',
      address: 'Tầng 10, Tòa nhà Lotte Center, 54 Liễu Giai, Ba Đình',
      phone: '(024) 3936 1234',
      email: 'hanoi@iqi.com',
      hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
      image: '/placeholder-2.webp?height=200&width=300',
    },
    {
      city: 'Đà Nẵng',
      address: 'Tầng 8, Tòa nhà Indochina, 4 Nguyễn Tất Thành, Hải Châu',
      phone: '(0236) 3888 1234',
      email: 'danang@iqi.com',
      hours: '8:00 - 18:00 (T2-T6), 8:00 - 12:00 (T7)',
      image: '/placeholder-2.webp?height=200&width=300',
    },
  ];

  const quickActions = [
    {
      icon: Phone,
      title: 'Gọi Hotline',
      description: '1900 1234',
      action: () => window.open('tel:19001234'),
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: MessageCircle,
      title: 'Chat Zalo',
      description: 'Nhắn tin ngay',
      action: () => window.open('https://zalo.me/19001234'),
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Mail,
      title: 'Gửi Email',
      description: 'info@iqi.com',
      action: () => window.open('mailto:info@iqi.com'),
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
            <Badge className="mb-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
              LIÊN HỆ
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Liên hệ với IQI Vietnam
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Liên hệ ngay để được tư
              vấn miễn phí từ đội ngũ chuyên gia
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
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
                        className={`w-16 h-16 ${method.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
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
                        <Button className="w-full">{method.action}</Button>
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
                    <div className="text-left">
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
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Send className="w-6 h-6 mr-2 text-green-600" />
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
                      className="w-full bg-green-600 hover:bg-green-700"
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
                        <div className="text-2xl font-bold text-green-600">
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
                        <span className="font-semibold">8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thứ 7:</span>
                        <span className="font-semibold">8:00 - 12:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chủ nhật:</span>
                        <span className="text-muted-foreground">Nghỉ</span>
                      </div>
                      <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="flex items-center text-green-700 dark:text-green-300">
                          <Headphones className="w-4 h-4 mr-2" />
                          <span className="font-semibold">
                            Hotline 24/7: 1900 1234
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
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: 'Facebook', followers: '50K+' },
                        { name: 'YouTube', followers: '25K+' },
                        { name: 'LinkedIn', followers: '15K+' },
                        { name: 'Zalo', followers: '30K+' },
                      ].map((social, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="p-3 bg-muted/50 rounded-lg text-center cursor-pointer"
                        >
                          <div className="font-semibold">{social.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {social.followers}
                          </div>
                        </motion.div>
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

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="h-full">
                    <CardHeader className="p-0">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Image
                          src={office.image || '/placeholder-2.webp'}
                          alt={`${office.city} Office`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="text-xl mb-4">
                        {office.city}
                      </CardTitle>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-semibold">
                            {office.phone}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{office.hours}</span>
                        </div>
                      </div>
                      <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <MapPin className="w-4 h-4 mr-2" />
                          Xem bản đồ
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
