import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const dampedVelocityRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        const currentScroll = window.scrollY;
        const currentTime = Date.now();
        const delta = currentScroll - lastScrollRef.current;
        const dt = Math.max(currentTime - lastTimeRef.current, 1);
        const rawVelocity = delta / dt;

        // Lerp damping
        dampedVelocityRef.current += (rawVelocity - dampedVelocityRef.current) * 0.1;
        setVelocity(dampedVelocityRef.current);

        lastScrollRef.current = currentScroll;
        lastTimeRef.current = currentTime;
        rafRef.current = undefined as number | undefined;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return velocity;
}
