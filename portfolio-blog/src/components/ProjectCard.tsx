// src/components/ProjectCard.tsx
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ProjectCard({ title, description, image, link }: ProjectCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      <Image src={image} alt={title} width={600} height={300} className="w-full object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Link href={link} className="text-blue-500 hover:underline">
          자세히 보기 →
        </Link>
      </div>
    </div>
  );
}