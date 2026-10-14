"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// دالة لتوليد معلومات تفاعلية بناءً على أسبوع الحمل
const getWeeklyData = (week: number) => {
  if (week < 5) return { size: "بذرة سمسم", desc: "يبدأ الجهاز العصبي والقلب بالتكون ببطء.", fruit: "🌱", hospital: "تأكيد الحمل بفحص الدم (B-HCG)", trimester: 1 };
  if (week < 9) return { size: "حبة توت", desc: "ينبض القلب الصغير الآن، وتبدأ الأطراف بالظهور.", fruit: "🫐", hospital: "الزيارة الأولى لطبيب النساء والولادة", trimester: 1 };
  if (week < 14) return { size: "ليمونة", desc: "نهاية الثلث الأول! الأعضاء الأساسية اكتملت تماماً.", fruit: "🍋", hospital: "سونار السماكة القفوية (NT Scan)", trimester: 1 };
  if (week < 18) return { size: "تفاحة", desc: "يبدأ الجنين بسماع الأصوات الخارجية، يمكنك التحدث إليه.", fruit: "🍎", hospital: "متابعة روتينية للنمو والنبض", trimester: 2 };
  if (week < 23) return { size: "موزة", desc: "حركة الجنين (الركلات) تصبح أكثر وضوحاً لكِ الآن.", fruit: "🍌", hospital: "سونار التفاصيل التشريحية (Anatomy Scan)", trimester: 2 };
  if (week < 28) return { size: "باذنجانة", desc: "يفتح الجنين عينيه ويبدأ بالتدرب على حركات التنفس.", fruit: "🍆", hospital: "فحص سكر الحمل (OGTT)", trimester: 2 };
  if (week < 33) return { size: "حبة جوز هند", desc: "تطور سريع في الدماغ وتراكم للدهون تحت الجلد.", fruit: "🥥", hospital: "متابعة وضعية الجنين وكمية السائل", trimester: 3 };
  if (week < 37) return { size: "أناناسة", desc: "يكتسب وزناً بسرعة تحضيراً للخروج إلى العالم.", fruit: "🍍", hospital: "زيارات نصف شهرية وتخطيط نبض الجنين", trimester: 3 };
  return { size: "بطيخة صغيرة", desc: "الجنين مكتمل النمو ومستعد للقائك في أي لحظة!", fruit: "🍉", hospital: "مراجعة أسبوعية استعداداً للولادة", trimester: 3 };
};

export default function PregnancyTracker() {
  const [lmp, setLmp] = useState("");
  const [result, setResult] = useState<{
    dueDate: string;
    week: number;
    days: number;
    progress: number;
  } | null>(null);

  const calculate = () => {
    if (!lmp) return;

    const lmpDate = new Date(`${lmp}T00:00:00`);
    const today = new Date();

    if (lmpDate > today) return;

    const due = new Date(lmpDate);
    due.setDate(due.getDate() + 280);

    const diffTime = today.getTime() - lmpDate.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const week = Math.min(Math.floor(totalDays / 7), 42);
    const days = totalDays % 7;

    setResult({
      dueDate: due.toLocaleDateString("ar-EG", { weekday: 'long', year: "numeric", month: "long", day: "numeric" }),
      week: week === 0 ? 1 : week,
      days,
      progress: Math.min(Math.round((totalDays / 280) * 100), 100),
    });
  };

  const weeklyData = result ? getWeeklyData(result.week) : null;

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] text-right p-2 md:p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">رحلة الحمل</h2>
        <p className="text-slate-500 text-sm">رفيقك الرقمي أسبوعاً بأسبوع حتى موعد اللقاء.</p>
      </div>

      {!result ? (
        // ==========================================
        // شاشة الإدخال
        // ==========================================
        <div className="max-w-xl mx-auto bg-white border border-pink-100 p-6 md:p-8 rounded-3xl shadow-lg shadow-pink-900/5">
          <div className="flex justify-center mb-6 text-5xl">🤰🏻</div>
          
          <label className="block text-sm font-black text-[#103B6D] mb-2 text-center">
            ما هو أول يوم لآخر دورة شهرية؟
          </label>
          <p className="text-xs text-slate-500 text-center mb-6">سيقوم النظام بحساب عمر الحمل وموعد الولادة المتوقع وتجهيز خطة المتابعة.</p>

          <input
            type="date"
            value={lmp}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setLmp(e.target.value)}
            className="w-full rounded-2xl border-2 border-pink-50 p-4 text-center text-lg font-bold text-[#C21835] focus:outline-none focus:border-pink-300 transition bg-pink-50/30"
          />

          <button
            onClick={calculate}
            className="mt-6 w-full rounded-2xl bg-[#C21835] py-4 font-black text-white shadow-lg shadow-red-900/20 hover:bg-[#a9132d] transition transform hover:-translate-y-0.5"
          >
            ابدئي الرحلة ✨
          </button>
        </div>
      ) : (
        // ==========================================
        // شاشة النتيجة والتفاعل
        // ==========================================
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
          
          {/* البطاقة الرئيسية: عمر الحمل */}
          <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 p-6 md:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute -left-10 -top-10 text-8xl opacity-10 drop-shadow-xl">{weeklyData?.fruit}</div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <div className="text-[10px] font-black tracking-widest text-[#C21835] mb-1">CURRENT STAGE</div>
                <div className="text-3xl font-black text-[#103B6D]">
                  الأسبوع {result.week}
                </div>
                <div className="text-xs font-bold text-slate-500 mt-1">
                  و {result.days} أيام • الثلث {weeklyData?.trimester === 1 ? "الأول" : weeklyData?.trimester === 2 ? "الثاني" : "الثالث"}
                </div>
              </div>
              <div className="text-5xl drop-shadow-md animate-[softPulse_3s_ease-in-out_infinite]">{weeklyData?.fruit}</div>
            </div>

            {/* شريط التقدم الدائري أو الشريطي */}
            <div className="mt-8 relative z-10">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2">
                <span>البداية</span>
                <span className="text-[#C21835]">{result.progress}% اكتمل</span>
                <span>الولادة</span>
              </div>
              <div className="h-3 md:h-4 w-full bg-pink-100/50 rounded-full overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-l from-[#C21835] to-pink-400 rounded-full relative"
                  style={{ width: `${result.progress}%`, transition: "width 1s ease-in-out" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/30 animate-[pulse_2s_infinite]"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-pink-100 relative z-10">
              <div className="text-[10px] font-bold text-slate-400 mb-1">الموعد المتوقع للولادة</div>
              <div className="text-lg md:text-xl font-black text-[#C21835]">{result.dueDate}</div>
            </div>
          </div>

          {/* البطاقة التثقيفية والطبية */}
          <div className="flex flex-col gap-4">
            
            {/* تطور الجنين */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">👶🏻</div>
                <h3 className="font-black text-[#103B6D]">تطور الجنين هذا الأسبوع</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                في هذا الأسبوع، طفلك تقريباً بحجم <span className="font-black text-[#C21835]">{weeklyData?.size}</span>.
                <br/><br/>
                {weeklyData?.desc}
              </p>
            </div>

            {/* الإجراء الطبي المقترح */}
            <div className="bg-[#103B6D] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">🏥</div>
              <div className="relative z-10">
                <div className="text-[10px] font-bold text-blue-200 mb-1">خطة المتابعة المقترحة هذا الأسبوع:</div>
                <h3 className="text-lg font-black mb-4">{weeklyData?.hospital}</h3>
                
                <div className="flex items-center gap-3">
                  <Link href="/booking" className="bg-white text-[#103B6D] text-xs font-black px-5 py-2.5 rounded-xl hover:bg-blue-50 transition shadow-sm">
                    حجز موعد المتابعة
                  </Link>
                  <button onClick={() => setResult(null)} className="text-xs font-bold text-blue-200 hover:text-white underline px-2">
                    تعديل التاريخ
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}