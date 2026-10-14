"use client";

import React, { useState, useMemo } from "react";

// الأنواع الخاصة بقراءات السكر
type ReadingContext = "fasting" | "postprandial" | "random";

type BloodSugarReading = {
  id: string;
  date: Date;
  value: number;
  context: ReadingContext;
};

export default function BloodSugarJournal() {
  const [value, setValue] = useState("");
  const [context, setContext] = useState<ReadingContext>("fasting");
  
  // حقل التاريخ (الافتراضي هو تاريخ اليوم)
  const [readingDate, setReadingDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  // قراءات سابقة افتراضية متباعدة لتمثيل المنحنى الشهري
  const [readings, setReadings] = useState<BloodSugarReading[]>([
    { id: "1", date: new Date("2026-08-01T08:00:00"), value: 110, context: "fasting" },
    { id: "2", date: new Date("2026-08-08T14:00:00"), value: 145, context: "postprandial" },
    { id: "3", date: new Date("2026-08-15T08:00:00"), value: 95, context: "fasting" },
    { id: "4", date: new Date("2026-08-22T20:00:00"), value: 160, context: "random" },
    { id: "5", date: new Date("2026-08-28T08:00:00"), value: 80, context: "fasting" },
    { id: "6", date: new Date("2026-09-05T14:00:00"), value: 120, context: "postprandial" },
    { id: "7", date: new Date("2026-09-12T08:00:00"), value: 300, context: "fasting" },
    { id: "8", date: new Date("2026-09-14T10:00:00"), value: 70, context: "random" },
  ]);

  const handleAddReading = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || isNaN(Number(value)) || !readingDate) return;

    // دمج التاريخ المختار مع الوقت الحالي (لكي يحتفظ بالتسلسل الزمني خلال اليوم)
    const selectedDate = new Date(readingDate);
    const now = new Date();
    selectedDate.setHours(now.getHours(), now.getMinutes());

    const newReading: BloodSugarReading = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate,
      value: Number(value),
      context,
    };

    // إضافة القراءة الجديدة
    setReadings([...readings, newReading]);
    setValue("");
  };

  const getContextLabel = (ctx: ReadingContext) => {
    switch (ctx) {
      case "fasting": return "صائم";
      case "postprandial": return "بعد الأكل بساعتين";
      case "random": return "عشوائي";
    }
  };

  const getStatusColor = (val: number, ctx: ReadingContext) => {
    if (ctx === "fasting") {
      if (val < 70) return "text-blue-600 bg-blue-50 border-blue-200"; // منخفض
      if (val <= 100) return "text-emerald-600 bg-emerald-50 border-emerald-200"; // طبيعي
      if (val <= 125) return "text-amber-600 bg-amber-50 border-amber-200"; // مقدمات سكري
      return "text-red-600 bg-red-50 border-red-200"; // مرتفع
    } else {
      // بعد الأكل أو عشوائي
      if (val < 70) return "text-blue-600 bg-blue-50 border-blue-200";
      if (val <= 140) return "text-emerald-600 bg-emerald-50 border-emerald-200";
      if (val <= 199) return "text-amber-600 bg-amber-50 border-amber-200";
      return "text-red-600 bg-red-50 border-red-200";
    }
  };

  // ==========================================
  // منطق رسم المنحنى البياني الزمني (SVG)
  // ==========================================
  
  // 1. ترتيب القراءات زمنياً من الأقدم للأحدث
  const sortedReadings = useMemo(() => {
    return [...readings].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [readings]);

  // 2. تجهيز الإحداثيات لرسم المنحنى
  const { pathD, points, viewBox, dimensions } = useMemo(() => {
    if (sortedReadings.length < 2) return { pathD: "", points: [], viewBox: "0 0 100 100", dimensions: null };

    const width = 800; // عرض الرسم البياني
    const height = 240; // ارتفاع الرسم البياني
    const paddingX = 40; // الهامش الأفقي
    const paddingTop = 40; // الهامش العلوي
    const paddingBottom = 30; // الهامش السفلي لمكان التواريخ

    const minX = 0;
    const maxX = sortedReadings.length - 1;
    const minY = Math.min(...sortedReadings.map(r => r.value), 60) - 10;
    const maxY = Math.max(...sortedReadings.map(r => r.value), 250) + 20;

    // دالة لحساب موضع X بناءً على ترتيب القراءة (لتوزيعها بانتظام)
    const getX = (index: number) => paddingX + (index / maxX) * (width - paddingX * 2);
    
    // دالة لحساب موضع Y بناءً على القيمة
    const getY = (val: number) => height - paddingBottom - ((val - minY) / (maxY - minY)) * (height - paddingTop - paddingBottom);

    const pts = sortedReadings.map((r, i) => ({
      x: getX(i),
      y: getY(r.value),
      value: r.value,
      label: getContextLabel(r.context),
      dateStr: r.date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' })
    }));

    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    return { pathD: d, points: pts, viewBox: `0 0 ${width} ${height}`, dimensions: { width, height, paddingBottom } };
  }, [sortedReadings]);

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">سجل متابعة السكر</h2>
        <p className="text-slate-500 text-sm">سجل قراءاتك لتتمكن من متابعتها ومشاركتها مع طبيبك المختص.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.5fr] gap-6 md:gap-8">
        
        {/* =======================================
            نموذج الإدخال
        ======================================= */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm h-fit">
          <h3 className="font-black text-[#103B6D] mb-5 border-b border-slate-100 pb-3">إضافة قراءة جديدة</h3>
          <form onSubmit={handleAddReading} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">مستوى السكر (mg/dL)</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="مثال: 110"
                className="w-full border border-slate-200 rounded-2xl p-3.5 text-center text-xl font-black text-[#103B6D] focus:outline-none focus:border-[#C21835] transition"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">وقت القياس</label>
                <select
                  value={context}
                  onChange={(e) => setContext(e.target.value as ReadingContext)}
                  className="w-full border border-slate-200 rounded-2xl p-3.5 bg-slate-50 text-xs font-bold focus:outline-none focus:border-[#C21835]"
                >
                  <option value="fasting">صائم</option>
                  <option value="postprandial">بعد الأكل</option>
                  <option value="random">عشوائي</option>
                </select>
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
              className="w-full mt-2 bg-[#C21835] text-white font-black py-3.5 rounded-2xl shadow-lg shadow-red-900/20 hover:bg-[#a9132d] transition"
            >
              إضافة القراءة
            </button>
          </form>
        </div>

        {/* =======================================
            الرسم البياني وقائمة السجل
        ======================================= */}
        <div className="space-y-6">
          
          {/* الكيرف (الرسم البياني) */}
          <div className="bg-[#F8FAFC] border border-slate-200 p-4 md:p-6 rounded-3xl shadow-inner overflow-hidden">
            <h3 className="text-sm font-black text-[#103B6D] mb-4">منحنى القراءات السابقة</h3>
            {sortedReadings.length < 2 || !dimensions ? (
              <div className="h-40 flex items-center justify-center text-sm font-bold text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl">
                أضف قراءتين على الأقل لرسم المنحنى البياني
              </div>
            ) : (
              <div className="relative w-full h-48 md:h-56 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="min-w-[500px] h-full">
                  <svg viewBox={viewBox} className="w-full h-full overflow-visible drop-shadow-md">
                    
                    {/* الشبكة الخلفية (Grid Lines) */}
                    <line x1="20" y1="40" x2={dimensions.width - 20} y2="40" stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1={dimensions.height / 2} x2={dimensions.width - 20} y2={dimensions.height / 2} stroke="#e2e8f0" strokeDasharray="4 4" />
                    <line x1="20" y1={dimensions.height - dimensions.paddingBottom} x2={dimensions.width - 20} y2={dimensions.height - dimensions.paddingBottom} stroke="#e2e8f0" strokeDasharray="4 4" />
                    
                    {/* خط المنحنى */}
                    <path d={pathD} fill="none" stroke="#C21835" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* النقاط والقيم والتواريخ */}
                    {points.map((p, i) => (
                      <g key={i}>
                        {/* النقطة */}
                        <circle cx={p.x} cy={p.y} r="5" fill="white" stroke="#103B6D" strokeWidth="2.5" />
                        
                        {/* القيمة (فوق النقطة) */}
                        <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="12" fontWeight="900" fill="#103B6D">
                          {p.value}
                        </text>

                        {/* التاريخ (تحت الخط السفلي للرسم) */}
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

          {/* قائمة السجل (مرتبة من الأحدث للأقدم) */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <h3 className="text-sm font-black text-[#103B6D] mb-2 sticky top-0 bg-white py-1">سجل القراءات</h3>
            {[...sortedReadings].reverse().map((reading) => {
              const colorClass = getStatusColor(reading.value, reading.context);
              return (
                <div key={reading.id} className={`flex items-center justify-between p-4 rounded-2xl border ${colorClass} transition hover:shadow-sm`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-white/60 font-black text-xl shadow-sm border ${colorClass}`}>
                      {reading.value}
                    </div>
                    <div>
                      <div className="font-bold text-sm">{getContextLabel(reading.context)}</div>
                      <div className="text-[10px] opacity-70 mt-0.5 font-bold">
                        {reading.date.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
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