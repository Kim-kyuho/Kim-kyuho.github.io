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
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 20,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 24,
        },
      },
    },
  });

  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div ref={sliderRef} className="keen-slider flex justify-center">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="keen-slider__slide"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}