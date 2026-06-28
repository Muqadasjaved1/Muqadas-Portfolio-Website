import { useState } from 'react';

interface SkillTagProps {
  skill: string;
}

const colors = [
  {
    name: 'blue',
    text: 'text-[#0052FF]',
    border: 'border-[#0052FF]/20',
    hoverBorder: 'hover:border-[#0052FF]',
    hoverBg: 'hover:bg-[#0052FF]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(0,82,255,0.22)]',
    glow: 'rgba(0, 82, 255, 0.3)',
    dot: 'bg-[#0052FF]',
  },
  {
    name: 'violet',
    text: 'text-[#8B5CF6]',
    border: 'border-[#8B5CF6]/20',
    hoverBorder: 'hover:border-[#8B5CF6]',
    hoverBg: 'hover:bg-[#8B5CF6]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(139,92,246,0.22)]',
    glow: 'rgba(139, 92, 246, 0.3)',
    dot: 'bg-[#8B5CF6]',
  },
  {
    name: 'emerald',
    text: 'text-[#10B981]',
    border: 'border-[#10B981]/20',
    hoverBorder: 'hover:border-[#10B981]',
    hoverBg: 'hover:bg-[#10B981]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(16,185,129,0.22)]',
    glow: 'rgba(16, 185, 129, 0.3)',
    dot: 'bg-[#10B981]',
  },
  {
    name: 'rose',
    text: 'text-[#F43F5E]',
    border: 'border-[#F43F5E]/20',
    hoverBorder: 'hover:border-[#F43F5E]',
    hoverBg: 'hover:bg-[#F43F5E]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(244,63,94,0.22)]',
    glow: 'rgba(244, 63, 94, 0.3)',
    dot: 'bg-[#F43F5E]',
  },
  {
    name: 'amber',
    text: 'text-[#F59E0B]',
    border: 'border-[#F59E0B]/20',
    hoverBorder: 'hover:border-[#F59E0B]',
    hoverBg: 'hover:bg-[#F59E0B]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(245,158,11,0.22)]',
    glow: 'rgba(245, 158, 11, 0.3)',
    dot: 'bg-[#F59E0B]',
  },
  {
    name: 'cyan',
    text: 'text-[#06B6D4]',
    border: 'border-[#06B6D4]/20',
    hoverBorder: 'hover:border-[#06B6D4]',
    hoverBg: 'hover:bg-[#06B6D4]/5',
    shadow: 'hover:shadow-[0_12px_24px_rgba(6,182,212,0.22)]',
    glow: 'rgba(6, 182, 212, 0.3)',
    dot: 'bg-[#06B6D4]',
  },
];

const getSkillColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export function SkillTag({ skill }: SkillTagProps) {
  const [hovered, setHovered] = useState(false);
  const color = getSkillColor(skill);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        inline-flex items-center gap-3 px-6 py-3 mb-4 mr-4
        font-serif text-[18px] md:text-[22px] font-medium
        bg-white rounded-full border ${color.border} ${color.text} ${color.hoverBorder} ${color.hoverBg} ${color.shadow}
        transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        cursor-pointer select-none
        hover:-translate-y-[6px] hover:scale-[1.03]
      `}
      style={{
        textShadow: hovered ? `0 0 8px ${color.glow}` : 'none',
      }}
    >
      {/* Decorative pulse dot */}
      <span className={`relative flex h-2 w-2 flex-shrink-0 transition-transform duration-300 ${hovered ? 'scale-125' : ''}`}>
        {hovered && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color.dot}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${color.dot} transition-colors duration-300`}></span>
      </span>
      {skill}
    </span>
  );
}
