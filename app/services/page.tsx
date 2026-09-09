import Link from 'next/link';

// استدعاء جميع الميزات الذكية التي برمجتها
import LiveRadar from './components/LiveRadar';
import SymptomMatcher from './components/SymptomMatcher';
import BmiCalculator from './components/BmiCalculator';
import HydrationTracker from './components/HydrationTracker';
import ChildGrowthChecker from './components/ChildGrowthChecker';
import PregnancyTracker from './components/PregnancyTracker';
import ParentCare from './components/ParentCare';
import ChronicCare from './components/ChronicCare';

export default function SmartServicesPage() {
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
          <a href="/" className="text-sm font-bold text-[#007A7C] hover:text-[#C21835] transition flex items-center gap-1">
            العودة للرئيسية &larr;
          </a>
        </div>
      </header>

      <main className="pb-20">
        {/* قسم الترحيب للخدمات الذكية */}
        <section className="bg-[#007A7C] text-white py-12 px-4 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 mb-4 inline-block">
              ابتكار طبي لخدمتك
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">الخدمات الطبية الذكية</h2>
            <p className="text-teal-100 text-lg max-w-2xl mx-auto">
              مجموعة من الأدوات التفاعلية المصممة خصيصاً لمساعدتك في متابعة صحتك وصحة عائلتك بكل سهولة من أي مكان.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 space-y-12">
          
          {/* القسم الأول: التوجيه والحالة الحية */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">⚡</span>
              <h2 className="text-2xl font-black text-slate-800">الوصول السريع</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <SymptomMatcher />
              <LiveRadar />
            </div>
          </section>

          {/* القسم الثاني: حاسبات الصحة والنمو */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🧮</span>
              <h2 className="text-2xl font-black text-slate-800">حاسبات الصحة الشخصية</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BmiCalculator />
              <HydrationTracker />
              <ChildGrowthChecker />
              <PregnancyTracker />
            </div>
          </section>

          {/* القسم الثالث: برامج الرعاية */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl">🤝</span>
              <h2 className="text-2xl font-black text-slate-800">برامج الرعاية المتخصصة</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ParentCare />
              <ChronicCare />
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}