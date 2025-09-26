import Image from 'next/image';

export const SectionBreak = ({ data }: any) =>
  data && (
    <section className="w-full">
      <Image
        src={data?.url || 'placeholder.svg'}
        alt="Break Image"
        width={1920}
        height={1080}
        className="w-full h-auto"
        priority
      />
    </section>
  );
