import React from 'react';

export default function DoctorsPage() {
  const doctorsList = [
    {
      name: "د. محمد الشميري",
      specialty: "استشاري جراحة الكلى والمسالك البولية",
      department: "مركز جراحة الإحليل والتشوهات",
      image: "👨‍⚕️",
      days: "من السبت إلى الخميس",
      time: "دوام كامل",
      isCosmetic: false
    },
    {
      name: "د. أحمد الوشلي",
      specialty: "استشاري أمراض وجراحة القلب",
      department: "مركز القلب والقسطرة",
      image: "🫀",
      days: "السبت - الإثنين - الأربعاء",
      time: "09:00 ص - 01:00 م",
      isCosmetic: false
    },
    {
      name: "د. فاطمة العنسي",
      specialty: "أخصائية الأطفال وحديثي الولادة",
      department: "قسم الأطفال والحضانات",
      image: "👩‍⚕️",
      days: "الأحد - الثلاثاء - الخميس",
      time: "02:00 م - 06:00 م",
      isCosmetic: false
    },
    {
      name: "د. محمد الهيثمي",
      specialty: "استشاري الجلدية والتجميل وزراعة الشعر",
      department: "مركز الجلدية والتجميل",
      image: "✨",
      days: "يومياً عدا الجمعة",
      time: "10:00 ص - 08:00 م",
      isCosmetic: true
    },
    {
      name: "د. أروى المذحجي",
      specialty: "أخصائية التجميل غير الجراحي وليزر البشرة",
      department: "مركز الجلدية والتجميل",
      image: "🌸",
      days: "السبت - الثلاثاء - الخميس",
      time: "01:00 م - 07:00 م",
      isCosmetic: true
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      {/* شريط التنقل */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* تم التعديل هنا لسحب الشعار من مجلد public/images */}
          <a href="/" className="flex items-center gap-2 md:gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="شعار المستشفى الأوربي الحديث" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#C21835]">
                المستشفى <span className="text-[#0056B3]">الأوربي الحديث</span>
              </h1>
            </div>
          </a>

          <a href="/" className="text-sm font-bold text-[#0056B3] hover:text-[#C21835] transition flex items-center gap-1">
            العودة للرئيسية &larr;
          </a>
        </div>
      </header>

      {/* عنوان الصفحة */}
      <section className="bg-gradient-to-l from-[#0056B3] to-[#0a2342] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10">
          <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 mb-4 inline-block">
            نخبة الكادر الطبي
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-2">أطباء واستشاريو الالمستشفى</h1>
          <p className="text-blue-100 mt-4 text-lg">تعرف على كادرنا الطبي المتميز في الالمستشفى العام ومركز الجلدية والتجميل</p>
        </div>
      </section>

      {/* شبكة عرض الأطباء */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctorsList.map((doc, index) => (
            <div key={index} className={`bg-white rounded-3xl shadow-sm border ${doc.isCosmetic ? 'border-[#D4AF37]/40 hover:shadow-[#D4AF37]/20' : 'border-slate-200 hover:shadow-blue-900/10'} overflow-hidden hover:-translate-y-2 transition duration-300 flex flex-col justify-between`}>
              <div className="p-6 text-center">
                <div className={`w-24 h-24 text-4xl rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner border ${doc.isCosmetic ? 'bg-[#0a2342] text-[#D4AF37] border-[#D4AF37]/50' : 'bg-blue-50 text-[#0056B3] border-blue-100'}`}>
                  {doc.image}
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${doc.isCosmetic ? 'text-[#0a2342] bg-[#D4AF37]/20 border-[#D4AF37]' : 'text-[#0056B3] bg-blue-50 border-blue-100'}`}>
                  {doc.department}
                </span>
                <h3 className={`text-xl font-black mt-4 ${doc.isCosmetic ? 'text-[#0a2342]' : 'text-slate-900'}`}>
                  {doc.name}
                </h3>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed h-10">{doc.specialty}</p>
              </div>
              
              <div className="bg-slate-50 p-5 border-t border-slate-100 text-sm text-slate-600">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-slate-700">أيام الدوام:</span>
                  <span>{doc.days}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-slate-700">الساعات:</span>
                  <span dir="ltr">{doc.time}</span>
                </div>
                <a 
                  href="/booking" 
                  className={`block text-center w-full font-bold py-3 rounded-xl transition shadow-md ${doc.isCosmetic ? 'bg-[#D4AF37] hover:bg-[#b8935a] text-[#0a2342]' : 'bg-[#C21835] hover:bg-red-800 text-white'}`}
                >
                  احجز موعداً مع الطبيب
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}