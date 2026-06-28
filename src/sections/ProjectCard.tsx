import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollLetterText } from '@/Components/ScrollLetterText';

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  title: string;
  titleItalic?: string[];
  description: string;
  tags: string[];
  image: string;
  images?: string[];   // optional: enables auto-slideshow
  year: string;
  bgColor: 'cream' | 'sage';
}

export function ProjectCard({
  title,
  titleItalic = [],
  description,
  tags,
  image,
  images,
  year,
  bgColor,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Slideshow state — only used when images[] is provided
  const slideImages = images && images.length > 1 ? images : null;
  const [activeIdx, setActiveIdx] = useState(0);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // ── Entry reveal animation ──────────────────────────────────
  useEffect(() => {
    const card = cardRef.current;
    const imageEl = imageRef.current;
    const contentEl = contentRef.current;
    if (!card || !imageEl || !contentEl) return;

    gsap.set(imageEl, { clipPath: 'inset(100% 0 0 0)' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(imageEl, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.8,
      ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
    });

    const contentItems = contentEl.querySelectorAll('.project-reveal-item');
    gsap.set(contentItems, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

    tl.to(contentItems, {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'cubic-bezier(0.8, 0, 0.2, 1)',
    }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  // ── Auto-slideshow crossfade ────────────────────────────────
  useEffect(() => {
    if (!slideImages) return;

    // Initialise: first image fully visible, rest invisible
    imgRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });

    const total = slideImages.length;
    let current = 0;

    const advance = () => {
      const prev = current;
      const next = (current + 1) % total;

      const prevEl = imgRefs.current[prev];
      const nextEl = imgRefs.current[next];
      if (!prevEl || !nextEl) return;

      // Crossfade: bring next on top, fade out previous
      gsap.to(nextEl, { opacity: 1, duration: 0.8, ease: 'power2.inOut' });
      gsap.to(prevEl, { opacity: 0, duration: 0.8, ease: 'power2.inOut', delay: 0.1 });

      current = next;
      setActiveIdx(next);
    };

    const timer = setInterval(advance, 3000);
    return () => clearInterval(timer);
  }, [slideImages]);

  const bgClass = bgColor === 'cream' ? 'bg-[#F9F6F1]' : 'bg-[#A8B8A6]';

  return (
    <div ref={cardRef} className={`${bgClass} py-[60px] md:py-[100px] px-4 md:px-[12vw]`}>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">

        {/* ── Image area ── */}
        <div className="w-full md:w-[55%] flex-shrink-0">
          <div ref={imageRef} className="aspect-[3/2] overflow-hidden rounded-[2rem] border border-[#2C312B]/10 shadow-[0_20px_50px_rgba(44,49,43,0.08)] bg-white/20 relative z-10 transition-transform duration-500 hover:scale-[1.005]">

            {slideImages ? (
              // Multi-image: absolutely stacked, crossfade via GSAP
              <>
                {slideImages.map((src, i) => (
                  <img
                    key={src}
                    ref={el => { imgRefs.current[i] = el; }}
                    src={src}
                    alt={`${title} — slide ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover rounded-[2rem]"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  />
                ))}

                {/* Dot indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {slideImages.map((_, i) => (
                    <span
                      key={i}
                      className={`block w-1.5 h-1.5 rounded-full transition-all duration-400 ${
                        i === activeIdx
                          ? 'bg-white scale-125'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              // Single image — original behaviour
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover hover:scale-102 transition-transform duration-700 rounded-[2rem]"
                loading="lazy"
              />
            )}

          </div>
        </div>

        {/* ── Content ── */}
        <div ref={contentRef} className="flex-1 flex flex-col justify-center">
          <div className="project-reveal-item mb-4">
            <span className="label text-[rgba(44,49,43,0.5)] font-semibold tracking-wider">{year}</span>
          </div>

          <div className="project-reveal-item mb-4">
            <ScrollLetterText
              text={title}
              tag="h2"
              italicWords={titleItalic}
              className="text-[#2C312B] text-[34px] md:text-[52px] leading-[0.95em] font-serif"
            />
          </div>

          <div className="project-reveal-item mb-6">
            <p className="font-sans text-[15px] leading-relaxed text-[rgba(44,49,43,0.7)]">
              {description}
            </p>
          </div>

          <div className="project-reveal-item flex flex-wrap gap-2.5">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="
                  font-sans text-[11px] uppercase tracking-[0.6px] font-semibold
                  text-[#2C312B]/75 bg-white/40 border border-[#2C312B]/10
                  px-3.5 py-1.5 rounded-full transition-all duration-300
                  hover:bg-white/80 hover:border-[#2C312B]/20 hover:shadow-[0_4px_12px_rgba(44,49,43,0.03)]
                "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

