import { ClipPathReveal, ClipRevealItem } from '@/Components/ClipPathReveal';

export function EducationSection() {
  return (
    <section className="relative bg-[#F9F6F1] pt-[100px] md:pt-[180px] pb-[80px] md:pb-[140px] px-4 md:px-[12vw] overflow-hidden">
      {/* Soft background light highlight */}
      <div
        className="absolute top-10 right-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(0,86,255,0.15) 0%, transparent 70%)' }}
      />

      <ClipPathReveal>
        <ClipRevealItem>
          <span className="label block mb-12 text-glow-blue-subtle font-semibold tracking-widest">EDUCATION</span>
        </ClipRevealItem>

        <div className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-16 pl-0 md:pl-16">
          {/* Vertical Timeline Guide Line */}
          <div className="absolute left-[31px] top-6 bottom-6 w-[1.5px] bg-[#0056FF]/30 hidden md:block" />

          {/* Timeline Node Dot */}
          <div className="absolute left-[24px] top-7 w-[16px] h-[16px] rounded-full bg-[#0056FF] border-[3px] border-[#F9F6F1] shadow-[0_0_10px_rgba(0,86,255,0.6)] z-10 hidden md:block" />

          {/* Year Display Number */}
          <ClipRevealItem className="md:w-[180px] flex-shrink-0 relative z-10">
            <div className="display-number font-serif font-light tracking-tight text-glow-blue-vibrant">
              <span className="block text-[36px] md:text-[48px] leading-none">2024</span>
              <span className="block text-[#0056FF]/60 text-[24px] my-1">&mdash;</span>
              <span className="block text-[36px] md:text-[48px] leading-none">2028</span>
            </div>
          </ClipRevealItem>

          {/* Content Card */}
          <div className="flex-1 relative z-10">
            <div className="p-6 md:p-8 rounded-3xl border border-[#0056FF]/15 bg-white shadow-[0_15px_40px_rgba(0,86,255,0.04)] hover:shadow-[0_20px_50px_rgba(0,86,255,0.08)] transition-all duration-500 hover:border-[#0056FF]/35 hover:-translate-y-0.5">
              <ClipRevealItem>
                <h3 className="text-glow-blue-vibrant text-[26px] md:text-[34px] font-serif font-light mb-2 leading-tight">
                  Bachelor of Software Engineering
                </h3>
              </ClipRevealItem>
              <ClipRevealItem>
                <p className="label text-glow-blue-subtle text-[12px] tracking-widest font-sans font-semibold mb-6">
                  VIRTUAL UNIVERSITY OF PAKISTAN
                </p>
              </ClipRevealItem>
              <ClipRevealItem>
                <p className="font-sans text-[15px] leading-relaxed text-glow-blue-dark max-w-[60ch]">
                  Currently pursuing a comprehensive degree program covering software development,
                  database systems, programming fundamentals, and modern engineering principles.
                </p>
              </ClipRevealItem>
            </div>
          </div>
        </div>
      </ClipPathReveal>
    </section>
  );
}

