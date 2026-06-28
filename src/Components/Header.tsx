import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
interface NavLinkProps {
  to: string;
  label: string | React.ReactNode;
  isActive: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  isMailto?: boolean;
  glowColor: string;
  glowBorder: string;
  glowBg: string;
  hoverTextColor: string;
  mobile?: boolean;
}

function GlowingNavLink({
  to,
  label,
  isActive,
  onClick,
  isMailto = false,
  glowColor,
  glowBorder,
  glowBg,
  hoverTextColor,
  mobile = false,
}: NavLinkProps) {
  const [hovered, setHovered] = useState(false);

  const linkContent = (
    <>
      {/* Soft Glow Shadow Layer — uses box-shadow, no blur filter on text layer */}
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-all duration-300 pointer-events-none"
        style={{
          boxShadow: hovered ? `0 0 18px 4px ${glowColor}` : 'none',
          opacity: hovered ? 0.7 : 0,
        }}
      />
      {/* Outline Capsule layer */}
      <span
        className="absolute inset-0 rounded-full transition-all duration-300 scale-90 opacity-0 pointer-events-none"
        style={{
          border: hovered ? `1px solid ${glowBorder}` : '1px solid transparent',
          backgroundColor: hovered ? glowBg : 'transparent',
          transform: hovered ? 'scale(1)' : 'scale(0.9)',
          opacity: hovered ? 1 : 0,
        }}
      />
      {/* Link Text / Icon */}
      <span
        className={`
          relative z-10 font-sans uppercase tracking-[0.6px] transition-colors duration-300 ease-in-out
          ${mobile ? 'text-[11px] font-semibold' : 'text-[13px] font-medium'}
          ${isActive ? 'text-[#2C312B] font-semibold' : 'text-[#2C312B]/45'}
          ${hovered ? hoverTextColor : ''}
        `}
      >
        {label}
      </span>
    </>
  );

  const baseClass = `
    relative rounded-full flex items-center justify-center transition-all duration-300 select-none cursor-pointer
    ${mobile ? 'px-2.5 py-1' : 'px-4 py-1.5'}
  `;

  if (isMailto) {
    return (
      <a
        href={to}
        className={baseClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {linkContent}
      </a>
    );
  }

  return (
    <Link
      to={to}
      className={baseClass}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {linkContent}
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // clear hash
      window.history.pushState('', document.title, window.location.pathname);
    }
  };

  const handleAboutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // set hash
        window.history.pushState('', document.title, '#about');
      }
    }
  };

  // Determine which routes are active
  const isHomeActive = location.pathname === '/' && location.hash !== '#about';
  const isAboutActive = location.pathname === '/' && location.hash === '#about';
  const isProjectActive = location.pathname === '/projects';

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[400]
        h-[56px] flex items-center justify-between
        px-4 md:px-[4vw]
        bg-[#F9F6F1] border-b
        transition-all duration-300 ease-in-out group
        ${scrolled ? 'shadow-[0_2px_20px_rgba(44,49,43,0.06)] border-[#2C312B]/10' : 'border-[#2C312B]/8'}
      `}
    >
      {/* Green bottom glow line when header is hovered */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent opacity-0 scale-x-75 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-500 ease-in-out shadow-[0_1px_8px_#10B981,0_0_4px_rgba(16,185,129,0.4)] pointer-events-none" />

      {/* Logo */}
      <Link
        to="/"
        onClick={handleHomeClick}
        className="flex items-center gap-2.5 hover:opacity-90 transition-opacity duration-300 z-10"
      >
        <img
          src="/assets/logo.jpg"
          alt="Muqadas Javed Logo"
          className="w-[36px] h-[36px] md:w-[40px] md:h-[40px] rounded-full object-cover border border-[#2C312B]/12 shadow-sm"
        />
        <span className="font-serif text-[18px] md:text-[20px] font-semibold text-[#2C312B] tracking-wide leading-none">
          Muqadas Javed
        </span>
      </Link>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-4 z-10">
        <GlowingNavLink
          to="/"
          label="Home"
          isActive={isHomeActive}
          onClick={handleHomeClick}
          glowColor="rgba(16, 185, 129, 0.4)"
          glowBorder="rgba(16, 185, 129, 0.35)"
          glowBg="rgba(16, 185, 129, 0.08)"
          hoverTextColor="text-emerald-700"
        />
        <GlowingNavLink
          to="/#about"
          label="About"
          isActive={isAboutActive}
          onClick={handleAboutClick}
          glowColor="rgba(245, 158, 11, 0.4)"
          glowBorder="rgba(245, 158, 11, 0.35)"
          glowBg="rgba(245, 158, 11, 0.08)"
          hoverTextColor="text-amber-700"
        />
        <GlowingNavLink
          to="/projects"
          label="Projects"
          isActive={isProjectActive}
          glowColor="rgba(6, 182, 212, 0.4)"
          glowBorder="rgba(6, 182, 212, 0.35)"
          glowBg="rgba(6, 182, 212, 0.08)"
          hoverTextColor="text-cyan-700"
        />
      </nav>

      {/* Get In Touch Button (Desktop) */}
      <div className="hidden md:block z-10">
        <GlowingNavLink
          to="mailto:hareemfatima8652@gmail.com"
          label="Get In Touch"
          isActive={false}
          isMailto={true}
          glowColor="rgba(244, 63, 94, 0.4)"
          glowBorder="rgba(244, 63, 94, 0.35)"
          glowBg="rgba(244, 63, 94, 0.08)"
          hoverTextColor="text-rose-700"
        />
      </div>

      {/* Mobile Navigation Links (Mobile) */}
      <div className="flex md:hidden items-center gap-1 z-10">
        <GlowingNavLink
          to="/"
          label="Home"
          isActive={isHomeActive}
          onClick={handleHomeClick}
          glowColor="rgba(16, 185, 129, 0.4)"
          glowBorder="rgba(16, 185, 129, 0.3)"
          glowBg="rgba(16, 185, 129, 0.06)"
          hoverTextColor="text-emerald-700"
          mobile={true}
        />
        <GlowingNavLink
          to="/#about"
          label="About"
          isActive={isAboutActive}
          onClick={handleAboutClick}
          glowColor="rgba(245, 158, 11, 0.4)"
          glowBorder="rgba(245, 158, 11, 0.3)"
          glowBg="rgba(245, 158, 11, 0.06)"
          hoverTextColor="text-amber-700"
          mobile={true}
        />
        <GlowingNavLink
          to="/projects"
          label="Proj"
          isActive={isProjectActive}
          glowColor="rgba(6, 182, 212, 0.4)"
          glowBorder="rgba(6, 182, 212, 0.3)"
          glowBg="rgba(6, 182, 212, 0.06)"
          hoverTextColor="text-cyan-700"
          mobile={true}
        />
        <GlowingNavLink
          to="mailto:hareemfatima8652@gmail.com"
          label={
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          }
          isActive={false}
          isMailto={true}
          glowColor="rgba(244, 63, 94, 0.4)"
          glowBorder="rgba(244, 63, 94, 0.3)"
          glowBg="rgba(244, 63, 94, 0.06)"
          hoverTextColor="text-rose-700"
          mobile={true}
        />
      </div>
    </header>
  );
}

