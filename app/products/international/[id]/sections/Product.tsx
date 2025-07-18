'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function Product({ property }: any) {
  return (
    <section id="products" className="max-w-7xl mx-auto px-4 space-y-12">
      <h3 className="text-2xl font-bold mb-4 flex items-center text-purple-600">
        <Home className="w-6 h-6 mr-3" />
        Các loại sản phẩm
      </h3>
      <div className="space-y-12">
        {property.products.map((product: any, index: any) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.1 }}
            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}
          >
            <div className="relative h-[60vh] w-full rounded-lg overflow-hidden">
              <Image
                src={product.image || '/placeholder-2.webp'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-2xl text-foreground">
                {product.name}
              </h4>
              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {product.description}
              </p>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-muted-foreground text-base">Giá từ:</span>
                <span className="font-bold text-green-600 text-xl">
                  {product.price}
                </span>
              </div>
              {product.details && product.details.length > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-4">
                  {product.details.map((detail: any, detailIdx: any) => {
                    const IconComponent = detail.icon;
                    return (
                      <div
                        key={detailIdx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <IconComponent className="w-5 h-5 text-blue-600" />
                        <span>
                          <span className="font-medium">{detail.label}:</span>{' '}
                          {detail.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
