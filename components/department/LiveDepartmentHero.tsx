"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/lib/sanity";

const builder = createImageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function LiveDepartmentHero({
  department,
  doctorCount,
  serviceCount,
}: {
  department: any;
  doctorCount: number;
  serviceCount: number;
}) {
  // 1. إعداد الصور المتبدلة
  const defaultImage = department.image
    ? urlFor(department.image).width(1800).height(1000).fit("crop").url()
    : "/images/hospital-bg.jpg"; 

  const liveImages = [
    defaultImage,
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1538108149393-cebb47acddb2?q=80&w=2069&auto=format&fit=crop",
  ];

  // 2. إعداد الإعلانات المتحركة
  const liveAds = [
    "🌟 احجز موعدك الآن عبر بوابتنا الرقمية بدون انتظار!",
    "👨‍⚕️ أطباء استشاريون متاحون لتقييم حالتك في هذا القسم.",
    "⚡ أحدث التقنيات والمعدات الطبية لضمان أدق النتائج.",
    "🏥 المستشفى الأوربي الحديث: رعاية تليق بثقتكم.",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % liveImages.length);
        setIsTransitioning(false);
      }, 500); 
    }, 5000); 

    const adTimer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % liveAds.length);
    }, 4000); 

    return () => {
      clearInterval(imageTimer);
      clearInterval(adTimer);
    };
  }, [liveImages.length, liveAds.length]);

  return (
    <section className="relative overflow-hidden bg-[#0D2B52]">
      <img
        src={liveImages[currentImageIndex]}
        alt="Department"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-[0.25]"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#0D2B52]/95 via-[#18529D]/90 to-[#0069D9]/60" />
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-[#D92541]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-9 md:px-8 md:py-20">
        <div className="mb-6 flex justify-center md:justify-start">
          <div className="inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-4 py-1.5 text-[10px] md:text-xs font-bold text-[#D4AF37] backdrop-blur-md">
            <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#EF476F]" />
            <div className="relative h-4 w-[250px] md:w-[350px] overflow-hidden">
              {liveAds.map((ad, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex w-full items-center transition-all duration-500 ${
                    index === currentAdIndex
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="truncate">{ad}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="text-center md:text-right">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur-md md:px-4 md:text-xs">
              DEPARTMENT DIGITAL HUB
            </div>
            <h1 className="text-3xl font-black leading-[1.15] text-white md:text-5xl lg:text-6xl">
              {department.title}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-7 text-white/70 md:mx-0 md:mt-6 md:text-lg md:leading-9">
              {department.description ||
                "اكتشف خدمات القسم والأطباء ورحلة المريض والمعلومات التي تحتاجها قبل الزيارة."}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5 md:justify-start md:gap-3">
              <Link
                href={`/booking?department=${encodeURIComponent(
                  department.title
                )}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#D92541] px-5 py-3 text-[10px] font-black text-white shadow-xl transition hover:-translate-y-1 md:px-7 md:py-3.5 md:text-xs"
              >
                احجز موعدًا
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-[10px] font-black text-white backdrop-blur-md transition hover:bg-white/15 md:px-7 md:py-3.5 md:text-xs"
              >
                استكشف الخدمات
              </Link>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-2 md:mt-10 md:max-w-xl md:gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/20">
                <div className="text-lg font-black text-white">{doctorCount}</div>
                <div className="mt-0.5 text-[8px] text-white/50 md:text-[9px]">فريق طبي</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/20">
                <div className="text-lg font-black text-white">{serviceCount}</div>
                <div className="mt-0.5 text-[8px] text-white/50 md:text-[9px]">خدمات وإجراءات</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md transition hover:bg-white/20">
                <div className="text-lg font-black text-white">{department.tools?.length || 0}</div>
                <div className="mt-0.5 text-[8px] text-white/50 md:text-[9px]">أدوات رقمية</div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-[1.6rem]">
                <img
                  src={liveImages[currentImageIndex]}
                  alt={department.title}
                  className={`h-[420px] w-full object-cover transition-opacity duration-1000 ease-in-out ${
                    isTransitioning ? "opacity-50 blur-sm" : "opacity-100 blur-0"
                  }`}
                />
              </div>
              <div className="absolute bottom-7 right-7 left-7 rounded-2xl border border-white/10 bg-[#0D2B52]/80 p-5 backdrop-blur-xl">
                <div className="text-[10px] font-bold text-white/50">المستشفى الأوربي الحديث</div>
                <div className="mt-1 text-xl font-black text-white">{department.title}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}