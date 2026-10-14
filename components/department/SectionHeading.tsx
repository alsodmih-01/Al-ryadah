import React from "react";

export default function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow?: string; title: string; description?: string; light?: boolean; }) {
  return (
    <div className={`mb-7 md:mb-10 text-center md:text-right ${light ? "text-white" : ""}`}>
      {eyebrow && (
        <div className={`mb-2 flex items-center justify-center md:justify-start gap-2 text-[9px] font-black tracking-[0.12em] md:text-xs ${light ? "text-[#D4AF37]" : "text-[#D92541]"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${light ? "bg-[#D4AF37]" : "bg-[#D92541]"}`} />
          {eyebrow}
        </div>
      )}
      <h2 className={`text-2xl font-black leading-tight md:text-4xl ${light ? "text-white" : "text-[#18529D]"}`}>{title}</h2>
      {description && (
        <p className={`mt-2 max-w-3xl text-xs leading-6 md:mt-3 md:text-base md:leading-8 mx-auto md:mx-0 ${light ? "text-white/65" : "text-slate-500"}`}>{description}</p>
      )}
    </div>
  );
}