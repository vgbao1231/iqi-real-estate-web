'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import {
  Award,
  Users,
  TrendingUp,
  Globe,
  MapPin,
  Calendar,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import OutroSection from '@/app/(main)/components/outro-section';
import IntroSection from '@/app/(main)/components/intro-section';
import AchievementSection from '@/app/(main)/components/achievement-section';

export default function TeamPage() {
  const leadership = [
    {
      id: 1,
      name: 'Nguyễn Thành Trung',
      position: 'Chairman',
      image: '/leaders/nguyen-thanh-trung.png',
      experience: '11+ năm điều hành doanh nghiệp tại Việt Nam & Singapore',
      bio: 'Sáng lập và phát triển IQI Vietnam, định hướng chiến lược kinh doanh, mở rộng văn phòng và đội ngũ trên toàn quốc.',
      achievements: [
        'Giám đốc Sales tại Alma Nha Trang',
        'Thành lập IQI Vietnam tại Hà Nội, TP.HCM, Đà Nẵng',
        'Quản lý vận hành & pháp lý toàn quốc',
      ],
    },
    {
      id: 2,
      name: 'Nguyễn Minh Thư',
      position: 'Group Vice President',
      image: '/leaders/nguyen-minh-thu.png',
      experience: 'Nhiều năm giữ vai trò lãnh đạo tại Savills & Realplus',
      bio: 'Phụ trách hoạch định chiến lược phát triển bền vững, đồng thời mở rộng thị trường tại các khu vực trọng điểm.',
      achievements: [
        'Tối ưu hệ thống vận hành IQI',
        'Mở rộng thành công thị trường miền Trung',
        'Dẫn dắt đội ngũ tư vấn chiến lược',
      ],
    },
    {
      id: 3,
      name: 'Lê Thị Mai Hoa',
      position: 'Group Vice President',
      image: '/leaders/le-thi-mai-hoa.png',
      experience: '16+ năm trong lĩnh vực bất động sản từ năm 2007',
      bio: 'Từng giữ vị trí CEO tại nhiều doanh nghiệp, chuyên định hướng hợp tác chiến lược và mô hình đầu tư lâu dài.',
      achievements: [
        'Phát triển mô hình liên kết đầu tư bền vững',
        'Lãnh đạo chiến lược kinh doanh dài hạn',
        'Kết nối với đối tác lớn trong ngành',
      ],
    },
    {
      id: 4,
      name: 'La Kim Mỹ Duyên',
      position: 'Vice President',
      image: '/leaders/la-kim-my-duyen.png',
      experience: '10+ năm kinh nghiệm tư vấn & điều hành kinh doanh',
      bio: 'Lãnh đạo hoạt động bán hàng tại TP.HCM & Hồ Tràm, tập trung phát triển đội ngũ và tăng trưởng doanh số bền vững.',
      achievements: [
        'Xây dựng đội ngũ tư vấn chuyên sâu',
        'Dẫn dắt bán hàng tại Hồ Tràm & TP.HCM',
        'Thúc đẩy tăng trưởng doanh số khu vực',
      ],
    },
    {
      id: 5,
      name: 'Võ Thanh Trúc',
      position: 'Director of Sales',
      image: '/leaders/vo-thanh-truc.png',
      experience:
        'Hơn 7 năm kinh nghiệm trong kinh doanh và phân phối bất động sản.',
      bio: 'Góp phần tăng trưởng doanh số, xây dựng đội ngũ bán hàng chuyên nghiệp và mở rộng thị phần cho VIProperty.',
      achievements: [
        'Thúc đẩy doanh số và mở rộng thị phần',
        'Lãnh đạo và truyền cảm hứng cho đội ngũ',
        'Xây dựng đội ngũ bán hàng chuyên nghiệp và hiệu quả',
      ],
    },
    {
      id: 6,
      name: 'Nguyễn Thị Yến Như',
      position: 'Director of Sales',
      image: '/leaders/ms-nhu.png',
      experience:
        'Hơn 13 năm làm việc trong phân khúc bất động sản cao cấp và hạng sang.',
      bio: 'Thành công trong phát triển kinh doanh, duy trì quan hệ đối tác lớn và tạo động lực cho đội ngũ bán hàng.',
      achievements: [
        'Phát triển kinh doanh ở phân khúc cao cấp',
        'Xây dựng và duy trì quan hệ đối tác lớn',
        'Truyền cảm hứng và động lực cho đội ngũ',
      ],
    },
    {
      id: 7,
      name: 'Trần Thị Minh Thư',
      position: 'Director of Sales',
      image: '/leaders/tran-thi-minh-thu.png',
      experience: 'Hơn 10 năm hoạt động tại các nền tảng bất động sản uy tín.',
      bio: 'Am hiểu thị trường và nhu cầu khách hàng, đóng vai trò then chốt trong sự phát triển của VIProperty.',
      achievements: [
        'Kiến thức sâu rộng về thị trường',
        'Am hiểu sâu sắc nhu cầu khách hàng',
        'Đóng góp đáng kể vào sự phát triển công ty',
      ],
    },
    {
      id: 8,
      name: 'Trương Thị Xuân',
      position: 'Director of Sales',
      image: '/leaders/truong-thi-xuan.png',
      experience:
        'Hơn 10 năm trong quản lý chiến lược và phát triển kinh doanh.',
      bio: 'Là người dẫn dắt các chiến lược tăng trưởng, tiên phong công nghệ và cải tiến quy trình vận hành.',
      achievements: [
        'Xây dựng và thực hiện chiến lược kinh doanh',
        'Đi đầu áp dụng công nghệ mới',
        'Cải tiến quy trình làm việc hiệu quả',
      ],
    },
    {
      id: 9,
      name: 'Phạm Minh Tú',
      position: 'M&A Director',
      image: '/leaders/pham-minh-tu.png',
      experience:
        'Hơn 10 năm giữ vai trò lãnh đạo trong lĩnh vực bất động sản.',
      bio: 'Tập trung vào xây dựng đội ngũ, tối ưu quy trình và nâng cao chất lượng dịch vụ, góp phần phát triển bền vững cho công ty.',
      achievements: [
        'Đóng góp vào sự phát triển của công ty',
        'Tập trung xây dựng đội ngũ và quy trình',
        'Nâng cao chất lượng dịch vụ',
      ],
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
      image: 'placeholder.svg',
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
      image: 'placeholder.svg',
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
      image: 'placeholder.svg',
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
      image: 'placeholder.svg',
      specialties: ['Shophouse', 'Officetel', 'Cho thuê văn phòng'],
    },
  ];

  const topLeaders = leadership.filter(
    (l) =>
      l.position !== 'Director of Sales' &&
      l.position !== 'Director' &&
      l.position !== 'M&A Director'
  );

  const directors = leadership.filter(
    (l) =>
      l.position === 'Director of Sales' ||
      l.position === 'Director' ||
      l.position === 'M&A Director'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <IntroSection
        title="Đội ngũ chuyên nghiệp"
        description="Gặp gỡ những con người tài năng và giàu kinh nghiệm đang dẫn dắt
              IQI Vietnam phát triển và mang đến những dịch vụ bất động sản tốt
              nhất cho khách hàng."
      />

      {/* Leadership Team */}
      <section className="py-16 md:px-12">
        <div className="container mx-auto px-4">
          {/* === BAN LÃNH ĐẠO CẤP CAO === */}
          <FadeIn className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ban lãnh đạo
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Những nhà lãnh đạo có tầm nhìn và kinh nghiệm sâu rộng trong ngành
              bất động sản
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topLeaders.map((leader, index) => (
              <ScaleIn key={leader.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="h-full">
                  <Card className="text-center h-full flex flex-col">
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg mx-auto mb-4"
                      >
                        <Image
                          src={leader.image || '/placeholder-2.webp'}
                          alt={leader.name}
                          fill
                          className="object-cover object-top scale-110"
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
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">
                          Thành tựu nổi bật:
                        </h4>
                        <div className="space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex text-xs text-start text-muted-foreground"
                            >
                              <Star className="w-3 h-3 mr-1 text-yellow-500 flex-shrink-0" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>

          {/* === BAN GIÁM ĐỐC === */}
          <FadeIn className="text-center my-12 pt-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ban Giám Đốc
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Đội ngũ giám đốc kinh doanh tài năng, thúc đẩy tăng trưởng và mở
              rộng thị phần
            </p>
          </FadeIn>
          <div className="flex flex-wrap justify-center gap-6">
            {directors.map((leader, index) => (
              <ScaleIn key={leader.id} delay={index * 0.1}>
                <motion.div whileHover={{ y: -10 }} className="h-full max-w-sm">
                  <Card className="text-center h-full flex flex-col">
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg mx-auto mb-4"
                      >
                        <Image
                          src={leader.image || '/placeholder-2.webp'}
                          alt={leader.name}
                          fill
                          className="object-cover object-top"
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
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-sm">
                          Thành tựu nổi bật:
                        </h4>
                        <div className="space-y-1">
                          {leader.achievements.map((achievement, idx) => (
                            <div
                              key={idx}
                              className="flex text-xs text-start text-muted-foreground"
                            >
                              <Star className="w-3 h-3 mr-1 text-yellow-500 flex-shrink-0" />
                              <span>{achievement}</span>
                            </div>
                          ))}
                        </div>
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
      <section className="py-16 md:px-12 bg-muted/30">
        <div className="container mx-auto px-4">
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
      <section className="py-16 md:px-12">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Achievement */}
      <AchievementSection />

      {/* Join Team CTA */}

      <OutroSection
        title="Muốn gia nhập đội ngũ IQI Vietnam?"
        subtitle="Chúng tôi luôn tìm kiếm những tài năng mới để cùng phát triển và thành công trong lĩnh vực bất động sản"
        primary={{
          label: 'Xem cơ hội nghề nghiệp',
          href: '/careers',
        }}
        secondary={{
          label: 'Liên hệ',
          href: '/contact',
        }}
      />
    </div>
  );
}
