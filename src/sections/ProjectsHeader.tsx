import { ScrollLetterText } from '@/Components/ScrollLetterText';

export function ProjectsHeader() {
  return (
    <section className="relative bg-[#F9F6F1] pt-[calc(52px+60px)] md:pt-[calc(52px+100px)] pb-[50px] md:pb-[70px] px-4 md:px-[12vw] overflow-hidden">
      {/* Soft background light highlight */}
      <div
        className="absolute top-10 right-[-100px] w-[350px] h-[350px] rounded-full pointer-events-none opacity-20 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(168,184,166,0.6) 0%, transparent 70%)' }}
      />
      
      {/* Decorative Dot Grid */}
      <div className="absolute top-12 left-6 w-[80px] h-[80px] opacity-10 pointer-events-none hidden md:block">
        <svg width="100%" height="100%" className="text-[#2C312B]">
          <pattern id="header-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#header-dots)" />
        </svg>
      </div>

      <div className="relative z-10">
        <ScrollLetterText
          text="My Projects"
          tag="h1"
          italicWords={['Projects']}
          className="text-[#2C312B] text-[44px] md:text-[68px] leading-[0.95em] mb-6 font-serif"
        />
        <p className="font-sans text-[15px] leading-relaxed tracking-[0.5px] text-[rgba(44,49,43,0.7)] max-w-[60ch]">
          A collection of my work spanning web development, education, and creative design.
          Each project represents my dedication to quality, creativity, and continuous learning.
        </p>
      </div>
    </section>
  );
}

