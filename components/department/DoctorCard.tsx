import React from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { Doctor } from "@/types/department";
import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

function InitialAvatar({ name }: { name: string }) {
  const letter = name?.trim()?.charAt(0) || "ط";
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0069D9] to-[#18529D]">
      <span className="text-5xl font-black text-white/95 md:text-7xl">{letter}</span>
    </div>
  );
}

export default function DoctorCard({ doctor, departmentName }: { doctor: Doctor; departmentName: string; }) {
  const bookingUrl = `/booking?doctor=${encodeURIComponent(doctor.name)}&department=${encodeURIComponent(departmentName)}`;
  return (
    <article className={`group overflow-hidden rounded-[1.6rem] border bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(24,82,157,0.14)] md:rounded-[2rem] ${doctor.isCosmetic ? "border-[#D4AF37]/40" : "border-slate-200"}`}>
      <div className="relative h-[220px] overflow-hidden bg-slate-100 md:h-[290px]">
        {doctor.image ? (
          <img src={urlFor(doctor.image).width(700).height(700).fit("crop").url()} alt={doctor.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        ) : (
          <InitialAvatar name={doctor.name} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B52]/90 via-transparent to-transparent" />
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-2.5 py-1.5 text-[8px] font-bold text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> عيادة نشطة
        </div>
        {doctor.isCosmetic && (
          <div className="absolute left-3 top-3 rounded-full bg-[#D4AF37] px-2.5 py-1.5 text-[8px] font-black text-[#0D2B52] shadow-lg">مركز تجميل</div>
        )}
        <div className="absolute bottom-4 right-4 left-4">
          <div className="text-[9px] text-white/65">{departmentName}</div>
          <h3 className="mt-1 line-clamp-2 text-lg font-black text-white md:text-2xl">{doctor.name}</h3>
        </div>
      </div>
      <div className="p-4 md:p-6 text-right">
        <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[9px] font-black text-[#0069D9] md:text-xs">{doctor.specialty || "أخصائي واستشاري"}</span>
        <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0069D9]">
              <Icon name="calendar" size={17} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-bold text-slate-400">أيام الدوام</div>
              <div className="truncate text-xs font-black text-[#18529D]">{doctor.days || "حسب جدول القسم"}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#0069D9]">
              <Icon name="clock" size={17} />
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-bold text-slate-400">ساعات العمل</div>
              <div dir="ltr" className="truncate text-right text-xs font-black text-[#18529D]">{doctor.time || "حسب الموعد"}</div>
            </div>
          </div>
        </div>
        <Link href={bookingUrl} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-xs font-black transition ${doctor.isCosmetic ? "bg-[#D4AF37] text-[#0D2B52] hover:bg-[#BE9A2E]" : "bg-[#D92541] text-white hover:bg-[#BF1D35]"}`}>
          <Icon name="calendar" size={17} /> احجز موعدًا
        </Link>
      </div>
    </article>
  );
}