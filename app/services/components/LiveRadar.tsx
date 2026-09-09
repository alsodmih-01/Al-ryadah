"use client";

import Link from "next/link";

export default function LiveRadar() {
  // بيانات افتراضية تعكس حالة العيادات (في النظام الحقيقي تُجلب من قاعدة البيانات)
  const clinics = [
    { name: "مركز القلب", status: "مزدحم", color: "bg-red-500", border: "border-red-200", wait: "45 دقيقة" },
    { name: "عيادة الأطفال", status: "متوسط", color: "bg-yellow-500", border: "border-yellow-200", wait: "15 دقيقة" },
    { name: "مركز الجلدية", status: "متاح فوراً", color: "bg-green-500", border: "border-green-200", wait: "بدون انتظار" },
    { name: "قسم الطوارئ", status: "أولوية للحالات الحرجة", color: "bg-[#C21835]", border: "border-red-300", wait: "24/7" },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-slate-800 w-full mx-auto" dir="rtl">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            رادار الزحام
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </h3>
          <p className="text-slate-500 text-sm mt-1">حالة العيادات في هذه اللحظة</p>
        </div>
        <div className="text-left">
          <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">تحديث حي (Live)</span>
        </div>
      </div>

      <div className="space-y-3">
        {clinics.map((clinic, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-xl border ${clinic.border} bg-slate-50 hover:bg-white transition-all`}>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${clinic.color} shadow-sm`}></div>
              <p className="font-bold text-slate-700">{clinic.name}</p>
            </div>
            <div className="text-left">
              <p className={`text-xs font-bold ${clinic.color.replace('bg-', 'text-')}`}>{clinic.status}</p>
              <p className="text-[10px] text-slate-400">وقت الانتظار: {clinic.wait}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/booking" className="block text-center w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-900 transition shadow-md">
          استغل وقتك واحجز المتاح الآن
        </Link>
      </div>
    </div>
  );
}