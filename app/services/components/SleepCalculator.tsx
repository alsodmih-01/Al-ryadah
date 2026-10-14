"use client";

import React, { useState, useMemo } from "react";

// نوع بيانات سجل النوم
type SleepRecord = {
  id: string;
  date: Date; // تاريخ الاستيقاظ
  sleepTime: string;
  wakeTime: string;
  duration: number; // الساعات
};

export default function SleepTracker() {
  const [sleep, setSleep] = useState("");
  const [wake, setWake] = useState("");
  
  // تاريخ الاستيقاظ (افتراضياً اليوم)
  const [recordDate, setRecordDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // قراءات افتراضية لتمثيل المنحنى الأسبوعي
  const [records, setRecords] = useState<SleepRecord[]>([
    { id: "1", date: new Date("2026-09-08T08:00:00"), sleepTime: "23:00", wakeTime: "05:30", duration: 6.5 },
    { id: "2", date: new Date("2026-09-09T08:00:00"), sleepTime: "22:30", wakeTime: "06:30", duration: 8.0 },
    { id: "3", date: new Date("2026-09-10T08:00:00"), sleepTime: "01:00", wakeTime: "06:00", duration: 5.0 },
    { id: "4", date: new Date("2026-09-11T08:00:00"), sleepTime: "23:15", wakeTime: "07:15", duration: 8.0 },
    { id: "5", date: new Date("2026-09-12T08:00:00"), sleepTime: "00:00", wakeTime: "09:30", duration: 9.5 }, // إجازة
    { id: "6", date: new Date("2026-09-13T08:00:00"), sleepTime: "22:00", wakeTime: "05:00", duration: 7.0 },
    { id: "7", date: new Date("2026-09-14T08:00:00"), sleepTime: "23:30", wakeTime: "06:00", duration: 6.5 },
  ]);

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sleep || !wake || !recordDate) return;

    // حساب المدة الزمنية
    const start = new Date(`2026-01-01T${sleep}`);
    let end = new Date(`2026-01-01T${wake}`);

    // إذا كان وقت الاستيقاظ أقل من وقت النوم (يعني نام قبل منتصف الليل وصحي اليوم التالي)
    if (end <= start) {
      end = new Date(`2026-01-02T${wake}`);
    }

    const duration = Number(((end.getTime() - start.getTime()) / (1000 * 60 * 60)).toFixed(1));

    const newRecord: SleepRecord = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date(recordDate),
      sleepTime: sleep,
      wakeTime: wake,
      duration,
    };

    setRecords([...records, newRecord]);
    setSleep("");
    setWake("");
  };

  // تقييم جودة النوم
  const getQuality = (hours: number) => {
    if (hours < 6) return { label: "نوم غير كافٍ", icon: "🔴", color: "text-red-600 bg-red-50 border-red-200" };
    if (hours >= 7 && hours <= 9) return { label: "مثالي وصحي", icon: "🌟", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (hours > 9) return { label: "نوم زائد", icon: "🟡", color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { label: "مقبول", icon: "🔵", color: "text-blue-600 bg-blue-50 border-blue-200" }; // بين 6 و 7
  };

  // إحصائيات سريعة
  const stats = useMemo(() => {
    if (records.length === 0) return { avg: 0, min: 0, max: 0 };
    const durations = records.map(r => r.duration);
    const avg = (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(1);
    const min = Math.min(...durations);
    const max = Math.max(...durations);
    return { avg, min, max };
  }, [records]);

  // ==========================================
  // منطق رسم المنحنى البياني الزمني (SVG)
  // ==========================================
  const sortedRecords = useMemo(() => {
    return [...records].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [records]);

  const { pathD, points, viewBox, dimensions } = useMemo(() => {
    if (sortedRecords.length < 2) return { pathD: "", points: [], viewBox: "0 0 100 100", dimensions: null };

    const width = 800; 
    const height = 260; 
    const paddingX = 40; 
    const paddingTop = 40; 
    const paddingBottom = 40; 

    const minX = 0;
    const maxX = sortedRecords.length - 1;
    
    // مقياس الساعات (من 0 إلى 12 ساعة لتغطية معظم الحالات)
    const minY = 0;
    const maxY = 12;

    const getX = (index: number) => paddingX + (index / maxX) * (width - paddingX * 2);
    const getY = (val: number) => height - paddingBottom - ((val - minY) / (maxY - minY)) * (height - paddingTop - paddingBottom);

    const pts = sortedRecords.map((r, i) => ({
      x: getX(i),
      y: getY(r.duration),
      value: r.duration,
      dateStr: r.date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
    }));

    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return { 
      pathD: d, 
      points: pts, 
      viewBox: `0 0 ${width} ${height}`, 
      dimensions: { width, height, paddingBottom, padX: paddingX, getY } 
    };
  }, [sortedRecords]);

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-3xl mb-3 border border-indigo-100 shadow-sm text-indigo-900">
          🌙
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">سجل جودة النوم</h2>
        <p className="text-slate-500 text-sm">النوم الصحي هو أساس المناعة القوية. تابع ساعات نومك وحسن نمط حياتك.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6 md:gap-8">
        
        {/* =======================================
            الجانب الأيمن: نموذج الإدخال والإحصائيات
        ======================================= */}
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          
          <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm">
            <h3 className="font-black text-[#103B6D] mb-5 border-b border-slate-100 pb-3">تسجيل ليلة جديدة</h3>
            <form onSubmit={handleAddRecord} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">تاريخ الاستيقاظ (اليوم)</label>
                <input
                  type="date"
                  value={recordDate}
                  onChange={(e) => setRecordDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-2xl p-3.5 bg-slate-50 text-sm font-bold focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">وقت النوم (Bedtime)</label>
                  <input
                    type="time"
                    value={sleep}
                    onChange={(e) => setSleep(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-lg font-black text-indigo-900 focus:outline-none focus:border-indigo-500 transition bg-indigo-50/30"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">وقت الاستيقاظ (Wake)</label>
                  <input
                    type="time"
                    value={wake}
                    onChange={(e) => setWake(e.target.value)}
                    className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-lg font-black text-amber-600 focus:outline-none focus:border-amber-400 transition bg-amber-50/30"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 bg-[#103B6D] text-white font-black py-3.5 rounded-2xl shadow-lg shadow-blue-900/20 hover:bg-[#0a2647] transition"
              >
                حفظ القراءة
              </button>
            </form>
          </div>

          {/* لوحة المؤشرات */}
          {records.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-center">
                <div className="text-[9px] font-bold text-indigo-500 mb-1">متوسط النوم</div>
                <div className="text-xl font-black text-indigo-900">{stats.avg} <span className="text-xs">ساعة</span></div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
                <div className="text-[9px] font-bold text-emerald-600 mb-1">أطول مدة</div>
                <div className="text-xl font-black text-emerald-900">{stats.max} <span className="text-xs">ساعة</span></div>
              </div>
              <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-center">
                <div className="text-[9px] font-bold text-red-500 mb-1">أقصر مدة</div>
                <div className="text-xl font-black text-red-900">{stats.min} <span className="text-xs">ساعة</span></div>
              </div>
            </div>
          )}

        </div>

        {/* =======================================
            الجانب الأيسر: الرسم البياني والسجل
        ======================================= */}
        <div className="space-y-6 order-1 lg:order-2">
          
          {/* الكيرف (الرسم البياني) */}
          <div className="bg-[#F8FAFC] border border-slate-200 p-4 md:p-6 rounded-3xl shadow-inner overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-[#103B6D]">تذبذب جودة النوم</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                <span className="w-2 h-2 bg-emerald-400 rounded-full"></span> المنطقة المثالية (7-9 ساعات)
              </div>
            </div>

            {sortedRecords.length < 2 || !dimensions ? (
              <div className="h-40 flex items-center justify-center text-sm font-bold text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                أضف ليلتين على الأقل لرسم المنحنى البياني
              </div>
            ) : (
              <div className="relative w-full h-56 md:h-64 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white rounded-2xl border border-slate-100">
                <div className="min-w-[500px] h-full">
                  <svg viewBox={viewBox} className="w-full h-full overflow-visible drop-shadow-sm font-sans">
                    
                    {/* المنطقة المثالية (Target Zone) 7 to 9 hours */}
                    <rect 
                      x={dimensions.padX} 
                      y={dimensions.getY(9)} 
                      width={dimensions.width - dimensions.padX * 2} 
                      height={dimensions.getY(7) - dimensions.getY(9)} 
                      fill="rgba(16, 185, 129, 0.1)" 
                      rx="4"
                    />

                    {/* الشبكة الخلفية والمسميات (Y-Axis) */}
                    {[0, 4, 7, 9, 12].map(h => (
                      <g key={`y-${h}`}>
                        <line x1={dimensions.padX} y1={dimensions.getY(h)} x2={dimensions.width - dimensions.padX} y2={dimensions.getY(h)} stroke="#f1f5f9" strokeDasharray="4 4" />
                        <text x={dimensions.padX - 10} y={dimensions.getY(h) + 4} textAnchor="end" fontSize="10" fill="#94a3b8" fontWeight="bold">{h}h</text>
                      </g>
                    ))}
                    
                    {/* خط المنحنى */}
                    <path d={pathD} fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* النقاط والقيم */}
                    {points.map((p, i) => {
                      // تحديد لون النقطة حسب المنطقة
                      const pointColor = p.value >= 7 && p.value <= 9 ? "#10b981" : (p.value < 6 ? "#ef4444" : "#4F46E5");
                      return (
                        <g key={i}>
                          <circle cx={p.x} cy={p.y} r="5" fill="white" stroke={pointColor} strokeWidth="3" />
                          
                          <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="900" fill={pointColor}>
                            {p.value}
                          </text>

                          {/* التاريخ */}
                          <text x={p.x} y={dimensions.height - 15} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b">
                            {p.dateStr}
                          </text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* قائمة السجل */}
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-sm font-black text-[#103B6D] mb-2 sticky top-0 bg-[#f8fafc] py-1">سجل الليالي السابقة</h3>
            {[...sortedRecords].reverse().map((record) => {
              const quality = getQuality(record.duration);
              return (
                <div key={record.id} className={`flex items-center justify-between p-4 rounded-2xl border ${quality.color} transition hover:shadow-sm bg-white`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 flex flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-inherit">
                      <span className="text-xl font-black">{record.duration}</span>
                      <span className="text-[9px] font-bold text-slate-400">ساعة</span>
                    </div>
                    <div>
                      <div className="font-bold text-sm flex items-center gap-1">
                        {quality.icon} {quality.label}
                      </div>
                      <div className="flex gap-2 items-center text-[10px] md:text-xs opacity-70 mt-1.5 font-bold">
                        <span>من {record.sleepTime} إلى {record.wakeTime}</span>
                        <span>•</span>
                        <span>{record.date.toLocaleDateString('ar-EG', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setRecords(records.filter(r => r.id !== record.id))}
                    className="text-xs opacity-50 hover:opacity-100 transition p-2 hover:bg-slate-100 rounded-lg"
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