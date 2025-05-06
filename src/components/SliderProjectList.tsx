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
    <div className="w-full overflow-hidden">
      <div
        ref={sliderRef}
        className="keen-slider w-full flex touch-pan-x px-0"
      >
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%] px-2 box-border"
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </div>
  );
}