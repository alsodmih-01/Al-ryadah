"use client";

import { useState } from "react";

const tests = {
  "تحليل الدم": [
    "تحقق من تعليمات المختبر قبل الحضور.",
    "اسأل عن الصيام إذا كان الفحص يتطلب ذلك.",
    "أحضر أي طلب أو مستند مطلوب.",
  ],
  "الأشعة": [
    "تحقق من نوع الفحص وتعليمات القسم.",
    "أخبر الفريق عن أي ظروف صحية مهمة.",
    "احضر التقارير والصور السابقة عند طلبها.",
  ],
  "إجراء طبي": [
    "راجع تعليمات الطبيب أو القسم قبل الموعد.",
    "اسأل عن الأدوية التي تستخدمها.",
    "استفسر عن التحضير المطلوب مسبقًا.",
  ],
};

export default function TestPreparation() {
  const [selected, setSelected] = useState<keyof typeof tests | "">("");

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Preparation Center
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        كيف أستعد للفحص؟
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {(Object.keys(tests) as Array<keyof typeof tests>).map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`rounded-2xl border p-4 font-black transition ${
              selected === item
                ? "border-[#0056B3] bg-[#0056B3] text-white"
                : "border-slate-200 bg-slate-50 text-[#103B6D]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 rounded-[24px] bg-blue-50 p-6">
          <h4 className="font-black text-[#103B6D]">
            {selected}
          </h4>

          <div className="mt-4 space-y-3">
            {tests[selected].map((item) => (
              <div key={item} className="text-sm leading-7 text-slate-600">
                ✓ {item}
              </div>
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-slate-500">
            هذه إرشادات عامة. تعليمات القسم أو الطبيب المعتمدة هي المرجع
            النهائي للتحضير.
          </p>
        </div>
      )}
    </section>
  );
}