"use client";

import React, { useState } from "react";
import Link from "next/link";

// نوع بيانات حالات الإسعافات الأولية
type FirstAidCase = {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  steps: string[];
  warnings: string[];
  imagePlaceholder?: string; // مسار لرسوم توضيحية أو GIF مستقبلاً
};

export default function FirstAidCenter() {
  const [activeCase, setActiveCase] = useState<string>("burns");

  const cases: FirstAidCase[] = [
    {
      id: "burns",
      title: "الحروق",
      icon: "🔥",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      steps: [
        "أبعد المصاب فوراً عن مصدر الحرارة.",
        "برّد المنطقة المحترقة بماء جارٍ فاتر (ليس بارداً جداً) لمدة 15-20 دقيقة.",
        "قم بإزالة الخواتم أو الملابس الضيقة من المنطقة المصابة قبل أن تتورم.",
        "غطِّ الحرق بضمادة نظيفة أو شاش معقم غير لاصق.",
        "توجه إلى الطوارئ إذا كان الحرق في الوجه، اليدين، أو يغطي مساحة كبيرة."
      ],
      warnings: [
        "لا تضع الثلج أو الماء المثلج على الحرق أبداً.",
        "لا تستخدم معجون الأسنان، الزبدة، أو أي مراهم غير طبية.",
        "لا تقم بفقع الفقاعات المائية (البثور) المتكونة على الجلد."
      ],
      imagePlaceholder: "تبريد الحرق بالماء الجاري"
    },
    {
      id: "bleeding",
      title: "النزيف والجروح",
      icon: "🩸",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      steps: [
        "اغسل يديك جيداً إن أمكن أو ارتدِ قفازات طبية.",
        "اضغط بقوة وبشكل مباشر على الجرح باستخدام قطعة قماش نظيفة أو شاش.",
        "ارفع العضو المصاب (الذراع أو الساق) فوق مستوى القلب إن أمكن لتقليل تدفق الدم.",
        "إذا تشبعت القماشة بالدم، لا تزلها! بل ضع قماشة أخرى فوقها واستمر بالضغط.",
        "حافظ على هدوء المصاب وتوجه للطوارئ فوراً إذا لم يتوقف النزيف بعد 10 دقائق."
      ],
      warnings: [
        "لا تزل الأجسام المغروزة بعمق في الجرح (مثل الزجاج أو السكاكين) بل اضغط حولها.",
        "لا تغسل الجرح العميق أو النازف بشدة بالماء لتجنب إزالة جلطات الدم المتخثرة."
      ],
      imagePlaceholder: "الضغط المباشر على الجرح ورفع العضو"
    },
    {
      id: "choking",
      title: "الاختناق (الغصة)",
      icon: "😨",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      steps: [
        "إذا كان المصاب يسعل بقوة، شجعه على الاستمرار في السعال ولا تتدخل.",
        "إذا توقف عن السعال ولم يستطع التنفس، قف خلفه وقم بإمالته قليلاً للأمام.",
        "وجه 5 ضربات قوية بين لوحي كتفه باستخدام كعب يدك.",
        "إذا لم يخرج الجسم الغريب، قم بإجراء 'مناورة هيمليخ' (5 ضغطات بطنية للداخل والأعلى).",
        "اتصل بالطوارئ فوراً واستمر بالتبديل بين الضربات والضغطات حتى يخرج الجسم أو يفقد الوعي."
      ],
      warnings: [
        "لا تضع إصبعك في فم المصاب لمحاولة إخراج الجسم إلا إذا كنت تراه بوضوح تام.",
        "يختلف الإجراء للرضع (أقل من سنة)، حيث يتطلب ضربات على الظهر وضغطات على الصدر بإصبعين فقط."
      ],
      imagePlaceholder: "مناورة هيمليخ (ضغطات البطن)"
    },
    {
      id: "fainting",
      title: "الإغماء وفقدان الوعي",
      icon: "😵",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      steps: [
        "تأكد من سلامة المكان حول المصاب.",
        "ضع المصاب على ظهره، وارفع ساقيه لأعلى (حوالي 30 سم) لزيادة تدفق الدم للدماغ.",
        "قم بفك الملابس الضيقة حول الرقبة والصدر (مثل ربطة العنق أو الياقة).",
        "إذا كان يتقيأ، ضعه على جانبه (وضعية الإفاقة) لمنع الاختناق.",
        "إذا لم يستعد وعيه خلال دقيقة، اتصل بالطوارئ وتحقق من تنفسه للبدء بالإنعاش (CPR) إن لزم الأمر."
      ],
      warnings: [
        "لا ترش الماء بوجه المصاب أو تصفعه لإيقاظه.",
        "لا تحاول إطعامه أو سقيّه أي سوائل حتى يستعيد وعيه تماماً."
      ],
      imagePlaceholder: "وضعية الإفاقة الجانبية"
    }
  ];

  const currentCase = cases.find(c => c.id === activeCase) || cases[0];

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl mb-3 border border-slate-200 shadow-sm text-[#103B6D]">
          🚑
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">دليل الإسعافات الأولية</h2>
        <p className="text-slate-500 text-sm">خطوات سريعة وحاسمة للتعامل مع الحالات الطارئة قبل وصول المساعدة الطبية.</p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-8 mt-8">
        
        {/* =======================================
            الجانب الأيمن: تفاصيل الحالة (Instructions)
        ======================================= */}
        <div className={`bg-white border rounded-3xl shadow-sm overflow-hidden h-fit transition-all duration-300 ${currentCase.borderColor}`}>
          
          {/* Header of the Case */}
          <div className={`${currentCase.bgColor} p-6 border-b ${currentCase.borderColor} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl drop-shadow-sm">{currentCase.icon}</span>
              <div>
                <h3 className={`font-black text-xl md:text-2xl ${currentCase.color}`}>{currentCase.title}</h3>
                <p className="text-xs text-slate-600 font-bold mt-1">الإجراءات الصحيحة للتعامل مع الحالة</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 space-y-8">
            
            {/* Steps (ماذا تفعل) */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-emerald-100 text-emerald-600 font-black px-3 py-1 rounded-full text-xs border border-emerald-200">
                  ماذا تفعل؟ ✅
                </span>
              </div>
              <ul className="space-y-4">
                {currentCase.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs font-black bg-slate-800 mt-0.5`}>
                      {idx + 1}
                    </span>
                    <span className="text-sm md:text-base font-bold text-slate-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Warnings (احذر) */}
            <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-red-100 text-red-700 font-black px-3 py-1 rounded-full text-xs border border-red-200">
                  أخطاء شائعة (احذر) ❌
                </span>
              </div>
              <ul className="space-y-2">
                {currentCase.warnings.map((warning, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">⚠️</span>
                    <span className="text-xs md:text-sm font-bold text-red-800 leading-relaxed">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Placeholder for future images/GIFs */}
            <div className="w-full h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400">
              <span className="text-2xl mb-1">🖼️</span>
              <span className="text-xs font-bold">صورة توضيحية: {currentCase.imagePlaceholder}</span>
            </div>

          </div>
        </div>

        {/* =======================================
            الجانب الأيسر: قائمة الحالات وزر الطوارئ
        ======================================= */}
        <div className="flex flex-col gap-4">
          
          {/* List of emergencies */}
          <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
            <h3 className="font-black text-[#103B6D] mb-4 text-sm">اختر الحالة الطارئة:</h3>
            <div className="flex flex-col gap-2">
              {cases.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCase(c.id)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${
                    activeCase === c.id
                      ? `${c.bgColor} ${c.color} ${c.borderColor} shadow-sm transform scale-[1.02]`
                      : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{c.icon}</span>
                    <span className="font-black text-sm md:text-base">{c.title}</span>
                  </div>
                  <span className={`transition-opacity ${activeCase === c.id ? "opacity-100" : "opacity-0"}`}>
                    👈
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Call to Action */}
          <div className="bg-gradient-to-br from-[#C21835] to-[#8a1125] p-6 rounded-3xl shadow-lg shadow-red-900/20 text-white text-center relative overflow-hidden mt-2">
            <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10">
              <div className="text-4xl mb-3 animate-[softPulse_1s_infinite]">🚑</div>
              <h3 className="font-black text-lg mb-2">الحالة حرجة أو لا تتحسن؟</h3>
              <p className="text-xs text-red-100 mb-5 leading-relaxed">
                لا تتردد في طلب المساعدة الطبية الفورية من قسم الطوارئ بمستشفى الأوربي الحديث.
              </p>
              <Link 
                href="/emergency" 
                className="block w-full bg-white text-[#C21835] font-black py-3.5 rounded-xl shadow-md hover:bg-red-50 transition"
              >
                الاتصال بالطوارئ الآن
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}