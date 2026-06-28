import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipPathReveal, ClipRevealItem } from '@/Components/ClipPathReveal';

gsap.registerPlugin(ScrollTrigger);

interface CardProps {
  number: string;
  title: string;
  description: string;
  glowColor: string;
  icon: React.ReactNode;
}

interface StatProps {
  value: string;
  label: string;
}

function AboutCard({ number, title, description, glowColor, icon }: CardProps) {
  return (
    <div
      className="relative p-6 rounded-3xl border border-white/10 bg-[#3A4239] overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-white/25 group/card cursor-default shadow-[0_15px_30px_rgba(0,0,0,0.12)]"
      style={{ willChange: 'transform, border-color' }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none blur-[24px]"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[#A8B8A6]/75 tracking-wider">{number}</span>
          <div className="text-white/50 group-hover/card:text-white transition-colors duration-300">
            {icon}
          </div>
        </div>
        <div>
          <h4 className="text-[19px] font-serif text-white font-light leading-snug mb-2">
            {title}
          </h4>
          <p className="font-sans text-xs text-[#F9F6F1]/85 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCounter({ value, label }: StatProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numericValue = parseInt(value.replace(/\D/g, ''), 10);
    const suffix = value.replace(/[\d]/g, '');

    // Use a proxy object — gsap.to() requires a real object target, not a literal
    const proxy = { val: 0 };

    const tween = gsap.to(proxy, {
      val: numericValue,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        if (el) el.textContent = Math.round(proxy.val) + suffix;
      },
    });

    return () => {
      tween.kill();
    };
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <span ref={ref} className="font-serif text-[48px] md:text-[64px] text-[#F9F6F1] leading-none font-light">
        {value}
      </span>
      <span className="font-sans text-xs uppercase tracking-widest text-[#A8B8A6]/70">{label}</span>
    </div>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-[#2C312B] pt-[80px] md:pt-[140px] pb-[80px] md:pb-[140px] px-4 md:px-[12vw] overflow-hidden"
    >
      {/* Decorative large blurred orb in background */}
      <div
        className="absolute top-[-60px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(168,184,166,0.6) 0%, transparent 70%)' }}
      />

      <ClipPathReveal>
        {/* Section Label */}
        <ClipRevealItem>
          <span className="label block text-[#A8B8A6] mb-14 tracking-widest">ABOUT ME</span>
        </ClipRevealItem>

        {/* ─── Main Content Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* LEFT — Heading + Intro Text + CTA */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <ClipRevealItem>
              <h2 className="text-[#F9F6F1] text-[36px] md:text-[52px] leading-[0.98em] font-serif">
                Crafting interfaces,{' '}
                <span className="italic text-[#A8B8A6]">engineering logic.</span>
              </h2>
            </ClipRevealItem>

            <ClipRevealItem>
              <p className="font-sans text-[15px] leading-relaxed text-[#F9F6F1]/80 max-w-[42ch]">
                I am <strong className="text-[#F9F6F1] font-semibold">Muqadas Javed</strong>, a
                Software Engineering student at Virtual University of Pakistan who loves building
                polished, thoughtful, and responsive web projects. I specialise in bridging the
                gap between clean engineering structures and visual elegance.
              </p>
            </ClipRevealItem>

            {/* Stat numbers strip */}
            <ClipRevealItem>
              <div className="flex items-start gap-10 pt-4 border-t border-white/10">
                <StatCounter value="4" label="Projects Built" />
                <StatCounter value="8+" label="Tech Stacks" />
              </div>
            </ClipRevealItem>

            {/* CTA */}
            <ClipRevealItem>
              <a
                href="mailto:hareemfatima8652@gmail.com"
                className="group/cta inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#A8B8A6]/30 text-[#A8B8A6] font-sans text-[13px] uppercase tracking-widest hover:bg-[#A8B8A6]/10 hover:border-[#A8B8A6]/60 transition-all duration-300 w-fit"
              >
                <span>Get In Touch</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </ClipRevealItem>
          </div>

          {/* RIGHT — Longer narrative + Cards */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <ClipRevealItem>
              <p className="font-sans text-[15px] leading-relaxed text-[#F9F6F1]/70 max-w-[65ch]">
                Currently pursuing my bachelor's degree, I focus on writing modular code,
                researching performance optimisation, and integrating seamless animations.
                I believe that digital tools should not only be highly functional but also
                a delight to use.
              </p>
            </ClipRevealItem>

            {/* Philosophy tags */}
            <ClipRevealItem>
              <div className="flex flex-wrap gap-2.5">
                {['MySQL', 'Postman', 'Git / Github', 'Visual Studio', 'SQL', 'HTML', 'CSS', 'JavaScript'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3.5 py-1.5 rounded-full border border-[#A8B8A6]/20 text-[#A8B8A6]/80 font-sans text-[11px] uppercase tracking-wider hover:border-[#A8B8A6]/50 hover:text-[#A8B8A6] transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </ClipRevealItem>

            {/* Core Values Cards */}
            <ClipRevealItem>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <AboutCard
                  number="01"
                  title="Creative Code"
                  description="Scalable web systems with React, TypeScript, and clean state management patterns."
                  glowColor="rgba(16, 185, 129, 0.3)"
                  icon={
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  }
                />
                <AboutCard
                  number="02"
                  title="Design Focus"
                  description="Close attention to motion, typography, and layouts to ensure every pixel is intentional."
                  glowColor="rgba(245, 158, 11, 0.3)"
                  icon={
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                  }
                />
                <AboutCard
                  number="03"
                  title="Responsive Dev"
                  description="Ensuring web solutions behave flawlessly from ultra-wide displays to handheld devices."
                  glowColor="rgba(6, 182, 212, 0.3)"
                  icon={
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  }
                />
              </div>
            </ClipRevealItem>
          </div>
        </div>
      </ClipPathReveal>
    </section>
  );
}
