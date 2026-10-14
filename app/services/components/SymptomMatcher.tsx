"use client";

import { useState } from "react";
import Link from "next/link";

const symptoms = [
  {
    id: 1,
    text: "ألم في الصدر أو خفقان",
    department: "مركز القلب والقسطرة",
    urgent: true,
  },
  {
    id: 2,
    text: "مشاكل في البشرة أو الشعر",
    department: "مركز الجلدية والتجميل",
    urgent: false,
  },
  {
    id: 3,
    text: "ألم أو حرقة أثناء التبول",
    department: "قسم المسالك البولية",
    urgent: false,
  },
  {
    id: 4,
    text: "ألم في المفاصل أو الظهر",
    department: "قسم العظام والمفاصل",
    urgent: false,
  },
  {
    id: 5,
    text: "حمى شديدة لدى طفل",
    department: "قسم الأطفال",
    urgent: true,
  },
];

export default function SymptomMatcher() {
  const [selected, setSelected] = useState<number | null>(null);

  const result = symptoms.find((item) => item.id === selected);

  return (
    <section dir="rtl" className="rounded-[32px] border border-red-100 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.06)] md:p-8">
      <span className="text-xs font-black text-[#C21835]">
        Health Navigator
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        موجه الأعراض
      </h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        استكشاف توعوي يساعدك على معرفة نقطة بداية محتملة، وليس تشخيصًا
        طبيًا.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {symptoms.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`rounded-2xl border px-4 py-3 text-sm font-bold transition ${
              selected === item.id
                ? "border-[#0056B3] bg-[#0056B3] text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50"
            }`}
          >
            {item.text}
          </button>
        ))}
      </div>

      {result && (
        <div className="mt-7 rounded-[26px] bg-slate-50 p-6">
          <div className="text-xs font-bold text-slate-400">
            نقطة بداية تعليمية محتملة
          </div>

          <h4 className="mt-2 text-xl font-black text-[#103B6D]">
            {result.department}
          </h4>

          {result.urgent && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-bold leading-7 text-red-700">
              إذا كانت الأعراض شديدة أو مفاجئة أو مصحوبة بعلامات خطورة،
              فلا تعتمد على هذه الأداة واطلب تقييمًا طبيًا عاجلًا.
            </div>
          )}

          <Link
            href="/booking"
            className="mt-5 inline-flex rounded-2xl bg-[#C21835] px-6 py-3 text-sm font-black text-white"
          >
            الانتقال إلى الحجز
          </Link>
        </div>
      )}
    </section>
  );
}