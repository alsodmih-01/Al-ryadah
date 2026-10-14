"use client";

import { useState } from "react";

export default function EnergyCalculator() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [sex, setSex] = useState("");
  const [activity, setActivity] = useState("1.2");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const a = Number(age);
    const w = Number(weight);
    const h = Number(height);

    if (!a || !w || !h || !sex) return;

    const bmr =
      sex === "male"
        ? 10 * w + 6.25 * h - 5 * a + 5
        : 10 * w + 6.25 * h - 5 * a - 161;

    setResult(Math.round(bmr * Number(activity)));
  };

  return (
    <section dir="rtl" className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Nutrition Calculator
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        تقدير الاحتياج اليومي للطاقة
      </h3>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <input
          type="number"
          placeholder="العمر"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="rounded-2xl border px-4 py-3"
        />

        <select
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          className="rounded-2xl border px-4 py-3"
        >
          <option value="">الجنس</option>
          <option value="male">ذكر</option>
          <option value="female">أنثى</option>
        </select>

        <input
          type="number"
          placeholder="الوزن كجم"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="rounded-2xl border px-4 py-3"
        />

        <input
          type="number"
          placeholder="الطول سم"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="rounded-2xl border px-4 py-3"
        />
      </div>

      <select
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="mt-4 w-full rounded-2xl border px-4 py-3"
      >
        <option value="1.2">نشاط منخفض</option>
        <option value="1.375">نشاط خفيف</option>
        <option value="1.55">نشاط متوسط</option>
        <option value="1.725">نشاط مرتفع</option>
      </select>

      <button
        onClick={calculate}
        className="mt-4 w-full rounded-2xl bg-[#0056B3] py-4 font-black text-white"
      >
        احسب التقدير
      </button>

      {result !== null && (
        <div className="mt-6 rounded-2xl bg-blue-50 p-6 text-center">
          <div className="text-4xl font-black text-[#0056B3]">
            {result}
          </div>

          <div className="mt-1 text-sm font-bold text-slate-500">
            سعرة/اليوم تقريبًا
          </div>
        </div>
      )}
    </section>
  );
}