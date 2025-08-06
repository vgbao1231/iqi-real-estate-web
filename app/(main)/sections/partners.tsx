import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn, ScaleIn } from '@/components/common/animations';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { partners } from '@/lib/partner-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Partners() {
  const [showAllPartners, setShowAllPartners] = useState(false);
  const commonPartners = Object.values(partners).flatMap((arr) =>
    (arr as any[]).slice(0, 4)
  );
  const displayedPartners = showAllPartners
    ? commonPartners
    : commonPartners.slice(0, 4);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const handlePartnerClick = (partner: any) => {
    setSelectedPartner(partner);
    setShowPartnerModal(true);
  };

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <FadeIn className="text-center mb-8">
          <Badge className="mb-4 bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
            ĐỐI TÁC TIN CẬY
          </Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Được tin tưởng bởi những thương hiệu hàng đầu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hợp tác với 50+ đối tác uy tín trong và ngoài nước
          </p>
        </FadeIn>

        {/* Partner Logos - 4 columns grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center mb-8">
          {displayedPartners.map((partner, index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePartnerClick(partner)}
                className="bg-card backdrop-blur-sm p-4 rounded-lg shadow-sm hover:shadow-md transition-colors group cursor-pointer center-both flex-col"
              >
                <div className="aspect-[2/1] w-full relative">
                  <Image
                    src={partner.logo || '/placeholder-2.webp'}
                    alt={partner.name}
                    fill
                    priority
                    className="mx-auto transition-all duration-300 object-contain px-8"
                  />
                </div>
                <div className="text-center mt-2 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </div>
                <div className="text-center mt-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Click để xem chi tiết
                </div>
              </motion.div>
            </ScaleIn>
          ))}
        </div>

        {/* Show More/Less Button */}
        {commonPartners.length > 4 && (
          <FadeIn delay={0.6} className="text-center mb-6">
            <Button
              variant="outline"
              onClick={() => setShowAllPartners(!showAllPartners)}
              className="bg-card backdrop-blur-sm"
            >
              {showAllPartners ? (
                <>
                  Thu gọn
                  <ChevronUp className="ml-2 w-4 h-4" />
                </>
              ) : (
                <>
                  Xem thêm {commonPartners.length - 4} đối tác
                  <ChevronDown className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </FadeIn>
        )}

        {/* Quick Stats */}
        <FadeIn delay={0.8}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">50+</div>
              <div className="text-sm text-muted-foreground">Đối tác</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">20+</div>
              <div className="text-sm text-muted-foreground">Quốc gia</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">1000+</div>
              <div className="text-sm text-muted-foreground">Dự án</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">99%</div>
              <div className="text-sm text-muted-foreground">Hài lòng</div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={1.0} className="text-center">
          <Link href="/partners">
            <Button variant="outline" className="bg-card backdrop-blur-sm">
              Xem tất cả đối tác
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </FadeIn>
      </div>

      {/* Partner Modal */}
      <AnimatePresence>
        {showPartnerModal && selectedPartner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPartnerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-background rounded-lg shadow-lg overflow-hidden max-w-2xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Card>
                <CardHeader className="flex flex-col items-center pb-2">
                  <div className="relative w-full h-64">
                    <Image
                      src={selectedPartner.logo || '/placeholder-2.webp'}
                      alt={selectedPartner.name}
                      fill
                      className="object-contain mb-4 px-12"
                      priority
                    />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {selectedPartner.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-12">
                  <p className="text-muted-foreground text-lg mb-4">
                    {selectedPartner.description}
                  </p>

                  {/* THÔNG TIN CHUNG */}
                  <div className="grid grid-cols-2 gap-6 text-left">
                    {selectedPartner.type && (
                      <div>
                        <div className="font-bold">Loại hình</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.type}
                        </div>
                      </div>
                    )}
                    {selectedPartner.partnership && (
                      <div>
                        <div className="font-bold">Hợp tác từ</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.partnership}
                        </div>
                      </div>
                    )}

                    {/* TÙY THEO LOẠI PARTNER */}
                    {selectedPartner.projects && (
                      <div className="mb-4">
                        <div className="font-bold">Số dự án</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.projects}
                        </div>
                      </div>
                    )}

                    {selectedPartner.revenue && (
                      <div className="mb-4">
                        <div className="font-bold">Doanh thu</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.revenue}
                        </div>
                      </div>
                    )}

                    {selectedPartner.countries && (
                      <div className="mb-4">
                        <div className="font-bold">Quốc gia hoạt động</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.countries}
                        </div>
                      </div>
                    )}

                    {selectedPartner.agents && (
                      <div className="mb-4">
                        <div className="font-bold">Số lượng nhân viên</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.agents}
                        </div>
                      </div>
                    )}

                    {selectedPartner.loanRate && (
                      <div className="mb-4">
                        <div className="font-bold">Lãi suất</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.loanRate}
                        </div>
                      </div>
                    )}

                    {selectedPartner.maxLoan && (
                      <div className="mb-4">
                        <div className="font-bold">Tỷ lệ vay tối đa</div>
                        <div className="text-muted-foreground">
                          {selectedPartner.maxLoan}
                        </div>
                      </div>
                    )}

                    {selectedPartner.specialties?.length > 0 && (
                      <div className="mb-4">
                        <div className="font-bold">Chuyên môn</div>
                        <ul className="text-muted-foreground list-disc list-inside text-left">
                          {selectedPartner.specialties.map(
                            (item: any, index: any) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {selectedPartner.benefits?.length > 0 && (
                      <div className="mb-4">
                        <div className="font-bold">Lợi ích</div>
                        <ul className="text-muted-foreground list-disc list-inside text-left">
                          {selectedPartner.benefits.map(
                            (item: any, index: any) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}

                    {selectedPartner.achievements?.length > 0 && (
                      <div>
                        <div className="font-bold">Thành tựu</div>
                        <ul className="text-muted-foreground list-disc list-inside text-left">
                          {selectedPartner.achievements.map(
                            (item: any, index: any) => (
                              <li key={index}>{item}</li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
