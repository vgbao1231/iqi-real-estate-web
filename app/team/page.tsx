'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  ArrowLeft,
  Mail,
  Phone,
  Linkedin,
  Award,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  Star,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function TeamPage() {
  const leadership = [
    {
      id: 1,
      name: 'Dustin Trung Nguyễn',
      position: 'Giám đốc Quốc gia - IQI Vietnam',
      experience: 'Dẫn dắt hoạt động IQI Vietnam tại Hà Nội, TP.HCM và Đà Nẵng',
      image: 'placeholder-2.webp',
      bio: 'Với vai trò Giám đốc Quốc gia, Dustin đã thúc đẩy sự mở rộng nhanh chóng của IQI Vietnam, khai trương văn phòng tại 3 thành phố trọng điểm và xây dựng đội ngũ tư vấn chuyên nghiệp trên toàn quốc.',
      achievements: [
        'Khai trương văn phòng IQI tại Hà Nội, TP.HCM & Đà Nẵng',
        'Mở rộng thị trường ra khu vực miền Trung',
        'Xây dựng đội ngũ hơn 900 tư vấn viên chuyên nghiệp',
      ],
      email: 'dustin.nguyen@iqi.com',
      phone: '+84‑…',
      linkedin: 'linkedin.com/in/dustin-trung-nguyen',
    },
    {
      id: 2,
      name: 'La Kim Mỹ Duyên',
      position: 'Giám đốc Kinh doanh – TP.HCM & Hồ Tràm',
      experience: 'Lãnh đạo kinh doanh và phát triển đội ngũ bán hàng',
      image: 'placeholder-2.webp',
      bio: 'Chị Duyên phụ trách mảng kinh doanh tại TP.HCM và thị trường Hồ Tràm, trực tiếp huấn luyện các tư vấn viên xuất sắc và xây dựng quan hệ chiến lược với đối tác.',
      achievements: [
        'Giám đốc Kinh doanh TP.HCM & Hồ Tràm',
        'Phát triển nhanh đội ngũ bán hàng địa phương',
        'Lãnh đạo trụ cột bán hàng xuất sắc',
      ],
      email: 'duyen.lakim@iqi.com',
      phone: '+84‑…',
      linkedin: 'linkedin.com/in/la-kim-my-duyen',
    },
    {
      id: 3,
      name: 'Nguyễn Minh Thư',
      position: 'Trưởng bộ phận Mở rộng - IQI Vietnam',
      experience: 'Giám sát khai trương văn phòng mới và phát triển thị trường',
      image: 'placeholder-2.webp',
      bio: 'Chị Thư dẫn dắt chiến lược mở rộng thị trường, điều phối khai trương văn phòng Đà Nẵng và mở rộng hiện diện của IQI tại các thành phố trọng điểm.',
      achievements: [
        'Điều phối khai trương văn phòng Đà Nẵng',
        'Dẫn dắt mở rộng 3 văn phòng khu vực',
        'Xây dựng chiến lược mở rộng bền vững',
      ],
      email: 'minhthu.nguyen@iqi.com',
      phone: '+84‑…',
      linkedin: 'linkedin.com/in/nguyen-minh-thu',
    },
  ];

  const departments = [
    {
      name: 'Sales (WE Group)',
      head: 'La Kim Mỹ Duyên',
      members: 1100,
      description:
        'Quản lý hàng nghìn agents, phát triển kinh doanh dự án trên toàn quốc',
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      name: 'Training & Education',
      head: 'Lê Văn Đức',
      members: 20,
      description:
        'Thiết kế chương trình đào tạo chuyên nghiệp và nâng cao kỹ năng cho agents',
      icon: Award,
      color: 'text-blue-600',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      name: 'Marketing & Brand',
      head: 'Phạm Thị Lan',
      members: 15,
      description:
        'Xây dựng thương hiệu, marketing kỹ thuật số và truyền thông đa kênh',
      icon: Globe,
      color: 'text-purple-600',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      name: 'Customer Support',
      head: 'Hoàng Văn Nam',
      members: 25,
      description:
        'Hỗ trợ khách hàng, chăm sóc after-sales và giải quyết khiếu nại',
      icon: Users,
      color: 'text-orange-600',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  const topAgents = [
    {
      id: 1,
      name: 'Nguyễn Thị Mai',
      title: 'Senior Sales Consultant',
      location: 'TP.HCM',
      experience: '8 năm',
      deals: 156,
      revenue: '45 tỷ',
      rating: 4.9,
      image: 'placeholder-2.webp',
      specialties: ['Căn hộ cao cấp', 'Biệt thự Quận 2', 'Thủ Thiêm'],
    },
    {
      id: 2,
      name: 'Trần Văn Hùng',
      title: 'International Property Specialist',
      location: 'Hà Nội',
      experience: '6 năm',
      deals: 89,
      revenue: '28 tỷ',
      rating: 4.8,
      image: 'placeholder-2.webp',
      specialties: ['BDS Singapore', 'Malaysia', 'Đầu tư quốc tế'],
    },
    {
      id: 3,
      name: 'Lê Thị Hoa',
      title: 'Resort Property Expert',
      location: 'Đà Nẵng',
      experience: '5 năm',
      deals: 67,
      revenue: '22 tỷ',
      rating: 4.9,
      image: 'placeholder-2.webp',
      specialties: ['Condotel', 'Resort biển', 'Second home nghỉ dưỡng'],
    },
    {
      id: 4,
      name: 'Phạm Văn Tuấn',
      title: 'Commercial Property Advisor',
      location: 'TP.HCM',
      experience: '7 năm',
      deals: 134,
      revenue: '38 tỷ',
      rating: 4.7,
      image: 'placeholder-2.webp',
      specialties: ['Shophouse', 'Officetel', 'Cho thuê văn phòng'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-600">
        <div className="container mx-auto px-4 relative z-10 text-white md:px-8">
          <FadeIn>
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/"
                className="inline-flex items-center text-orange-100 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại trang chủ
              </Link>
              <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-700 dark:text-orange-100">
                ĐỘI NGŨ IQI VIETNAM
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Đội ngũ chuyên nghiệp
            </h1>
            <p className="text-xl max-w-3xl">
              Gặp gỡ những con người tài năng và giàu kinh nghiệm đang dẫn dắt
              IQI Vietnam phát triển và mang đến những dịch vụ bất động sản tốt
              nhất cho khách hàng.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-16">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ban lãnh đạo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những nhà lãnh đạo có tầm nhìn và kinh nghiệm sâu rộng trong ngành
              bất động sản
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <ScaleIn key={leader.id} delay={index * 0.2}>
                <motion.div whileHover={{ y: -10 }} className="h-full">
                  <Card className="text-center h-full flex flex-col">
                    <CardHeader>
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src={leader.image || '/placeholder-2.webp'}
                          alt={leader.name}
                          width={200}
                          height={200}
                          className="rounded-full w-32 h-32 object-cover mx-auto mb-4 shadow-lg"
                        />
                      </motion.div>
                      <CardTitle className="text-xl">{leader.name}</CardTitle>
                      <p className="text-blue-600 font-semibold">
                        {leader.position}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {leader.experience}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed flex-1">
                        {leader.bio}
                      </p>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">
                          Thành tựu nổi bật:
                        </h4>
                        <div className="space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs text-muted-foreground"
                            >
                              <Star className="w-3 h-3 mr-1 text-yellow-500" />
                              {achievement}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex justify-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-blue-600 transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-green-600 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-muted-foreground hover:text-blue-700 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-16">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Các phòng ban
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Cơ cấu tổ chức chuyên nghiệp với các phòng ban chuyên biệt
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <motion.div whileHover={{ y: -5 }}>
                  <Card className="text-center h-full">
                    <CardHeader>
                      <div
                        className={`w-16 h-16 ${dept.bg} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <dept.icon className={`w-8 h-8 ${dept.color}`} />
                      </div>
                      <CardTitle className="text-lg">{dept.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Trưởng phòng: {dept.head}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {dept.members}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          thành viên
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {dept.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Đại lý xuất sắc
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những đại lý hàng đầu với thành tích kinh doanh ấn tượng và đánh
              giá cao từ khách hàng
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:px-12">
            {topAgents.map((agent, index) => (
              <ScaleIn key={agent.id} delay={index * 0.1}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Image
                        src={agent.image || '/placeholder-2.webp'}
                        alt={agent.name}
                        width={120}
                        height={120}
                        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 shadow-md"
                      />
                    </motion.div>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    <p className="text-blue-600 font-medium text-sm">
                      {agent.title}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mt-2">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {agent.location}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {agent.experience}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Specialties */}
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">
                        Chuyên môn:
                      </h4>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {agent.specialties.map((specialty, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Muốn gia nhập đội ngũ IQI Vietnam?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Chúng tôi luôn tìm kiếm những tài năng mới để cùng phát triển và
              thành công trong lĩnh vực bất động sản
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/careers">
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    Xem cơ hội nghề nghiệp
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    Liên hệ
                  </Button>
                </Link>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
