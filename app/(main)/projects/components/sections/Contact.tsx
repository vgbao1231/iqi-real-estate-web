'use client';

import { FadeIn } from '@/components/common/animations';
import { LayoutPreview } from '@/components/common/contact-layout';
import { contact } from '@/lib/contact-data';
import { forwardRef } from 'react';

const Contact = forwardRef<HTMLElement, { data: any }>(({ data }, ref) => {
  return (
    <FadeIn direction="none" delay={0.4}>
      <section ref={ref} id="contact" className="relative">
        <LayoutPreview
          layoutId={data.layoutId}
          contact={data}
          contactData={contact}
        />
      </section>
    </FadeIn>
  );
});
Contact.displayName = 'Contact';
export default Contact;
