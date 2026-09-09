"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChildGrowthChecker() {
  const [age, setAge] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const [result, setResult] = useState<{ status: string; color: string; advice: string } | null>(null);

  const checkGrowth = () => {
    if (age && weight) {
      // معادلة تقريبية لمتوسط وزن الأطفال الطبيعي (بالأشهر حتى 3 سنوات)
      const expectedWeight = (age + 9) / 2; 
      const difference = weight - expectedWeight;

      if (difference < -1.5) {
        setResult({ status: "وزن أقل من الطبيعي", color: "text-orange-500", advice: "قد يحتاج طفلك لمكملات غذائية وتعديل في الرضاعة. ننصح بزيارة طبيب الأطفال." });
      } else if (difference > 2.5) {
        setResult({ status: "زيادة في الوزن", color: "text-purple-500", advice: "نمو متسارع، يفضل استشارة طبيب الأطفال لضبط النظام الغذائي." });
      } else {
        setResult({ status: "نمو سليم ومثالي", color: "text-green-500", advice: "رائع! طفلك ينمو بشكل ممتاز. استمري على هذا النظام." });
      }
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-yellow-400 w-full mx-auto" dir="rtl">
      <div className="text-center mb-6">
        <span className="text-4xl block mb-2">🧸</span>
        <h3 className="text-2xl font-black text-yellow-600 mb-2">مؤشر نمو الطفل</h3>
        <p className="text-slate-500 text-sm">اطمئني على صحة ووزن طفلك بضغطة زر</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">عمر الطفل (بالأشهر)</label>
          <input type="number" placeholder="مثال: 12" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">وزن الطفل (كجم)</label>
          <input type="number" placeholder="مثال: 9.5" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-400" />
        </div>
        <button onClick={checkGrowth} className="w-full bg-yellow-400 text-slate-800 font-bold py-3 rounded-xl hover:bg-yellow-500 transition shadow-md">
          تحقق من النمو
        </button>
      </div>

      {result && (
        <div className="mt-6 p-5 bg-yellow-50 rounded-2xl border border-yellow-100 text-center animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-slate-600 mb-2 font-bold">النتيجة التقديرية:</p>
          <p className={`text-2xl font-black mb-3 ${result.color}`}>{result.status}</p>
          <p className="text-sm text-slate-700 mb-5 leading-relaxed">{result.advice}</p>
          
          <Link href="/booking" className="inline-block bg-[#007A7C] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#005c5e] transition text-sm">
            حجز موعد في عيادة الأطفال
          </Link>
        </div>
      )}
    </div>
  );
}