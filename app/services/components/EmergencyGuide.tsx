"use client";

import { useState } from "react";

const redFlags = [
  "صعوبة شديدة في التنفس",
  "فقدان الوعي أو عدم الاستجابة",
  "ألم صدري شديد أو مفاجئ",
  "نزيف شديد",
  "تشنجات مستمرة",
  "أعراض عصبية مفاجئة شديدة",
];

export default function EmergencyGuide() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      dir="rtl"
      className="rounded-[36px] border border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-lg md:p-8"
    >
      <span className="text-xs font-black text-[#C21835]">
        Emergency Safety Guide
      </span>

      <h3 className="mt-2 text-3xl font-black text-[#103B6D]">
        هل توجد علامة خطورة؟
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        هذه الصفحة لا تشخص الحالات، لكنها تساعد على التعرف على بعض
        العلامات التي تستدعي التعامل العاجل.
      </p>

      <div className="mt-6 space-y-3">
        {redFlags.map((item) => (
          <button
            key={item}
            onClick={() => setActive(item)}
            className="flex w-full items-center justify-between rounded-2xl border border-red-100 bg-white p-4 text-right"
          >
            <span className="font-black text-slate-700">
              {item}
            </span>

            <span className="text-[#C21835]">
              →
            </span>
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-6 rounded-[24px] bg-[#C21835] p-6 text-white">
          <h4 className="text-lg font-black">
            {active}
          </h4>

          <p className="mt-2 text-sm leading-7 text-red-50">
            عند وجود هذه العلامة، خاصة إذا كانت شديدة أو مفاجئة،
            لا تعتمد على الأدوات الرقمية لتحديد مستوى الخطورة؛ اطلب
            تقييمًا طبيًا عاجلًا وفق خدمات الطوارئ المتاحة.
          </p>
        </div>
      )}
    </section>
  );
}