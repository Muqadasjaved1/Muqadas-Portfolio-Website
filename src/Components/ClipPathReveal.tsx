import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ClipPathRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
}

export function ClipPathReveal({
  children,
  delay = 0,
  duration = 0.8,
  className = '',
  stagger = 0.15,
}: ClipPathRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.clip-reveal-item');
    if (elements.length === 0) return;

    gsap.set(elements, {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        once: true,
      },
      delay,
    });

    tl.to(elements, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration,
      stagger,
      ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
    });

    return () => {
      tl.kill();
    };
  }, [delay, duration, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function ClipRevealItem({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`clip-reveal-item ${className}`} style={{ willChange: 'clip-path, opacity' }}>
      {children}
    </div>
  );
}
