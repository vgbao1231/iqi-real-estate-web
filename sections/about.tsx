import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/animations';
import { ArrowRight, CheckCircle, Target, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
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
          <ScaleIn delay={0.2}>
            <motion.div whileHover={{ y: -10 }}>
              <Card className="text-center h-full">
                <CardHeader>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Target className="w-8 h-8 text-orange-600" />
                  </motion.div>
                  <CardTitle>Sứ mệnh</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Kết nối khách hàng với những cơ hội bất động sản tốt nhất,
                    tạo ra giá trị bền vững cho cộng đồng và xã hội.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </ScaleIn>

          <ScaleIn delay={0.4}>
            <motion.div whileHover={{ y: -10 }}>
              <Card className="text-center h-full">
                <CardHeader>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Shield className="w-8 h-8 text-blue-600" />
                  </motion.div>
                  <CardTitle>Giá trị cốt lõi</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Chính trực, chuyên nghiệp, tận tâm và luôn đặt lợi ích khách
                    hàng lên hàng đầu trong mọi giao dịch.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </ScaleIn>

          <ScaleIn delay={0.6}>
            <motion.div whileHover={{ y: -10 }}>
              <Card className="text-center h-full">
                <CardHeader>
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Zap className="w-8 h-8 text-green-600" />
                  </motion.div>
                  <CardTitle>Tầm nhìn</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Trở thành công ty bất động sản hàng đầu Việt Nam, tiên phong
                    trong ứng dụng công nghệ và dịch vụ.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </ScaleIn>
        </div>

        {/* Company Info */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <SlideIn direction="left" className="center-both">
            <div>
              <h3 className="text-2xl font-bold mb-6">Juwai IQI & IQI Atlas</h3>
              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Mạng lưới toàn cầu</h4>
                    <p className="text-muted-foreground">
                      Kết nối với hơn 20 quốc gia và vùng lãnh thổ
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
                      Nền tảng IQI Atlas hỗ trợ đại lý và khách hàng
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
                      Chương trình đào tạo toàn diện cho đại lý
                    </p>
                  </div>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                <Link href="/about">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Tìm hiểu thêm
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SlideIn>
          <SlideIn direction="right" className="center-both">
            <div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="IQI Office"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
