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
      spacing: 0,
    },
    breakpoints: {
      '(min-width: 640px)': {
        slides: {
          perView: 2,
          spacing: 0,
        },
      },
      '(min-width: 1024px)': {
        slides: {
          perView: 3,
          spacing: 0,
        },
      },
    },
  });

  return (
    <div className="w-full overflow-x-auto touch-pan-x">
      <div
        ref={sliderRef}
        className="keen-slider flex"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="keen-slider__slide min-w-full sm:min-w-1/2 lg:min-w-1/3 px-2 box-border"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}