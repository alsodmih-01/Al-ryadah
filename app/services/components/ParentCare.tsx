"use client";

import { useState } from "react";

const services = [
  "تنظيم زيارة صحية للوالدين",
  "متابعة الحالات المزمنة",
  "ترتيب موعد للفحوصات",
  "التواصل مع العائلة",
];

export default function ParentCare() {
  const [selected, setSelected] = useState("");

  return (
    <section dir="rtl" className="rounded-[32px] bg-gradient-to-br from-[#0056B3] to-[#103B6D] p-6 text-white shadow-2xl md:p-8">
      <span className="text-xs font-black text-[#D4AF37]">
        Family Care
      </span>

      <h3 className="mt-2 text-3xl font-black">
        برّ الوالدين
      </h3>

      <p className="mt-3 text-sm leading-7 text-blue-100">
        فكرة رقمية لتنظيم رحلة الرعاية للوالدين، خصوصًا عندما يكون
        أحد أفراد الأسرة بعيدًا أو مشغولًا.
      </p>

      <div className="mt-7 space-y-3">
        {services.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`w-full rounded-2xl border p-4 text-right text-sm font-bold transition ${
              selected === item
                ? "border-white bg-white text-[#103B6D]"
                : "border-white/10 bg-white/10 text-white hover:bg-white/15"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 rounded-2xl bg-white/10 p-5 text-sm leading-7 text-blue-100">
          تم اختيار: <strong>{selected}</strong>
        </div>
      )}
    </section>
  );
}