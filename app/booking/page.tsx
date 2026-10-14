'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase'; 

// === قاعدة بيانات الأقسام والأطباء الحقيقية للمستشفى ===
const hospitalData: Record<string, string[]> = {
  "جراحة المخ والأعصاب": [
    "أ.د/ عبدالله يحيى الأسطى",
    "د/ عادل عبدالرحمن الكريبي"
  ],
  "قسم الأمراض الباطنية": [
    "د/ بسام فؤاد عبدالله الصلوي",
    "د/ عيسى خالد القدسي",
    "د/ عقيل مطهر الشامي",
    "د/ أحمد محمد البحيري"
  ],
  "قسم المخ والأعصاب": [
    "د/ محمد عبده المخلافي"
  ],
  "جراحة العظام والمفاصل": [
    "د/ عبدالرحمن عبدالله بابقي"
  ],
  "قسم الأطفال والحضانات": [
    "د/ محمد عبده علي عقلان"
  ]
};

const availableDepartments = Object.keys(hospitalData);
// =======================================================

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    department: 'جراحة المخ والأعصاب', // القسم الافتراضي
    doctor: 'أ.د/ عبدالله يحيى الأسطى', // الطبيب الافتراضي
    date: '',
    notes: ''
  });

  // هذه الدالة الذكية تلتقط بيانات الطبيب من الرابط (إن وُجدت)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const doctorFromUrl = params.get('doctor');
    const deptFromUrl = params.get('department');

    if (doctorFromUrl || deptFromUrl) {
      setFormData(prev => {
        const newDept = deptFromUrl || prev.department;
        const availableDocs = hospitalData[newDept] || [];
        return {
          ...prev,
          department: newDept,
          // إذا لم يأتِ اسم الطبيب من الرابط، اختر أول طبيب في القسم
          doctor: doctorFromUrl || (availableDocs.length > 0 ? availableDocs[0] : 'غير محدد')
        };
      });
    }
  }, []);

  // دالة تغيير القسم (تُحدّث قائمة الأطباء تلقائياً)
  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDept = e.target.value;
    const doctorsInDept = hospitalData[selectedDept] || [];
    
    setFormData({
      ...formData,
      department: selectedDept,
      // بمجرد اختيار القسم، سيظهر أول طبيب في هذا القسم تلقائياً
      doctor: doctorsInDept.length > 0 ? doctorsInDept[0] : 'غير محدد'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_name: formData.patientName,
          phone: formData.phone,
          department: formData.department,
          doctor_name: formData.doctor,
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      console.error("خطأ في الإرسال:", error);
      alert("حدث خطأ أثناء إرسال الحجز، يرجى المحاولة مرة أخرى.");
    } else {
      setSubmitted(true); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      {/* شريط التنقل */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 md:gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="شعار المستشفى الأوربي الحديث" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#C21835]">
                المستشفى <span className="text-[#0056B3]">الأوربي</span> الحديث
              </h1>
            </div>
          </a>
          <a href="/" className="text-sm font-bold text-[#0056B3] hover:text-[#C21835] transition flex items-center gap-1">
            العودة للرئيسية &larr;
          </a>
        </div>
      </header>

      {/* القسم الرئيسي */}
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
                شكراً لثقتك بالمستشفى الأوربي الحديث. سيقوم موظف الاستقبال بالتواصل معك على الرقم المحمول لتأكيد موعدك النهائي قريباً.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({...formData, patientName: '', phone: '', notes: ''}); 
                }}
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
                {/* القائمة المنسدلة للأقسام */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">القسم أو المركز الطبي *</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.department}
                    onChange={handleDepartmentChange}
                  >
                    {availableDepartments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                {/* القائمة المنسدلة الذكية للأطباء (تتغير حسب القسم) */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الطبيب المختص *</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] focus:border-transparent outline-none transition bg-slate-50 focus:bg-white"
                    value={formData.doctor}
                    onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  >
                    {hospitalData[formData.department] ? (
                      hospitalData[formData.department].map(doc => (
                        <option key={doc} value={doc}>{doc}</option>
                      ))
                    ) : (
                      <option value="غير محدد">غير محدد</option>
                    )}
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
                disabled={isSubmitting}
                className="w-full bg-[#C21835] hover:bg-red-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl shadow-lg transition duration-300 text-lg flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                {isSubmitting ? 'جاري إرسال الحجز...' : 'تأكيد وإرسال طلب الحجز 📅'}
              </button>
              <p className="text-center text-xs text-slate-400 mt-4">
                بضغطك على تأكيد الحجز، أنت توافق على سياسة الخصوصية للمستشفى الأوربي الحديث
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}