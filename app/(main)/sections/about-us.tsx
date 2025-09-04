import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/common/animations';
import { ArrowRight, CheckCircle, Target, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutUs() {
  const cards = [
    {
      icon: Target,
      color: 'orange',
      title: 'Sứ mệnh',
      content:
        'Kết nối khách hàng với những cơ hội bất động sản tốt nhất, tạo ra giá trị bền vững cho cộng đồng và xã hội.',
    },
    {
      icon: Shield,
      color: 'blue',
      title: 'Giá trị cốt lõi',
      content:
        'Chính trực, chuyên nghiệp, tận tâm và luôn đặt lợi ích khách hàng lên hàng đầu trong mọi giao dịch.',
    },
    {
      icon: Zap,
      color: 'green',
      title: 'Tầm nhìn',
      content:
        'Trở thành công ty bất động sản hàng đầu Việt Nam, tiên phong trong ứng dụng công nghệ và dịch vụ.',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            GIỚI THIỆU VỀ IQI
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hành trình phát triển của chúng tôi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            IQI Vietnam được thành lập với sứ mệnh mang đến những giải pháp bất
            động sản tối ưu, giúp khách hàng đạt được mục tiêu đầu tư và an cư
            lạc nghiệp.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cards.map((card, i) => (
            <ScaleIn key={card.title} delay={0.2 + i * 0.2}>
              <motion.div whileHover={{ y: -10 }}>
                <Card className="text-center h-full shadow-lg border border-border">
                  <CardHeader>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 bg-${card.color}-100 dark:bg-${card.color}-900/30 rounded-full center-both mx-auto mb-4`}
                    >
                      <card.icon className={`w-8 h-8 text-${card.color}-600`} />
                    </motion.div>
                    <CardTitle>{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{card.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        {/* Company Info */}
        <div className="md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <SlideIn
            direction="left"
            className="flex items-center justify-center"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center md:text-start">
                Juwai IQI & IQI Atlas
              </h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Mạng lưới toàn cầu</h4>
                    <p className="text-muted-foreground">
                      Sở hữu mạng lưới hơn 50.000 chuyên gia kinh doanh và kết
                      nối hơn 22 quốc gia trên toàn cầu.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Công nghệ tiên tiến</h4>
                    <p className="text-muted-foreground">
                      Nền tảng công nghệ Atlas cho phép hơn 50.000 chuyên gia
                      xuất bản tin đăng từ mọi nơi trên thế giới.
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Đào tạo chuyên nghiệp</h4>
                    <p className="text-muted-foreground">
                      IQI Global Academy là nền tảng đào tạo trực tuyến với
                      phương pháp tiếp cận mang tính cách mạng dành cho các
                      chiến binh của IQI Global.
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                <Link href="/about/juwai">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Tìm hiểu thêm
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SlideIn>
          <SlideIn
            direction="right"
            className="flex items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="w-full mx-auto"
            >
              <div className="relative aspect-video rounded-lg shadow-lg overflow-hidden">
                <video
                  src="/placeholder-video-1.mp4"
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </motion.div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
