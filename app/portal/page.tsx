'use client';
import { useState } from 'react';

export default function PatientPortal() {
  // محاكاة حالة تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [patientId, setPatientId] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      {/* شريط التنقل العلوي */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#007A7C] flex items-center justify-center text-[#C21835] font-bold text-xl group-hover:bg-[#007A7C] group-hover:text-white transition">
              ر
            </div>
            <div>
              <h1 className="text-xl font-black text-[#C21835]">
                مستشفى <span className="text-[#007A7C]">الريادة</span>
              </h1>
            </div>
          </a>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="text-sm font-bold text-[#C21835] hover:text-white hover:bg-[#C21835] bg-red-50 px-4 py-2 rounded-xl border border-red-100 transition"
              >
                تسجيل الخروج 🚪
              </button>
            )}
            {!isLoggedIn && (
              <a href="/" className="text-sm font-bold text-[#007A7C] hover:text-[#C21835] transition flex items-center gap-1">
                العودة للرئيسية &larr;
              </a>
            )}
          </div>
        </div>
      </header>

      {!isLoggedIn ? (
        /* شاشة تسجيل الدخول لبوابة المريض */
        <main className="py-20 max-w-md mx-auto px-4 relative z-10">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 text-center relative overflow-hidden">
            {/* زخرفة خلفية */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-10"></div>
            
            <div className="w-20 h-20 bg-teal-50 text-[#007A7C] rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner border border-teal-100">
              🔐
            </div>
            <h1 className="text-2xl font-black text-slate-900 mb-2">بوابة المريض الرقمية</h1>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              أدخل رقم الملف الطبي أو رقم الجوال المسجل لدينا لعرض ملفك الصحي وسجل زياراتك لمستشفى الريادة.
            </p>
            
            <form onSubmit={handleLogin} className="space-y-5 text-right">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الملف الطبي / الجوال</label>
                <input 
                  type="text" 
                  required
                  placeholder="مثال: 10459 أو 770XXXXXX"
                  className="w-full px-4 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#007A7C] focus:border-transparent outline-none text-center tracking-widest font-bold text-lg bg-slate-50 focus:bg-white transition"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-[#007A7C] hover:bg-[#0c2f25] text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-1 flex justify-center items-center gap-2 text-lg"
              >
                دخول آمن إلى ملفي ↗
              </button>
            </form>
          </div>
        </main>
      ) : (
        /* لوحة تحكم المريض بعد تسجيل الدخول */
        <main className="py-10 max-w-6xl mx-auto px-4">
          {/* بطاقة الترحيب ببيانات المريض */}
          <div className="bg-gradient-to-l from-[#007A7C] to-[#0c2f25] text-white p-8 md:p-10 rounded-3xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
            
            <div className="relative z-10">
              <span className="bg-white/20 text-teal-100 text-xs font-bold px-4 py-1.5 rounded-full border border-white/30 backdrop-blur-sm">
                رقم الملف: #{patientId || '10459'}
              </span>
              <h1 className="text-3xl md:text-4xl font-black mt-4">أهلاً بك، محمد علي أحمد</h1>
              <p className="text-teal-100 mt-2 text-sm md:text-base">سجل المتابعة الصحية الخاص بك في مستشفى الريادة الدولي</p>
            </div>
            
            <div className="relative z-10 bg-white/10 p-5 rounded-2xl border border-white/20 text-center backdrop-blur-md w-full md:w-auto">
              <div className="text-sm text-teal-100 font-medium mb-1">الزيارة القادمة المؤكدة</div>
              <div className="text-xl font-black text-[#D4AF37]">غداً، 05 سبتمبر 2026</div>
              <div className="text-xs text-white mt-1">10:00 صباحاً</div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* المواعيد القادمة */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <span className="text-[#007A7C]">📅</span> المواعيد القادمة
              </h3>
              <div className="space-y-4">
                <div className="bg-teal-50/50 p-5 rounded-2xl border border-teal-100 hover:shadow-md transition">
                  <div className="text-xs font-bold text-[#007A7C] mb-2 px-3 py-1 bg-white rounded-full inline-block shadow-sm">
                    مركز القلب والقسطرة
                  </div>
                  <div className="font-black text-slate-900 text-lg">د. أحمد الوشلي</div>
                  <div className="text-sm text-slate-500 mt-3 flex items-center gap-2 font-medium">
                    <span>⏱️</span> السبت، 05 سبتمبر 2026 - 10:00 ص
                  </div>
                </div>
              </div>
              
              <a href="/booking" className="mt-6 block text-center w-full bg-slate-50 hover:bg-slate-100 text-[#007A7C] font-bold py-3 rounded-xl border border-slate-200 transition">
                + حجز موعد جديد
              </a>
            </div>

            {/* الزيارات السابقة والتقارير */}
            <div className="md:col-span-2 bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <span className="text-[#007A7C]">📋</span> سجل الزيارات والملف الطبي
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-100 text-slate-400 font-bold">
                      <th className="pb-4 pr-2">تاريخ الزيارة</th>
                      <th className="pb-4">القسم / التخصص</th>
                      <th className="pb-4">الطبيب المعالج</th>
                      <th className="pb-4 text-center">الحالة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 pr-2 font-black text-slate-900">2026/08/20</td>
                      <td className="py-4 text-slate-600 font-medium">مركز الجلدية والتجميل</td>
                      <td className="py-4 text-slate-600 font-medium">د. محمد الهيثمي</td>
                      <td className="py-4 text-center"><span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold">مكتملة</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 pr-2 font-black text-slate-900">2026/07/15</td>
                      <td className="py-4 text-slate-600 font-medium">قسم الأطفال</td>
                      <td className="py-4 text-slate-600 font-medium">د. فاطمة العنسي</td>
                      <td className="py-4 text-center"><span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold">مكتملة</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition">
                      <td className="py-4 pr-2 font-black text-slate-900">2025/11/05</td>
                      <td className="py-4 text-slate-600 font-medium">جراحة المسالك البولية</td>
                      <td className="py-4 text-slate-600 font-medium">د. محمد الشميري</td>
                      <td className="py-4 text-center"><span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-lg text-xs font-bold">مكتملة</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}