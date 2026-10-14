"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

// الأنواع المتاحة للأدوية
type MedType = "pill" | "syrup" | "injection" | "drops" | "inhaler";

type Medication = {
  id: string;
  name: string;
  dose: string;
  type: MedType;
  times: string[]; // أوقات أخذ الدواء، مثل ["08:00", "20:00"]
  startDate: Date; // تاريخ بدء العلاج
  durationDays: number | "continuous"; // عدد الأيام أو "مستمر"
  needsRefill: boolean; // هل أوشك على الانتهاء ويحتاج صرف؟
};

// حالة الجرعات اليومية
type DoseStatus = "taken" | "missed" | "pending";
type DailyLog = Record<string, DoseStatus>; // مفتاح: id_time

export default function MedicationReminder() {
  const [showAddForm, setShowAddForm] = useState(false);
  
  // بيانات افتراضية لعرضها أمام الإدارة كـ (Demo)
  const [medications, setMedications] = useState<Medication[]>([
    { 
      id: "m1", 
      name: "جلوكوفاج (Glucophage)", 
      dose: "500mg", 
      type: "pill", 
      times: ["08:00", "20:00"], 
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // بدأ من 15 يوم
      durationDays: "continuous", 
      needsRefill: false 
    },
    { 
      id: "m2", 
      name: "أوغمنتين (Augmentin)", 
      dose: "1g", 
      type: "pill", 
      times: ["10:00", "22:00"], 
      startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // بدأ من 3 أيام
      durationDays: 7, // كورس مضاد حيوي 7 أيام
      needsRefill: false 
    },
    { 
      id: "m3", 
      name: "أنسولين لانتوس (Lantus)", 
      dose: "15 Units", 
      type: "injection", 
      times: ["22:00"], 
      startDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // بدأ من 25 يوم
      durationDays: 30, // يصرف شهرياً
      needsRefill: true // أوشك على الانتهاء ويحتاج صرف
    },
  ]);

  // تتبع الجرعات المأخوذة لليوم الحالي
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    "m1_08:00": "taken",
    "m2_10:00": "taken",
  });

  // دوال الإضافة للنموذج
  const [newName, setNewName] = useState("");
  const [newDose, setNewDose] = useState("");
  const [newType, setNewType] = useState<MedType>("pill");
  const [newTimes, setNewTimes] = useState<string[]>(["08:00"]);
  const [newDurationType, setNewDurationType] = useState<"days" | "continuous">("days");
  const [newDurationDays, setNewDurationDays] = useState("7");

  const handleAddMedication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newDose) return;

    const newMed: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName,
      dose: newDose,
      type: newType,
      times: newTimes,
      startDate: new Date(),
      durationDays: newDurationType === "continuous" ? "continuous" : Number(newDurationDays),
      needsRefill: false,
    };

    setMedications([...medications, newMed]);
    setShowAddForm(false);
    
    // تصفير الحقول
    setNewName(""); setNewDose(""); setNewTimes(["08:00"]);
    setNewDurationType("days"); setNewDurationDays("7");
  };

  const toggleDoseStatus = (logKey: string) => {
    setDailyLog(prev => {
      const current = prev[logKey];
      if (current === "taken") return { ...prev, [logKey]: "pending" };
      return { ...prev, [logKey]: "taken" };
    });
  };

  // دالة لحساب الأيام المتبقية في كورس العلاج
  const getTreatmentProgress = (med: Medication) => {
    if (med.durationDays === "continuous") return { text: "علاج مستمر", percent: 100, isFinished: false };
    
    const today = new Date();
    const diffTime = today.getTime() - med.startDate.getTime();
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 لأن اليوم الأول يحسب
    
    if (daysPassed > med.durationDays) {
      return { text: "انتهى الكورس العلاجي", percent: 100, isFinished: true };
    }
    
    const percent = Math.min(Math.round((daysPassed / med.durationDays) * 100), 100);
    return { text: `اليوم ${daysPassed} من ${med.durationDays}`, percent, isFinished: false };
  };

  // ترتيب الجرعات يومياً زمنياً، واستبعاد الأدوية التي انتهى كورسها
  const schedule = useMemo(() => {
    const list: { med: Medication; time: string; logKey: string }[] = [];
    medications.forEach(med => {
      const progressInfo = getTreatmentProgress(med);
      if (!progressInfo.isFinished) { // عرض الأدوية الفعالة فقط
        med.times.forEach(time => {
          list.push({ med, time, logKey: `${med.id}_${time}` });
        });
      }
    });
    return list.sort((a, b) => a.time.localeCompare(b.time));
  }, [medications]);

  // حساب نسبة الالتزام لليوم
  const progress = useMemo(() => {
    if (schedule.length === 0) return 0;
    const taken = schedule.filter(s => dailyLog[s.logKey] === "taken").length;
    return Math.round((taken / schedule.length) * 100);
  }, [schedule, dailyLog]);

  // أيقونات الأدوية
  const getMedIcon = (type: MedType) => {
    switch (type) {
      case "pill": return "💊";
      case "syrup": return "🥄";
      case "injection": return "💉";
      case "drops": return "💧";
      case "inhaler": return "🌬️";
      default: return "💊";
    }
  };

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">منبه ومتتبع الأدوية</h2>
        <p className="text-slate-500 text-sm">نظم أوقات أدويتك، تابع تقدم علاجك، واطلب إعادة الصرف بضغطة زر.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6">
        
        {/* =======================================
            الجانب الأيمن: نموذج الإضافة ومؤشر الالتزام
        ======================================= */}
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          
          {/* زر إضافة دواء جديد */}
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full bg-white border-2 border-dashed border-slate-300 text-[#103B6D] font-black py-4 rounded-3xl hover:border-[#103B6D] hover:bg-blue-50 transition shadow-sm"
          >
            {showAddForm ? "إلغاء الإضافة ✖" : "➕ إضافة دواء جديد"}
          </button>

          {/* نموذج إضافة دواء */}
          {showAddForm && (
            <form onSubmit={handleAddMedication} className="bg-white border border-slate-100 p-5 rounded-3xl shadow-md animate-[fadeUp_.3s_ease-out]">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">اسم الدواء</label>
                  <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="مثال: مضاد حيوي أوغمنتين" className="w-full rounded-xl border px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-[#C21835]" required />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">الجرعة</label>
                    <input type="text" value={newDose} onChange={(e) => setNewDose(e.target.value)} placeholder="مثال: حبة واحدة" className="w-full rounded-xl border px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-[#C21835]" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">النوع</label>
                    <select value={newType} onChange={(e) => setNewType(e.target.value as MedType)} className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-[#C21835]">
                      <option value="pill">حبوب 💊</option>
                      <option value="syrup">شراب 🥄</option>
                      <option value="injection">حقنة 💉</option>
                      <option value="drops">قطرات 💧</option>
                      <option value="inhaler">بخاخ 🌬️</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">مدة العلاج الكلية</label>
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setNewDurationType("days")} className={`flex-1 py-2 rounded-lg text-xs font-black transition border ${newDurationType === "days" ? "bg-white border-[#103B6D] text-[#103B6D] shadow-sm" : "bg-transparent border-slate-200 text-slate-400"}`}>محددة بأيام</button>
                      <button type="button" onClick={() => setNewDurationType("continuous")} className={`flex-1 py-2 rounded-lg text-xs font-black transition border ${newDurationType === "continuous" ? "bg-white border-[#103B6D] text-[#103B6D] shadow-sm" : "bg-transparent border-slate-200 text-slate-400"}`}>مرض مزمن (مستمر)</button>
                    </div>
                  </div>

                  {newDurationType === "days" && (
                    <div className="animate-[fadeUp_.2s_ease-out]">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5">عدد الأيام</label>
                      <input type="number" min="1" value={newDurationDays} onChange={(e) => setNewDurationDays(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm font-bold focus:outline-none focus:border-[#C21835]" required />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">وقت الجرعة الأولى</label>
                  <input type="time" value={newTimes[0]} onChange={(e) => setNewTimes([e.target.value])} className="w-full rounded-xl border px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-[#C21835]" required />
                  <p className="text-[9px] text-slate-400 mt-1.5 font-bold">لإضافة أوقات أخرى لنفس الدواء، يرجى حفظه أولاً ثم تعديله من الإعدادات.</p>
                </div>
                
                <button type="submit" className="w-full mt-2 bg-[#C21835] text-white font-black py-3.5 rounded-xl shadow-lg shadow-red-900/20 hover:bg-[#a9132d] transition">
                  حفظ الدواء في الجدول
                </button>
              </div>
            </form>
          )}

          {/* بطاقة الالتزام */}
          <div className="bg-gradient-to-br from-[#103B6D] to-[#0a2647] p-6 md:p-8 rounded-3xl shadow-lg text-white relative overflow-hidden mt-2">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-blue-200 mb-1">الالتزام اليومي</div>
                <h3 className="text-2xl font-black mb-1">جرعات اليوم</h3>
                <p className="text-xs text-blue-100">
                  لقد أخذت {schedule.filter(s => dailyLog[s.logKey] === "taken").length} من أصل {schedule.length} جرعات مجدولة.
                </p>
              </div>

              {/* دائرة التقدم */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#D4AF37" strokeWidth="3" strokeDasharray={`${progress}, 100`} className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute text-sm font-black">{progress}%</div>
              </div>
            </div>
          </div>

          {/* تنبيه إعادة الصرف (Business Value) */}
          {medications.some(m => m.needsRefill) && (
            <div className="bg-red-50 border border-red-200 p-5 rounded-3xl shadow-sm relative animate-[softPulse_2s_infinite]">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h4 className="font-black text-red-700 text-sm mb-1">تنبيه: أدوية توشك على الانتهاء</h4>
                  <p className="text-xs text-red-600 mb-3 leading-relaxed">
                    يبدو أن دواء <span className="font-bold">({medications.find(m => m.needsRefill)?.name})</span> سينفد قريباً بناءً على استهلاكك.
                  </p>
                  <Link href="/pharmacy/refill" className="inline-block bg-red-600 text-white text-xs font-black px-4 py-2.5 rounded-xl hover:bg-red-700 transition shadow-sm">
                    اطلب إعادة صرف من المستشفى 🛵
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* =======================================
            الجانب الأيسر: الخط الزمني للأدوية وقائمة الجرعات
        ======================================= */}
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-4 md:p-6 h-fit order-1 lg:order-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
            <h3 className="font-black text-[#103B6D] text-lg">الجدول الزمني لليوم</h3>
            <span className="text-xs font-bold bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full w-fit">
              {new Date().toLocaleDateString('ar-EG', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="space-y-4">
            {schedule.length === 0 ? (
              <div className="text-center py-12 flex flex-col items-center justify-center">
                <div className="text-5xl mb-3 opacity-20">🍃</div>
                <div className="text-slate-400 font-bold text-sm">لا توجد أدوية مجدولة لليوم.</div>
                <div className="text-slate-400 text-xs mt-1">يوم صحي وخفيف!</div>
              </div>
            ) : (
              schedule.map((item, index) => {
                const isTaken = dailyLog[item.logKey] === "taken";
                const treatmentInfo = getTreatmentProgress(item.med);
                
                return (
                  <div key={index} className={`flex items-stretch gap-3 md:gap-4 p-3 md:p-4 rounded-2xl border transition-all duration-300 ${isTaken ? "bg-slate-50/70 border-slate-100 opacity-70" : "bg-white border-blue-100 shadow-sm hover:border-[#103B6D]"}`}>
                    
                    {/* التوقيت */}
                    <div className="flex flex-col items-center justify-center shrink-0 w-14 md:w-16 border-l border-slate-100 pl-3 md:pl-4">
                      <span className={`text-base md:text-lg font-black ${isTaken ? "text-slate-400" : "text-[#103B6D]"}`}>{item.time}</span>
                    </div>

                    {/* تفاصيل الدواء ومدة العلاج */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 md:gap-3 mb-1.5">
                        <div className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-xl text-lg md:text-xl shrink-0 ${isTaken ? "bg-slate-200 grayscale" : "bg-blue-50"}`}>
                          {getMedIcon(item.med.type)}
                        </div>
                        <div>
                          <h4 className={`font-black text-sm md:text-base leading-tight transition-colors ${isTaken ? "line-through text-slate-400" : "text-[#103B6D]"}`}>
                            {item.med.name}
                          </h4>
                          <div className="text-[9px] md:text-[10px] font-bold text-slate-500 mt-1">الجرعة: <span className="text-slate-700">{item.med.dose}</span></div>
                        </div>
                      </div>
                      
                      {/* شريط التقدم العلاجي */}
                      <div className="mt-1 flex items-center gap-2 bg-slate-50 rounded-md px-2 py-1 border border-slate-100">
                        <div className="text-[8px] md:text-[9px] font-bold text-slate-500 whitespace-nowrap min-w-[70px]">
                          {treatmentInfo.text}
                        </div>
                        {item.med.durationDays !== "continuous" && (
                          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${treatmentInfo.percent}%` }} />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* زر الأكشن (تم / لم يتم) */}
                    <div className="flex items-center shrink-0">
                      <button 
                        onClick={() => toggleDoseStatus(item.logKey)}
                        className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300 text-lg ${isTaken ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-100 text-slate-400 border border-slate-200 hover:bg-[#103B6D] hover:text-white hover:border-[#103B6D]"}`}
                      >
                        {isTaken ? "✔" : ""}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}