export function Footer() {
  const marqueeText = "Let's Connect \u00B7 ";
  const repeatedText = marqueeText.repeat(10);

  return (
    <footer className="w-full bg-[#A8B8A6] relative overflow-hidden">
      {/* Soft dark-green gradient overlay at bottom for designer touch */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C312B]/10 to-transparent pointer-events-none" />

      {/* Marquee */}
      <div className="overflow-hidden py-10 md:py-14 border-b border-[rgba(44,49,43,0.1)] relative z-10">
        <div className="marquee-track whitespace-nowrap flex">
          <span className="font-serif text-[60px] md:text-[90px] text-[#2C312B] leading-none tracking-tight">
            {repeatedText}
          </span>
          <span className="font-serif text-[60px] md:text-[90px] text-[#2C312B] leading-none tracking-tight">
            {repeatedText}
          </span>
        </div>
      </div>

      {/* Footer Content */}
      <div className="px-4 md:px-[4vw] py-10 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Copyright */}
        <p className="font-sans text-[12px] text-[#2C312B]/75 order-3 md:order-1 font-medium tracking-wider uppercase">
          &copy; 2024 Muqadas Javed. All rights reserved.
        </p>

        {/* Social Links with premium glassmorphic rings */}
        <div className="flex items-center gap-4 order-1 md:order-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#2C312B]/15 bg-[rgba(44,49,43,0.04)] hover:bg-[rgba(44,49,43,0.1)] hover:border-[#2C312B]/35 flex items-center justify-center text-[#2C312B] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-[#2C312B]/15 bg-[rgba(44,49,43,0.04)] hover:bg-[rgba(44,49,43,0.1)] hover:border-[#2C312B]/35 flex items-center justify-center text-[#2C312B] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a
            href="mailto:hareemfatima8652@gmail.com"
            className="w-10 h-10 rounded-full border border-[#2C312B]/15 bg-[rgba(44,49,43,0.04)] hover:bg-[rgba(44,49,43,0.1)] hover:border-[#2C312B]/35 flex items-center justify-center text-[#2C312B] hover:-translate-y-1 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        {/* Get In Touch Pill Button */}
        <a
          href="mailto:hareemfatima8652@gmail.com"
          className="
            relative px-5 py-2.5 rounded-full border border-[#2C312B]/20
            font-sans text-[12px] uppercase tracking-[0.8px] font-semibold
            text-[#2C312B] bg-[rgba(44,49,43,0.03)]
            hover:text-white hover:border-[#2C312B]/80 hover:bg-[#2C312B] hover:-translate-y-0.5
            transition-all duration-300 ease-in-out order-2 md:order-3 shadow-[0_4px_14px_rgba(44,49,43,0.02)]
            hover:shadow-[0_8px_20px_rgba(44,49,43,0.15)]
          "
        >
          Get In Touch
        </a>
      </div>
    </footer>
  );
}

