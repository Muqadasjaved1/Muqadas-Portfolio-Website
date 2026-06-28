import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroImageFrame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgFrameRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    const bgFrame = bgFrameRef.current;
    const grid = gridRef.current;
    const badge1 = badge1Ref.current;
    const badge2 = badge2Ref.current;
    const image = imageRef.current;

    if (!container || !card || !bgFrame || !grid || !badge1 || !badge2 || !image) return;

    gsap.set([card, bgFrame, grid], { opacity: 0, y: 30 });
    gsap.set([badge1, badge2], { opacity: 0, scale: 0.8 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to([grid, bgFrame, card], {
      opacity: 1,
      y: 0,
      duration: 1.0,
      stagger: 0.1,
      ease: 'power3.out',
    })
    .to([badge1, badge2], {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.7)',
    }, '-=0.4');

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const normX = (mouseX - centerX) / centerX;
      const normY = (mouseY - centerY) / centerY;

      const tiltX = -normY * 8;
      const tiltY = normX * 8;
      const cardMoveX = normX * 6;
      const cardMoveY = normY * 6;
      const bgMoveX = -normX * 12;
      const bgMoveY = -normY * 12;
      const gridMoveX = -normX * 10;
      const gridMoveY = -normY * 10;

      gsap.to(card, { rotateX: tiltX, rotateY: tiltY, x: cardMoveX, y: cardMoveY, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(bgFrame, { x: bgMoveX - 12, y: bgMoveY + 12, rotation: tiltY * 0.2, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(grid, { x: gridMoveX - 20, y: gridMoveY - 20, duration: 0.7, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(image, { scale: 1.04, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
      gsap.to(badge1, { x: cardMoveX + normX * 4, y: cardMoveY + normY * 4, duration: 0.4, ease: 'power2.out' });
      gsap.to(badge2, { x: cardMoveX + normX * 4, y: cardMoveY + normY * 4, duration: 0.4, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to([card, image, badge1, badge2], { x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(bgFrame, { x: -12, y: 12, rotation: 0, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
      gsap.to(grid, { x: -20, y: -20, duration: 0.8, ease: 'power3.out', overwrite: 'auto' });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-[280px] h-[370px] sm:w-[320px] sm:h-[420px] md:w-[350px] md:h-[460px] lg:w-[380px] lg:h-[500px] flex items-center justify-center cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      {/* Dot Grid */}
      <div
        ref={gridRef}
        className="absolute -top-5 -left-5 w-1/3 h-1/3 opacity-25 pointer-events-none"
        style={{ transform: 'translate(-20px, -20px)' }}
      >
        <svg width="100%" height="100%" className="text-[#2C312B]">
          <pattern id="dot-grid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      {/* Back Decorative Accent Frame */}
      <div
        ref={bgFrameRef}
        className="absolute inset-0 rounded-[32px] border-2 border-[#2C312B]/25 pointer-events-none"
        style={{ transform: 'translate(-12px, 12px)' }}
      />

      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative w-full h-full rounded-[32px] overflow-hidden border border-[#2C312B]/15 shadow-[0_30px_60px_-10px_rgba(44,49,43,0.22)] bg-[#EBE7E0]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Subtle inner highlight border */}
        <div className="absolute inset-0 rounded-[32px] border border-white/30 pointer-events-none z-10" />

        {/* Portrait image */}
        <img
          ref={imageRef}
          src="/assets/portrait-photo.jpg"
          alt="Muqadas Javed Portrait"
          className="w-full h-full object-cover select-none pointer-events-none"
          style={{ transformOrigin: 'center center' }}
        />

        {/* Bottom fade for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C312B]/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Badge 1 — Bottom Left — solid bg, NO backdrop-blur */}
      <div
        ref={badge1Ref}
        className="absolute bottom-6 -left-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#2C312B]/10 shadow-[0_8px_24px_rgba(44,49,43,0.10)] pointer-events-none animate-badge-float"
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-[#2C312B]">
          Available for projects
        </span>
      </div>

      {/* Badge 2 — Top Right — solid bg, NO backdrop-blur */}
      <div
        ref={badge2Ref}
        className="absolute -top-4 -right-6 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2C312B] border border-white/10 shadow-[0_8px_24px_rgba(44,49,43,0.18)] pointer-events-none animate-badge-float-delayed"
      >
        <code className="px-1.5 py-0.5 rounded bg-white/15 text-[9px] font-mono text-white/90">&lt;/&gt;</code>
        <span className="font-sans text-[11px] font-semibold tracking-wider uppercase text-white">
          Software Engineer
        </span>
      </div>
    </div>
  );
}
