import { useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPercent(Math.min(pct, 1));
      setVisible(pct > 0.15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SVG circle progress
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * scrollPercent;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 md:bottom-8 md:right-8
        z-[300] w-12 h-12
        flex items-center justify-center
        bg-[#2C312B] text-white
        rounded-full
        transition-all duration-500 ease-out
        hover:bg-[#3a4239] hover:scale-110 active:scale-95
        shadow-[0_4px_24px_rgba(44,49,43,0.25)]
        hover:shadow-[0_8px_32px_rgba(44,49,43,0.35)]
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 44 44"
      >
        <circle
          cx="22" cy="22" r={radius}
          fill="none"
          stroke="rgba(168,184,166,0.2)"
          strokeWidth="1.5"
        />
        <circle
          cx="22" cy="22" r={radius}
          fill="none"
          stroke="#A8B8A6"
          strokeWidth="1.5"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.1s linear' }}
        />
      </svg>
      {/* Arrow */}
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
        <path d="M8 12V4M4 7l4-4 4 4" />
      </svg>
    </button>
  );
}
