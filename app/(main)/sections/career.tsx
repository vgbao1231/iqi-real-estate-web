import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn } from '@/components/common/animations';
import { ArrowRight, Award, Globe, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Career() {
  return (
    <section className="py-8 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge className="mb-4 bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
            CƠ HỘI NGHỀ NGHIỆP
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tham gia đội ngũ IQI Vietnam
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Khởi đầu sự nghiệp bất động sản với đội ngũ chuyên nghiệp, chương
            trình đào tạo toàn diện và cơ hội thu nhập hấp dẫn.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center justify-center">
          <SlideIn direction="left" className="center-both">
            <div>
              <h3 className="text-2xl font-bold mb-6">Tại sao chọn IQI?</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Award,
                    title: 'Đào tạo chuyên nghiệp',
                    desc: 'Chương trình đào tạo 6 tháng với chứng chỉ quốc tế',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Thu nhập hấp dẫn',
                    desc: 'Hoa hồng cao + thưởng hiệu suất + phụ cấp',
                  },
                  {
                    icon: Users,
                    title: 'Môi trường năng động',
                    desc: 'Đội ngũ trẻ, sáng tạo và hỗ trợ lẫn nhau',
                  },
                  {
                    icon: Globe,
                    title: 'Cơ hội quốc tế',
                    desc: 'Làm việc với dự án quốc tế, du lịch nghiên cứu',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-start space-x-3"
                  >
                    <item.icon className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-6">
                <Link href="/careers">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Tìm hiểu cơ hội nghề nghiệp
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
                className="w-[500px] h-[400px] relative"
              >
                <Image
                  src="/placeholder-2.webp?height=400&width=500"
                  alt="IQI Team"
                  fill
                  priority
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
