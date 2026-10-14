"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";
import type { Department } from "@/app/departments/page";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

/* =========================================================
   BRAND
========================================================= */

const BRAND = {
  navy: "#18529D",
  blue: "#0069D9",
  red: "#D92541",
  gold: "#D4AF37",
  dark: "#0D2B52",
};

/* =========================================================
   ICONS
========================================================= */

type IconName =
  | "home"
  | "hospital"
  | "doctor"
  | "calendar"
  | "more"
  | "search"
  | "emergency"
  | "medical"
  | "heart"
  | "shield"
  | "users"
  | "spark"
  | "chevron"
  | "building"
  | "arrow"
  | "close"
  | "menu"
  | "phone"
  | "navigator"
  | "lab"
  | "activity";

function Icon({
  name,
  size = 22,
}: {
  name: IconName;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "hospital":
      return (
        <svg {...common}>
          <path d="M4 21V5l8-3 8 3v16" />
          <path d="M9 21v-5h6v5" />
          <path d="M12 6v5M9.5 8.5h5" />
        </svg>
      );

    case "doctor":
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5 22a7 7 0 0 1 14 0" />
          <path d="M9 7h6" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      );

    case "more":
      return (
        <svg {...common}>
          <circle
            cx="5"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="19"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );

    case "emergency":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );

    case "medical":
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-10V5l-7-3-7 3v6c0 5.5 7 10 7 10Z" />
          <path d="M12 7v6M9 10h6" />
        </svg>
      );

    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
        </svg>
      );

    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" />
          <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );

    case "building":
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M16 9h4a1 1 0 0 1 1 1v11" />
          <path d="M8 7h4M8 11h4M8 15h4M8 19h4" />
          <path d="M2 21h20" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case "menu":
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    case "phone":
      return (
        <svg {...common}>
          <path d="M6.5 3.5 9 3l2 5-2 1.5c1 2 2.5 3.5 4.5 4.5L15 12l5 2 .5 2.5c.2 1-.5 2-1.5 2.5-1 .5-2 .7-3 .5-7-1.4-12.6-7-14-14-.2-1 .1-2 .5-3 .5-1 1.5-1.7 2.5-1.5Z" />
        </svg>
      );

    case "navigator":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
        </svg>
      );

    case "lab":
      return (
        <svg {...common}>
          <path d="M9 3v6l-4.5 7.5A3 3 0 0 0 7 21h10a3 3 0 0 0 2.5-4.5L15 9V3" />
          <path d="M8 3h8M7 16h10" />
        </svg>
      );

    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   CARE TYPES
========================================================= */

const careTypes = [
  {
    title: "الأقسام الطبية",
    text: "تعرف على التخصصات والخدمات التي يقدمها كل قسم.",
    icon: "medical" as IconName,
  },
  {
    title: "مراكز متخصصة",
    text: "اكتشف الوحدات والمراكز التي تقدم رعاية متخصصة.",
    icon: "spark" as IconName,
  },
  {
    title: "الرعاية المتكاملة",
    text: "ابدأ من القسم المناسب ثم انتقل إلى الطبيب والخدمة.",
    icon: "heart" as IconName,
  },
];

/* =========================================================
   FEATURE CARDS
========================================================= */

const discoveryActions = [
  {
    title: "لا أعرف القسم",
    description: "ابدأ من احتياجك الصحي.",
    href: "/health-navigator",
    icon: "navigator" as IconName,
  },
  {
    title: "أبحث عن طبيب",
    description: "انتقل إلى دليل الأطباء.",
    href: "/doctors",
    icon: "doctor" as IconName,
  },
  {
    title: "أريد الحجز",
    description: "اختر موعدك المناسب.",
    href: "/booking",
    icon: "calendar" as IconName,
  },
  {
    title: "حالة طارئة",
    description: "تعرف على علامات الخطر.",
    href: "/emergency",
    icon: "emergency" as IconName,
  },
];

/* =========================================================
   ANNOUNCEMENTS
   جاهزة لاحقًا للاستبدال بنتيجة CMS.
========================================================= */

const announcements = [
  {
    title: "اكتشف خدمات الأقسام والمراكز",
    text: "تعرف على الخدمات والتخصصات والأطباء قبل زيارتك للمستشفى.",
    href: "#departments",
    label: "استكشف الآن",
  },
  {
    title: "ابدأ رحلتك الصحية من الأعراض",
    text: "لا تحتاج إلى معرفة اسم القسم مسبقًا. ابدأ من احتياجك.",
    href: "/health-navigator",
    label: "ابدأ المساعد",
  },
  {
    title: "احجز موعدك بسهولة",
    text: "انتقل مباشرة إلى صفحة الحجز لاختيار الطبيب والموعد.",
    href: "/booking",
    label: "احجز الآن",
  },
];

/* =========================================================
   DEPARTMENT CARD
========================================================= */

function DepartmentCard({
  department,
  index,
}: {
  department: Department;
  index: number;
}) {
  const href = department.slug
    ? `/departments/${department.slug}`
    : "#";

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-blue-100 hover:shadow-[0_25px_65px_rgba(0,105,217,0.13)] md:rounded-[1.8rem]">
      {/* IMAGE */}

      <div className="relative h-[170px] overflow-hidden bg-[#EAF2FF] sm:h-[200px] md:h-[230px]">
        {department.image ? (
          <img
            src={urlFor(department.image)
              .width(900)
              .height(650)
              .fit("crop")
              .url()}
            alt={department.title}
            loading={index < 4 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0069D9] to-[#18529D] text-white">
            <Icon name="medical" size={46} />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B52]/90 via-[#0D2B52]/10 to-transparent" />

        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-[9px] font-black text-white backdrop-blur-md md:right-4 md:top-4 md:h-10 md:w-10">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute bottom-3 right-3 left-3 md:bottom-4 md:right-4 md:left-4">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[8px] font-bold text-white backdrop-blur-md md:px-3 md:text-[10px]">
            قسم
          </span>

          <h3 className="mt-1.5 line-clamp-2 text-sm font-black leading-tight text-white md:text-xl">
            {department.title}
          </h3>
        </div>
      </div>

      {/* CARD BODY */}

      <div className="flex flex-1 flex-col p-3.5 md:p-5">
        <p className="line-clamp-3 min-h-[55px] text-[10px] leading-5 text-slate-500 md:min-h-[70px] md:text-sm md:leading-6">
          {department.description ||
            "اكتشف خدمات القسم والتخصصات الطبية والأطباء ورحلة المريض."}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-slate-50 p-2.5">
            <div className="text-[7px] font-bold text-slate-400 md:text-[9px]">
              اكتشف
            </div>
            <div className="mt-0.5 text-[9px] font-black text-[#18529D] md:text-xs">
              خدمات القسم
            </div>
          </div>

          <div className="rounded-xl bg-[#EAF2FF] p-2.5">
            <div className="text-[7px] font-bold text-[#7FA5D0] md:text-[9px]">
              تعرف على
            </div>
            <div className="mt-0.5 text-[9px] font-black text-[#0069D9] md:text-xs">
              أطباء القسم
            </div>
          </div>
        </div>

        <Link
          href={href}
          className="mt-4 flex items-center justify-between rounded-xl bg-[#F7F9FC] px-3 py-2.5 text-[10px] font-black text-[#0069D9] transition-all group-hover:bg-[#0069D9] group-hover:text-white md:rounded-2xl md:px-4 md:py-3.5 md:text-xs"
        >
          <span>استكشف القسم</span>

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0069D9] shadow-sm">
            <Icon name="arrow" size={12} />
          </span>
        </Link>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function DepartmentsExperience({
  departments,
}: {
  departments: Department[];
}) {
  const [search, setSearch] = useState("");
  const [activeAnnouncement, setActiveAnnouncement] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  /* -------------------------------------------------------
     ANNOUNCEMENT AUTO ROTATION
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAnnouncement(
        (current) => (current + 1) % announcements.length
      );
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     SEARCH
  ------------------------------------------------------- */

  const filteredDepartments = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return departments;

    return departments.filter((department) => {
      return (
        department.title?.toLowerCase().includes(value) ||
        department.description?.toLowerCase().includes(value) ||
        department.slug?.toLowerCase().includes(value)
      );
    });
  }, [departments, search]);

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#F6F8FC] pb-[82px] font-sans text-slate-800 md:pb-0"
    >
      {/* =====================================================
          DESKTOP TOP STRIP
      ===================================================== */}

      <div className="hidden bg-[#0D2B52] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-bold lg:px-8">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            بوابة الأقسام والمراكز الطبية
          </div>

          <a
            href="tel:774778805"
            dir="ltr"
            className="flex items-center gap-2 text-white/80 hover:text-white"
          >
            <Icon name="phone" size={14} />
            774778805
          </a>
        </div>
      </div>

      {/* =====================================================
          APP HEADER
      ===================================================== */}

      <header className="sticky top-0 z-[80] border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:h-[76px] md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 md:h-12 md:w-12 md:rounded-2xl">
              <img
                src="/images/logo.png"
                alt="المستشفى الأوربي الحديث"
                className="h-8 w-8 object-contain md:h-10 md:w-10"
              />

              <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 md:h-3 md:w-3" />
            </div>

            <div>
              <div className="text-[14px] font-black text-[#D92541] md:text-xl">
                المستشفى{" "}
                <span className="text-[#0069D9]">الأوربي</span> الحديث
              </div>

              <div className="hidden text-[8px] font-bold tracking-[0.18em] text-slate-400 md:block">
                MODERN EUROPEAN HOSPITAL
              </div>
            </div>
          </Link>

          {/* Desktop nav */}

          <nav className="hidden items-center gap-5 lg:flex">
            <Link
              href="/"
              className="text-sm font-bold text-slate-500 transition hover:text-[#D92541]"
            >
              الرئيسية
            </Link>

            <Link
              href="/departments"
              className="relative text-sm font-black text-[#D92541]"
            >
              الأقسام والمراكز
              <span className="absolute -bottom-3 right-0 left-0 h-0.5 rounded-full bg-[#D92541]" />
            </Link>

            <Link
              href="/doctors"
              className="text-sm font-bold text-slate-500 transition hover:text-[#D92541]"
            >
              الأطباء
            </Link>

            <Link
              href="/services"
              className="text-sm font-bold text-slate-500 transition hover:text-[#D92541]"
            >
              الصحة الرقمية
            </Link>

            <Link
              href="/about"
              className="text-sm font-bold text-slate-500 transition hover:text-[#D92541]"
            >
              عن المستشفى
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/booking"
              className="hidden rounded-full bg-[#D92541] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-[#BF1D35] sm:inline-flex"
            >
              احجز موعدك
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="القائمة"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF] text-[#18529D] lg:hidden"
            >
              <Icon
                name={mobileMenuOpen ? "close" : "menu"}
                size={20}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white px-4 pb-4 lg:hidden">
            <div className="grid grid-cols-2 gap-2 pt-3">
              {[
                ["الرئيسية", "/"],
                ["الأطباء", "/doctors"],
                ["الصحة الرقمية", "/services"],
                ["عن المستشفى", "/about"],
                ["تواصل معنا", "/contact"],
                ["احجز موعدك", "/booking"],
              ].map(([title, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-slate-50 p-3 text-center text-[10px] font-black text-[#18529D]"
                >
                  {title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#0D2B52]">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-[#0069D9] via-[#18529D]/95 to-[#0D2B52]" />
        </div>

        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 right-20 h-64 w-64 rounded-full bg-[#D92541]/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur-md md:px-4 md:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4AF37]" />
              DEPARTMENTS & CENTERS
            </div>

            <h1 className="text-3xl font-black leading-[1.2] text-white md:text-5xl lg:text-6xl">
              الرعاية الصحيحة
              <br />
              <span className="text-[#D4AF37]">
                تبدأ من القسم الصحيح.
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-xs leading-6 text-blue-100 md:mt-6 md:text-base md:leading-8">
              استكشف الأقسام والمراكز الطبية، تعرف على الخدمات، ثم انتقل
              مباشرة إلى الأطباء أو الحجز أو أدوات الصحة الرقمية.
            </p>

            {/* Search */}

            <div className="mt-6 max-w-2xl md:mt-9">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-xl md:rounded-[1.5rem] md:p-3">
                <div className="flex items-center gap-2.5 rounded-xl bg-white px-3 md:gap-3 md:px-4">
                  <span className="text-[#0069D9]">
                    <Icon name="search" size={18} />
                  </span>

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="ابحث عن قسم أو تخصص..."
                    className="h-11 w-full bg-transparent text-xs font-bold text-slate-700 outline-none placeholder:text-slate-400 md:h-14 md:text-sm"
                  />

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500"
                    >
                      <Icon name="close" size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Search result summary */}

            <div className="mt-3 flex items-center justify-between text-[9px] text-white/50 md:text-xs">
              <span>
                {search
                  ? `تم العثور على ${filteredDepartments.length} قسم`
                  : `${departments.length} قسم ومركز متاح`}
              </span>

              <span>اكتشف • تعرّف • احجز</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK DISCOVERY
      ===================================================== */}

      <section className="relative z-20 mx-auto -mt-7 max-w-7xl px-4 md:-mt-9 md:px-8">
        <div className="rounded-[1.7rem] border border-slate-100 bg-white p-3 shadow-2xl shadow-slate-900/10 md:rounded-[2rem] md:p-5">
          <div className="mb-3 flex items-center justify-between px-1 md:px-2">
            <div>
              <div className="text-[9px] font-black tracking-widest text-[#D92541]">
                QUICK DISCOVERY
              </div>

              <h2 className="mt-1 text-base font-black text-[#18529D] md:text-xl">
                لا تعرف من أين تبدأ؟
              </h2>
            </div>

            <Link
              href="/health-navigator"
              className="text-[9px] font-black text-[#0069D9] md:text-xs"
            >
              المساعد الصحي
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            {discoveryActions.map((item) => (
              <Link
                href={item.href}
                key={item.title}
                className="group rounded-2xl border border-slate-100 bg-slate-50/70 p-3 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg md:p-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl md:h-12 md:w-12 ${
                      item.icon === "emergency"
                        ? "bg-[#FFF0F3] text-[#D92541]"
                        : "bg-[#EAF2FF] text-[#0069D9]"
                    } transition group-hover:scale-105`}
                  >
                    <Icon name={item.icon} size={19} />
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-[10px] font-black text-[#18529D] md:text-xs">
                      {item.title}
                    </div>

                    <div className="mt-1 line-clamp-1 text-[8px] text-slate-400 md:text-[9px]">
                      {item.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          ROTATING ANNOUNCEMENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-7 md:px-8 md:pt-12">
        <div className="relative min-h-[175px] overflow-hidden rounded-[1.7rem] bg-[#0D2B52] md:min-h-[205px] md:rounded-[2rem]">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.title}
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeAnnouncement
                  ? "visible translate-x-0 opacity-100"
                  : "invisible translate-x-5 opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#18529D] to-[#0D2B52]" />

              <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full bg-[#0069D9]/30 blur-3xl" />

              <div className="relative flex h-full items-center justify-between gap-6 px-5 md:px-8">
                <div className="max-w-xl text-white">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[8px] font-black">
                      مهم لك
                    </span>

                    <span className="text-[8px] text-white/40">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(announcements.length).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="text-lg font-black md:text-2xl">
                    {announcement.title}
                  </h2>

                  <p className="mt-2 text-[10px] leading-6 text-white/65 md:text-xs">
                    {announcement.text}
                  </p>

                  <Link
                    href={announcement.href}
                    className="mt-3 inline-flex items-center gap-1.5 text-[9px] font-black text-white md:text-xs"
                  >
                    {announcement.label}
                    <Icon name="arrow" size={13} />
                  </Link>
                </div>

                <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-md sm:flex md:h-20 md:w-20 md:rounded-3xl">
                  <Icon name="spark" size={29} />
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 right-5 flex items-center gap-1.5">
            {announcements.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveAnnouncement(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeAnnouncement === index
                    ? "w-7 bg-white"
                    : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CARE TYPES
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <div className="mb-6 text-center md:mb-9">
          <div className="mb-2 flex items-center justify-center gap-2 text-[9px] font-black tracking-wider text-[#D92541] md:text-xs">
            <span className="h-px w-5 bg-[#D92541]" />
            اكتشف الرعاية
            <span className="h-px w-5 bg-[#D92541]" />
          </div>

          <h2 className="text-xl font-black text-[#18529D] md:text-3xl">
            كيف تريد أن تبدأ؟
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-[10px] leading-5 text-slate-500 md:text-sm md:leading-6">
            لا تحتاج إلى معرفة اسم الطبيب مسبقًا. ابدأ من القسم أو احتياجك
            الصحي.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-5">
          {careTypes.map((item) => (
            <div
              key={item.title}
              className="group rounded-[1.4rem] border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:rounded-[1.7rem] md:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#0069D9] transition group-hover:bg-[#0069D9] group-hover:text-white md:h-14 md:w-14">
                <Icon name={item.icon} size={23} />
              </div>

              <h3 className="mt-4 text-sm font-black text-[#18529D] md:text-lg">
                {item.title}
              </h3>

              <p className="mt-1.5 text-[10px] leading-6 text-slate-500 md:text-xs">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          DEPARTMENTS
      ===================================================== */}

      <section
        id="departments"
        className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-20"
      >
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[9px] font-black tracking-wider text-[#D92541] md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D92541]" />
              DEPARTMENTS
            </div>

            <h2 className="text-xl font-black text-[#18529D] md:text-3xl">
              الأقسام والمراكز
            </h2>

            <p className="mt-1.5 text-[10px] leading-5 text-slate-500 md:text-sm md:leading-6">
              {search
                ? `نتائج البحث عن: ${search}`
                : "استكشف التخصصات والخدمات المتاحة في المستشفى."}
            </p>
          </div>

          <Link
            href="/doctors"
            className="hidden items-center gap-1 text-[10px] font-black text-[#0069D9] sm:flex md:text-xs"
          >
            دليل الأطباء
            <Icon name="arrow" size={13} />
          </Link>
        </div>

        {/* Empty */}

        {filteredDepartments.length === 0 ? (
          <div className="rounded-[1.7rem] border border-dashed border-slate-300 bg-white px-5 py-14 text-center md:rounded-[2rem] md:py-20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#0069D9]">
              <Icon name="search" size={27} />
            </div>

            <h3 className="mt-5 text-lg font-black text-[#18529D]">
              لم نجد قسمًا مطابقًا
            </h3>

            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-slate-500">
              جرّب كلمة أخرى أو استخدم المساعد الصحي للبدء من الأعراض
              والاحتياج الصحي.
            </p>

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded-full bg-slate-100 px-4 py-2 text-[10px] font-black text-[#18529D]"
              >
                مسح البحث
              </button>

              <Link
                href="/health-navigator"
                className="rounded-full bg-[#0069D9] px-4 py-2 text-[10px] font-black text-white"
              >
                المساعد الصحي
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {filteredDepartments.map((department, index) => (
              <DepartmentCard
                key={department._id}
                department={department}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* =====================================================
          PATIENT JOURNEY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-8 md:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-l from-[#18529D] to-[#0069D9] px-5 py-8 text-white md:rounded-[2.5rem] md:px-10 md:py-12">
          <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <div className="max-w-2xl">
              <div className="text-[9px] font-black tracking-wider text-[#D4AF37] md:text-xs">
                PATIENT JOURNEY
              </div>

              <h2 className="mt-1.5 text-xl font-black md:text-3xl">
                من القسم إلى الموعد... بخطوات أوضح.
              </h2>

              <p className="mt-2 text-[10px] leading-6 text-blue-100 md:text-sm">
                استكشف القسم، تعرف على الخدمة والطبيب، ثم انتقل إلى الخطوة
                التالية بسهولة.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-4 md:gap-3">
              {[
                "اكتشف احتياجك",
                "اختر القسم",
                "تعرف على الطبيب",
                "احجز موعدك",
              ].map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm md:p-4"
                >
                  <div className="text-[9px] font-black text-[#D4AF37]">
                    0{index + 1}
                  </div>

                  <div className="mt-1.5 text-[10px] font-black md:text-xs">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-center md:flex-row md:items-center md:justify-between md:px-8 md:py-12 md:text-right">
          <div>
            <div className="text-[9px] font-black text-[#D92541] md:text-xs">
              تحتاج مساعدة؟
            </div>

            <h2 className="mt-1 text-lg font-black text-[#18529D] md:text-2xl">
              ابدأ من المساعد الصحي
            </h2>

            <p className="mt-1 text-[10px] text-slate-500 md:text-xs">
              دع تجربتك تبدأ من احتياجك بدلًا من البحث عن اسم القسم.
            </p>
          </div>

          <Link
            href="/health-navigator"
            className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#0069D9] px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 md:mx-0"
          >
            افتح المساعد الصحي
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="bg-[#0D2B52]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-center md:flex-row md:items-center md:justify-between md:px-8 md:text-right">
          <div className="flex items-center justify-center gap-2.5 md:justify-start">
            <img
              src="/images/logo.png"
              alt="المستشفى الأوربي الحديث"
              className="h-9 w-9 object-contain"
            />

            <div>
              <div className="text-xs font-black text-white">
                المستشفى الأوربي الحديث
              </div>

              <div className="mt-0.5 text-[8px] text-white/40">
                DIGITAL HEALTH EXPERIENCE
              </div>
            </div>
          </div>

          <div className="text-[8px] text-white/35">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* =====================================================
          MOBILE BOTTOM NAVIGATION
      ===================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,50,90,0.10)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400"
          >
            <Icon name="home" size={20} />
            <span className="text-[8px] font-bold">الرئيسية</span>
          </Link>

          <Link
            href="/departments"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[#0069D9]"
          >
            <Icon name="hospital" size={20} />
            <span className="text-[8px] font-black">الأقسام</span>
          </Link>

          <Link
            href="/doctors"
            className="relative -mt-7 flex flex-col items-center gap-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#D92541] text-white shadow-xl shadow-red-500/25">
              <Icon name="doctor" size={24} />
            </div>

            <span className="mt-0.5 text-[8px] font-black text-[#18529D]">
              الأطباء
            </span>
          </Link>

          <Link
            href="/booking"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400"
          >
            <Icon name="calendar" size={20} />
            <span className="text-[8px] font-bold">الحجز</span>
          </Link>

          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400"
          >
            <Icon name="more" size={20} />
            <span className="text-[8px] font-bold">المزيد</span>
          </button>
        </div>
      </nav>

      {/* =====================================================
          MOBILE MORE SHEET
      ===================================================== */}

      {moreOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          <button
            type="button"
            onClick={() => setMoreOpen(false)}
            className="absolute inset-0 bg-[#0D2B52]/40 backdrop-blur-sm"
            aria-label="إغلاق"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-5 pb-8 shadow-2xl">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200" />

            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-black tracking-widest text-[#D92541]">
                  MORE
                </div>

                <h3 className="mt-1 text-lg font-black text-[#18529D]">
                  خدمات المستشفى
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                ["الصحة الرقمية", "/services", "navigator"],
                ["الإسعافات", "/first-aid", "emergency"],
                ["رحلة المريض", "/patient-journey", "activity"],
                ["المحتوى الطبي", "/health-library", "medical"],
                ["عن المستشفى", "/about", "hospital"],
                ["تواصل معنا", "/contact", "phone"],
              ].map(([title, href, icon]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-[#F7F9FC] p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#18529D] shadow-sm">
                    <Icon name={icon as IconName} size={17} />
                  </div>

                  <span className="text-[10px] font-black text-[#18529D]">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}