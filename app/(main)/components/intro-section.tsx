'use client';

import { FadeIn } from '../../../components/common/animations';
import Header from '../layout/header';

interface IntroSectionProps {
  title: string;
  description: string;
  badgeText?: string;
  backLinkHref?: string;
  backLinkLabel?: string;
}

export default function IntroSection({
  title,
  description,
}: IntroSectionProps) {
  return (
    <>
      <Header heroId="intro" />
      <section
        id="intro"
        className="py-12 md:px-12 bg-gradient-to-br from-orange-400/90 via-orange-400 to-orange-500 dark:from-orange-400 dark:to-orange-600 pt-28"
      >
        <div className="container mx-auto px-4 relative z-10 text-white">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-xl max-w-3xl">{description}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
