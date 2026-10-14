"use client";

import React, { useState, useMemo } from "react";

// نوع قراءات ضغط الدم
type BloodPressureReading = {
  id: string;
  date: Date;
  systolic: number; // الانقباضي (الرقم العالي)
  diastolic: number; // الانبساطي (الرقم المنخفض)
  pulse: number; // النبض
};

export default function BloodPressureJournal() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  
  // حقل التاريخ (الافتراضي هو تاريخ اليوم)
  const [readingDate, setReadingDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // قراءات سابقة افتراضية متباعدة لتمثيل المنحنى الشهري
  const [readings, setReadings] = useState<BloodPressureReading[]>([
    { id: "1", date: new Date("2026-08-01T08:00:00"), systolic: 120, diastolic: 80, pulse: 72 },
    { id: "2", date: new Date("2026-08-08T14:00:00"), systolic: 135, diastolic: 85, pulse: 75 },
    { id: "3", date: new Date("2026-08-15T08:00:00"), systolic: 118, diastolic: 78, pulse: 70 },
    { id: "4", date: new Date("2026-08-22T20:00:00"), systolic: 145, diastolic: 92, pulse: 82 },
    { id: "5", date: new Date("2026-08-28T08:00:00"), systolic: 125, diastolic: 82, pulse: 74 },
    { id: "6", date: new Date("2026-09-05T14:00:00"), systolic: 130, diastolic: 85, pulse: 76 },
    { id: "7", date: new Date("2026-09-12T08:00:00"), systolic: 155, diastolic: 98, pulse: 88 },
    { id: "8", date: new Date("2026-09-14T10:00:00"), systolic: 122, diastolic: 80, pulse: 71 },
  ]);

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!systolic || !diastolic || !pulse || !readingDate) return;

    // دمج التاريخ المختار مع الوقت الحالي
    const selectedDate = new Date(readingDate);
    const now = new Date();
    selectedDate.setHours(now.getHours(), now.getMinutes());

    const newReading: BloodPressureReading = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      pulse: Number(pulse),
    };

    setReadings([...readings, newReading]);
    setSystolic("");
    setDiastolic("");
    setPulse("");
  };

  // تصنيف ضغط الدم (بناءً على جمعية القلب الأمريكية)
  const getStatus = (sys: number, dia: number) => {
    if (sys < 90 || dia < 60) return { label: "منخفض", color: "text-blue-600 bg-blue-50 border-blue-200" };
    if (sys < 120 && dia < 80) return { label: "طبيعي", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
    if (sys < 130 && dia < 80) return { label: "مرتفع قليلاً", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (sys < 140 || dia < 90) return { label: "ارتفاع (مرحلة 1)", color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (sys >= 180 || dia >= 120) return { label: "أزمة طارئة!", color: "text-red-700 bg-red-100 border-red-300 font-black" };
    return { label: "ارتفاع (مرحلة 2)", color: "text-red-600 bg-red-50 border-red-200" };
  };

  // ==========================================
  // منطق رسم المنحنى البياني الزمني (SVG المزدوج)
  // ==========================================
  const sortedReadings = useMemo(() => {
    return [...readings].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [readings]);

  const { pathSysD, pathDiaD, points, viewBox, dimensions } = useMemo(() => {
    if (sortedReadings.length < 2) return { pathSysD: "", pathDiaD: "", points: [], viewBox: "0 0 100 100", dimensions: null };

    const width = 800; 
    const height = 260; 
    const paddingX = 40; 
    const paddingTop = 40; 
    const paddingBottom = 40; 

    const minX = 0;
    const maxX = sortedReadings.length - 1;
    // تحديد أدنى وأعلى قيمة للرسم لتشمل الانبساطي والانقباضي معاً
    const minY = Math.min(...sortedReadings.map(r => r.diastolic), 50) - 10;
    const maxY = Math.max(...sortedReadings.map(r => r.systolic), 180) + 20;

    const getX = (index: number) => paddingX + (index / maxX) * (width - paddingX * 2);
    const getY = (val: number) => height - paddingBottom - ((val - minY) / (maxY - minY)) * (height - paddingTop - paddingBottom);

    const pts = sortedReadings.map((r, i) => ({
      x: getX(i),
      sysY: getY(r.systolic),
      diaY: getY(r.diastolic),
      sysVal: r.systolic,
      diaVal: r.diastolic,
      dateStr: r.date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
    }));

    const dSys = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.sysY}`).join(' ');
    const dDia = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.diaY}`).join(' ');

    return { pathSysD: dSys, pathDiaD: dDia, points: pts, viewBox: `0 0 ${width} ${height}`, dimensions: { width, height, paddingBottom } };
  }, [sortedReadings]);

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">سجل ضغط الدم</h2>
        <p className="text-slate-500 text-sm">سجل قراءاتك لتسهيل متابعتها ومشاركتها مع طبيبك المختص.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8">
        
        {/* =======================================
            نموذج الإدخال
        ======================================= */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm h-fit">
          <h3 className="font-black text-[#103B6D] mb-5 border-b border-slate-100 pb-3">إضافة قراءة جديدة</h3>
          <form onSubmit={handleAddReading} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">الانقباضي (SYS)</label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(e.target.value)}
                  placeholder="مثال: 120"
                  className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-lg font-black text-[#C21835] focus:outline-none focus:border-[#C21835] transition bg-red-50/30"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">الانبساطي (DIA)</label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(e.target.value)}
                  placeholder="مثال: 80"
                  className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-lg font-black text-[#103B6D] focus:outline-none focus:border-[#103B6D] transition bg-blue-50/30"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">النبض (Pulse)</label>
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  placeholder="مثال: 72"
                  className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-sm font-bold focus:outline-none focus:border-emerald-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">تاريخ القياس</label>
                <input
                  type="date"
                  value={readingDate}
                  onChange={(e) => setReadingDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-3.5 bg-slate-50 text-xs font-bold focus:outline-none focus:border-[#C21835]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#0056B3] text-white font-black py-3.5 rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition"
            >
              إضافة القراءة
            </button>
          </form>
        </div>

        {/* =======================================
            الرسم البياني وقائمة السجل
        ======================================= */}
        <div className="space-y-6">
          
          {/* الكيرف (الرسم البياني المزدوج) */}
          <div className="bg-[#F8FAFC] border border-slate-200 p-4 md:p-6 rounded-3xl shadow-inner overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-[#103B6D]">منحنى القراءات السابقة</h3>
              <div className="flex items-center gap-3 text-[10px] font-bold">
                <div className="flex items-center gap-1"><span className="w-3 h-1 bg-[#C21835] rounded-full"></span> الانقباضي</div>
                <div className="flex items-center gap-1"><span className="w-3 h-1 bg-[#103B6D] rounded-full"></span> الانبساطي</div>
              </div>
            </div>

            {sortedReadings.length < 2 || !dimensions ? (
              <div className="h-40 flex items-center justify-center text-sm font-bold text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                أضف قراءتين على الأقل لرسم المنحنى البياني
              </div>
            ) : (
              <div className="relative w-full h-56 md:h-64 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[500px] h-full">
                  <svg viewBox={viewBox} className="w-full h-full overflow-visible drop-shadow-md">
                    
                    {/* الشبكة الخلفية */}
                    <line x1="20" y1="40" x2={dimensions.width - 20} y2="40" stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1={dimensions.height / 2} x2={dimensions.width - 20} y2={dimensions.height / 2} stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1={dimensions.height - dimensions.paddingBottom} x2={dimensions.width - 20} y2={dimensions.height - dimensions.paddingBottom} stroke="#e2e8f0" strokeDasharray="4 4" />
                    
                    {/* خط الانبساطي (DIA) أزرق */}
                    <path d={pathDiaD} fill="none" stroke="#103B6D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                    
                    {/* خط الانقباضي (SYS) أحمر */}
                    <path d={pathSysD} fill="none" stroke="#C21835" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* النقاط والقيم */}
                    {points.map((p, i) => (
                      <g key={i}>
                        {/* نقطة وقيمة الانقباضي */}
                        <circle cx={p.x} cy={p.sysY} r="5" fill="white" stroke="#C21835" strokeWidth="2.5" />
                        <text x={p.x} y={p.sysY - 12} textAnchor="middle" fontSize="12" fontWeight="900" fill="#C21835">
                          {p.sysVal}
                        </text>

                        {/* نقطة وقيمة الانبساطي */}
                        <circle cx={p.x} cy={p.diaY} r="5" fill="white" stroke="#103B6D" strokeWidth="2.5" />
                        <text x={p.x} y={p.diaY + 18} textAnchor="middle" fontSize="12" fontWeight="900" fill="#103B6D">
                          {p.diaVal}
                        </text>

                        {/* التاريخ الموحد في الأسفل */}
                        <text x={p.x} y={dimensions.height - 5} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
                          {p.dateStr}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* قائمة السجل */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-sm font-black text-[#103B6D] mb-2 sticky top-0 bg-white py-1">سجل القراءات</h3>
            {[...sortedReadings].reverse().map((reading) => {
              const status = getStatus(reading.systolic, reading.diastolic);
              return (
                <div key={reading.id} className={`flex items-center justify-between p-4 rounded-2xl border ${status.color} transition hover:shadow-sm`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-12 flex flex-col items-center justify-center rounded-xl bg-white/70 shadow-sm border ${status.color}`}>
                      <span className="font-black text-sm md:text-base leading-none">{reading.systolic}</span>
                      <span className="text-[10px] font-bold border-t border-slate-200/50 w-full text-center mt-0.5 pt-0.5">{reading.diastolic}</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{status.label}</div>
                      <div className="flex gap-2 items-center text-[9px] md:text-[10px] opacity-70 mt-1 font-bold">
                        <span>النبض: {reading.pulse} bpm</span>
                        <span>•</span>
                        <span>{reading.date.toLocaleDateString('ar-EG', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setReadings(readings.filter(r => r.id !== reading.id))}
                    className="text-xs opacity-50 hover:opacity-100 transition p-2 bg-white rounded-lg hover:shadow-sm"
                    title="حذف القراءة"
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}