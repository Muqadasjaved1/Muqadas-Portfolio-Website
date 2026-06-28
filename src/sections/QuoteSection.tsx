import { ClipPathReveal, ClipRevealItem } from '@/Components/ClipPathReveal';
import { ScrollLetterText } from '@/Components/ScrollLetterText';

export function QuoteSection() {
  return (
    <section className="relative bg-[#A8B8A6] py-[120px] md:py-[220px] px-4 md:px-[12vw] overflow-hidden">
      {/* Background radial highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-25 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(249,246,241,0.9) 0%, transparent 70%)' }}
      />

      {/* Elegant Large Watermark Quote Mark */}
      <div className="absolute top-8 left-10 md:left-24 text-[#2C312B]/5 font-serif text-[180px] md:text-[320px] select-none pointer-events-none leading-none">
        &ldquo;
      </div>
      <div className="absolute bottom-8 right-10 md:right-24 text-[#2C312B]/5 font-serif text-[180px] md:text-[320px] select-none pointer-events-none leading-none">
        &rdquo;
      </div>

      <ClipPathReveal>
        <div className="max-w-[70ch] mx-auto text-center relative z-10">
          {/* Decorative line */}
          <ClipRevealItem className="flex justify-center mb-10">
            <div className="w-[80px] h-[1.5px] bg-[#2C312B]/15" />
          </ClipRevealItem>

          {/* Quote */}
          <ClipRevealItem>
            <ScrollLetterText
              text="Building a future where technology meets creativity."
              tag="p"
              italicWords={['creativity.']}
              className="font-serif text-[38px] md:text-[60px] leading-[1.15em] md:leading-[70px] text-[#2C312B] mb-10 tracking-tight"
            />
          </ClipRevealItem>

          {/* Author */}
          <ClipRevealItem>
            <span className="label text-[#2C312B] text-[13px] tracking-widest font-sans font-semibold">&mdash; Muqadas Javed</span>
          </ClipRevealItem>
        </div>
      </ClipPathReveal>
    </section>
  );
}

