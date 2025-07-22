'use client';

import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { FadeIn } from '@/components/common/animations';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { forwardRef } from 'react';

const Contact = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <FadeIn delay={0.4}>
        <section ref={ref} id="contact" className="relative">
          <div className="bg-gradient-to-r !from-green-600 !via-emerald-600 !to-teal-600 py-20">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <h3 className="text-4xl font-bold">Liên hệ tư vấn</h3>
                <p className="text-xl text-green-100 max-w-2xl mx-auto">
                  Đội ngũ chuyên viên tư vấn sẵn sàng hỗ trợ bạn 24/7. Liên hệ
                  ngay để nhận thông tin chi tiết và ưu đãi đặc biệt!
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12">
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-green-50 h-12"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Gọi ngay: 1900 xxxx
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-green-50 h-12"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat Zalo
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-green-50 h-12"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email tư vấn
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </FadeIn>
    );
  }
);
Contact.displayName = 'Contact';
export default Contact;
