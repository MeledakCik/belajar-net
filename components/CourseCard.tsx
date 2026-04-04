import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ReactNode } from "react";

interface CourseProps {
  title: string;
  desc: string;
  icon: ReactNode;
}

export default function CourseCard({ title, desc, icon }: CourseProps) {
  return (
    <Card className="
      bg-[#1F2937]/40 border border-gray-800 
      cursor-pointer group
      transition-all duration-300 ease-out
      hover:border-blue-500 
      hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] 
      hover:-translate-y-2 
      hover:bg-[#1F2937]/90
      active:scale-95 
      active:duration-75
    ">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0">
        <div className="
          w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center 
          text-white text-2xl shadow-lg shadow-blue-500/20
          transition-all group-hover:scale-110 group-hover:rotate-6 duration-300
        ">
          {icon}
        </div>
        <CardTitle className="text-white uppercase font-[family-name:var(--font-jaro)] text-xl tracking-wider">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm leading-relaxed font-[family-name:var(--font-jaro)] group-hover:text-gray-300 transition-colors">
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}