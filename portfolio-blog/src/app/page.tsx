// src/app/page.tsx
import ProjectCard from "@/components/ProjectCard";

const dummyProjects = [
  {
    title: "업무 자동화 도구",
    description: "회사 내부 업무를 자동화한 도구입니다.",
    image: "/project1.jpg",
    link: "#",
    unoptimized: true,
  },
  {
    title: "고객 관리 시스템",
    description: "SQL + ASP.NET 기반의 내부 시스템",
    image: "/project2.jpg",
    link: "#",
  },
  {
    title: "웹 기반 재고 관리",
    description: "React + Java Spring을 이용한 프로젝트",
    image: "/project3.jpg",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyProjects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}