import { useEffect, useRef, useState } from 'react';

export function useScrollProgress(startOffset = 0, endOffset = 600) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== undefined) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const rawProgress = (scrollTop - startOffset) / (endOffset - startOffset);
        setProgress(Math.max(0, Math.min(1, rawProgress)));
        rafRef.current = undefined as number | undefined;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startOffset, endOffset]);

  return progress;
}
