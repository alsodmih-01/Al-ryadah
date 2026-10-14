"use client";

import { useMemo, useState } from "react";

const terms = [
  {
    term: "HbA1c",
    arabic: "السكر التراكمي",
    explanation:
      "تحليل يستخدم لتقدير متوسط مستوى سكر الدم خلال فترة زمنية ممتدة.",
  },
  {
    term: "BMI",
    arabic: "مؤشر كتلة الجسم",
    explanation:
      "مؤشر حسابي يعتمد على الوزن والطول ويستخدم ضمن تقييمات معينة للبالغين.",
  },
  {
    term: "Blood Pressure",
    arabic: "ضغط الدم",
    explanation:
      "قياس لقوة ضغط الدم على جدران الشرايين أثناء الدورة الدموية.",
  },
  {
    term: "Ultrasound",
    arabic: "الموجات فوق الصوتية",
    explanation:
      "تقنية تصوير تستخدم موجات صوتية عالية التردد لإنتاج صور داخل الجسم.",
  },
];

export default function MedicalDictionary() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      terms.filter(
        (item) =>
          item.term.toLowerCase().includes(search.toLowerCase()) ||
          item.arabic.includes(search)
      ),
    [search]
  );

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Medical Dictionary
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        القاموس الطبي
      </h3>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن مصطلح طبي..."
        className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-4"
      />

      <div className="mt-5 space-y-3">
        {filtered.map((item) => (
          <article
            key={item.term}
            className="rounded-2xl bg-slate-50 p-5"
          >
            <div className="text-xs font-bold text-[#0056B3]">
              {item.term}
            </div>

            <h4 className="mt-1 font-black text-[#103B6D]">
              {item.arabic}
            </h4>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              {item.explanation}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}