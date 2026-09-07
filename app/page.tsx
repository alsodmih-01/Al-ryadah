import React from 'react';

export default function AlReyadaHospital() {
  const departments = [
    { title: "مركز القلب والقسطرة", desc: "رعاية آمنة ودقيقة", icon: "🫀", color: "text-[#007A7C]", bg: "bg-[#007A7C]/10" },
    { title: "جراحة الإحليل والمسالك", desc: "إشراف د/ محمد الشميري", icon: "🔬", color: "text-[#007A7C]", bg: "bg-[#007A7C]/10" },
    { title: "قسم الأطفال والحضانات", desc: "رعاية متكاملة لحديثي الولادة", icon: "👶", color: "text-[#007A7C]", bg: "bg-[#007A7C]/10" },
    { title: "قسم العلاج الطبيعي", desc: "استعادة الحركة وتقليل الألم", icon: "🏃‍♂️", color: "text-[#007A7C]", bg: "bg-[#007A7C]/10" },
  ];

  // روابط وسائل التواصل بألوانها الرسمية
  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/share/1GzStivGWr/", 
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>,
      colorClass: "text-[#1877F2] hover:shadow-[#1877F2]/50" 
    },
    { 
      name: "WhatsApp", 
      href: "https://whatsapp.com/channel/0029Vb8GahIDeON5IGtXrt39", 
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12.031 0C5.394 0 .013 5.38.01 12.016c-.002 2.122.553 4.195 1.606 6.02L.034 23.98l6.096-1.597a11.96 11.96 0 0 0 5.897 1.547h.005c6.634 0 12.015-5.382 12.018-12.02.002-3.218-1.248-6.244-3.523-8.52A11.967 11.967 0 0 0 12.03 0zm0 1.996c2.684.001 5.206 1.047 7.104 2.946a10.007 10.007 0 0 1 2.936 7.078c-.002 5.535-4.507 10.038-10.045 10.038a9.972 9.972 0 0 1-5.11-1.408l-.366-.217-3.8.996 1.014-3.702-.238-.378a10.008 10.008 0 0 1-1.533-5.33c.002-5.536 4.507-10.037 10.04-10.037zm5.666 14.542c-.237.674-1.393 1.285-1.95 1.367-.534.078-1.157.107-1.85-.113-.42-.133-.96-.307-1.65-.605-2.92-1.265-4.825-4.22-4.97-4.415-.145-.196-1.187-1.58-1.187-3.013 0-1.433.748-2.138 1.012-2.428.263-.29.57-.363.76-.363.19 0 .38.003.55.01.173.007.406-.065.635.485.237.57.808 1.97.88 2.115.07.146.12.316.025.507-.095.19-.143.31-.285.474-.143.166-.302.353-.432.486-.142.146-.293.308-.13.59.162.282.72 1.196 1.556 1.936.966.858 1.867 1.127 2.15 1.27.283.143.45.12.617-.07.168-.19.72-1.026.91-1.378.19-.352.38-.295.642-.196.262.1 1.662.784 1.947.927.285.143.475.215.546.335.07.12.07.697-.167 1.37z"/></svg>,
      colorClass: "text-[#25D366] hover:shadow-[#25D366]/50"
    },
    { 
      name: "Instagram", 
      href: "#", 
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
      colorClass: "text-[#E1306C] hover:shadow-[#E1306C]/50"
    },
    { 
      name: "X (Twitter)", 
      href: "#", 
      icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>,
      colorClass: "text-gray-900 hover:shadow-gray-900/50" 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans" dir="rtl">
      {/* الشريط العلوي */}
      <div className="bg-[#007A7C] text-white text-[11px] md:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-4">
            <span>📍 ذمار - جولة المثلث - غرب الاستاد الرياضي</span>
          </div>
          <div className="hidden md:flex gap-4 font-bold" dir="ltr">
            <span>📞 770 751 111</span>
            <span>☎️ 06 424 777</span>
          </div>
        </div>
      </div>

      {/* شريط التنقل المتجاوب */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-y-3">
          
          <div className="flex items-center gap-2 md:gap-3 order-1">
            <img 
              src="/images/logo.png" 
              alt="شعار مستشفى الريادة" 
              className="w-12 h-12 md:w-16 md:h-16 object-contain"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#C21835]">
                مستشفى <span className="text-[#007A7C]">الريادة</span> الدولي
              </h1>
              <p className="text-[9px] md:text-xs text-slate-500 font-bold tracking-widest">— ملتزمون بالريادة —</p>
            </div>
          </div>
          
          <nav className="flex w-full md:w-auto overflow-x-auto gap-6 md:gap-8 font-bold text-[#007A7C] pb-1 md:pb-0 text-sm md:text-base whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] order-3 md:order-2">
            <a href="/" className="hover:text-[#C21835] transition border-b-2 border-transparent hover:border-[#C21835]">الرئيسية</a>
            <a href="/about" className="hover:text-[#C21835] transition">عن المستشفى</a>
            <a href="#departments" className="hover:text-[#C21835] transition">الأقسام والمراكز</a>
            <a href="/doctors" className="hover:text-[#C21835] transition">نخبة الأطباء</a>
          </nav>

          <a href="/booking" className="hidden sm:inline-block bg-[#C21835] hover:bg-red-800 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full font-bold shadow-lg transition transform hover:scale-105 order-2 md:order-3">
            احجز موعدك
          </a>
        </div>
      </header>

      {/* القسم الرئيسي */}
      <section className="relative bg-[#007A7C] overflow-hidden pt-12 md:pt-20 lg:pt-28 pb-10 md:pb-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#007A7C] via-[#007A7C]/90 to-transparent"></div>

        <div className="md:hidden absolute bottom-0 left-0 w-full h-[55%] z-10 pointer-events-none" dir="ltr">
          <img 
            src="/images/the_building.png" 
            alt="مبنى مستشفى الريادة" 
            className="absolute bottom-0 left-0 w-full h-full object-cover opacity-25 saturate-50 mix-blend-luminosity"
          />
        </div>

        <div className="hidden md:block absolute bottom-0 left-0 w-1/2 lg:w-[45%] h-full z-10 pointer-events-none" dir="ltr">
          <div className="absolute bottom-10 left-0 w-[90%] h-[80%] bg-teal-400/20 rounded-full blur-3xl"></div>
          <img 
            src="/images/the_building.png" 
            alt="مبنى مستشفى الريادة الدولي" 
            className="absolute bottom-0 left-0 w-[140%] lg:w-[150%] max-w-none h-auto object-left-bottom opacity-40 saturate-50 mix-blend-luminosity drop-shadow-[0_10px_30px_rgba(0,0,0,0.3)] pointer-events-auto transform origin-bottom-left transition-all duration-700 hover:opacity-90 hover:saturate-100 hover:mix-blend-normal hover:scale-105"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 flex justify-start z-20">
          <div className="relative w-full md:w-3/5 lg:w-1/2 text-white pb-10 md:pb-32 lg:pb-40 text-right">
            <span className="bg-white/20 text-white px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-bold backdrop-blur-sm border border-white/30 inline-block">
              صرح طبي متكامل في قلب ذمار
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mt-5 md:mt-6 leading-tight">
              رعاية صحية <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-white">
                تليق بثقتكم.
              </span>
            </h2>
            <p className="mt-5 md:mt-6 text-[#007A7C] bg-white/95 p-3 md:p-4 rounded-xl md:rounded-2xl font-bold text-sm md:text-lg inline-block border-r-4 border-[#C21835] shadow-lg">
              نجمع بين دقة التشخيص، حداثة التقنية، ومهارة الكادر الطبي.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3 md:gap-4 justify-start">
              <a href="/doctors" className="inline-flex bg-[#C21835] hover:bg-red-800 text-white font-bold px-6 py-2.5 md:px-8 md:py-3.5 rounded-full shadow-lg transition items-center gap-2 text-sm md:text-base">
                دليل الأطباء 👨‍⚕️
              </a>
              <a href="/booking" className="inline-block bg-white text-[#007A7C] hover:bg-slate-100 font-bold px-6 py-2.5 md:px-8 md:py-3.5 rounded-full shadow-lg transition border border-transparent text-center text-sm md:text-base">
                بوابة المريض
              </a>
            </div>

            <div className="mt-10 md:mt-0 md:absolute md:bottom-6 lg:bottom-10 md:right-0 flex items-center gap-3 md:gap-4 border-t border-white/20 pt-5 md:pt-6 w-fit md:pr-2">
              <span className="text-xs md:text-sm font-bold text-teal-100">صفحات المستشفى:</span>
              <div className="flex gap-2 md:gap-3">
                {socialLinks.map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl ${social.colorClass}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* الأقسام الطبية البارزة */}
      <section id="departments" className="py-12 md:py-20 max-w-7xl mx-auto px-4 -mt-6 md:-mt-16 relative z-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-xl border border-slate-100 hover:-translate-y-2 transition duration-300 text-right">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl ${dept.bg} flex items-center justify-center text-3xl mb-4`}>
                {dept.icon}
              </div>
              <h3 className={`text-lg md:text-xl font-black ${dept.color} mb-2`}>{dept.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* قسم مركز الجلدية والتجميل */}
      <section className="py-8 md:py-16 max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0c2f25] to-[#124b3c] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-[#D4AF37]/30">
          <div className="p-8 md:p-14 md:w-1/2 flex flex-col justify-center text-right">
            <span className="text-[#D4AF37] font-bold text-sm md:text-lg tracking-wider mb-2">✦ مركز الريادة للجلدية والتجميل</span>
            <h2 className="text-2xl md:text-5xl font-black text-white leading-tight">
              جسمك يستاهل إهتمامك، <br />
              <span className="text-[#D4AF37]">إبدأ الخطوة الصح.</span>
            </h2>
            <p className="mt-4 md:mt-6 text-slate-300 leading-relaxed text-sm md:text-base">
              بشرتك تحاول أن تخبرك بوجود مشكلة.. هل تعرف كيف تفهم رسائلها؟ نوفر لك أحدث التقنيات لعلاج الأمراض الجلدية، زراعة الشعر، والعناية بالبشرة بإشراف نخبة الأخصائيين.
            </p>
            <a href="/booking" className="mt-6 md:mt-8 inline-block bg-[#D4AF37] hover:bg-[#b8935a] text-[#0c2f25] w-fit font-black px-6 py-2.5 md:px-8 md:py-3.5 rounded-full shadow-lg transition text-sm md:text-base">
              احجز جلستك التجميلية
            </a>
          </div>
          <div className="md:w-1/2 bg-[url('https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center h-56 md:h-auto opacity-90 border-t-4 md:border-t-0 md:border-r-8 border-[#D4AF37]">
          </div>
        </div>
      </section>

      {/* قسم حقوق الملكية والتطوير */}
      <footer className="bg-[#0c2f25] text-slate-300 py-8 border-t border-[#D4AF37]/20 mt-16 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm md:text-base font-medium">
            جميع الحقوق محفوظة © 2026 <span className="text-white font-bold">مستشفى الريادة الدولي</span>
          </p>
          <p className="text-xs md:text-sm text-[#D4AF37] mt-2 font-bold tracking-wide">
            تصميم وتطوير وبرمجة: <span className="underline">Hesham Al-sodmi</span>
          </p>
        </div>
      </footer>
    </div>
  );
}