"use client";

import { useState } from "react";
import Link from "next/link";

export default function ParentCare() {
  const [step, setStep] = useState(1);
  const [packageType, setPackageType] = useState("");

  const packages = [
    { id: "comprehensive", name: "الفحص الشامل الماسي", icon: "💎", desc: "باطنية، قلب، تحاليل شاملة، وفيتامينات" },
    { id: "diabetes", name: "متابعة السكر والضغط", icon: "🩸", desc: "قياس تراكمي، وظائف كلى، وكشف شبكية" },
    { id: "bones", name: "صحة العظام والمفاصل", icon: "🦴", desc: "أشعة مقطعية، كالسيوم، وفحص روماتيزم" },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0056B3] to-blue-900 p-6 md:p-8 rounded-3xl shadow-2xl text-white w-full mx-auto relative overflow-hidden" dir="rtl">
      {/* تأثير بصري في الخلفية */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      
      <div className="relative z-10 text-center mb-6">
        <span className="text-4xl block mb-2">🤲</span>
        <h3 className="text-2xl font-black text-blue-100 mb-2">باقة بِرّ الوالدين</h3>
        <p className="text-blue-200 text-sm">أنت في الغربة أو مشغول؟ نحن نعتني بوالديك ونرسل تقاريرهم الطبية مباشرة إلى واتساب الخاص بك.</p>
      </div>

      {step === 1 && (
        <div className="space-y-3 animate-in fade-in duration-500">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => { setPackageType(pkg.name); setStep(2); }}
              className="w-full bg-white/10 hover:bg-white/20 border border-blue-500/30 text-right p-4 rounded-xl flex items-center gap-4 transition-all"
            >
              <span className="text-3xl">{pkg.icon}</span>
              <div>
                <h4 className="font-bold text-white text-lg">{pkg.name}</h4>
                <p className="text-blue-200 text-xs">{pkg.desc}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 animate-in slide-in-from-right duration-300">
          <div className="bg-white/10 p-4 rounded-xl border border-blue-500/30 mb-4">
            <p className="text-sm text-blue-200">الباقة المختارة:</p>
            <p className="font-bold text-lg">{packageType}</p>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-blue-200 mb-2">رقم واتساب الابن/الابنة (لاستلام النتائج)</label>
            <input type="tel" placeholder="مثال: +967 7X XXX XXXX" className="w-full bg-white/5 border border-blue-500 rounded-xl px-4 py-3 text-white placeholder-blue-300 focus:outline-none focus:bg-white/10" dir="ltr" />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(3)} className="flex-1 bg-[#C21835] text-white font-bold py-3 rounded-xl hover:bg-red-700 transition shadow-lg">
              تأكيد الحجز للوالد/ة
            </button>
            <button onClick={() => setStep(1)} className="px-4 py-3 bg-transparent text-blue-200 hover:text-white transition text-sm">
              رجوع
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-6 animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/50">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h4 className="text-xl font-bold mb-2">تم تجهيز ملف الرعاية!</h4>
          <p className="text-blue-100 text-sm mb-6">سنستقبل الوالد/ة كبار الشخصيات (VIP)، وستصلك رسالة واتساب فور دخوله للطبيب.</p>
          <button onClick={() => setStep(1)} className="text-blue-300 hover:text-white underline text-sm">إجراء حجز جديد</button>
        </div>
      )}
    </div>
  );
}