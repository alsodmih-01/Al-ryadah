import Link from 'next/link';

function Icon({
  name,
  size = 24,
}: {
  name:
    | 'heart'
    | 'shield'
    | 'spark'
    | 'users'
    | 'target'
    | 'eye'
    | 'check'
    | 'arrow'
    | 'medical'
    | 'clock'
    | 'star'
    | 'building';
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (name) {
    case 'heart':
      return (
        <svg {...common}>
          <path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.5Z" />
        </svg>
      );

    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'spark':
      return (
        <svg {...common}>
          <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
          <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
        </svg>
      );

    case 'users':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );

    case 'eye':
      return (
        <svg {...common}>
          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );

    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case 'medical':
      return (
        <svg {...common}>
          <path d="M12 21s7-4.5 7-10V5l-7-3-7 3v6c0 5.5-7 10-7 10Z" />
          <path d="M12 7v6M9 10h6" />
        </svg>
      );

    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case 'star':
      return (
        <svg {...common}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );

    case 'building':
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
          <path d="M16 9h4a1 1 0 0 1 1 1v11" />
          <path d="M8 7h4M8 11h4M8 15h4M8 19h4" />
          <path d="M2 21h20" />
        </svg>
      );

    default:
      return null;
  }
}

const stats = [
  {
    value: '+50',
    label: 'طبيب واستشاري',
    icon: 'users' as const,
  },
  {
    value: '+20',
    label: 'قسمًا ومركزًا طبيًا',
    icon: 'building' as const,
  },
  {
    value: '24/7',
    label: 'طوارئ على مدار الساعة',
    icon: 'clock' as const,
  },
  {
    value: '+10K',
    label: 'قصة شفاء ونجاح',
    icon: 'heart' as const,
  },
];

const values = [
  {
    title: 'الإنسانية أولًا',
    desc: 'نضع الإنسان في قلب الرعاية، ونحرص على أن يشعر المريض بالاحترام والطمأنينة.',
    icon: 'heart' as const,
    accent: 'blue',
  },
  {
    title: 'الجودة والثقة',
    desc: 'نسعى لتقديم خدمة طبية موثوقة من خلال الكفاءة والتنظيم والاهتمام بالتفاصيل.',
    icon: 'shield' as const,
    accent: 'red',
  },
  {
    title: 'التطور المستمر',
    desc: 'نؤمن بأن الرعاية رحلة مستمرة من التطوير ومواكبة التقنيات الطبية الحديثة.',
    icon: 'spark' as const,
    accent: 'gold',
  },
  {
    title: 'المريض أولًا',
    desc: 'نصمم تجربتنا حول احتياجات المريض، من الوصول للمعلومة وحتى المتابعة.',
    icon: 'users' as const,
    accent: 'blue',
  },
];

const journey = [
  {
    number: '01',
    title: 'تعرّف علينا',
    text: 'اكتشف أقسام المستشفى وخدماته ومجالات الرعاية المتاحة بسهولة.',
  },
  {
    number: '02',
    title: 'اعرف ما يناسبك',
    text: 'انتقل إلى التخصص والقسم والطبيب الأقرب إلى احتياجك الصحي.',
  },
  {
    number: '03',
    title: 'احجز موعدك',
    text: 'ابدأ خطوات الحجز من خلال تجربة رقمية واضحة وميسرة.',
  },
  {
    number: '04',
    title: 'ابدأ الرعاية',
    text: 'نرافقك بتجربة منظمة من لحظة الوصول وحتى ما بعد الزيارة.',
  },
];

export default function AboutPage() {
  return (
    <main
      dir="rtl"
      className="w-full min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-800"
    >
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 md:px-6 lg:px-8 md:py-3">
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3 shrink-0">
            <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 shrink-0">
              <img
                src="/images/logo.png"
                alt="شعار المستشفى الأوربي الحديث"
                className="h-6 w-6 md:h-10 md:w-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div>
              <h1 className="text-sm md:text-lg font-black leading-none text-[#D92541]">
                المستشفى{' '}
                <span className="text-[#0069D9]">الأوربي</span> الحديث
              </h1>

              <div className="mt-1 text-[7px] md:text-[9px] font-bold tracking-[0.15em] md:tracking-[0.2em] text-slate-400">
                MODERN EUROPEAN HOSPITAL
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-4 lg:flex text-sm">
            <Link
              href="/"
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              الرئيسية
            </Link>

            <Link
              href="/about"
              className="relative px-2.5 py-2 font-black text-[#D92541]"
            >
              عن المستشفى
              <span className="absolute bottom-0 right-2.5 left-2.5 h-0.5 rounded-full bg-[#D92541]" />
            </Link>

            <Link
              href="/departments"
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              الأقسام والمراكز
            </Link>

            <Link
              href="/doctors"
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              نخبة الأطباء
            </Link>

            <Link
              href="/services"
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              مركز الصحة الرقمي
            </Link>

            <Link
              href="/contact"
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              تواصل معنا
            </Link>
          </nav>

          <Link
            href="/booking"
            className="shrink-0 rounded-full bg-[#D92541] px-4 md:px-6 py-2 md:py-2.5 text-[11px] md:text-sm font-black text-white shadow-lg shadow-red-900/10 transition hover:bg-[#BF1D35]"
          >
            احجز موعدك
          </Link>
        </div>

        {/* شريط تنقل مخصص للجوال */}
        <div className="lg:hidden border-t border-slate-100 bg-slate-50/50">
          <nav className="flex overflow-x-auto gap-4 px-4 py-3 text-xs md:text-sm font-bold text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link href="/" className="shrink-0 transition hover:text-[#D92541]">الرئيسية</Link>
            <Link href="/about" className="shrink-0 text-[#D92541] border-b border-[#D92541] pb-0.5">عن المستشفى</Link>
            <Link href="/departments" className="shrink-0 transition hover:text-[#D92541]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="shrink-0 transition hover:text-[#D92541]">نخبة الأطباء</Link>
            <Link href="/services" className="shrink-0 transition hover:text-[#D92541]">الخدمات الذكية</Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#0D2B52]">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-[#0069D9] via-[#18529D]/95 to-[#0D2B52]" />
        </div>

        <div className="absolute -left-32 -top-32 h-64 md:h-96 w-64 md:w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-44 right-10 h-64 md:h-96 w-64 md:w-96 rounded-full bg-[#D92541]/20 blur-3xl pointer-events-none" />
        <div className="absolute right-[43%] top-20 h-48 md:h-64 w-48 md:w-64 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-28 lg:px-8">
          <div className="grid items-center gap-8 md:gap-10 lg:grid-cols-[1.15fr_.85fr] text-center md:text-right">
            <div>
              <div className="mb-3 md:mb-6 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/15 bg-white/10 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D4AF37]" />
                تعرّف على المستشفى الأوربي الحديث
              </div>

              <h1 className="mx-auto md:mx-0 max-w-4xl text-3xl md:text-5xl lg:text-6xl font-black leading-[1.2] tracking-tight text-white">
                رعاية صحية
                <br />
                <span className="text-[#D4AF37]">
                  تبدأ بالثقة.
                </span>
              </h1>

              <p className="mx-auto md:mx-0 mt-3 md:mt-7 max-w-2xl text-[11px] md:text-base lg:text-xl leading-relaxed text-blue-100">
                نعمل على تقديم تجربة رعاية صحية تجمع بين الكفاءة الطبية،
                البيئة المريحة، والتجربة التي تضع المريض في مركز الاهتمام.
              </p>

              <div className="mt-6 md:mt-9 flex flex-col sm:flex-row justify-center md:justify-start gap-2.5 md:gap-3">
                <Link
                  href="/departments"
                  className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-white px-5 md:px-7 py-2.5 md:py-3.5 text-[11px] md:text-sm font-black text-[#0069D9] shadow-xl transition hover:bg-slate-100"
                >
                  اكتشف أقسامنا
                  <div className="scale-75 md:scale-100"><Icon name="arrow" size={17} /></div>
                </Link>

                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl border border-white/20 bg-white/10 px-5 md:px-7 py-2.5 md:py-3.5 text-[11px] md:text-sm font-black text-white backdrop-blur-md transition hover:bg-white/15"
                >
                  تعرّف على أطبائنا
                  <div className="scale-75 md:scale-100"><Icon name="users" size={17} /></div>
                </Link>
              </div>
            </div>

            {/* Hero visual card */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-5 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-sm" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/10 p-3 shadow-2xl">
                <div className="relative h-[400px] xl:h-[440px] overflow-hidden rounded-[26px]">
                  <img
                    src="/images/the_building.png"
                    alt="المستشفى الأوربي الحديث"
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B52]/80 via-transparent to-transparent" />

                  <div className="absolute bottom-6 right-6 left-6">
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#D4AF37] text-[#18529D] shrink-0">
                          <Icon name="star" size={20} />
                        </div>

                        <div>
                          <div className="font-black text-white text-sm md:text-base">
                            تجربة رعاية متكاملة
                          </div>

                          <div className="mt-0.5 text-xs text-blue-100">
                            المريض في مركز الرحلة
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-4 md:-mt-7 max-w-6xl px-4">
        {/* GRID: 2 Columns on Mobile, 4 on Desktop */}
        <div className="grid overflow-hidden rounded-[16px] md:rounded-[28px] border border-slate-200 bg-white shadow-xl grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`p-3 md:p-6 text-center md:text-right flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4
                ${index < 2 ? 'border-b border-slate-100 lg:border-b-0' : ''}
                ${index % 2 === 0 ? 'border-l border-slate-100 lg:border-l-0' : ''}
                lg:[&:not(:last-child)]:border-l
              `}
            >
              <div className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg md:rounded-2xl bg-blue-50 text-[#0069D9]">
                <div className="scale-75 md:scale-100 flex items-center justify-center">
                  <Icon name={stat.icon} size={22} />
                </div>
              </div>

              <div>
                <div className="text-sm md:text-2xl font-black text-[#18529D]">
                  {stat.value}
                </div>

                <div className="mt-0.5 md:mt-1 text-[8px] md:text-xs font-bold text-slate-400">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          STORY
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-24 md:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-2 text-center md:text-right">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-2 md:-inset-4 rounded-2xl md:rounded-[38px] bg-blue-50" />

            <div className="relative overflow-hidden rounded-xl md:rounded-[34px] border border-slate-200 bg-white p-2 md:p-3 shadow-xl">
              <img
                src="/images/the_building.png"
                alt="المستشفى الأوربي الحديث"
                className="h-[200px] sm:h-[400px] md:h-[450px] w-full rounded-lg md:rounded-[26px] object-cover"
              />
            </div>

            <div className="absolute -bottom-4 right-4 md:-bottom-7 md:-right-5 max-w-[200px] md:max-w-xs rounded-xl md:rounded-[24px] border border-slate-100 bg-white p-3 md:p-6 shadow-2xl">
              <div className="text-[#D92541] flex justify-center md:justify-start">
                <div className="scale-75 md:scale-100"><Icon name="heart" size={24} /></div>
              </div>

              <p className="mt-1.5 md:mt-3 text-[9px] md:text-sm font-black leading-relaxed text-[#18529D]">
                المريض ليس مجرد ملف طبي؛ بل إنسان يستحق المعرفة
                والاحترام والرعاية.
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="mb-2 md:mb-4 flex items-center justify-center md:justify-start gap-1.5 md:gap-2.5 text-[10px] md:text-sm font-black text-[#D92541]">
              <span className="h-px w-6 md:w-10 bg-[#D92541]" />
              من نحن
            </div>

            <h2 className="text-xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#18529D]">
              أكثر من مستشفى...
              <br />
              <span className="text-[#0069D9]">
                تجربة رعاية متكاملة.
              </span>
            </h2>

            <p className="mx-auto md:mx-0 mt-3 md:mt-7 max-w-lg text-[11px] md:text-base lg:text-lg leading-relaxed text-slate-600">
              المستشفى الأوربي الحديث هو منظومة رعاية نعمل من خلالها
              على جمع التخصصات والخدمات والكفاءات الطبية في تجربة أكثر
              تنظيمًا ووضوحًا للمريض.
            </p>

            <p className="mx-auto md:mx-0 mt-2 md:mt-5 max-w-lg text-[10px] md:text-base leading-relaxed text-slate-500">
              ونرى أن جودة الرعاية لا تبدأ عند دخول العيادة فقط، بل تبدأ
              من لحظة بحث المريض عن المعلومة الصحيحة، واختيار القسم
              المناسب، ومعرفة خطوات الزيارة، ثم الاستمرار في المتابعة.
            </p>

            <div className="mt-5 md:mt-8 grid gap-2 md:gap-3 grid-cols-2">
              {[
                'كفاءة طبية',
                'بيئة مريحة',
                'تجربة أوضح',
                'تطوير مستمر',
              ].map((item) => (
                <div
                  key={item}
                  className="flex flex-col md:flex-row items-center md:items-start gap-1.5 md:gap-3 rounded-xl md:rounded-2xl border border-slate-200 bg-white p-2.5 md:p-4 shadow-sm"
                >
                  <span className="flex h-7 w-7 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-blue-50 text-[#0069D9]">
                    <div className="scale-75 md:scale-100"><Icon name="check" size={16} /></div>
                  </span>

                  <span className="text-[10px] md:text-sm font-black text-[#18529D] text-center md:text-right mt-0.5 md:mt-0">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION
      ====================================================== */}
      <section className="bg-white py-12 md:py-24 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-12 text-center">
            <div className="mb-1.5 md:mb-3 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#D92541]">
              <span className="h-px w-4 md:w-8 bg-[#D92541]" />
              وجهتنا
              <span className="h-px w-4 md:w-8 bg-[#D92541]" />
            </div>

            <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-[#18529D]">
              الرسالة والرؤية
            </h2>

            <p className="mx-auto mt-1.5 md:mt-3 max-w-xl text-[10px] md:text-sm leading-relaxed text-slate-500">
              الأساس الذي نبني عليه تجربة الرعاية في المستشفى.
            </p>
          </div>

          <div className="grid gap-4 md:gap-7 lg:grid-cols-2">
            {/* Mission */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-[34px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 md:p-10 shadow-sm text-center md:text-right">
              <div className="absolute -left-10 -top-10 md:-left-16 md:-top-16 h-32 w-32 md:h-44 md:w-44 rounded-full bg-[#0069D9]/10 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="mx-auto md:mx-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-[#0069D9] text-white shadow-lg">
                  <div className="scale-75 md:scale-100"><Icon name="target" size={22} /></div>
                </div>

                <div className="mt-3 md:mt-7 text-[10px] md:text-sm font-black text-[#D92541]">
                  رسالتنا
                </div>

                <h3 className="mt-1.5 md:mt-2 text-lg md:text-2xl lg:text-3xl font-black text-[#18529D] leading-tight">
                  رعاية آمنة، إنسانية، ومتكاملة
                </h3>

                <p className="mt-2.5 md:mt-5 text-[10px] md:text-base leading-relaxed text-slate-600">
                  تقديم رعاية صحية وتجميلية متكاملة وآمنة، تستند إلى
                  أحدث الممارسات الطبية، وتلبي احتياجات المجتمع بجودة
                  عالية، من خلال كادر طبي متميز وبيئة استشفائية مريحة.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="relative overflow-hidden rounded-2xl md:rounded-[34px] border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 md:p-10 shadow-sm text-center md:text-right">
              <div className="absolute -right-10 -top-10 md:-right-16 md:-top-16 h-32 w-32 md:h-44 md:w-44 rounded-full bg-[#D92541]/10 blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="mx-auto md:mx-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-[#D92541] text-white shadow-lg">
                  <div className="scale-75 md:scale-100"><Icon name="eye" size={22} /></div>
                </div>

                <div className="mt-3 md:mt-7 text-[10px] md:text-sm font-black text-[#D92541]">
                  رؤيتنا
                </div>

                <h3 className="mt-1.5 md:mt-2 text-lg md:text-2xl lg:text-3xl font-black text-[#18529D] leading-tight">
                  وجهة يثق بها المريض
                </h3>

                <p className="mt-2.5 md:mt-5 text-[10px] md:text-base leading-relaxed text-slate-600">
                  أن نكون خيارًا موثوقًا ووجهة طبية رائدة في تقديم
                  الخدمات الطبية والجراحية والتجميلية، وأن نقدم تجربة
                  متكاملة تضع المريض في مركز الاهتمام.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VALUES
      ====================================================== */}
      <section className="bg-[#f8fafc] py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mb-6 md:mb-12 flex flex-col justify-between gap-3 md:gap-4 md:flex-row md:items-end text-center md:text-right">
            <div>
              <div className="mb-1.5 md:mb-3 flex items-center justify-center md:justify-start gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#D92541]">
                <span className="h-px w-4 md:w-8 bg-[#D92541]" />
                ما نؤمن به
              </div>

              <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-[#18529D]">
                قيم تتحول إلى تجربة
              </h2>
            </div>

            <p className="mx-auto md:mx-0 max-w-md text-[10px] md:text-sm leading-relaxed text-slate-500">
              ليست القيم كلمات نضعها على الجدران؛ بل مبادئ يجب أن تظهر
              في تعاملنا وتنظيمنا وخدمتنا للمريض.
            </p>
          </div>

          {/* GRID: 2 Columns on Mobile, 4 on Desktop */}
          <div className="grid gap-3 md:gap-6 grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const accentClasses = {
                blue: {
                  icon: 'bg-blue-50 text-[#0069D9]',
                  line: 'bg-[#0069D9]',
                },
                red: {
                  icon: 'bg-red-50 text-[#D92541]',
                  line: 'bg-[#D92541]',
                },
                gold: {
                  icon: 'bg-[#D4AF37]/10 text-[#92701a]',
                  line: 'bg-[#D4AF37]',
                },
              };

              const accent =
                accentClasses[
                  value.accent as keyof typeof accentClasses
                ];

              return (
                <article
                  key={value.title}
                  className="group relative overflow-hidden flex flex-col items-center md:items-start text-center md:text-right rounded-xl md:rounded-[28px] border border-slate-200 bg-white p-4 md:p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 shadow-sm"
                >
                  <div
                    className={`absolute right-0 top-0 h-1 w-full ${accent.line}`}
                  />

                  <div
                    className={`flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg md:rounded-2xl ${accent.icon} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <div className="scale-75 md:scale-100 flex items-center justify-center">
                      <Icon name={value.icon} size={22} />
                    </div>
                  </div>

                  <h3 className="mt-3 md:mt-6 text-[12px] md:text-xl font-black text-[#18529D]">
                    {value.title}
                  </h3>

                  <p className="mt-1.5 md:mt-3 text-[9px] md:text-sm leading-relaxed text-slate-500">
                    {value.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PATIENT JOURNEY
      ===================================================== */}
      <section className="bg-white py-12 md:py-24 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-[.75fr_1.25fr] text-center md:text-right">
            <div>
              <div className="mb-2 md:mb-4 flex items-center justify-center md:justify-start gap-1.5 md:gap-2.5 text-[10px] md:text-sm font-black text-[#D92541]">
                <span className="h-px w-4 md:w-10 bg-[#D92541]" />
                تجربة المريض
              </div>

              <h2 className="text-xl md:text-4xl lg:text-5xl font-black leading-tight text-[#18529D]">
                لأن الرعاية ليست
                <br className="hidden md:block"/>
                لحظة واحدة.
              </h2>

              <p className="mx-auto md:mx-0 mt-2.5 md:mt-6 max-w-sm md:max-w-none text-[10px] md:text-base leading-relaxed text-slate-500">
                صممنا تجربة المستشفى بحيث تكون رحلة مترابطة تبدأ
                بالمعلومة، ثم اختيار القسم والطبيب، ثم الحجز والوصول
                والرعاية والمتابعة.
              </p>

              <Link
                href="/services"
                className="mt-4 md:mt-8 inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#0069D9] transition hover:text-[#D92541]"
              >
                اكتشف البوابة الصحية
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={16} /></div>
              </Link>
            </div>

            <div className="relative">
              <div className="absolute bottom-6 right-5 md:right-8 top-6 md:top-10 w-px bg-gradient-to-b from-[#0069D9] via-[#D4AF37] to-[#D92541] md:right-10 hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-5">
                {journey.map((step) => (
                  <div
                    key={step.number}
                    className="relative flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-5 rounded-xl md:rounded-[26px] border border-slate-200 bg-slate-50 p-3.5 md:p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg shadow-sm"
                  >
                    <div className="relative z-10 flex h-8 w-8 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg md:rounded-2xl bg-[#18529D] text-[10px] md:text-sm font-black text-[#D4AF37] shadow-lg ring-4 md:ring-8 ring-white">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="text-[12px] md:text-lg font-black text-[#18529D]">
                        {step.title}
                      </h3>

                      <p className="mt-1 md:mt-2 text-[9px] md:text-sm leading-relaxed text-slate-500">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DIFFERENTIATOR
      ===================================================== */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-24 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[38px] bg-gradient-to-l from-[#0D2B52] via-[#18529D] to-[#0069D9] px-5 py-8 md:px-14 md:py-16 text-white text-center md:text-right">
          <div className="absolute -left-10 -top-10 h-32 md:h-72 w-32 md:w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 right-5 h-40 md:h-80 w-40 md:w-80 rounded-full bg-[#D92541]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid gap-6 md:gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-center">
            <div>
              <div className="mb-1.5 md:mb-3 text-[10px] md:text-sm font-black text-[#D4AF37]">
                لماذا المستشفى الأوربي الحديث؟
              </div>

              <h2 className="text-xl md:text-4xl lg:text-5xl font-black leading-tight">
                نريد أن تكون تجربة
                <br />
                <span className="text-[#D4AF37]">
                  المريض نفسها جزءًا من العلاج.
                </span>
              </h2>

              <p className="mx-auto md:mx-0 mt-2.5 md:mt-5 max-w-2xl text-[10px] md:text-sm lg:text-base leading-relaxed text-blue-100">
                من وضوح المعلومات إلى سهولة الوصول للخدمة، نبني تجربة
                رقمية تساعد المريض على فهم خياراته والوصول إلى الرعاية
                المناسبة بصورة أكثر وضوحًا.
              </p>
            </div>

            <div className="grid gap-2 md:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: 'medical' as const,
                  title: 'رعاية متخصصة',
                },
                {
                  icon: 'shield' as const,
                  title: 'ثقة وخصوصية',
                },
                {
                  icon: 'spark' as const,
                  title: 'تجربة حديثة',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-2 md:gap-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/10 p-2.5 md:p-4 backdrop-blur-md"
                >
                  <div className="flex h-8 w-8 md:h-11 md:w-11 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-[#D4AF37] shrink-0">
                    <div className="scale-75 md:scale-100"><Icon name={item.icon} size={19} /></div>
                  </div>

                  <div className="font-black text-[9px] md:text-base md:mt-2.5">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:py-14 md:px-6 lg:px-8 text-center md:text-right">
          <div className="flex flex-col justify-between gap-4 md:gap-7 md:flex-row md:items-center">
            <div>
              <div className="mb-1 md:mb-2 text-[10px] md:text-sm font-black text-[#D92541]">
                خطوتك التالية
              </div>

              <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-[#18529D] leading-tight">
                اكتشف القسم والطبيب والخدمة المناسبة لك.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center">
              <Link
                href="/departments"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl border border-slate-200 bg-white px-4 md:px-6 py-2.5 md:py-3.5 text-[11px] md:text-sm font-black text-[#0069D9] transition hover:border-blue-200 hover:bg-blue-50"
              >
                الأقسام والمراكز
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={16} /></div>
              </Link>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#D92541] px-5 md:px-7 py-2.5 md:py-3.5 text-[11px] md:text-sm font-black text-white shadow-lg transition hover:bg-[#BF1D35]"
              >
                احجز موعدك الآن
                <div className="scale-75 md:scale-100"><Icon name="arrow" size={16} /></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <footer className="bg-[#0D2B52] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:gap-4 px-4 py-6 md:py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <img
              src="/images/logo.png"
              alt="المستشفى الأوربي الحديث"
              className="h-8 w-8 md:h-11 md:w-11 object-contain shrink-0"
            />

            <div>
              <div className="font-black text-[13px] md:text-base">
                المستشفى الأوربي الحديث
              </div>

              <div className="mt-0.5 text-[9px] md:text-xs text-slate-400">
                الرعاية تبدأ بالثقة
              </div>
            </div>
          </div>

          <div className="text-[9px] md:text-xs text-slate-500 border-t border-slate-800 md:border-none pt-3 md:pt-0 mt-1 md:mt-0 text-center md:text-right">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </main>
  );
}