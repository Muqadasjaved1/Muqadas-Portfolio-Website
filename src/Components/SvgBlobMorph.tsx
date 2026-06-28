import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Point {
  x: number;
  y: number;
}

const blobPoints: Point[] = [
  { x: 70, y: 10 },  // P0 - top-right
  { x: 90, y: 40 },  // P1 - right
  { x: 80, y: 90 },  // P2 - bottom-right
  { x: 30, y: 80 },  // P3 - bottom-left
  { x: 10, y: 50 },  // P4 - left
  { x: 30, y: 20 },  // P5 - top-left
];

const rectPoints: Point[] = [
  { x: 95, y: 5 },   // P0 - top-right
  { x: 95, y: 95 },  // P1 - right
  { x: 5, y: 95 },   // P2 - bottom-right
  { x: 5, y: 5 },    // P3 - bottom-left
  { x: 5, y: 5 },    // P4 - left
  { x: 5, y: 5 },    // P5 - top-left
];

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function buildPath(points: Point[]): string {
  const p = [...points, points[0]]; // close the loop
  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 0; i < p.length - 1; i++) {
    const cpx = (p[i].x + p[i + 1].x) / 2;
    const cpy = (p[i].y + p[i + 1].y) / 2;
    d += ` Q ${cpx} ${cpy} ${p[i + 1].x} ${p[i + 1].y}`;
  }
  return d;
}

export function SvgBlobMorph() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const imageRef = useRef<SVGImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const path = pathRef.current;
    const image = imageRef.current;
    if (!wrapper || !path || !image) return;

    // Set initial rotation
    gsap.set(wrapper, { rotation: -5 });

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: '+=600',
      scrub: 1,
      onUpdate: (self) => {
        const p = self.progress;

        // Interpolate points
        const currentPoints: Point[] = blobPoints.map((bp, i) => ({
          x: lerp(bp.x, rectPoints[i].x, p),
          y: lerp(bp.y, rectPoints[i].y, p),
        }));

        // Update path
        path.setAttribute('d', buildPath(currentPoints));

        // Update image scale
        const scale = lerp(1, 1.2, p);
        image.setAttribute('transform', `scale(${scale}) translate(${50 * (1 - scale) / scale} ${50 * (1 - scale) / scale})`);

        // Update wrapper rotation
        const rotation = lerp(-5, 0, p);
        gsap.set(wrapper, { rotation });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="w-full h-[60vh] md:h-[75vh] relative"
      style={{ willChange: 'transform' }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <clipPath id="blob-clip">
            <path
              ref={pathRef}
              d={buildPath(blobPoints)}
            />
          </clipPath>
        </defs>
        <g clipPath="url(#blob-clip)">
          <image
            ref={imageRef}
            href="/assets/portrait-photo.jpg"
            x="0"
            y="0"
            width="100"
            height="100"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
    </div>
  );
}
