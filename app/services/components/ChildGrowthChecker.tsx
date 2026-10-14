"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

// ==========================================
// قاعدة بيانات طبية لنمو وتطور الطفل
// ==========================================
const getChildDataByAge = (ageInMonths: number) => {
  if (ageInMonths < 2) return {
    vaccine: "جرعة الولادة (التهاب الكبد B، شلل الأطفال، BCG)",
    milestone: "يركز نظره على الوجوه ويبدأ بالابتسام اللاإرادي.",
    nutrition: "رضاعة طبيعية حصرية (أو صناعية حسب إرشاد الطبيب) كل 2-3 ساعات.",
  };
  if (ageInMonths < 6) return {
    vaccine: "تطعيمات الشهر الثاني/الرابع (الخماسي، الروتا، المكورات)",
    milestone: "يبدأ بالضحك بصوت عالٍ، يرفع رأسه وصدره عند الاستلقاء على بطنه.",
    nutrition: "الاستمرار بالرضاعة الحصرية. لا يُنصح بإدخال الطعام الصلب بعد.",
  };
  if (ageInMonths < 9) return {
    vaccine: "تطعيمات الشهر السادس (الخماسي، شلل الأطفال، الروتا)",
    milestone: "يجلس بدون مساعدة، يبدأ بالحبو، وينطق مقاطع مثل 'دا-دا'.",
    nutrition: "البدء بإدخال الأطعمة المهروسة (خضار، فواكه، حبوب) مع استمرار الرضاعة.",
  };
  if (ageInMonths < 12) return {
    vaccine: "تطعيم الشهر التاسع (الحصبة)",
    milestone: "يقف مستنداً على الأثاث، يمسك الأشياء بإصبعين (السبابة والإبهام).",
    nutrition: "تنويع الأطعمة لتشمل البروتينات اللينة، تقديم الماء في كوب مخصص.",
  };
  if (ageInMonths < 18) return {
    vaccine: "تطعيم السنة (MMR، الجدري المائي، الحمى الشوكية)",
    milestone: "يمشي خطواته الأولى، ينطق كلمات واضحة (ماما، بابا).",
    nutrition: "الطفل يأكل من طعام الأسرة العادي، ويمكن إدخال الحليب البقري الكامل.",
  };
  if (ageInMonths <= 36) return {
    vaccine: "تطعيم السنة والنصف (الجرعة المنشطة الأولى)",
    milestone: "يركض، يصعد السلم، ويكون جملاً قصيرة من كلمتين أو ثلاث.",
    nutrition: "3 وجبات رئيسية مع وجبتين خفيفتين صحيتين. الانتباه للكميات وجودة الأكل.",
  };
  return {
    vaccine: "تطعيمات الحماية (حسب الجدول الوطني)",
    milestone: "تطور كبير في المهارات الاجتماعية واللغوية والاعتماد على النفس.",
    nutrition: "التركيز على الغذاء المتوازن الغني بالكالسيوم والحديد لنمو العظام والعضلات.",
  };
};

export default function ChildGrowthChecker() {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sex, setSex] = useState("male");
  const [result, setResult] = useState<{
    age: number;
    weight: number;
    height: number;
    sex: string;
    data: any;
  } | null>(null);

  const calculate = () => {
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (!ageNum || !weightNum || !heightNum) return;

    setResult({
      age: ageNum,
      weight: weightNum,
      height: heightNum,
      sex,
      data: getChildDataByAge(ageNum),
    });
  };

  // ==========================================
  // منطق رسم المنحنى وتحديد حالة الطفل (ذكاء اصطناعي مبسط)
  // ==========================================
  const chartData = useMemo(() => {
    if (!result) return null;
    
    // تم تكبير العرض لإعطاء مساحة للنصوص الجانبية
    const width = 680;
    const height = 260;
    const padX = 40;
    const padY = 40;
    const rightMargin = 80; // مساحة للكلمات (الحد الأعلى، إلخ)

    // النقاط القياسية للمنحنيات (WHO) كل 6 أشهر
    const agePoints = [0, 6, 12, 18, 24, 30, 36];
    
    // قيم افتراضية لوزن الذكور بالكيلوجرام
    const p50_m = [3.3, 7.9, 9.6, 10.9, 12.2, 13.3, 14.3];
    const p95_m = [4.4, 9.8, 12.0, 13.7, 15.3, 16.7, 18.0];
    const p5_m  = [2.5, 6.4, 7.7,  8.8,  9.7,  10.5, 11.3];

    // قيم الإناث
    const p50_f = [3.2, 7.3, 8.9, 10.2, 11.5, 12.7, 13.9];
    const p95_f = [4.2, 9.3, 11.5, 13.2, 14.8, 16.2, 17.5];
    const p5_f  = [2.4, 5.8, 7.0,  8.1,  9.0,  9.8,  10.6];

    const p50 = result.sex === "male" ? p50_m : p50_f;
    const p95 = result.sex === "male" ? p95_m : p95_f;
    const p5  = result.sex === "male" ? p5_m  : p5_f;

    const getX = (m: number) => padX + (m / 36) * (width - padX - rightMargin);
    const getY = (w: number) => height - padY - (w / 20) * (height - padY * 2);

    const makePath = (dataArr: number[]) => {
      return dataArr.map((w, i) => `${i === 0 ? 'M' : 'L'} ${getX(agePoints[i])} ${getY(w)}`).join(' ');
    };

    const childX = getX(Math.min(result.age, 36));
    const childY = getY(Math.min(result.weight, 20));

    // خوارزمية التقييم الذكي للوزن
    const getInterpolatedWeight = (arr: number[], targetAge: number) => {
      if (targetAge >= 36) return arr[6];
      const index = Math.floor(targetAge / 6);
      const remainder = targetAge % 6;
      return arr[index] + ((arr[index + 1] - arr[index]) * (remainder / 6));
    };

    const expected50 = getInterpolatedWeight(p50, result.age);
    const expected95 = getInterpolatedWeight(p95, result.age);
    const expected5 = getInterpolatedWeight(p5, Math.max(result.age, 0));

    let status = { text: "وزن مثالي وضمن المعدل الطبيعي 🌟", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (result.weight > expected95) {
      status = { text: "وزن أعلى من المعدل الطبيعي (يُنصح بمراجعة الطبيب)", color: "text-amber-700 bg-amber-50 border-amber-200" };
    } else if (result.weight < expected5) {
      status = { text: "وزن أقل من المعدل الطبيعي (يحتاج تقييم تغذية)", color: "text-red-700 bg-red-50 border-red-200" };
    }

    return {
      viewBox: `0 0 ${width} ${height}`,
      width, height, padX, padY, rightMargin,
      path50: makePath(p50),
      path95: makePath(p95),
      path5: makePath(p5),
      lastP50: getY(p50[6]),
      lastP95: getY(p95[6]),
      lastP5: getY(p5[6]),
      childX, childY,
      status
    };
  }, [result]);

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">متابعة نمو الطفل</h2>
        <p className="text-slate-500 text-sm">ادخل بيانات طفلك للاطمئنان على نموه وتطوره، واكتشف نصائح العناية الخاصة بعمره.</p>
      </div>

      {!result ? (
        // ==========================================
        // شاشة الإدخال
        // ==========================================
        <div className="max-w-2xl mx-auto bg-white border border-[#D4AF37]/30 p-6 md:p-8 rounded-3xl shadow-lg shadow-amber-900/5">
          <div className="flex justify-center mb-6 text-5xl">🧸</div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">عمر الطفل (بالأشهر)</label>
              <input
                type="number"
                placeholder="مثال: 12"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-2xl border px-4 py-3.5 text-center font-black text-[#103B6D] focus:outline-none focus:border-[#D4AF37] bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">جنس الطفل</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSex("male")}
                  className={`flex-1 py-3.5 rounded-2xl font-black text-xs transition ${sex === "male" ? "bg-blue-100 text-blue-700 border-2 border-blue-300" : "bg-slate-50 text-slate-500 border-2 border-transparent"}`}
                >
                  👦🏻 ولد
                </button>
                <button
                  onClick={() => setSex("female")}
                  className={`flex-1 py-3.5 rounded-2xl font-black text-xs transition ${sex === "female" ? "bg-pink-100 text-pink-700 border-2 border-pink-300" : "bg-slate-50 text-slate-500 border-2 border-transparent"}`}
                >
                  👧🏻 بنت
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">الطول (سم)</label>
              <input
                type="number"
                placeholder="مثال: 75"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full rounded-2xl border px-4 py-3.5 text-center font-black text-[#103B6D] focus:outline-none focus:border-[#D4AF37] bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">الوزن (كجم)</label>
              <input
                type="number"
                placeholder="مثال: 9.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-2xl border px-4 py-3.5 text-center font-black text-[#103B6D] focus:outline-none focus:border-[#D4AF37] bg-slate-50"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="mt-6 w-full rounded-2xl bg-[#D4AF37] hover:bg-[#b5952f] py-4 font-black text-[#103B6D] shadow-lg shadow-amber-900/10 transition transform hover:-translate-y-0.5"
          >
            بدء التقييم الشامل 🩺
          </button>
        </div>
      ) : (
        // ==========================================
        // شاشة النتائج الشاملة
        // ==========================================
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6">
          
          {/* الجانب الأيمن: الرسم البياني والمؤشرات */}
          <div className="flex flex-col gap-4">
            
            {/* بطاقة المنحنى والمترجم الذكي */}
            <div className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-[#103B6D]">مخطط الوزن / العمر</h3>
              </div>

              {/* المترجم الذكي للنمو */}
              {chartData && (
                <div className={`mb-4 text-center text-sm font-black p-3 rounded-xl border ${chartData.status.color}`}>
                  {chartData.status.text}
                </div>
              )}
              
              <div className="w-full overflow-x-auto bg-[#F8FAFC] rounded-2xl border border-slate-100 p-2">
                <div className="min-w-[500px]">
                  {chartData && (
                    <svg viewBox={chartData.viewBox} className="w-full h-auto overflow-visible drop-shadow-sm font-sans">
                      
                      {/* X-Axis (الشهور) */}
                      {[0, 6, 12, 18, 24, 30, 36].map((m) => {
                        const xPos = chartData.padX + (m / 36) * (chartData.width - chartData.padX - chartData.rightMargin);
                        return (
                          <g key={`x-${m}`}>
                            <line x1={xPos} y1={chartData.padY} x2={xPos} y2={chartData.height - chartData.padY} stroke="#f1f5f9" />
                            <text x={xPos} y={chartData.height - chartData.padY + 20} fontSize="10" fill="#64748b" textAnchor="middle" fontWeight="bold">
                              {m} شهر
                            </text>
                          </g>
                        );
                      })}

                      {/* Y-Axis (الوزن) */}
                      {[5, 10, 15, 20].map((w) => {
                        const yPos = chartData.height - chartData.padY - (w / 20) * (chartData.height - chartData.padY * 2);
                        return (
                          <g key={`y-${w}`}>
                            <line x1={chartData.padX} y1={yPos} x2={chartData.width - chartData.rightMargin} y2={yPos} stroke="#f1f5f9" />
                            <text x={chartData.padX - 10} y={yPos + 4} fontSize="10" fill="#64748b" textAnchor="end" fontWeight="bold">
                              {w} كجم
                            </text>
                          </g>
                        );
                      })}
                      
                      {/* Curves */}
                      <path d={chartData.path95} fill="none" stroke="#fca5a5" strokeWidth="2" strokeDasharray="4 4" />
                      <path d={chartData.path50} fill="none" stroke="#34d399" strokeWidth="3" />
                      <path d={chartData.path5} fill="none" stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" />
                      
                      {/* Curve Labels */}
                      <text x={chartData.width - chartData.rightMargin + 10} y={chartData.lastP95 + 4} fontSize="11" fill="#ef4444" fontWeight="black">الحد الأعلى</text>
                      <text x={chartData.width - chartData.rightMargin + 10} y={chartData.lastP50 + 4} fontSize="11" fill="#10b981" fontWeight="black">المتوسط</text>
                      <text x={chartData.width - chartData.rightMargin + 10} y={chartData.lastP5 + 4} fontSize="11" fill="#3b82f6" fontWeight="black">الحد الأدنى</text>

                      {/* Child Point */}
                      <circle cx={chartData.childX} cy={chartData.childY} r="7" fill="#103B6D" stroke="white" strokeWidth="2" className="animate-[softPulse_2s_infinite]" />
                      
                      {/* Tooltip on point */}
                      <rect x={chartData.childX - 30} y={chartData.childY - 35} width="60" height="22" rx="6" fill="#103B6D" />
                      <text x={chartData.childX} y={chartData.childY - 20} textAnchor="middle" fontSize="11" fill="white" fontWeight="black">
                        طفلك ({result.weight})
                      </text>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* الأرقام السريعة */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100">
                <div className="text-[10px] font-bold text-blue-600 mb-1">العمر</div>
                <div className="text-xl font-black text-[#103B6D]">{result.age} <span className="text-xs">شهر</span></div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl text-center border border-emerald-100">
                <div className="text-[10px] font-bold text-emerald-600 mb-1">الوزن</div>
                <div className="text-xl font-black text-[#103B6D]">{result.weight} <span className="text-xs">كجم</span></div>
              </div>
              <div className="bg-amber-50 p-4 rounded-2xl text-center border border-amber-100">
                <div className="text-[10px] font-bold text-amber-600 mb-1">الطول</div>
                <div className="text-xl font-black text-[#103B6D]">{result.height} <span className="text-xs">سم</span></div>
              </div>
            </div>

          </div>

          {/* الجانب الأيسر: العيادة الافتراضية (التطعيمات والتطور) */}
          <div className="flex flex-col gap-4">
            
            {/* التطور الحركي والذهني */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-xl">🧩</div>
                <h3 className="font-black text-[#103B6D]">ماذا يتطور لديه الآن؟</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {result.data.milestone}
              </p>
            </div>

            {/* التغذية */}
            <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-xl">🍼</div>
                <h3 className="font-black text-[#103B6D]">نصيحة التغذية لعمره</h3>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 font-medium">
                {result.data.nutrition}
              </p>
            </div>

            {/* التطعيمات وربط المستشفى */}
            <div className="bg-gradient-to-l from-[#103B6D] to-[#0a2647] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden flex-1 flex flex-col justify-center">
              <div className="absolute -left-4 -bottom-4 text-7xl opacity-10">💉</div>
              <div className="relative z-10">
                <div className="text-[10px] font-bold text-[#D4AF37] mb-1">تذكير العيادة:</div>
                <h3 className="text-base font-black mb-4 leading-relaxed">
                  التطعيمات المستحقة: <br/>
                  <span className="text-white/90">{result.data.vaccine}</span>
                </h3>
                
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <Link href="/departments/pediatrics" className="bg-[#D4AF37] text-[#103B6D] text-xs font-black px-5 py-2.5 rounded-xl hover:bg-[#b5952f] transition shadow-sm">
                    حجز موعد أطفال
                  </Link>
                  <button onClick={() => setResult(null)} className="text-xs font-bold text-blue-200 hover:text-white underline px-2">
                    فحص طفل آخر
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