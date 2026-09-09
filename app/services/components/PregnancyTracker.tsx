"use client";

import { useState } from "react";
import Link from "next/link";

// قاعدة بيانات مصغرة لحجم الجنين ونصائح كل مرحلة
const pregnancyMilestones = [
  { min: 1, max: 4, size: "بذرة الخشخاش", icon: "🌱", tip: "تأكدي من تناول حمض الفوليك يومياً، وابتعدي عن الكافيين الزائد." },
  { min: 5, max: 8, size: "حبة توت", icon: "🫐", tip: "قد تشعرين ببعض الغثيان. تناولي وجبات صغيرة ومتعددة، وحان وقت حجز أول سونار نبض!" },
  { min: 9, max: 13, size: "حبة ليمون", icon: "🍋", tip: "أنتِ الآن في نهاية الثلث الأول! خطر الإجهاض ينخفض بشكل كبير، مبروك!" },
  { min: 14, max: 17, size: "تفاحة", icon: "🍎", tip: "مرحباً بك في (شهر العسل للحمل). طاقتك ستعود تدريجياً وسيختفي الغثيان." },
  { min: 18, max: 22, size: "حبة مانجو", icon: "🥭", tip: "قد تبدأين بالشعور بحركات الجنين الرقيقة (الرفرفة). استمتعي بهذه اللحظات الساحرة!" },
  { min: 23, max: 27, size: "حبة باذنجان", icon: "🍆", tip: "تتطور حواس طفلك الآن، يمكنه سماع صوتك بوضوح، تحدثي إليه واستمعي لموسيقى هادئة." },
  { min: 28, max: 32, size: "حبة قرع صغيرة", icon: "🎃", tip: "الثلث الثالث بدأ! استريحي قدر الإمكان وجهزي حقيبة المستشفى لكِ ولطفلك." },
  { min: 33, max: 36, size: "حبة شمام", icon: "🍈", tip: "طفلك يكتسب الوزن بسرعة، قد تشعرين بضيق في التنفس بسبب ضغطه على الحجاب الحاجز." },
  { min: 37, max: 40, size: "بطيخة صغيرة", icon: "🍉", tip: "أنتِ في مرحلة الاستعداد التام. ترقبي علامات الولادة في أي وقت، نحن مستعدون لاستقبالك!" },
  { min: 41, max: 42, size: "مكتمل النمو", icon: "👶", tip: "لقد تجاوزتِ موعدك! طبيبك سيتابعك عن كثب لضمان سلامتك وسلامة طفلك." }
];

export default function PregnancyTracker() {
  const [lmp, setLmp] = useState("");
  const [data, setData] = useState<{
    dueDate: string;
    week: number;
    progress: number;
    milestone: typeof pregnancyMilestones[0];
  } | null>(null);

  const calculatePregnancy = () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);
    const today = new Date();
    
    // حساب موعد الولادة (إضافة 280 يوم)
    const dueDateObj = new Date(lmpDate);
    dueDateObj.setDate(dueDateObj.getDate() + 280);
    
    // حساب الأسابيع الحالية
    const diffTime = Math.abs(today.getTime() - lmpDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffDays / 7);
    
    // نسبة التقدم
    const progressPercent = Math.min(Math.round((diffDays / 280) * 100), 100);

    // جلب بيانات المرحلة
    const currentMilestone = pregnancyMilestones.find(
      m => currentWeek >= m.min && currentWeek <= m.max
    ) || pregnancyMilestones[pregnancyMilestones.length - 1];

    setData({
      dueDate: dueDateObj.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" }),
      week: currentWeek > 42 ? 42 : currentWeek,
      progress: progressPercent,
      milestone: currentMilestone
    });
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border-t-4 border-pink-500 w-full mx-auto font-sans" dir="rtl">
      
      {!data ? (
        <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
          <div className="text-center mb-6">
            <span className="text-4xl block mb-2">🤰</span>
            <h3 className="text-2xl font-black text-pink-600 mb-2">رحلة الأمومة</h3>
            <p className="text-slate-500 text-sm">أدخلي تاريخ أول يوم لآخر دورة شهرية لنرسم لكِ تفاصيل رحلتك.</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">تاريخ آخر دورة (LMP)</label>
              <input 
                type="date" 
                value={lmp} 
                onChange={(e) => setLmp(e.target.value)} 
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-500" 
              />
            </div>
            <button 
              onClick={calculatePregnancy} 
              className="w-full bg-pink-500 text-white font-bold py-3 rounded-xl hover:bg-pink-600 transition shadow-md"
            >
              ابدئي الرحلة
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-2xl font-black text-pink-600">تفاصيل حملك</h3>
            <button onClick={() => setData(null)} className="text-sm text-slate-400 hover:text-pink-500 underline">
              إعادة الحساب
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* البطاقة الأولى: الموعد والتقدم */}
            <div className="bg-pink-50 rounded-2xl p-6 border border-pink-100 text-center flex flex-col justify-center">
              <p className="text-pink-800 font-bold mb-1">موعد الولادة المتوقع 📅</p>
              <p className="text-2xl font-black text-pink-600 mb-6">{data.dueDate}</p>
              
              <div className="w-full bg-white rounded-full h-4 mb-2 shadow-inner overflow-hidden border border-pink-100">
                <div className="bg-gradient-to-l from-pink-400 to-pink-600 h-4 rounded-full transition-all duration-1000" style={{ width: `${data.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold text-pink-800">
                <span>الأسبوع 1</span>
                <span>أنتِ في الأسبوع {data.week} ({data.progress}%)</span>
                <span>الأسبوع 40</span>
              </div>
            </div>

            {/* البطاقة الثانية: حجم الجنين والنصيحة */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-pink-50 rounded-bl-full -z-10"></div>
              
              <p className="text-slate-500 text-sm mb-2 font-bold">حجم طفلك الآن تقريباً بحجم:</p>
              <div className="text-5xl mb-2 animate-bounce">{data.milestone.icon}</div>
              <p className="text-xl font-black text-slate-700 mb-4">{data.milestone.size}</p>
              
              <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm leading-relaxed border border-blue-100">
                <span className="font-bold block mb-1">💡 نصيحة الأوربي الطبية:</span>
                {data.milestone.tip}
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/booking" className="inline-block bg-[#007A7C] hover:bg-[#005c5e] text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg text-lg">
              احجزي موعد المتابعة في قسم النساء والولادة
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}