import React from 'react';

export default function AboutPage() {
  const stats = [
    { number: "+50", label: "طبيب واستشاري", icon: "👨‍⚕️" },
    { number: "+20", label: "قسماً ومركزاً طبياً", icon: "🏥" },
    { number: "24/7", label: "طوارئ وعناية مركزة", icon: "🚨" },
    { number: "+10k", label: "قصة شفاء ونجاح", icon: "❤️" },
  ];

  const values = [
    { title: "الإنسانية أولاً", desc: "نتعامل مع كل مريض كفرد من عائلتنا، ونقدم الرعاية بتعاطف واحترام بالغين.", icon: "🤝" },
    { title: "الجودة والريادة الحديث", desc: "نلتزم بأعلى المعايير الطبية العالمية لضمان دقة التشخيص وفعالية العلاج.", icon: "⭐" },
    { title: "النزاهة والشفافية", desc: "نؤمن بأهمية المصداقية التامة مع المريض في كل خطوات رحلته العلاجية.", icon: "⚖️" },
    { title: "التطور المستمر", desc: "نواكب أحدث التقنيات والأجهزة الطبية لتقديم حلول مبتكرة وآمنة.", icon: "📈" },
  ];

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
          
          <nav className="hidden md:flex gap-8 font-bold text-[#0056B3]">
            <a href="/" className="hover:text-[#C21835] transition">الرئيسية</a>
            <a href="/about" className="text-[#C21835] border-b-2 border-[#C21835]">عن المستشفى</a>
            <a href="/#departments" className="hover:text-[#C21835] transition">الأقسام والمراكز</a>
            <a href="/doctors" className="hover:text-[#C21835] transition">نخبة الأطباء</a>
          </nav>

          <a href="/booking" className="inline-block bg-[#C21835] hover:bg-red-800 text-white px-6 py-2.5 rounded-full font-bold shadow-md transition transform hover:scale-105 text-center text-sm">
            احجز موعدك الآن
          </a>
        </div>
      </header>

      {/* القسم الرئيسي (Hero Section) */}
      <section className="bg-gradient-to-l from-[#0056B3] to-[#0a2342] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/30 mb-6 inline-block">
            ملتزمون بتقديم أفضل الخدمات الطبية
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mt-2 leading-tight">
            عن المستشفى الأوربي الحديث الحديث
          </h1>
          <p className="text-blue-100 mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            نحن صرح طبي متكامل في قلب  العاصمة، نجمع بين الكفاءات الطبية الاستثنائية والتكنولوجيا الحديثة لنرسم معياراً جديداً للرعاية الصحية والتجميلية في اليمن.
          </p>
        </div>
      </section>

      {/* شريط الإحصائيات (متداخل مع القسم العلوي) */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-x-reverse divide-slate-100">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-[#0056B3]">{stat.number}</div>
              <div className="text-sm font-bold text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* قسم الرؤية والرسالة */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-50 rounded-3xl -z-10 transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=1000&auto=format&fit=crop" 
              alt="فريق المستشفى الأوربي الحديث" 
              className="rounded-3xl shadow-xl w-full object-cover h-[400px]"
            />
            <div className="absolute bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
              <div className="text-[#C21835] text-4xl font-black mb-2">"</div>
              <p className="text-sm font-bold text-slate-700 italic">
                صحتك هي استثمارنا الأهم، وراحتك هي غايتنا الأولى.
              </p>
            </div>
          </div>
          
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-blue-50 text-[#0056B3] rounded-2xl flex items-center justify-center text-2xl font-black">🎯</span>
                <h2 className="text-3xl font-black text-slate-900">رسالتنا</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg border-r-4 border-[#0056B3] pr-4">
                تقديم رعاية صحية وتجميلية متكاملة وآمنة، تستند إلى أحدث الممارسات الطبية العالمية، وتلبي احتياجات المجتمع اليمني بجودة عالية وتكلفة مناسبة، من خلال كادر طبي متميز وبيئة استشفائية مريحة.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 bg-red-50 text-[#C21835] rounded-2xl flex items-center justify-center text-2xl font-black">👁️</span>
                <h2 className="text-3xl font-black text-slate-900">رؤيتنا</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg border-r-4 border-[#C21835] pr-4">
                أن نكون الخيار الأول والوجهة الطبية الأوثق في اليمن، والنموذج الرائد في تقديم الخدمات الطبية والجراحية والتجميلية تحت سقف واحد بحلول عام 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* قسم قيم المستشفى */}
      <section className="bg-slate-100 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900">القيم التي تحركنا</h2>
            <p className="text-slate-500 mt-3 text-lg">مبادئ ثابتة نلتزم بها لضمان راحتك وثقتك</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:-translate-y-2 transition duration-300 group">
                <div className="w-16 h-16 bg-blue-50 text-[#0056B3] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">
                  {val.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{val.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}