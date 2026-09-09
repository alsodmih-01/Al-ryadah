'use client';
import { useState } from 'react';

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: 'المستشفى العام',
    doctor: 'غير محدد',
    date: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      {/* شريط التنقل */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full border-2 border-[#0056B3] flex items-center justify-center text-[#C21835] font-bold text-xl group-hover:bg-[#0056B3] group-hover:text-white transition">
              ر
            </div>
            <div>
              <h1 className="text-xl font-black text-[#C21835]">
                المستشفى <span className="text-[#0056B3]">الأوربي الحديث</span>
              </h1>
            </div>
          </a>
          <a href="/" className="text-sm font-bold text-[#0056B3] hover:text-[#C21835] transition flex items-center gap-1">
            العودة للرئيسية &larr;
          </a>
        </div>
      </header>

      {/* القسم الرئيسي (Hero Section) */}
      <section className="bg-gradient-to-l from-[#0056B3] to-[#0a2342] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 mb-4 inline-block">
            بوابة المريض الرقمية
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-2">حجز موعد طبي إلكتروني</h1>
          <p className="text-blue-100 mt-4 text-lg">احجز موعدك بسهولة مع نخبة استشاريي العاصمة</p>
        </div>
      </section>

      {/* نموذج الحجز */}
      <main className="py-12 max-w-3xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-50 text-[#0056B3] rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-inner border border-blue-100">
                ✓
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">تم استلام طلب الحجز بنجاح!</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">
                شكراً لثقتك بالمستشفى الأوربي الحديث الحديث. سيقوم موظف الاستقبال بالتواصل معك على الرقم المحمول لتأكيد موعدك النهائي قريباً.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#0056B3] text-white px-8 py-3 rounded-full font-bold hover:bg-[#0a2342] shadow-lg transition"
              >
                حجز موعد جديد
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-[#0056B3] rounded-xl flex items-center justify-center text-xl">
                  📝
                </div>
                <h3 className="text-xl font-black text-slate-900">بيانات المريض وحجز الموعد</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسم المريض الرباعي *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="الاسم الكامل كما في الهوية" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="77X XXX XXX" 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">القسم أو المركز الطبي *</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                  >
                    <option value="المستشفى العام">المستشفى العام (باطنية، طوارئ)</option>
                    <option value="مركز القلب والقسطرة">مركز القلب والقسطرة</option>
                    <option value="مركز جراحة الإحليل">مركز جراحة الإحليل والمسالك</option>
                    <option value="قسم الأطفال والحضانات">قسم الأطفال والحضانات</option>
                    <option value="قسم العلاج الطبيعي">قسم العلاج الطبيعي</option>
                    <option value="مركز الجلدية والتجميل">مركز الجلدية والتجميل</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الطبيب المختص *</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.doctor}
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  >
                    <option value="غير محدد">طبيب غير محدد (حسب توفر المواعيد)</option>
                    <option value="د. محمد الشميري">د. محمد الشميري (استشاري جراحة المسالك)</option>
                    <option value="د. أحمد الوشلي">د. أحمد الوشلي (استشاري أمراض القلب)</option>
                    <option value="د. فاطمة العنسي">د. فاطمة العنسي (أخصائية الأطفال)</option>
                    <option value="د. محمد الهيثمي">د. محمد الهيثمي (مركز التجميل)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">تاريخ الزيارة المطلوبة *</label>
                <input 
                  type="date" 
                  required
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ملاحظات إضافية أو وصف الحالة (اختياري)</label>
                <textarea 
                  rows={4}
                  placeholder="صف باختصار سبب حجز الموعد لتسهيل توجيهك للقسم الصحيح..."
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C21835] hover:bg-red-800 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 text-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                تأكيد وإرسال طلب الحجز 📅
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                بضغطك على تأكيد الحجز، أنت توافق على سياسة الخصوصية لالمستشفى الأوربي الحديث الحديث
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}