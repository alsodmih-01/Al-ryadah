"use client";

import { useState } from "react";

const items = [
  "الهوية أو المستندات المطلوبة",
  "التقارير السابقة",
  "قائمة الأدوية الحالية",
  "نتائج التحاليل أو الأشعة السابقة",
  "الأسئلة التي تريد مناقشتها",
  "بيانات الموعد",
];

export default function VisitChecklist() {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) => {
    setChecked((current) =>
      current.includes(item)
        ? current.filter((x) => x !== item)
        : [...current, item]
    );
  };

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#C21835]">
        Visit Planner
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        قائمة الاستعداد للزيارة
      </h3>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-right ${
              checked.includes(item)
                ? "border-emerald-200 bg-emerald-50"
                : "border-slate-200 bg-slate-50"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border bg-white text-xs font-black">
              {checked.includes(item) ? "✓" : ""}
            </span>

            <span className="text-sm font-bold text-slate-700">
              {item}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 text-center text-xs text-slate-400">
        مكتمل: {checked.length} / {items.length}
      </div>
    </section>
  );
}