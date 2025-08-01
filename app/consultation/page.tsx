'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Phone,
  Clock,
  CheckCircle,
  Home,
  DollarSign,
  MapPin,
  Star,
  Award,
  Shield,
  MessageCircle,
  Mail,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import IntroSection from '@/components/common/intro-section';
import { contact } from '@/lib/contact-data';
import { cn } from '@/lib/utils';

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: '',
    budget: '',
    location: '',
    timeline: '',
    message: '',
    services: [] as string[],
  });

  const consultationServices = [
    {
      icon: Home,
      title: 'Tư vấn mua bán',
      description: 'Hỗ trợ tìm kiếm và đánh giá bất động sản phù hợp',
      features: ['Phân tích thị trường', 'Thẩm định pháp lý', 'Đàm phán giá'],
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: DollarSign,
      title: 'Tư vấn đầu tư',
      description: 'Chiến lược đầu tư BDS hiệu quả và sinh lời',
      features: ['Phân tích ROI', 'Dự báo tăng giá', 'Quản lý rủi ro'],
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: MapPin,
      title: 'Tư vấn vị trí',
      description: 'Đánh giá tiềm năng phát triển khu vực',
      features: [
        'Hạ tầng giao thông',
        'Tiện ích xung quanh',
        'Quy hoạch tương lai',
      ],
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: Shield,
      title: 'Tư vấn pháp lý',
      description: 'Kiểm tra và đảm bảo tính pháp lý của giao dịch',
      features: ['Thẩm tra hồ sơ', 'Hướng dẫn thủ tục', 'Bảo vệ quyền lợi'],
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
  ];

  const experts = [
    {
      name: 'Nguyễn Văn Minh',
      title: 'Chuyên gia BDS Quốc tế',
      experience: '15+ năm',
      specialties: ['Singapore', 'Malaysia', 'Australia'],
      rating: 4.9,
      reviews: 234,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: 'Trần Thị Hương',
      title: 'Chuyên gia BDS Cao cấp',
      experience: '12+ năm',
      specialties: ['Vinhomes', 'Masterise', 'Novaland'],
      rating: 4.8,
      reviews: 189,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      name: 'Lê Văn Đức',
      title: 'Chuyên gia Đầu tư BDS',
      experience: '18+ năm',
      specialties: ['Phân tích thị trường', 'ROI', 'Rủi ro'],
      rating: 4.9,
      reviews: 156,
      image: '/placeholder.svg?height=100&width=100',
    },
  ];

  const quickActions = [
    {
      icon: Phone,
      title: 'Gọi Hotline',
      description: contact.hotline,
      action: () => window.open(`tel:${contact.hotline}`),
      color: 'text-green-500',
    },
    {
      icon: MessageCircle,
      title: 'Chat Zalo',
      description: 'Nhắn tin ngay',
      action: () => window.open(`https://zalo.me/${contact.hotline}`),
      color: 'text-blue-600',
    },
    {
      icon: Mail,
      title: 'Gửi Email',
      description: contact.email,
      action: () =>
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Liên hệ từ website&body=Chào IQI Vietnam, tôi muốn...`
        ),
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IntroSection
        title="IQI Vietnam: Giải Pháp Bất Động Sản Toàn Cầu"
        description="Tư vấn từ chuyên gia IQI Vietnam, thành viên tập đoàn công nghệ bất động sản quốc tế với hơn 50.000 đại diện toàn cầu và kinh nghiệm dày dặn."
      />

      {/* Consultation Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Dịch vụ tư vấn
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Chúng tôi cung cấp dịch vụ tư vấn toàn diện cho mọi nhu cầu bất
              động sản
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationServices.map((service, index) => (
              <ScaleIn key={index} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }} className="h-full">
                  <Card className="h-full text-center">
                    <CardHeader className="flex-1">
                      <div
                        className={`w-16 h-16 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <service.icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <p className="text-muted-foreground text-sm flex-1">
                        {service.description}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-none">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Đăng ký tư vấn miễn phí
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Điền thông tin để nhận tư vấn chuyên nghiệp từ đội ngũ
                    chuyên gia
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Họ và tên *</label>
                      <Input
                        placeholder="Nhập họ tên của bạn"
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
                      placeholder="Nhập email của bạn"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Loại BDS quan tâm
                      </label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, propertyType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn loại BDS" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Căn hộ</SelectItem>
                          <SelectItem value="house">Nhà phố</SelectItem>
                          <SelectItem value="villa">Biệt thự</SelectItem>
                          <SelectItem value="office">Văn phòng</SelectItem>
                          <SelectItem value="international">
                            BDS Quốc tế
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ngân sách</label>
                      <Select
                        value={formData.budget}
                        onValueChange={(value) =>
                          setFormData({ ...formData, budget: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn mức ngân sách" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-2b">Dưới 2 tỷ</SelectItem>
                          <SelectItem value="2-5b">2-5 tỷ</SelectItem>
                          <SelectItem value="5-10b">5-10 tỷ</SelectItem>
                          <SelectItem value="10-20b">10-20 tỷ</SelectItem>
                          <SelectItem value="over-20b">Trên 20 tỷ</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">
                        Khu vực quan tâm
                      </label>
                      <Input
                        placeholder="VD: Quận 7, TP.HCM"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Thời gian mua
                      </label>
                      <Select
                        value={formData.timeline}
                        onValueChange={(value) =>
                          setFormData({ ...formData, timeline: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">
                            Ngay lập tức
                          </SelectItem>
                          <SelectItem value="1-3months">1-3 tháng</SelectItem>
                          <SelectItem value="3-6months">3-6 tháng</SelectItem>
                          <SelectItem value="6-12months">6-12 tháng</SelectItem>
                          <SelectItem value="over-1year">Trên 1 năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Dịch vụ cần tư vấn
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      {[
                        'Mua bán',
                        'Đầu tư',
                        'Cho thuê',
                        'Pháp lý',
                        'Thẩm định giá',
                        'Khác',
                      ].map((service) => (
                        <div
                          key={service}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={service} />
                          <label htmlFor={service} className="text-sm">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Ghi chú thêm</label>
                    <Textarea
                      placeholder="Mô tả chi tiết nhu cầu của bạn..."
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
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      Đăng ký tư vấn miễn phí
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Contact Info & Experts */}
            <div className="space-y-8">
              {/* Quick Contact */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-blue-600" />
                      Liên hệ nhanh
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quickActions.map((action, index) => {
                      const Icon = action.icon;
                      return (
                        <div
                          key={index}
                          onClick={action.action}
                          className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition bg-muted/50 hover:scale-105"
                        >
                          <Icon className={cn('w-5 h-5', action.color)} />
                          <div>
                            <div className="font-semibold">{action.title}</div>
                            <div className="text-sm opacity-90">
                              {action.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Expert Team */}
              <FadeIn delay={0.4}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2 text-orange-600" />
                      Đội ngũ chuyên gia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {experts.map((expert, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="relative w-14 h-14">
                          <Image
                            src={expert.image || '/placeholder.svg'}
                            alt={expert.name}
                            fill
                            className="object-cover rounded-full"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold">{expert.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {expert.title}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs ml-1">
                                {expert.rating}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              ({expert.reviews} đánh giá)
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Process */}
              <FadeIn delay={0.6}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-orange-600" />
                      Quy trình tư vấn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        'Tiếp nhận thông tin trong 5 phút',
                        'Phân tích nhu cầu và tư vấn sơ bộ',
                        'Lên kế hoạch chi tiết và báo giá',
                        'Thực hiện dịch vụ và theo dõi',
                      ].map((step, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-orange-600">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
