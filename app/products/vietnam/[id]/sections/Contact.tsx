'use client';

import { FadeIn } from '@/components/common/animations';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { forwardRef, useState } from 'react';

const Contact = forwardRef<HTMLElement, { data: any; products: any }>(
  ({ data, products }, ref) => {
    const [product, setProduct] = useState<string>('');
    console.log(product);

    const productOptions = products.map((p: any) => ({
      value: p.id,
      label: p.name,
    }));

    const handleProductChange = (product: string) => {
      setProduct(product);
    };

    return (
      <FadeIn direction="none" delay={0.4}>
        <section ref={ref} id="contact" className="relative">
          {/* Background image full screen */}
          <Image
            src={data.backgroundImage}
            alt="Eco Retreat Contact Background"
            fill
            className="object-cover"
            priority
          />
          <div className="bg-gradient-to-b from-black/30 to-black/70 absolute inset-0 z-10"></div>
          <div className="relative z-20 center-both flex-col gap-4 p-8 text-center text-white">
            {/* Logo */}
            <div className="w-36 h-32 relative center-both">
              <Image
                src={data.logoImage}
                alt="Eco Retreat Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Subtitle */}
            <p className="italic text-2xl text-orange-200 max-w-2xl mb-6">
              Quý Anh/Chị đăng ký tại đây để nhận tư vấn thông tin về khu đô thị
              sinh thái kiểu mẫu của Ecopark tại miền Nam.
            </p>

            {/* Form */}
            <form className="flex flex-col md:flex-row gap-3 w-full max-w-5xl justify-center mb-6">
              <Input
                placeholder="Họ tên (*)"
                className="w-full md:w-1/4 px-4 py-2 rounded focus:outline-none text-foreground bg-background border border-border"
              />
              <Input
                type="tel"
                placeholder="Số điện thoại (*)"
                className="w-full md:w-1/4 px-4 py-2 rounded focus:outline-none text-foreground bg-background border border-border"
              />
              <Combobox
                options={productOptions}
                value={product}
                onValueChange={handleProductChange}
                placeholder="Quan tâm sản phẩm ..."
                searchPlaceholder="Tìm sản phẩm..."
                emptyText="Không tìm thấy sản phẩm"
                className="w-full md:w-1/4 px-4 py-2 rounded focus:outline-none text-foreground bg-background border border-border"
              />
              <Button
                type="submit"
                className="w-full md:w-auto bg-orange-400 hover:bg-orange-500 font-semibold px-6 py-2 rounded"
              >
                NHẬN THÔNG TIN
              </Button>
            </form>

            {/* Hotline */}
            <p className="italic text-lg">HOTLINE: {data.hotline}</p>
          </div>
        </section>
      </FadeIn>
    );
  }
);
Contact.displayName = 'Contact';
export default Contact;
