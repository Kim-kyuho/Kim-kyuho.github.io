// components/SliderProjectList.tsx
'use client';

import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import ProjectCard from './ProjectCard';

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function SliderProjectList({ projects }: { projects: Project[] }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 'auto', spacing: 16 },
  });

  return (
    <div ref={sliderRef} className="keen-slider flex justify-center">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="keen-slider__slide snap-center w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] transition duration-300 scale-90 hover:scale-100 blur-[2px] hover:blur-none"
        >
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
}