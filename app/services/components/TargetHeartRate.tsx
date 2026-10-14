"use client";

import { useState } from "react";

export default function TargetHeartRate() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState<{ low: number; high: number } | null>(null);

  const calculate = () => {
    const a = Number(age);

    if (!a || a <= 0) return;

    const max = 220 - a;

    setResult({
      low: Math.round(max * 0.5),
      high: Math.round(max * 0.85),
    });
  };

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg">
      <span className="text-xs font-black text-[#C21835]">
        Activity Tool
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        نطاق نبض القلب أثناء النشاط
      </h3>

      <input
        type="number"
        placeholder="العمر"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mt-5 w-full rounded-2xl border px-4 py-3"
      />

      <button
        onClick={calculate}
        className="mt-4 w-full rounded-2xl bg-[#C21835] py-4 font-black text-white"
      >
        احسب النطاق
      </button>

      {result && (
        <div className="mt-5 rounded-2xl bg-red-50 p-6 text-center">
          <div className="text-3xl font-black text-[#C21835]">
            {result.low} – {result.high}
          </div>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            هذا تقدير عام للنشاط البدني وليس هدفًا مناسبًا لكل شخص.
            بعض الحالات والأدوية تتطلب نطاقات مختلفة.
          </p>
        </div>
      )}
    </section>
  );
}