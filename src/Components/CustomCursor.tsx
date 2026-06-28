import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return;
    }

    setHidden(false);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Initial position off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    let firstMove = true;
    const handleMouseMove = (e: MouseEvent) => {
      if (firstMove) {
        gsap.set([dot, ring], { opacity: 1 });
        firstMove = false;
      }

      // Small dot follows mouse exactly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Larger ring lags behind for a organic trailing effect
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeaveWindow = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const handleMouseEnterWindow = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Interactive Hover States
    const addHoverState = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      let scale = 1.6;
      let border = 'rgba(44, 49, 43, 0.8)';
      let bg = 'rgba(44, 49, 43, 0.05)';

      const text = target.textContent?.toLowerCase() || '';
      const href = target.getAttribute('href') || '';

      if (text.includes('home') || href === '/') {
        border = 'rgba(16, 185, 129, 0.8)'; // emerald
        bg = 'rgba(16, 185, 129, 0.1)';
      } else if (text.includes('about')) {
        border = 'rgba(245, 158, 11, 0.8)'; // amber
        bg = 'rgba(245, 158, 11, 0.1)';
      } else if (text.includes('proj') || href.includes('projects')) {
        border = 'rgba(6, 182, 212, 0.8)'; // cyan
        bg = 'rgba(6, 182, 212, 0.1)';
      } else if (text.includes('touch') || text.includes('contact') || href.includes('mailto')) {
        border = 'rgba(244, 63, 94, 0.8)'; // rose
        bg = 'rgba(244, 63, 94, 0.1)';
      }

      gsap.to(ring, {
        scale: scale,
        borderColor: border,
        backgroundColor: bg,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(dot, {
        scale: 0.5,
        backgroundColor: border,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const removeHoverState = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(44, 49, 43, 0.3)',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#2C312B',
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const attachListeners = () => {
      const interactives = document.querySelectorAll('a, button, Link, [role="button"], .cursor-pointer, .group\\/card');
      interactives.forEach((item) => {
        item.addEventListener('mouseenter', addHoverState);
        item.addEventListener('mouseleave', removeHoverState);
      });
    };

    // Attach listener immediately
    attachListeners();

    // Re-attach when DOM changes (e.g. page changes/navigation)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      observer.disconnect();
      
      const interactives = document.querySelectorAll('a, button, Link, [role="button"], .cursor-pointer, .group\\/card');
      interactives.forEach((item) => {
        item.removeEventListener('mouseenter', addHoverState);
        item.removeEventListener('mouseleave', removeHoverState);
      });
    };
  }, []);

  if (hidden) return null;

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999] custom-cursor">
      {/* Outer trailing ring */}
      <div
        ref={cursorRingRef}
        className="fixed w-8 h-8 rounded-full border border-[#2C312B]/35 bg-transparent pointer-events-none transition-transform duration-100 ease-out"
        style={{ willChange: 'transform', opacity: 0 }}
      />
      {/* Inner precise dot */}
      <div
        ref={cursorDotRef}
        className="fixed w-1.5 h-1.5 rounded-full bg-[#2C312B] pointer-events-none"
        style={{ willChange: 'transform', opacity: 0 }}
      />
    </div>
  );
}
