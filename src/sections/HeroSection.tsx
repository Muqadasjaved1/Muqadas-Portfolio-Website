import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HeroImageFrame } from '@/Components/HeroImageFrame';
import { ScrollLetterText } from '@/Components/ScrollLetterText';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.hero-reveal-item');
    gsap.set(items, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(items, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-56px)] bg-[#A8B8A6] flex flex-col justify-between pt-10 pb-14 px-4 md:px-[12vw] overflow-hidden"
    >
      {/* Large decorative radial glow — top right */}
      <div
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(249,246,241,0.9) 0%, transparent 65%)' }}
      />
      {/* Bottom left subtle glow */}
      <div
        className="absolute bottom-0 -left-10 w-[300px] h-[300px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(44,49,43,0.3) 0%, transparent 70%)' }}
      />

      {/* Top label */}
      <div className="hero-reveal-item relative z-10 flex items-center justify-between">
        <span className="label text-[#2C312B]">PORTFOLIO · 2024</span>
        <span className="label text-[#2C312B]/50 hidden md:block">SOFTWARE ENGINEERING STUDENT</span>
      </div>

      {/* Centre — Image */}
      <div className="hero-reveal-item flex-1 flex items-center justify-center py-8 relative z-10">
        <HeroImageFrame />
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {/* Main heading */}
        <div className="hero-reveal-item max-w-[520px]">
          <ScrollLetterText
            text="Hello, I'm Muqadas Javed"
            tag="h1"
            italicWords={['Muqadas']}
            className="text-[#2C312B] text-[40px] md:text-[62px] leading-[0.95em]"
          />
        </div>

        {/* Subtitle + scroll cue */}
        <div className="hero-reveal-item flex flex-col items-start md:items-end gap-4 max-w-[44ch]">
          <p className="font-sans text-[15px] leading-relaxed tracking-[0.2px] md:text-right text-glow-blue-vibrant font-medium">
            Software Engineering Student passionate about creating elegant solutions.
            With a strong foundation in programming and design, I bring creativity and
            technical expertise to every project.
          </p>
          {/* Scroll indicator */}
          <div className="flex items-center gap-2 text-glow-blue-subtle">
            <div className="w-5 h-8 rounded-full border-2 border-[#0056FF]/55 flex items-start justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-[#0056FF] animate-bounce" />
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.15em] font-semibold">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
