"use client";

import { useState } from "react";

export default function HydrationTracker() {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const value = Number(weight);

    if (!value || value <= 0) return;

    setResult(Number((value * 0.03).toFixed(1)));
  };

  return (
    <section dir="rtl" className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Hydration
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        تقدير الترطيب اليومي
      </h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">
        تقدير توعوي تقريبي، وليس وصفة مناسبة لكل شخص.
      </p>

      <input
        type="number"
        placeholder="الوزن كجم"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="mt-5 w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-[#0056B3]"
      />

      <button
        onClick={calculate}
        className="mt-4 w-full rounded-2xl bg-[#0056B3] py-4 font-black text-white"
      >
        احسب التقدير
      </button>

      {result !== null && (
        <div className="mt-6 rounded-[24px] bg-blue-50 p-6 text-center">
          <div className="text-4xl font-black text-[#0056B3]">
            {result} لتر تقريبًا
          </div>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            الاحتياجات الفعلية تختلف حسب العمر والنشاط والطقس والأدوية
            والحالة الصحية. بعض المرضى قد يحتاجون إلى قيود مختلفة.
          </p>
        </div>
      )}
    </section>
  );
}