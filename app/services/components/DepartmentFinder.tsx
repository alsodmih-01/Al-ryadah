"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Department = {
  title: string;
  slug: string;
  description: string;
};

const departments: Department[] = [
  {
    title: "مركز القلب والقسطرة",
    slug: "cardiology",
    description:
      "خدمات وتخصصات متعلقة بالقلب والدورة الدموية والقسطرة.",
  },
  {
    title: "قسم الأطفال",
    slug: "pediatrics",
    description:
      "رعاية الأطفال ومتابعة الحالات الطبية ومراحل النمو.",
  },
  {
    title: "قسم النساء والولادة",
    slug: "obstetrics-gynecology",
    description:
      "خدمات صحة المرأة ومتابعة الحمل والولادة.",
  },
  {
    title: "قسم الباطنية",
    slug: "internal-medicine",
    description:
      "تقييم ومتابعة الحالات والأمراض الباطنية المختلفة.",
  },
  {
    title: "قسم العظام والمفاصل",
    slug: "orthopedics",
    description:
      "تخصصات العظام والمفاصل والحركة والإصابات.",
  },
  {
    title: "قسم الأنف والأذن والحنجرة",
    slug: "ent",
    description:
      "خدمات تشخيص ومتابعة أمراض الأنف والأذن والحنجرة.",
  },
  {
    title: "قسم المسالك البولية",
    slug: "urology",
    description:
      "خدمات متخصصة في المسالك البولية والجهاز البولي.",
  },
  {
    title: "جراحة المخ والأعصاب",
    slug: "neurosurgery",
    description:
      "خدمات متخصصة في جراحة المخ والجهاز العصبي.",
  },
  {
    title: "قسم الطوارئ",
    slug: "emergency",
    description:
      "استقبال الحالات التي تحتاج إلى تقييم ورعاية عاجلة.",
  },
  {
    title: "قسم الأشعة التشخيصية",
    slug: "radiology",
    description:
      "خدمات التصوير والتقييم التشخيصي بحسب إمكانات القسم.",
  },
  {
    title: "قسم المختبرات",
    slug: "laboratory",
    description:
      "الفحوصات المخبرية والتحاليل الطبية.",
  },
];

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function MedicalIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-4.5 7-10V5l-7-3-7 3v6c0 5.5 7 10 7 10Z" />
      <path d="M12 7v6M9 10h6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export default function DepartmentFinder() {
  const [search, setSearch] = useState("");

  const filteredDepartments = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return departments;
    }

    return departments.filter(
      (department) =>
        department.title.toLowerCase().includes(normalized) ||
        department.description.toLowerCase().includes(normalized)
    );
  }, [search]);

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.06)]"
    >
      {/* Decorative background */}
      <div className="absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-50 blur-3xl" />

      <div className="relative p-6 md:p-8">
        {/* Header */}
        <div className="mb-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-black text-[#0056B3]">
                Department Finder
              </span>

              <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
                مستكشف الأقسام
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                ابحث عن التخصص أو القسم الذي يناسب احتياجك واستكشف
                خدماته ومعلوماته.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0056B3]">
              <MedicalIcon />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-[#0056B3] focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50">
            <span className="shrink-0 text-[#0056B3]">
              <SearchIcon />
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن قسم أو تخصص..."
              className="h-14 w-full bg-transparent text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
              aria-label="البحث عن قسم"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm transition hover:text-[#C21835]"
                aria-label="مسح البحث"
              >
                <XIcon />
              </button>
            )}
          </div>
        </div>

        {/* Result count */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400">
            {filteredDepartments.length} قسم متاح
          </span>

          {search && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#0056B3]">
              نتائج البحث
            </span>
          )}
        </div>

        {/* Results */}
        <div className="mt-5 max-h-[430px] space-y-3 overflow-y-auto pl-1">
          {filteredDepartments.length > 0 ? (
            filteredDepartments.map((department) => (
              <Link
                key={department.slug}
                href={`/departments/${department.slug}`}
                className="group block rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:bg-white hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0056B3] transition group-hover:bg-[#0056B3] group-hover:text-white">
                    <MedicalIcon />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-black text-[#103B6D]">
                      {department.title}
                    </h4>

                    <p className="mt-1 line-clamp-1 text-xs leading-6 text-slate-400">
                      {department.description}
                    </p>
                  </div>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0056B3] shadow-sm transition group-hover:bg-[#0056B3] group-hover:text-white">
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
                <SearchIcon />
              </div>

              <h4 className="mt-4 font-black text-[#103B6D]">
                لم نجد قسمًا مطابقًا
              </h4>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                جرّب اسمًا مختلفًا أو اكتب جزءًا من اسم التخصص.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-4 rounded-xl bg-[#0056B3] px-5 py-3 text-xs font-black text-white transition hover:bg-[#103B6D]"
              >
                عرض جميع الأقسام
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-100 pt-5">
          <Link
            href="/departments"
            className="flex items-center justify-between rounded-2xl bg-[#103B6D] px-5 py-4 text-sm font-black text-white transition hover:bg-[#0056B3]"
          >
            <span>استعراض جميع الأقسام والمراكز</span>

            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <ArrowIcon />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}