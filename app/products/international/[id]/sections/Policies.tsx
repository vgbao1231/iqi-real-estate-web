'use client';

import { Handshake } from 'lucide-react';

import { FadeIn } from '@/components/common/animations';
import { forwardRef } from 'react';

const Policies = forwardRef<HTMLElement, { property: any }>(
  ({ property }, ref) => {
    return (
      <FadeIn delay={0.3}>
        <section ref={ref} id="policies" className="w-full bg-background py-16">
          <div className="mx-auto max-w-7xl space-y-8 px-4">
            <h3 className="mb-4 flex items-center text-2xl font-bold text-emerald-500 ">
              <Handshake className="mr-3 h-6 w-6" />
              Chính sách & Ưu đãi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {property.policies.map((p: any) => (
                <div
                  key={p.title}
                  className="rounded-lg border-l-4 border-emerald-500 py-4 px-6 bg-card shadow-md"
                >
                  <h4 className="mb-2 text-lg font-semibold text-emerald-500">
                    {p.title}
                  </h4>
                  <p className="leading-relaxed text-sm text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>
    );
  }
);
Policies.displayName = 'Policies';
export default Policies;
