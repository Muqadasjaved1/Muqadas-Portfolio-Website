import { ClipPathReveal, ClipRevealItem } from '@/Components/ClipPathReveal';
import { ScrollLetterText } from '@/Components/ScrollLetterText';
import { SkillTag } from '@/Components/SkillTag';

const skillGroups = [
  {
    label: 'Technical Skills',
    skills: ['HTML / CSS / JavaScript', 'SQL / MySQL', 'Git / GitHub / Postman', 'Visual Studio'],
  },
  {
    label: 'Professional Skills',
    skills: ['Problem Solving', 'Communication', 'Time Management', 'Documentation'],
  },
  {
    label: 'Creative Skills',
    skills: ['MS Office Suite', 'Fashion Designing', 'Stitching', 'Slide Presentations'],
  },
];

export function SkillsSection() {
  return (
    <section className="relative bg-[#A8B8A6] py-[100px] md:py-[180px] px-4 md:px-[12vw] overflow-hidden">
      {/* Soft background light highlight */}
      <div
        className="absolute top-1/2 left-[-100px] -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-25 blur-[90px]"
        style={{ background: 'radial-gradient(circle, rgba(249,246,241,0.8) 0%, transparent 70%)' }}
      />

      <ClipPathReveal>
        <ClipRevealItem>
          <span className="label block mb-8 text-glow-blue-subtle font-semibold tracking-widest">SKILLS</span>
        </ClipRevealItem>

        <ClipRevealItem className="mb-14 md:mb-20">
          <ScrollLetterText
            text="My Skills & Expertise"
            tag="h2"
            italicWords={['Skills']}
            className="text-glow-blue-vibrant text-[38px] md:text-[54px] leading-[0.95em] mb-4 font-serif font-light"
          />
        </ClipRevealItem>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
          {/* Portrait Container with premium offset frame */}
          <ClipRevealItem className="w-full max-w-[500px] lg:w-[46%] flex-shrink-0 relative group/portrait">
            {/* Back decorative offset frame 1 */}
            <div className="absolute inset-0 rounded-[2.8rem] border border-[#0056FF]/15 bg-transparent translate-x-4 translate-y-4 pointer-events-none transition-all duration-500 group-hover/portrait:translate-x-2 group-hover/portrait:translate-y-2 group-hover/portrait:border-[#0056FF]/35" />
            {/* Back decorative offset frame 2 */}
            <div className="absolute inset-0 rounded-[2.8rem] border border-[#0056FF]/5 bg-transparent translate-x-7 translate-y-7 pointer-events-none transition-all duration-500 group-hover/portrait:translate-x-4 group-hover/portrait:translate-y-4 group-hover/portrait:border-[#0056FF]/15" />
            
            {/* Image card wrapper (Glows when hovered, full bleed) */}
            <div className="w-full aspect-[4/4.3] overflow-hidden rounded-[2.8rem] border border-[#0056FF]/15 bg-[#EBE7E0] relative z-10 transition-all duration-500 shadow-[0_20px_50px_rgba(44,49,43,0.08)] hover:-translate-y-2 hover:border-[#0056FF] hover:shadow-[0_0_35px_12px_rgba(0,86,255,0.32),0_15px_45px_rgba(0,86,255,0.2)]">
              <img
                src="/assets/skills-portrait.jpg"
                alt="Muqadas at work"
                className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
              
              {/* Sleek top-left tag overlay */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-white/90 shadow-[0_4px_12px_rgba(0,82,255,0.06)] border border-[#0056FF]/10 pointer-events-none">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#0056FF] font-semibold">WORKSPACE // 2024</span>
              </div>
            </div>
          </ClipRevealItem>

          {/* Skills List */}
          <div className="flex-1 w-full space-y-12 lg:space-y-14">
            {skillGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="relative">
                <ClipRevealItem>
                  <h5 className="label text-glow-blue-subtle tracking-widest text-[12px] font-sans font-semibold mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0056FF]/35" />
                    {group.label}
                  </h5>
                </ClipRevealItem>
                <ClipRevealItem>
                  <div className="flex flex-wrap items-start">
                    {group.skills.map((skill, skillIndex) => (
                      <SkillTag key={skillIndex} skill={skill} />
                    ))}
                  </div>
                </ClipRevealItem>
              </div>
            ))}
          </div>
        </div>
      </ClipPathReveal>
    </section>
  );
}

