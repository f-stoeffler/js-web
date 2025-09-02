import { SkillItem } from "../../generated/prisma";
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
      case 1: return "grid-cols-1";
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-3";
      case 4: return "grid-cols-4";
      case 5: return "grid-cols-5";
      case 6: return "grid-cols-6";
      // Add more cases if needed
      default: return "grid-cols-1";
    }
  };

  return (
    <div className={`grid ${gridClass()} gap-8 items-start`}>
      {skills?.map((skill) => (
        <SkillItemComp key={skill.id} title={skill.title}>
          {skill.desc}
        </SkillItemComp>
      ))}
    </div>
  );
}