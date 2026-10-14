"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ============================================================
// HERO
// ============================================================
import HeroSection from "./components/HeroSection";

// ============================================================
// DISCOVER (المساعد والاستكشاف)
// ============================================================
import DigitalBloodBank from "./components/DigitalBloodBank"; // المكون الجديد
import SmartCareNavigator from "./components/SmartCareNavigator";
import SymptomMatcher from "./components/SymptomMatcher";
import DepartmentFinder from "./components/DepartmentFinder";
import DoctorFinder from "./components/DoctorFinder";
import EmergencyGuide from "./components/EmergencyGuide";
import LiveRadar from "./components/LiveRadar";

// ============================================================
// CALCULATE (الحاسبات الصحية)
// ============================================================
import BmiCalculator from "./components/BmiCalculator";
import HydrationTracker from "./components/HydrationTracker";
import EnergyCalculator from "./components/EnergyCalculator";
import TargetHeartRate from "./components/TargetHeartRate";
import SleepCalculator from "./components/SleepCalculator";

// ============================================================
// CARE & FAMILY (العائلة والأمومة) + (المزمنة وضغط الدم والسكر والأدوية)
// ============================================================
import PregnancyTracker from "./components/PregnancyTracker";
import ChildGrowthChecker from "./components/ChildGrowthChecker";
import ParentCare from "./components/ParentCare";
import ChronicCare from "./components/ChronicCare";
import BloodPressureJournal from "./components/BloodPressureJournal";
import BloodSugarJournal from "./components/BloodSugarJournal"; 
import MedicationReminder from "./components/MedicationReminder";

// ============================================================
// PREPARE (التحضير للزيارة)
// ============================================================
import TestPreparation from "./components/TestPreparation";
import VisitChecklist from "./components/VisitChecklist";
import PatientJourney from "./components/PatientJourney";

// ============================================================
// LEARN (التثقيف والمعاجم)
// ============================================================
import FirstAidCenter from "./components/FirstAidCenter";
import MedicalDictionary from "./components/MedicalDictionary";
import MedicationInformation from "./components/MedicationInformation";

// ============================================================
// ICON SYSTEM
// ============================================================
function Icon({
  name,
  size = 22,
}: {
  name:
    | "spark"
    | "search"
    | "calculator"
    | "heart"
    | "child"
    | "pregnancy"
    | "family"
    | "chronic"
    | "shield"
    | "arrow"
    | "clock"
    | "info"
    | "medical"
    | "emergency"
    | "book"
    | "check"
    | "activity"
    | "document"
    | "apps"
    | "droplet";
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
    case "droplet":
      return (
        <svg {...common}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );
    case "apps":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
          <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M8 7h8M8 12h2M14 12h2M8 16h2M14 16h2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
        </svg>
      );
    case "child":
      return (
        <svg {...common}>
          <circle cx="12" cy="6" r="3" />
          <path d="M8 21v-4a4 4 0 0 1 8 0v4M7 13l5-2 5 2" />
        </svg>
      );
    case "pregnancy":
      return (
        <svg {...common}>
          <circle cx="12" cy="5" r="3" />
          <path d="M8 21c0-5 1-8 4-8s4 3 4 8" />
          <path d="M8 13c-2 0-3.5-1-4-3M16 13c2 0 3.5-1 4-3" />
        </svg>
      );
    case "family":
      return (
        <svg {...common}>
          <circle cx="12" cy="7" r="3" />
          <circle cx="5" cy="10" r="2" />
          <circle cx="19" cy="10" r="2" />
          <path d="M7 21v-3a5 5 0 0 1 10 0v3M2 21v-2a3 3 0 0 1 5-2.5M22 21v-2a3 3 0 0 0-5-2.5" />
        </svg>
      );
    case "chronic":
      return (
        <svg {...common}>
          <path d="M4 12h4l2-6 4 12 2-6h4" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6M12 7h.01" />
        </svg>
      );
    case "medical":
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-10V5l-7-3-7 3v6c0 5.5 7 10 7 10Z" />
          <path d="M12 7v6M9 10h6" />
        </svg>
      );
    case "emergency":
      return (
        <svg {...common}>
          <path d="M12 3 21 20H3L12 3Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h5v17H6a2 2 0 0 1-2-2V5Z" />
          <path d="M20 5a2 2 0 0 0-2-2h-5v17h5a2 2 0 0 0 2-2V5Z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "activity":
      return (
        <svg {...common}>
          <path d="M3 12h4l2-6 4 12 2-6h6" />
        </svg>
      );
    case "document":
      return (
        <svg {...common}>
          <path d="M6 3h9l3 3v15H6V3Z" />
          <path d="M9 12h6M9 16h6M9 8h3" />
        </svg>
      );
    default:
      return null;
  }
}

// ============================================================
// TAB SYSTEM DATA
// ============================================================

type CategoryId = "discovery" | "calculators" | "family" | "chronic" | "prepare" | "learn";

const CATEGORIES: { id: CategoryId; title: string; icon: any }[] = [
  { id: "discovery", title: "المساعد والاستكشاف", icon: "search" },
  { id: "calculators", title: "الحاسبات الصحية", icon: "calculator" },
  { id: "family", title: "العائلة والأمومة", icon: "family" },
  { id: "chronic", title: "المزمنة والضغط", icon: "chronic" },
  { id: "prepare", title: "التحضير للزيارة", icon: "document" },
  { id: "learn", title: "التثقيف والمعاجم", icon: "book" },
];

const TOOLS: Record<CategoryId, { id: string; label: string; component: React.ReactNode }[]> = {
  discovery: [
    { id: "bloodbank", label: "بنك الدم", component: <DigitalBloodBank /> },
    { id: "navigator", label: "المساعد الذكي", component: <SmartCareNavigator /> },
    { id: "symptoms", label: "مطابق الأعراض", component: <SymptomMatcher /> },
    { id: "departments", label: "مستكشف الأقسام", component: <DepartmentFinder /> },
    { id: "doctors", label: "دليل الأطباء", component: <DoctorFinder /> },
    { id: "emergency", label: "دليل الطوارئ", component: <EmergencyGuide /> },
    { id: "radar", label: "حالة الازدحام", component: <LiveRadar /> },
  ],
  calculators: [
    { id: "bmi", label: "كتلة الجسم BMI", component: <BmiCalculator /> },
    { id: "hydration", label: "الماء والترطيب", component: <HydrationTracker /> },
    { id: "energy", label: "السعرات BMR", component: <EnergyCalculator /> },
    { id: "heart", label: "النبض المستهدف", component: <TargetHeartRate /> },
    { id: "sleep", label: "حاسبة النوم", component: <SleepCalculator /> },
  ],
  family: [
    { id: "pregnancy", label: "رحلة الحمل", component: <PregnancyTracker /> },
    { id: "child", label: "نمو الطفل", component: <ChildGrowthChecker /> },
    { id: "parent", label: "رعاية الوالدين", component: <ParentCare /> },
  ],
  chronic: [
    { id: "med_reminder", label: "منبه الأدوية", component: <MedicationReminder /> },
    { id: "bs", label: "سجل السكر", component: <BloodSugarJournal /> },
    { id: "bp", label: "سجل ضغط الدم", component: <BloodPressureJournal /> },
    { id: "chronic_care", label: "الرعاية المستمرة", component: <ChronicCare /> },
  ],
  prepare: [
    { id: "journey", label: "مسار المريض", component: <PatientJourney /> },
    { id: "test_prep", label: "تحضير الفحوصات", component: <TestPreparation /> },
    { id: "checklist", label: "قائمة الزيارة", component: <VisitChecklist /> },
  ],
  learn: [
    { id: "firstaid", label: "الإسعافات الأولية", component: <FirstAidCenter /> },
    { id: "dictionary", label: "قاموس التحاليل", component: <MedicalDictionary /> },
    { id: "medication", label: "دليل الأدوية", component: <MedicationInformation /> },
  ],
};

// ============================================================
// MAIN PAGE
// ============================================================
export default function SmartServicesPage() {
  // Tabs State
  const [activeCategory, setActiveCategory] = useState<CategoryId>("discovery");
  const [activeTool, setActiveTool] = useState<string>("bloodbank");
  const [showOverview, setShowOverview] = useState<boolean>(false);

  // Reset tool when category changes
  useEffect(() => {
    if (TOOLS[activeCategory] && TOOLS[activeCategory].length > 0) {
      setActiveTool(TOOLS[activeCategory][0].id);
    }
  }, [activeCategory]);

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-800 pb-20 md:pb-0">
      
      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 md:px-6 lg:px-8 md:py-3">
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3 shrink-0">
            <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 shrink-0">
              <img
                src="/images/logo.png"
                alt="شعار المستشفى الأوربي الحديث"
                className="h-6 w-6 md:h-10 md:w-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div>
              <h1 className="text-sm font-black leading-none text-[#C21835] md:text-xl">
                المستشفى{" "}
                <span className="text-[#0056B3]">الأوربي</span> الحديث
              </h1>

              <div className="mt-1 text-[7px] md:text-[9px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-slate-400">
                MODERN EUROPEAN HOSPITAL
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#C21835]">الرئيسية</Link>
            <Link href="/departments" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#C21835]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#C21835]">نخبة الأطباء</Link>
            <Link href="/services" className="relative px-3 py-2 text-sm font-black text-[#C21835]">
              الخدمات الذكية
              <span className="absolute bottom-0 right-3 left-3 h-0.5 rounded-full bg-[#C21835]" />
            </Link>
          </nav>

          <Link
            href="/booking"
            className="hidden sm:inline-flex shrink-0 rounded-full bg-[#C21835] px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-black text-white shadow-lg shadow-red-900/10 transition hover:bg-[#a9132d]"
          >
            احجز موعدك
          </Link>
        </div>

        {/* شريط تنقل مخصص للجوال */}
        <div className="lg:hidden border-t border-slate-100 bg-slate-50/50">
          <nav className="flex overflow-x-auto gap-4 px-4 py-3 text-xs md:text-sm font-bold text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link href="/" className="shrink-0 transition hover:text-[#C21835]">الرئيسية</Link>
            <Link href="/departments" className="shrink-0 transition hover:text-[#C21835]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="shrink-0 transition hover:text-[#C21835]">نخبة الأطباء</Link>
            <Link href="/services" className="shrink-0 text-[#C21835] border-b border-[#C21835] pb-0.5">الخدمات الذكية</Link>
            <Link href="/booking" className="shrink-0 text-[#C21835]">احجز موعدك</Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <HeroSection />

      {/* =====================================================
          TABBED FOCUS SYSTEM (مركز العمليات التفاعلي)
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-10 max-w-7xl px-4 md:px-8 pb-16 md:pb-24">
        
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8 rounded-[2rem] bg-white p-5 md:p-8 shadow-xl shadow-blue-900/5 border border-slate-100">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-widest text-[#C21835]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C21835]" />
              SMART HEALTH HUB
            </div>
            <h2 className="text-xl md:text-3xl font-black text-[#103B6D]">
              منصة الخدمات الرقمية المتكاملة
            </h2>
            <p className="mt-2 text-xs md:text-sm text-slate-500 max-w-xl">
              اختر الفئة التي تبحث عنها لعرض أدواتها بتركيز وبدون تشتت، أو استعرض كافة الخدمات دفعة واحدة.
            </p>
          </div>

          <button
            onClick={() => setShowOverview(!showOverview)}
            className={`shrink-0 flex items-center gap-2 rounded-xl border px-5 py-3 text-xs md:text-sm font-black transition-all ${
              showOverview 
              ? "bg-[#103B6D] text-white border-[#103B6D] shadow-lg shadow-blue-900/20" 
              : "bg-blue-50 text-[#0056B3] border-blue-100 hover:bg-[#0056B3] hover:text-white"
            }`}
          >
            <Icon name="apps" size={18} />
            {showOverview ? "العودة للتبويبات المركزية" : "📱 عرض كافة الخدمات"}
          </button>
        </div>

        {/* OVERVIEW GRID MODE */}
        {showOverview ? (
          <div className="animate-[fadeUp_.4s_ease-out_both] space-y-8">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="rounded-[2rem] bg-white p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0056B3]">
                    <Icon name={cat.icon} size={20} />
                  </div>
                  <h3 className="text-lg font-black text-[#103B6D]">{cat.title}</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {TOOLS[cat.id].map((tool) => (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setActiveTool(tool.id);
                        setShowOverview(false);
                        window.scrollTo({ top: 500, behavior: 'smooth' });
                      }}
                      className="text-right p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#0056B3] hover:shadow-md transition-all group"
                    >
                      <span className="text-xs md:text-sm font-bold text-slate-700 group-hover:text-[#0056B3] block mb-1">
                        {tool.label}
                      </span>
                      <span className="text-[10px] text-[#C21835] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        فتح الأداة <Icon name="arrow" size={10} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          
          /* SINGLE FOCUSED TOOL MODE (نظام التبويبات) */
          <div className="animate-[fadeUp_.4s_ease-out_both]">
            {/* 1. Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-3 mb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs md:text-sm font-black transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-[#103B6D] text-white shadow-lg shadow-blue-900/20"
                      : "bg-white text-slate-500 border border-slate-200 hover:bg-blue-50 hover:text-[#0056B3] hover:border-blue-100"
                  }`}
                >
                  <Icon name={cat.icon} size={18} />
                  {cat.title}
                </button>
              ))}
            </div>

            {/* 2. Tool Pills (Sub-navigation) */}
            <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-2.5 md:p-3 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 ms-2 me-3 hidden md:block">اختر الأداة:</span>
              {TOOLS[activeCategory].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTool === tool.id
                      ? "bg-[#0056B3] text-white shadow-md"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-[#103B6D]"
                  }`}
                >
                  {tool.label}
                </button>
              ))}
            </div>

            {/* 3. The Focused Tool Display Area */}
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-2 md:p-6 transition-all min-h-[400px]">
              {TOOLS[activeCategory].find((t) => t.id === activeTool)?.component}
            </div>
          </div>
        )}
      </section>


      {/* ===================================================
          FUTURE DIGITAL HEALTH
      ==================================================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-12 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[38px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-5 md:p-12 text-center md:text-right">
          <div className="absolute -left-10 -top-10 h-32 w-32 md:-left-20 md:-top-20 md:h-72 md:w-72 rounded-full bg-[#0056B3]/10 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-32 w-32 md:-bottom-20 md:right-10 md:h-72 md:w-72 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative z-10 grid gap-6 md:gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <span className="text-[9px] md:text-xs font-black text-[#0056B3]">
                NEXT GENERATION
              </span>

              <h2 className="mt-2 md:mt-3 text-xl font-black leading-tight text-[#103B6D] md:text-5xl">
                مركز الصحة الرقمي
                <br className="hidden md:block" />
                <span className="text-[#0056B3]">
                  مصمم لينمو معك.
                </span>
              </h2>

              <p className="mx-auto md:mx-0 mt-3 md:mt-5 max-w-2xl text-[10px] leading-relaxed md:leading-8 text-slate-500 md:text-base">
                نبدأ بأدوات عامة وتثقيفية، ثم يمكن تطوير المنصة مستقبلًا
                إلى خدمات شخصية وسجل صحي رقمي وتجارب رعاية أكثر تكاملًا،
                مع الحفاظ على فصل السجل الطبي الرسمي ونظام المستشفى الأساسي.
              </p>
            </div>

            <div className="grid gap-2 md:gap-3 grid-cols-2">
              {[
                ["Public Tools", "أدوات عامة"],
                ["Personal Health", "بيانات صحية"],
                ["Digital Care", "رحلة رعاية"],
                ["Local AI", "ذكاء اصطناعي"],
              ].map(([english, arabic]) => (
                <div
                  key={english}
                  className="rounded-xl md:rounded-2xl border border-slate-200 bg-white p-3 md:p-5 shadow-sm text-center md:text-right"
                >
                  <div className="text-[8px] md:text-xs font-black text-[#0056B3]">{english}</div>
                  <div className="mt-1 md:mt-2 text-[10px] md:text-sm font-black text-[#103B6D]">{arabic}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-12 md:pb-24">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[40px] bg-gradient-to-l from-[#07182d] via-[#103B6D] to-[#0056B3] px-5 py-8 md:px-14 md:py-16 text-white shadow-2xl text-center md:text-right">
          <div className="absolute -left-10 -top-10 h-40 w-40 md:-left-24 md:-top-24 md:h-80 md:w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-16 right-5 h-40 w-40 md:-bottom-32 md:right-10 md:h-80 md:w-80 rounded-full bg-[#C21835]/20 blur-3xl" />

          <div className="relative z-10 grid gap-6 md:gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            <div>
              <div className="mb-1.5 md:mb-3 text-[10px] md:text-sm font-black text-[#D4AF37]">خطوتك التالية</div>
              <h2 className="text-xl font-black leading-tight md:text-5xl">
                عرفت ما تحتاج؟
                <br />
                <span className="text-[#D4AF37]">دعنا نوصلك للرعاية المناسبة.</span>
              </h2>
              <p className="mx-auto md:mx-0 mt-2 md:mt-5 max-w-2xl text-[10px] leading-relaxed md:leading-8 text-blue-100 md:text-base">
                اكتشف القسم، تعرّف على الطبيب، استعد لزيارتك، أو انتقل مباشرة إلى الحجز.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 md:gap-3">
              <Link href="/departments" className="flex items-center justify-between rounded-xl md:rounded-2xl bg-white px-4 py-3 md:px-6 md:py-4 text-[11px] md:text-sm font-black text-[#0056B3] transition hover:bg-slate-100">
                <span>الأقسام والمراكز</span>
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={18} /></div>
              </Link>

              <Link href="/doctors" className="flex items-center justify-between rounded-xl md:rounded-2xl border border-white/15 bg-white/10 px-4 py-3 md:px-6 md:py-4 text-[11px] md:text-sm font-black text-white backdrop-blur-md transition hover:bg-white/15">
                <span>نخبة الأطباء</span>
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={18} /></div>
              </Link>

              <Link href="/booking" className="flex items-center justify-between rounded-xl md:rounded-2xl bg-[#C21835] px-4 py-3 md:px-6 md:py-4 text-[11px] md:text-sm font-black text-white shadow-lg transition hover:bg-[#a9132d]">
                <span>احجز موعدك الآن</span>
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={18} /></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#07182d] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:gap-6 px-4 py-6 md:py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <img src="/images/logo.png" alt="المستشفى الأوربي الحديث" className="h-8 w-8 md:h-11 md:w-11 object-contain" />
            <div>
              <div className="font-black text-[13px] md:text-base">المستشفى الأوربي الحديث</div>
              <div className="mt-0.5 md:mt-1 text-[9px] md:text-xs text-slate-500">مركز الصحة الرقمي</div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-1.5 md:gap-2 text-[9px] md:text-xs text-slate-500 border-t border-slate-800 md:border-none pt-3 md:pt-0 mt-1 md:mt-0">
            <div className="scale-75 md:scale-100"><Icon name="shield" size={15} /></div>
            المعلومات الصحية للاستخدام التوعوي
          </div>
        </div>
      </footer>
    </main>
  );
}