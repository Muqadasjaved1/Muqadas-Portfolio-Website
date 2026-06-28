import { ProjectsHeader } from '@/sections/ProjectsHeader';
import { ProjectCard } from '@/sections/ProjectCard';
import { CarouselSection } from '@/sections/CarouselSection';
import { Footer } from '@/Components/Footer';

const projects = [
  {
    title: 'Personal Portfolio Website',
    titleItalic: ['Portfolio'],
    description:
      'A responsive personal portfolio website built with HTML, CSS, and JavaScript. Features a unique SVG morphing animation, scroll-driven interactions, and a warm, minimal design aesthetic. The site showcases educational background, skills, and projects with elegant typography and smooth transitions.',
    tags: ['HTML', 'CSS', 'JavaScript', 'SVG', 'GitHub'],
    image: '/assets/project-portfolio.jpg',
    year: '2024',
    bgColor: 'cream' as const,
  },
  {
    title: 'Teaching Excellence Program',
    titleItalic: ['Excellence'],
    description:
      'Developed and implemented personalized lesson plans for students at Dar-e-Arqam School. Created engaging teaching materials and activities tailored to individual learning needs. Achieved a 40% improvement in student academic recitation scores through dedicated instruction and mentorship.',
    tags: ['Teaching', 'Curriculum Design', 'Mentorship'],
    image: '/assets/project-teaching.jpg',
    year: '2023-2024',
    bgColor: 'sage' as const,
  },
  {
    title: 'Fashion Design Collection',
    titleItalic: ['Design'],
    description:
      'Launched a small-scale fashion line featuring 50+ stitched garments. Designed and crafted each piece with attention to detail, managing client orders and ensuring timely delivery. Received positive feedback for precision, creativity, and quality craftsmanship.',
    tags: ['Fashion Design', 'Stitching', 'Creative Design'],
    image: '/assets/project-fashion.jpg',
    year: '2022-2024',
    bgColor: 'cream' as const,
  },
  {
    title: 'Annual Event Coordination',
    titleItalic: ['Coordination'],
    description:
      'Successfully managed logistics for a school annual event with 150+ attendees. Coordinated all aspects from planning to execution, ensuring seamless delivery within budget. Implemented safety measures and real-time communication protocols for a safe and enjoyable experience.',
    tags: ['Event Management', 'Coordination', 'Planning'],
    image: '/assets/project-event.jpg',
    images: ['/assets/project-event.jpg', '/assets/project-event2.jpg'],
    year: '2023',
    bgColor: 'sage' as const,
  },
];

export default function Projects() {
  return (
    <main>
      <ProjectsHeader />
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
      <CarouselSection />
      <Footer />
    </main>
  );
}
