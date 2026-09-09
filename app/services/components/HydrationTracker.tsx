"use client";

import { useState } from "react";
import Link from "next/link";

export default function HydrationTracker() {
  const [weight, setWeight] = useState<number | "">("");
  const [sittingHours, setSittingHours] = useState<number | "">("");
  const [result, setResult] = useState<{ liters: string; cups: number; warning: string } | null>(null);

  const calculateWater = () => {
    if (weight && sittingHours) {
      // الحسبة الطبية: 33 مل لكل كيلو + تعويض جفاف الجلوس والمقيل (200 مل لكل ساعة)
      const baseWater = (weight * 0.033);
      const extraWater = (sittingHours * 0.2);
      const totalWater = baseWater + extraWater;
      
      const cupsCount = Math.round(totalWater / 0.25); // الكوب 250 مل
      
      setResult({
        liters: totalWater.toFixed(1),
        cups: cupsCount,
        warning: sittingHours > 4 
          ? "تنبيه: الجلوس الطويل يقلل تروية الكلى، ضاعف شرب الماء لتجنب الحصوات."
          : "حافظ على هذا المعدل لضمان صحة كليتيك."
      });
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-blue-500 w-full mx-auto" dir="rtl">
      <div className="text-center mb-6">
        <span className="text-4xl block mb-2">💧</span>
        <h3 className="text-2xl font-black text-blue-600 mb-2">منبه صحة الكلى</h3>
        <p className="text-slate-500 text-sm">احسب احتياجك الفعلي من الماء (خاصة أوقات المقيل والجلوس الطويل)</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">الوزن (كجم)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">ساعات الجلوس اليومية (لأي نشاط)</label>
          <input type="number" value={sittingHours} onChange={(e) => setSittingHours(Number(e.target.value))} className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" />
        </div>
        <button onClick={calculateWater} className="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition shadow-md">
          احسب احتياجي الآن
        </button>
      </div>

      {result && (
        <div className="mt-6 p-5 bg-blue-50 rounded-2xl border border-blue-100 text-center animate-in zoom-in duration-300">
          <p className="text-slate-600 mb-2 font-bold">جسمك وكليتيك بحاجة إلى:</p>
          <p className="text-4xl font-black text-blue-700 mb-1">{result.liters} لتر يومياً</p>
          <p className="text-blue-500 font-bold mb-4">يعادل تقريباً {result.cups} أكواب 🥛</p>
          
          <div className="bg-white p-3 rounded-xl text-sm text-red-600 font-bold mb-4 shadow-sm border border-red-100">
            {result.warning}
          </div>
          
          <Link href="/booking" className="inline-block bg-[#C21835] text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 transition text-sm">
            احجز للاطمئنان في عيادة الباطنية
          </Link>
        </div>
      )}
    </div>
  );
}