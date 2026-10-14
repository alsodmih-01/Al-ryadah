"use client";

import { useState } from "react";

export default function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = Number(weight);
    const h = Number(height) / 100;

    if (!w || !h) return;

    setResult(w / (h * h));
  };

  let status = "";

  if (result !== null) {
    if (result < 18.5) status = "أقل من النطاق المعتاد للبالغين";
    else if (result < 25) status = "ضمن النطاق المعتاد للبالغين";
    else if (result < 30) status = "أعلى من النطاق المعتاد للبالغين";
    else status = "مرتفع";
  }

  return (
    <section id="calculators" dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Health Calculator
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        مؤشر كتلة الجسم
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input
          type="number"
          placeholder="الوزن كجم"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-[#0056B3]"
        />

        <input
          type="number"
          placeholder="الطول سم"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="rounded-2xl border border-slate-200 px-4 py-4 outline-none focus:border-[#0056B3]"
        />
      </div>

      <button
        onClick={calculate}
        className="mt-4 w-full rounded-2xl bg-[#0056B3] py-4 font-black text-white"
      >
        احسب المؤشر
      </button>

      {result !== null && (
        <div className="mt-6 rounded-[24px] bg-blue-50 p-6 text-center">
          <div className="text-5xl font-black text-[#0056B3]">
            {result.toFixed(1)}
          </div>

          <div className="mt-2 font-black text-[#103B6D]">
            {status}
          </div>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            مؤشر كتلة الجسم أداة تقديرية للبالغين ولا يكفي وحده لتقييم
            الصحة أو تكوين تشخيص.
          </p>
        </div>
      )}
    </section>
  );
}