"use client";

import { useState } from "react";

const medicines = [
  {
    name: "Paracetamol",
    category: "مسكن وخافض للحرارة",
    info: "يستخدم بصورة شائعة لتخفيف الألم وخفض الحرارة. الجرعة المناسبة تعتمد على العمر والحالة والمنتج.",
  },
  {
    name: "Amoxicillin",
    category: "مضاد حيوي",
    info: "مضاد حيوي يستخدم في حالات عدوى بكتيرية محددة، ولا يفيد في العدوى الفيروسية الشائعة.",
  },
  {
    name: "Ibuprofen",
    category: "مسكن ومضاد التهاب",
    info: "قد يستخدم لتخفيف الألم والالتهاب والحرارة، لكن توجد حالات وأدوية قد تجعل استخدامه غير مناسب.",
  },
];

export default function MedicationInformation() {
  const [search, setSearch] = useState("");

  const results = medicines.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#C21835]">
        Medication Information
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        معلومات الأدوية
      </h3>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="ابحث عن اسم الدواء..."
        className="mt-5 w-full rounded-2xl border px-4 py-4"
      />

      <div className="mt-5 space-y-3">
        {results.map((item) => (
          <article
            key={item.name}
            className="rounded-2xl bg-slate-50 p-5"
          >
            <div className="font-black text-[#103B6D]">
              {item.name}
            </div>

            <div className="mt-1 text-xs font-bold text-[#0056B3]">
              {item.category}
            </div>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {item.info}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-amber-50 p-4 text-xs leading-6 text-slate-600">
        هذه معلومات عامة وليست وصفة أو بديلًا عن الطبيب أو الصيدلي.
        لا تستخدم المعلومات لتغيير الجرعة أو إيقاف العلاج دون استشارة
        مختص.
      </div>
    </section>
  );
}