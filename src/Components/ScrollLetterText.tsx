import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollVelocity } from '@/hooks/useScrollVelocity';

gsap.registerPlugin(ScrollTrigger);

interface ScrollLetterTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  italicWords?: string[];
  scrollRotate?: boolean;
  velocityRotate?: boolean;
}

export function ScrollLetterText({
  text,
  tag: Tag = 'h2',
  className = '',
  italicWords = [],
  scrollRotate = true,
  velocityRotate = false,
}: ScrollLetterTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const velocity = useScrollVelocity();

  // Randomized rotation params per letter
  const letterParams = useMemo(() => {
    return text.split('').map(() => ({
      maxRotation: 0.2 + Math.random() * 0.8,
      delay: Math.random() * 0.3,
    }));
  }, [text]);

  // Scroll-linked rotation
  useEffect(() => {
    if (!scrollRotate || !containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.scroll-letter');
    if (letters.length === 0) return;

    gsap.set(letters, { rotationX: 90, opacity: 0, transformOrigin: 'center bottom' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 1,
      },
    });

    tl.to(letters, {
      rotationX: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.02,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
    };
  }, [scrollRotate]);

  // Velocity-linked rotation
  useEffect(() => {
    if (!velocityRotate || !containerRef.current) return;

    const letters = containerRef.current.querySelectorAll('.scroll-letter');
    letters.forEach((letter, i) => {
      const params = letterParams[i];
      const targetRotation = velocity * params.maxRotation * 5;
      gsap.to(letter, {
        rotationX: targetRotation,
        duration: 0.3,
        delay: params.delay,
        ease: 'power2.out',
      });
    });
  }, [velocity, velocityRotate, letterParams]);

  // Split text into words and check for italic
  const words = text.split(' ');

  return (
    <Tag ref={containerRef as any} className={className} style={{ perspective: '600px' }}>
      {words.map((word, wordIndex) => {
        const isItalic = italicWords.includes(word);
        const isLast = wordIndex === words.length - 1;

        return (
          <span
            key={wordIndex}
            className={`scroll-letter inline-block ${isItalic ? 'italic' : ''}`}
            style={{ willChange: 'transform, opacity' }}
          >
            {word}
            {!isLast && '\u00A0'}
          </span>
        );
      })}
    </Tag>
  );
}
