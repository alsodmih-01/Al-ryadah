"use client";

import { useState } from "react";

const options = [
  { id: "symptoms", title: "لدي أعراض", target: "symptom" },
  { id: "department", title: "أبحث عن تخصص", target: "department" },
  { id: "calculator", title: "أريد حساب مؤشر صحي", target: "calculator" },
  { id: "family", title: "أتابع صحة عائلتي", target: "family" },
  { id: "pregnancy", title: "أنا حامل", target: "pregnancy" },
  { id: "child", title: "أتابع صحة طفلي", target: "child" },
];

export default function SmartCareNavigator() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = options.find((item) => item.id === selected);

  const messages: Record<string, string> = {
    symptoms: "ابدأ بموجه الأعراض للحصول على نقطة بداية تعليمية.",
    department: "استخدم مستكشف الأقسام للتعرف على التخصصات المتاحة.",
    calculator: "انتقل إلى الحاسبات الصحية المتاحة.",
    family: "استخدم أدوات الأسرة والرعاية المستمرة.",
    pregnancy: "ابدأ أداة رحلة الحمل.",
    child: "ابدأ أداة صحة الطفل.",
  };

  return (
    <section
      id="navigator"
      dir="rtl"
      className="rounded-[36px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.07)] md:p-10"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-black text-[#C21835]">
          Smart Care Navigator
        </span>

        <h2 className="mt-3 text-3xl font-black text-[#103B6D] md:text-4xl">
          ماذا تحتاج اليوم؟
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-500 md:text-base">
          لا تحتاج إلى معرفة اسم الأداة. اختر احتياجك وسنوجهك إلى نقطة
          البداية المناسبة داخل مركز الصحة الرقمي.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelected(item.id)}
            className={`rounded-[24px] border p-5 text-right transition-all ${
              selected === item.id
                ? "border-[#0056B3] bg-[#0056B3] text-white shadow-xl"
                : "border-slate-200 bg-slate-50 text-[#103B6D] hover:border-blue-200 hover:bg-blue-50"
            }`}
          >
            <div className="text-sm font-black">{item.title}</div>
          </button>
        ))}
      </div>

      {active && (
        <div className="mx-auto mt-8 max-w-3xl rounded-[26px] border border-blue-100 bg-blue-50 p-6 text-center">
          <h3 className="text-lg font-black text-[#103B6D]">
            الخطوة المقترحة
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            {messages[active.id]}
          </p>
        </div>
      )}
    </section>
  );
}