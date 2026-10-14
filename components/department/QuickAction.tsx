import React from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";

export default function QuickAction({ href, icon, title, danger = false }: { href: string; icon: string; title: string; danger?: boolean; }) {
  return (
    <Link href={href} className={`group flex items-center gap-3 rounded-2xl border p-3 transition hover:-translate-y-1 hover:shadow-lg md:flex-col md:justify-center md:gap-2 md:p-4 ${danger ? "border-[#F3C8D1] bg-[#FFF8F9] text-[#D92541]" : "border-slate-200 bg-white text-[#18529D]"}`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${danger ? "bg-[#FFF0F3]" : "bg-[#EAF2FF]"}`}>
        <Icon name={icon} size={20} />
      </div>
      <span className="text-[10px] font-black md:text-xs">{title}</span>
    </Link>
  );
}