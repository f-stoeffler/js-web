import { SkillItem } from "@prisma/client";
import SkillItemComp from "./SkillItem";

export default function Skills({
  skills,
}: Readonly<{
  skills: Array<SkillItem> | undefined;
}>) {
  const gridCols = skills ? skills.length : 1;
  
  // Map the number of columns to the actual Tailwind classes
  const gridClass = () => {
    switch(gridCols) {
      case 1: return "lg:grid-cols-1";
      case 2: return "lg:grid-cols-2";
      case 3: return "lg:grid-cols-3";
      case 4: return "lg:grid-cols-4";
      case 5: return "lg:grid-cols-5";
      case 6: return "lg:grid-cols-6";
      // Add more cases if needed
      default: return "lg:grid-cols-1";
    }
  };

  return (
    <div className={`grid grid-cols-1 ${gridClass()} lg:gap-8 items-start`}>
      {skills?.map((skill) => (
        <SkillItemComp key={skill.id} title={skill.title}>
          {skill.desc}
        </SkillItemComp>
      ))}
    </div>
  );
}