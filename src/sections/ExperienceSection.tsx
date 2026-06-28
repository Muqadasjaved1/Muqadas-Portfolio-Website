import { ClipPathReveal, ClipRevealItem } from '@/Components/ClipPathReveal';
import { ScrollLetterText } from '@/Components/ScrollLetterText';

const experiences = [
  {
    title: 'Teacher',
    company: 'Dar-e-Arqam School, Lahore',
    bullets: [
      'Provided academic instruction to students across multiple subjects',
      'Served as a home tutor, tailoring lessons to individual learning needs',
      'Developed engaging teaching materials and activities',
    ],
    achievement: 'Recognized for improving student academic recitation scores by 40% through personalized lesson plans',
  },
  {
    title: 'Stitching Specialist & Fashion Designer',
    company: 'Self-employed, Lahore',
    bullets: [
      'Designed and crafted garments with attention to detail',
      'Managed client orders and ensured timely delivery',
      'Launched a small-scale fashion line with 50+ stitched garments',
    ],
    achievement: 'Received positive client feedback for precision and creativity in fashion design',
  },
  {
    title: 'Project Coordinator',
    company: 'Dar-e-Arqam School, Lahore',
    bullets: [
      'Successfully managed school annual event logistics',
      'Coordinated execution for 150+ attendees within budget',
      'Implemented safety measures and real-time communication protocols',
    ],
    achievement: '',
  },
];

export function ExperienceSection() {
  return (
    <section className="relative bg-[#F9F6F1] py-[100px] md:py-[180px] px-4 md:px-[12vw] overflow-hidden">
      {/* Soft background light highlight */}
      <div
        className="absolute top-1/2 left-[-150px] -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none opacity-20 blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(168,184,166,0.6) 0%, transparent 70%)' }}
      />

      <ClipPathReveal>
        <ClipRevealItem>
          <span className="label block mb-8 text-glow-blue-subtle font-semibold tracking-widest">EXPERIENCE</span>
        </ClipRevealItem>

        <ClipRevealItem className="mb-14 md:mb-20">
          <ScrollLetterText
            text="My Work Experience"
            tag="h2"
            italicWords={['Work']}
            className="text-glow-blue-vibrant text-[38px] md:text-[54px] leading-[0.95em] font-serif font-light"
          />
        </ClipRevealItem>
      </ClipPathReveal>

      {/* Experience Entries Timeline */}
      <div className="relative space-y-8 pl-0 md:pl-16">
        {/* Main timeline trace line */}
        <div className="absolute left-[31px] top-6 bottom-6 w-[1.5px] bg-[#0056FF]/30 hidden md:block" />

        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            {/* Timeline node dot for each entry */}
            <div className="absolute left-[-41px] top-8 w-[14px] h-[14px] rounded-full bg-white border-[3px] border-[#0056FF] shadow-[0_0_10px_rgba(0,86,255,0.6)] z-10 hidden md:block" />

            <ClipPathReveal delay={index * 0.1}>
              <div className="p-6 md:p-8 rounded-3xl border border-[#0056FF]/15 bg-white shadow-[0_15px_40px_rgba(0,86,255,0.04)] hover:shadow-[0_20px_50px_rgba(0,86,255,0.08)] transition-all duration-500 hover:border-[#0056FF]/35 hover:-translate-y-0.5">
                <ClipRevealItem>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
                    <h3 className="text-[24px] md:text-[32px] text-glow-blue-vibrant font-serif font-light leading-tight">
                      {exp.title}
                    </h3>
                    <span className="label text-glow-blue-subtle text-[11px] tracking-wider font-sans font-semibold">
                      {exp.company}
                    </span>
                  </div>
                </ClipRevealItem>

                <ClipRevealItem>
                  <ul className="space-y-3 mb-6">
                    {exp.bullets.map((bullet, bIndex) => (
                      <li
                        key={bIndex}
                        className="font-sans text-[15px] leading-[1.4em] text-glow-blue-dark pl-5 relative before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#0056FF]/80"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </ClipRevealItem>

                {exp.achievement && (
                  <ClipRevealItem>
                    <p className="font-sans text-[14px] italic text-glow-blue-subtle/85 max-w-[65ch] pl-4 border-l-2 border-[#0056FF]/55">
                      {exp.achievement}
                    </p>
                  </ClipRevealItem>
                )}
              </div>
            </ClipPathReveal>
          </div>
        ))}
      </div>
    </section>
  );
}
