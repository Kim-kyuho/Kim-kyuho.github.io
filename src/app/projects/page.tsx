// src/app/page.tsx
import SliderProjectList from "@/components/SliderProjectList";

const dummyProjects = [
  {
    title: "Oracle 기반 데이터 마이그레이션",
    description: "에너지계 회사의 시스템 데이터를 Oracle DB를 활용하여 마이그레이션한 프로젝트입니다. 초기 설계부터 SQL 작성 및 검증까지 전 과정을 담당했습니다.",
    image: "/blog-images/project1.jpg",
    link: "#", // 추후 상세페이지 혹은 GitHub 링크로 교체
  },
  {
    title: "GIS 기반 설비 정보 시스템 개발",
    description: "ArcGIS기반의 가스 및 전기 설비에 대한 지도 정보 시스템을 개발하였습니다. 고객의 요구사항을 반영하여 사용자 친화적인 UI/UX를 구현했습니다.",
    image: "/blog-images/project2.jpg",
    link: "#",
  },
  {
    title: "포인트 부여 자동화 시스템 개발",
    description: "특정 조건에 따라 고객에게 자동으로 포인트를 지급하는 백엔드 시스템을 개발하였습니다. 효율적인 정산 및 관리가 가능하도록 설계되었습니다.",
    image: "/blog-images/project3.jpg",
    link: "#",
  },
  {
    title: "VIP 고객용 서비스 시스템 개발",
    description: "VIP 고객 전용 가입 절차를 간소화하기 위한 요건 정의부터 시스템 설계, 개발을 담당했습니다. 고객의 편의를 최우선으로 고려했습니다.",
    image: "/blog-images/project4.jpg",
    link: "#",
  },
  {
    title: "에너지계 시스템 유지보수 및 인시던트 대응",
    description: "다양한 소규모 시스템의 장애 대응, 기능 개선 및 정기 점검을 수행하고 있습니다. 현장과의 커뮤니케이션 및 긴급 대응 경험이 강점입니다.",
    image: "/blog-images/project5.jpg",
    link: "#",
  },
];

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6 text-center">My Projects</h1>
      <SliderProjectList projects={dummyProjects} />
    </section>
  );
}