"use client";

import { useState } from "react";
import Link from "next/link";

const doctors = [
  {
    name: "أطباء القلب",
    specialty: "القلب والقسطرة",
  },
  {
    name: "أطباء الأطفال",
    specialty: "الأطفال",
  },
  {
    name: "أطباء النساء والولادة",
    specialty: "النساء والولادة",
  },
  {
    name: "أطباء العظام",
    specialty: "العظام والمفاصل",
  },
];

export default function DoctorFinder() {
  const [search, setSearch] = useState("");

  const results = doctors.filter(
    (doctor) =>
      doctor.name.includes(search) ||
      doctor.specialty.includes(search)
  );

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Doctor Finder
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        مستكشف الأطباء
      </h3>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن تخصص أو طبيب..."
        className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-4 text-sm font-bold outline-none focus:border-[#0056B3]"
      />

      <div className="mt-5 space-y-3">
        {results.map((doctor) => (
          <Link
            key={doctor.name}
            href="/doctors"
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div>
              <div className="font-black text-[#103B6D]">
                {doctor.name}
              </div>

              <div className="mt-1 text-xs text-slate-400">
                {doctor.specialty}
              </div>
            </div>

            <span className="font-black text-[#C21835]">
              الأطباء ←
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}