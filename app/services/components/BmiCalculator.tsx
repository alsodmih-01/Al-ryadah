"use client";

import { useState } from "react";
import Link from "next/link";

export default function BmiCalculator() {
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [result, setResult] = useState<{ bmi: string; status: string; color: string; advice: string } | null>(null);

  const calculateBmi = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const formattedBmi = bmiValue.toFixed(1);

      if (bmiValue < 18.5) {
        setResult({ bmi: formattedBmi, status: "نقص في الوزن", color: "text-blue-500", advice: "ننصحك بزيارة عيادة التغذية لوضع خطة صحية لزيادة الوزن." });
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setResult({ bmi: formattedBmi, status: "وزن مثالي", color: "text-green-500", advice: "رائع! حافظ على نمط حياتك الصحي." });
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setResult({ bmi: formattedBmi, status: "زيادة في الوزن", color: "text-yellow-500", advice: "زيارة استشاري التغذية ستساعدك في الوصول للوزن المثالي بسهولة." });
      } else {
        setResult({ bmi: formattedBmi, status: "سمنة", color: "text-red-600", advice: "السمنة تزيد من خطر أمراض القلب. احجز موعداً للمتابعة مع أطبائنا المتخصصين." });
      }
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-[#0056B3] w-full max-w-md mx-auto" dir="rtl">
      <h3 className="text-2xl font-bold text-[#0056B3] mb-2 text-center">اطمئن على صحتك</h3>
      <p className="text-slate-500 text-sm text-center mb-6">حاسبة مؤشر كتلة الجسم (BMI)</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">الوزن (كجم)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} placeholder="مثال: 75" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0056B3]" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">الطول (سم)</label>
          <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} placeholder="مثال: 170" className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0056B3]" />
        </div>
        <button onClick={calculateBmi} className="w-full bg-[#0056B3] text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition">
          احسب النتيجة
        </button>
      </div>

      {result && (
        <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-100 text-center animate-in fade-in zoom-in duration-300">
          <p className="text-sm text-slate-600 mb-1">مؤشر كتلة الجسم الخاص بك:</p>
          <p className={`text-4xl font-black mb-2 ${result.color}`}>{result.bmi}</p>
          <p className={`font-bold text-lg mb-3 ${result.color}`}>{result.status}</p>
          <p className="text-sm text-slate-600 mb-4">{result.advice}</p>
          <Link href="/booking" className="inline-block bg-[#C21835] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition text-sm">
            احجز استشارتك الآن
          </Link>
        </div>
      )}
    </div>
  );
}