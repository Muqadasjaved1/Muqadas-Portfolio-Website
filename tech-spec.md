# Tech Spec — Muqadas Javed Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| vite | ^6.0 | Build tool |
| vite-plugin-svgr | ^4.0 | Import SVGs as React components |
| typescript | ^5.6 | Type safety |
| @types/react | ^18.3 | React type definitions |
| @types/react-dom | ^18.3 | React DOM type definitions |
| react | ^18.3 | UI framework |
| react-dom | ^18.3 | React DOM renderer |
| react-router-dom | ^7.1 | Multi-page routing (Home + Projects) |
| tailwindcss | ^4.0 | Utility-first CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| gsap | ^3.12 | Core animation engine |
| lottie-react | ^2.4 | Lottie animation player for menu overlay |
| swiper | ^11.1 | Carousel with navigation, pagination, scrollbar |
| class-variance-authority | ^0.7 | Component variant management |
| clsx | ^2.1 | Conditional class joining |
| tailwind-merge | ^2.6 | Tailwind class deduplication |

**Fonts** (loaded via Google Fonts CDN): Crimson Pro (400, 400i), DM Sans (400, 400i, 500)

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Header | Custom | Shared — fixed nav with logo, page links, "Get In Touch" |
| Footer | Custom | Shared — marquee, social icons, copyright |
| PageTransitionWrapper | Custom | Shared — fade-out/in on route change |
| MenuOverlay | Custom | Shared — full-screen overlay with Lottie |
| BackToTop | Custom | Shared — appears on footer enter |

### Home Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | SVG blob morph + clip-path reveal on load |
| EducationSection | Custom | Two-column with display numbers |
| SkillsSection | Custom | Two-column with portrait + skill tags |
| ExperienceSection | Custom | Alternating layout with entries |
| QuoteSection | Custom | Large centered quote with letter rotation |

### Projects Sections

| Component | Source | Notes |
|-----------|--------|-------|
| ProjectsHeader | Custom | Title + subtitle with letter rotation |
| ProjectCard | Custom | Reused 4× — thumbnail clip-path reveal, title, desc, tags |
| CarouselSection | Swiper | Additional project images carousel |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| ScrollLetterText | Custom | Hero heading, section headings, quote, marquee, "Get In Touch" |
| ClipPathReveal | Custom | Hero content, education, skills, experience, project cards |
| SkillTag | Custom | SkillsSection — hover lift effect |
| SvgBlobMorph | Custom | HeroSection only — scroll-driven SVG path interpolation |

### Hooks

| Hook | Purpose |
|------|---------|
| useScrollProgress | Returns normalized scroll progress [0,1] for a ref/scroll range |
| useScrollVelocity | Tracks scroll velocity with damping for letter rotation |
| useInView | IntersectionObserver wrapper for clip-path reveal triggers |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| SVG blob-to-rect morph | GSAP + ScrollTrigger | ScrollTrigger with scrub drives a custom path interpolation function that lerps 6 control points between blob and rectangle configurations. Photo scale (1.0→1.2x) and container rotation (-5°→0°) are GSAP tweens linked to the same ScrollTrigger. | **High** 🔒 |
| Clip-path content reveal | GSAP | GSAP `fromTo` on `clipPath: inset()` from `inset(100% 0 0 0)` to `inset(0 0 0 0)`. Triggered by `useInView` hook. Parent component manages 0.15s stagger between child elements via GSAP timeline with `stagger: 0.15`. Duration 0.8s, custom cubic-bezier. | Low |
| Scroll-linked letter rotation | GSAP + ScrollTrigger | Each character wrapped in `<span>`. ScrollTrigger with scrub drives `rotationX` from 90°→0° per letter, with stagger based on letter index. Used on major headings. | Medium |
| Scroll velocity letter rotation | GSAP (no ScrollTrigger) | `useScrollVelocity` hook calculates velocity from scroll delta with lerp damping. Per-letter `rotationX` is set via GSAP, with randomized max rotation (0.2–1.0 rad) and delay (0–0.3s) per character. Updates on every scroll frame. | **High** 🔒 |
| Marquee footer | CSS animation + JS | Pure CSS `@keyframes` for infinite translateX. JavaScript applies velocity-based `rotationX` to each letter on scroll. Text duplicated for seamless loop. | Medium |
| Menu overlay | Lottie + CSS | `lottie-react` plays decorative animation. CSS transition for panel slide (0.4s). Menu items: CSS transition for opacity + translateX on hover (0.35s). | Low |
| Header shadow | CSS | `scroll` event listener toggles class when scrollTop > 100px. CSS transition for box-shadow (0.3s). | Low |
| Page transitions | GSAP | `react-router-dom` navigation intercepted. Fade out current page (opacity 1→0, 300ms), navigate, fade in new page (opacity 0→1, 300ms). Scroll reset on complete. | Low |
| Parallax scroll | GSAP + ScrollTrigger | ScrollTrigger with scrub drives `y` and `scale` transforms on elements with data attributes. Progress calculated from element position in viewport. | Medium |
| Skill tag hover | CSS | `transform: translateY(-3px)` + background opacity change. Transition 0.35s ease-in-out. | Low |
| Carousel | Swiper | Swiper React component with `autoplay` (3000ms, pauseOnHover), `navigation`, `pagination`, `scrollbar` modules. CSS custom properties for theming. | Low |
| Back to top | CSS + JS | IntersectionObserver on footer triggers visibility. `window.scrollTo({ top: 0, behavior: 'smooth' })` on click. | Low |

---

## State & Logic

### Page Transition Orchestration

The page transition system must coordinate between React Router navigation and GSAP animations. On link click: (1) prevent default navigation, (2) trigger GSAP fade-out on current page, (3) call `router.navigate()` after fade completes, (4) on new page mount, run GSAP fade-in, (5) reset scroll to top. This requires a custom `usePageTransition` hook that wraps navigation.

### Scroll Velocity Measurement

Scroll velocity must be computed frame-by-frame with lerp damping to avoid jitter. Raw velocity = current scroll delta. Damped velocity = previous + (target - previous) * 0.1. This damped value is what drives letter rotation. The `useScrollVelocity` hook must return the damped velocity and expose a per-letter randomization map (created once on mount) so each letter has consistent but unique response characteristics.

### SVG Path Interpolation

The blob morph requires a custom interpolation function that takes 6 control points, each with initial/final coordinates, and computes the current path `d` attribute from scroll progress. The path uses quadratic Bézier curves between consecutive points. This is a pure math function — no animation library involvement in the path generation itself — called from a ScrollTrigger `onUpdate` callback.
