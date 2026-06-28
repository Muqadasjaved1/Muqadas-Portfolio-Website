import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { src: '/assets/carousel-slide-1.jpg', alt: 'Code editor with portfolio website code' },
  { src: '/assets/carousel-slide-2.jpg', alt: 'Fashion design workspace with sketches' },
  { src: '/assets/carousel-slide-3.jpg', alt: 'Students engaged in learning' },
];

export function CarouselSection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  };

  const goNext = () => goTo(current + 1);
  const goPrev = () => goTo(current - 1);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    intervalRef.current = interval;
    return () => clearInterval(interval);
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const handleMouseLeave = () => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    intervalRef.current = interval;
  };

  // Entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.set(section, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(section, {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 0.8,
          ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
        });
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F9F6F1] py-[80px] md:py-[120px] px-4 md:px-[12vw] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Soft background light highlight */}
      <div
        className="absolute bottom-5 right-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(168,184,166,0.6) 0%, transparent 70%)' }}
      />

      <div className="mb-8 flex items-center justify-between">
        <span className="label text-[#2C312B]/70 tracking-widest">GALLERY</span>
        <span className="font-sans text-[13px] text-[#2C312B]/45 font-semibold tracking-wider">
          {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>

      {/* Carousel Wrapper */}
      <div className="relative overflow-hidden rounded-[2rem] border border-[#2C312B]/8 shadow-[0_24px_60px_rgba(44,49,43,0.07)] bg-[#EBE7E0]">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 aspect-[3/2] overflow-hidden">
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#2C312B]/10 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(44,49,43,0.08)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(44,49,43,0.12)] active:scale-95"
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#2C312B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-[#2C312B]/10 flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(44,49,43,0.08)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(44,49,43,0.12)] active:scale-95"
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="#2C312B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 12l4-4-4-4" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`
              h-2 rounded-full transition-all duration-500
              ${index === current ? 'bg-[#2C312B] w-6' : 'bg-[#2C312B]/20 w-2 hover:bg-[#2C312B]/45'}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

