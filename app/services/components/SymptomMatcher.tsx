"use client";

import { useState } from "react";
import Link from "next/link";

const symptomsData = [
  { id: 1, text: "ألم في الصدر أو خفقان", department: "مركز القلب والقسطرة", urgent: true },
  { id: 2, text: "مشاكل في البشرة أو تساقط الشعر", department: "مركز الجلدية والتجميل", urgent: false },
  { id: 3, text: "ألم في الخاصرة أو حرقان", department: "جراحة الإحليل والمسالك", urgent: false },
  { id: 4, text: "ألم في المفاصل أو الظهر", department: "قسم العلاج الطبيعي والعظام", urgent: false },
  { id: 5, text: "حمى شديدة للطفل", department: "قسم الأطفال والحضانات", urgent: true },
];

export default function SymptomMatcher() {
  const [selectedSymptom, setSelectedSymptom] = useState<number | null>(null);

  const activeMatch = symptomsData.find(s => s.id === selectedSymptom);

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-[#C21835] w-full max-w-2xl mx-auto" dir="rtl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-black text-[#C21835] mb-2">الموجه الطبي الذكي</h3>
        <p className="text-slate-500">اختر العرض الذي تعاني منه لنوجهك للقسم المختص فوراً</p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {symptomsData.map((symptom) => (
          <button
            key={symptom.id}
            onClick={() => setSelectedSymptom(symptom.id)}
            className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
              selectedSymptom === symptom.id 
                ? "bg-[#007A7C] text-white shadow-md transform scale-105" 
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {symptom.text}
          </button>
        ))}
      </div>

      {activeMatch && (
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl text-center animate-in slide-in-from-bottom-4 fade-in duration-300">
          <p className="text-slate-500 text-sm mb-2">القسم الطبي الموصى به لحالتك:</p>
          <h4 className="text-xl font-bold text-slate-800 mb-3">{activeMatch.department}</h4>
          
          {activeMatch.urgent && (
            <p className="text-red-600 text-sm font-bold mb-4 bg-red-50 p-2 rounded-lg inline-block">
              عافاك الله! نوصي بزيارة الطوارئ أو الحجز العاجل لهذه الأعراض.
            </p>
          )}

          <div className="mt-4">
            <Link href="/booking" className="bg-[#C21835] hover:bg-red-800 text-white font-bold py-3 px-8 rounded-xl transition shadow-lg inline-block">
              احجز موعدك في {activeMatch.department}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}