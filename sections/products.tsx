import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn, SlideIn, ScaleIn } from '@/components/animations';
import { ArrowRight, Building, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Products() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <FadeIn className="text-center mb-12">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            SẢN PHẨM
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Danh mục bất động sản đa dạng
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Từ căn hộ cao cấp đến biệt thự nghỉ dưỡng, chúng tôi có đầy đủ các
            loại hình bất động sản phù hợp với mọi nhu cầu và ngân sách.
          </p>
        </FadeIn>

        {/* International Investment */}
        <div className="mb-12">
          <FadeIn>
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <Globe className="w-6 h-6 mr-2 text-orange-600" />
              Đầu tư BDS Quốc tế
            </h3>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Singapore',
                desc: 'Căn hộ cao cấp tại trung tâm tài chính',
                price: 'Từ $800K',
                delay: 0.2,
              },
              {
                name: 'Malaysia',
                desc: 'Dự án nghỉ dưỡng ven biển Johor',
                price: 'Từ $300K',
                delay: 0.4,
              },
              {
                name: 'Australia',
                desc: 'Nhà phố Melbourne, cơ hội định cư',
                price: 'Từ $600K',
                delay: 0.6,
              },
            ].map((item, index) => (
              <ScaleIn key={index} delay={item.delay}>
                <motion.div whileHover={{ y: -10 }}>
                  <Card className="overflow-hidden">
                    <CardHeader className="p-0">
                      <motion.div whileHover={{ scale: 1.1 }}>
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          alt={`${item.name} Property`}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                      <div className="p-4">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{item.desc}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-600 font-bold">
                          {item.price}
                        </span>
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                          }}
                          whileTap={{
                            scale: 0.95,
                          }}
                        >
                          <Link
                            href={`/products/international/${item.name.toLowerCase()}`}
                          >
                            <Button size="sm" variant="outline">
                              Chi tiết
                            </Button>
                          </Link>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </ScaleIn>
            ))}
          </div>
          <FadeIn delay={0.8} className="text-center mt-6">
            <Link href="/products/international">
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
              >
                Xem tất cả BDS Quốc tế
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </FadeIn>
        </div>

        {/* Domestic Properties Preview */}
        <div className="grid md:grid-cols-2 gap-12">
          <SlideIn direction="left">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Building className="w-6 h-6 mr-2 text-orange-600" />
                TP.HCM
              </h3>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="HCMC Apartment"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">
                            Vinhomes Central Park
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Căn hộ 2-3PN, view sông Sài Gòn
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-orange-600 font-bold">
                              4.5 - 8 tỷ
                            </span>
                            <Badge variant="secondary">Sẵn sàng</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="HCMC Villa"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">Biệt thự Thảo Điền</h4>
                          <p className="text-sm text-muted-foreground">
                            Villa 4PN, sân vườn riêng
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-orange-600 font-bold">
                              15 - 25 tỷ
                            </span>
                            <Badge variant="secondary">Còn 3 căn</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
                <Link href="/products/hcmc">
                  <Button variant="outline" className="w-full bg-transparent">
                    Xem tất cả BDS TP.HCM
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SlideIn>

          <SlideIn direction="right">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Building className="w-6 h-6 mr-2 text-orange-600" />
                Hà Nội
              </h3>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Hanoi Apartment"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">Times City</h4>
                          <p className="text-sm text-muted-foreground">
                            Căn hộ 2-3PN, trung tâm Hai Bà Trưng
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-orange-600 font-bold">
                              3.2 - 5.8 tỷ
                            </span>
                            <Badge variant="secondary">Hot</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src="/placeholder.svg?height=80&width=80"
                          alt="Hanoi Townhouse"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold">Nhà phố Cầu Giấy</h4>
                          <p className="text-sm text-muted-foreground">
                            Nhà 4 tầng, gần trường quốc tế
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-orange-600 font-bold">
                              8 - 12 tỷ
                            </span>
                            <Badge variant="secondary">Mới</Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} className="mt-4">
                <Link href="/products/hanoi">
                  <Button variant="outline" className="w-full bg-transparent">
                    Xem tất cả BDS Hà Nội
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
