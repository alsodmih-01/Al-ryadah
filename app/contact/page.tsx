'use client';

import Link from 'next/link';
import { useState } from 'react';

type FormData = {
  name: string;
  phone: string;
  subject: string;
  message: string;
};

function Icon({
  name,
  size = 24,
}: {
  name:
    | 'phone'
    | 'location'
    | 'facebook'
    | 'clock'
    | 'message'
    | 'arrow'
    | 'shield'
    | 'calendar'
    | 'emergency'
    | 'mail'
    | 'check'
    | 'spark'
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
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.8 2.8a2 2 0 0 1-.5 2.1L9 10.9a16 16 0 0 0 4.1 4.1l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.7 2.8.8A2 2 0 0 1 22 16.9Z" />
        </svg>
      );

    case 'location':
      return (
        <svg {...common}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case 'facebook':
      return (
        <svg {...common}>
          <path d="M14 8h2V4.5a21 21 0 0 0-3-.2c-3 0-5 1.8-5 5v3H5v4h3v7h4v-7h3.5l.5-4H12V9.8c0-1.2.4-1.8 2-1.8Z" />
        </svg>
      );

    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case 'message':
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.5 8.5 0 0 1-4-.9L4 20l1.9-3.3A7.2 7.2 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        </svg>
      );

    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="3" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    case 'emergency':
      return (
        <svg {...common}>
          <path d="M12 3 21 20H3L12 3Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );

    case 'mail':
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );

    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case 'spark':
      return (
        <svg {...common}>
          <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
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

const contactCards = [
  {
    title: 'اتصل بنا',
    subtitle: 'للاستفسارات والتواصل',
    value: '774778805',
    href: 'tel:774778805',
    icon: 'phone' as const,
    tone: 'blue',
  },
  {
    title: 'موقع المستشفى',
    subtitle: 'العاصمة - شارع الستين الغربي',
    value: 'عرض تفاصيل الموقع',
    href: '#location',
    icon: 'location' as const,
    tone: 'red',
  },
  {
    title: 'صفحتنا الرسمية',
    subtitle: 'آخر الأخبار والتحديثات',
    value: 'فيسبوك',
    href: 'https://www.facebook.com/share/1Et8EPFxhC/',
    icon: 'facebook' as const,
    tone: 'blue',
  },
];

const quickActions = [
  {
    title: 'احجز موعدك',
    text: 'انتقل مباشرة إلى بوابة الحجز.',
    href: '/booking',
    icon: 'calendar' as const,
    tone: 'red',
  },
  {
    title: 'تحدث معنا',
    text: 'أرسل استفسارًا أو ملاحظة.',
    href: '#contact-form',
    icon: 'message' as const,
    tone: 'blue',
  },
  {
    title: 'حالات الطوارئ',
    text: 'للحالات العاجلة استخدم المسار المخصص.',
    href: '#emergency',
    icon: 'emergency' as const,
    tone: 'red',
  },
];

const subjects = [
  'استفسار عام',
  'استفسار عن موعد',
  'استفسار عن قسم',
  'استفسار عن طبيب',
  'اقتراح',
  'شكوى',
  'أخرى',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <main
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-800"
    >
      {/* =====================================================
          HEADER
      ====================================================== */}
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
              className="px-2.5 py-2 font-bold text-slate-600 transition hover:text-[#D92541]"
            >
              عن المستشفى
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
              className="relative px-2.5 py-2 font-black text-[#D92541]"
            >
              تواصل معنا
              <span className="absolute bottom-0 right-2.5 left-2.5 h-0.5 rounded-full bg-[#D92541]" />
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
            <Link href="/about" className="shrink-0 transition hover:text-[#D92541]">عن المستشفى</Link>
            <Link href="/departments" className="shrink-0 transition hover:text-[#D92541]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="shrink-0 transition hover:text-[#D92541]">نخبة الأطباء</Link>
            <Link href="/contact" className="shrink-0 text-[#D92541] border-b border-[#D92541] pb-0.5">تواصل معنا</Link>
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#0D2B52]">
        <div className="absolute inset-0">
          <img
            src="/images/hospital-bg.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.12]"
          />

          <div className="absolute inset-0 bg-gradient-to-l from-[#0069D9] via-[#18529D]/95 to-[#0D2B52]" />
        </div>

        <div className="absolute -left-28 -top-28 h-64 md:h-96 w-64 md:w-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 right-10 h-64 md:h-96 w-64 md:w-96 rounded-full bg-[#D92541]/20 blur-3xl pointer-events-none" />
        <div className="absolute right-[45%] top-16 h-48 md:h-60 w-48 md:h-60 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-28 lg:px-8">
          <div className="max-w-4xl text-center md:text-right">
            <div className="mb-3 md:mb-6 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/15 bg-white/10 px-3 md:px-4 py-1.5 md:py-2 text-[10px] md:text-sm font-bold text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D4AF37]" />
              نحن هنا لخدمتكم
            </div>

            <h1 className="max-w-4xl text-3xl md:text-5xl lg:text-6xl font-black leading-[1.15] tracking-tight text-white">
              تواصل معنا
              <br />
              <span className="text-[#D4AF37]">
                عندما تحتاج إلينا.
              </span>
            </h1>

            <p className="mx-auto md:mx-0 mt-3 md:mt-6 max-w-2xl text-[11px] md:text-base leading-relaxed md:leading-8 text-blue-100">
              للاستفسارات والملاحظات والحجز والمعلومات العامة،
              اختر المسار المناسب وسنساعدك على الوصول إلى الجهة
              المناسبة داخل المستشفى.
            </p>

            <div className="mt-6 md:mt-9 flex flex-col sm:flex-row justify-center md:justify-start gap-2.5 md:gap-3">
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-white px-5 md:px-7 py-3 md:py-4 text-[11px] md:text-sm font-black text-[#0069D9] shadow-xl transition hover:bg-slate-100"
              >
                أرسل رسالتك
                <div className="scale-75 md:scale-100"><Icon name="message" size={18} /></div>
              </a>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#D92541] px-5 md:px-7 py-3 md:py-4 text-[11px] md:text-sm font-black text-white shadow-xl transition hover:bg-[#BF1D35]"
              >
                احجز موعدك
                <div className="scale-75 md:scale-100"><Icon name="calendar" size={18} /></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          QUICK CONTACT CARDS
      ====================================================== */}
      <section className="relative z-20 mx-auto -mt-4 md:-mt-8 max-w-6xl px-4">
        {/* GRID: 2 Columns on Mobile, 3 on Desktop */}
        <div className="grid overflow-hidden rounded-[16px] md:rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] grid-cols-1 sm:grid-cols-3">
          {contactCards.map((item, index) => {
            const iconStyle =
              item.tone === 'red'
                ? 'bg-red-50 text-[#D92541]'
                : 'bg-blue-50 text-[#0069D9]';

            return (
              <a
                key={item.title}
                href={item.href}
                target={
                  item.href.startsWith('http') ? '_blank' : undefined
                }
                rel={
                  item.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                className={`group p-4 md:p-6 transition hover:bg-slate-50 text-center sm:text-right flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 ${
                  index !== contactCards.length - 1
                    ? 'border-b sm:border-b-0 sm:border-l border-slate-100'
                    : ''
                }`}
              >
                <div
                  className={`flex h-10 w-10 md:h-13 md:w-13 shrink-0 items-center justify-center rounded-xl md:rounded-2xl ${iconStyle}`}
                >
                  <div className="scale-75 md:scale-100 flex items-center justify-center">
                    <Icon name={item.icon} size={23} />
                  </div>
                </div>

                <div className="min-w-0">
                  <h2 className="font-black text-xs md:text-base text-[#18529D]">
                    {item.title}
                  </h2>

                  <p className="mt-0.5 md:mt-1 text-[9px] md:text-xs leading-relaxed text-slate-400">
                    {item.subtitle}
                  </p>

                  <div
                    className={`mt-1 text-[11px] md:text-sm font-black ${
                      item.tone === 'red'
                        ? 'text-[#D92541]'
                        : 'text-[#0069D9]'
                    }`}
                  >
                    {item.value}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* =====================================================
            QUICK ACTIONS
        ====================================================== */}
        <section className="py-12 md:py-24">
          <div className="mb-6 md:mb-10 text-center">
            <div className="mb-2 md:mb-3 flex items-center justify-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#D92541]">
              <span className="h-px w-4 md:w-8 bg-[#D92541]" />
              اختر مسارك
              <span className="h-px w-4 md:w-8 bg-[#D92541]" />
            </div>

            <h2 className="text-xl md:text-3xl font-black text-[#18529D] md:text-4xl">
              ماذا تريد أن تفعل؟
            </h2>

            <p className="mx-auto mt-2 md:mt-3 max-w-2xl text-[10px] md:text-sm leading-relaxed text-slate-500 md:text-base">
              الوصول إلى الخدمة المناسبة يجب أن يكون واضحًا وسريعًا.
            </p>
          </div>

          {/* GRID: 2 Columns on Mobile, 3 on Desktop */}
          <div className="grid gap-3 md:gap-5 grid-cols-2 md:grid-cols-3">
            {quickActions.map((item) => {
              const iconClass =
                item.tone === 'red'
                  ? 'bg-red-50 text-[#D92541] group-hover:bg-[#D92541] group-hover:text-white'
                  : 'bg-blue-50 text-[#0069D9] group-hover:bg-[#0069D9] group-hover:text-white';

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col items-center md:items-start text-center md:text-right rounded-xl md:rounded-[28px] border border-slate-200 bg-white p-4 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="flex w-full items-start justify-center md:justify-between">
                    <div
                      className={`flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-xl md:rounded-2xl transition ${iconClass}`}
                    >
                      <div className="scale-75 md:scale-100 flex items-center justify-center">
                        <Icon name={item.icon} size={25} />
                      </div>
                    </div>

                    <span className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-[#0069D9] transition group-hover:bg-blue-50">
                      <Icon name="arrow" size={16} />
                    </span>
                  </div>

                  <h3 className="mt-3 md:mt-6 text-[12px] md:text-xl font-black text-[#18529D]">
                    {item.title}
                  </h3>

                  <p className="mt-1 md:mt-2 text-[9px] md:text-xs leading-relaxed text-slate-500">
                    {item.text}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* =====================================================
            CONTACT + FORM
        ====================================================== */}
        <section
          id="contact-form"
          className="scroll-mt-28 pb-12 md:pb-24"
        >
          <div className="grid gap-6 md:gap-8 lg:grid-cols-[.75fr_1.25fr]">
            {/* Contact information */}
            <div className="space-y-4 md:space-y-6">
              <div className="relative overflow-hidden rounded-2xl md:rounded-[34px] bg-[#0D2B52] p-5 md:p-8 text-white text-center md:text-right">
                <div className="absolute -left-20 -top-20 h-40 w-40 md:h-56 md:w-56 rounded-full bg-[#0069D9]/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 right-0 h-40 w-40 md:h-60 md:w-60 rounded-full bg-[#D92541]/20 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <span className="text-[10px] md:text-xs font-black text-[#D4AF37]">
                    Contact Gateway
                  </span>

                  <h2 className="mt-1.5 md:mt-2 text-2xl md:text-3xl font-black">
                    نحن قريبون منك.
                  </h2>

                  <p className="mt-2.5 md:mt-4 text-[10px] md:text-sm leading-relaxed md:leading-8 text-blue-100">
                    استخدم بيانات التواصل التالية للاستفسارات العامة
                    والتواصل مع المستشفى.
                  </p>

                  <div className="mt-5 md:mt-8 space-y-3 md:space-y-5">
                    <a
                      href="tel:774778805"
                      className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3.5 md:p-4 transition hover:bg-white/10"
                    >
                      <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-[#D4AF37]">
                        <div className="scale-75 md:scale-100 flex items-center justify-center">
                          <Icon name="phone" size={20} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] md:text-xs text-blue-200">
                          الهاتف
                        </div>

                        <div
                          dir="ltr"
                          className="mt-0.5 md:mt-1 text-sm md:text-lg font-black text-center md:text-right"
                        >
                          774778805
                        </div>
                      </div>
                    </a>

                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3.5 md:p-4">
                      <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-[#D4AF37]">
                        <div className="scale-75 md:scale-100 flex items-center justify-center">
                          <Icon name="location" size={20} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] md:text-xs text-blue-200">
                          العنوان
                        </div>

                        <div className="mt-0.5 md:mt-1 text-[11px] md:text-base font-black">
                          العاصمة - شارع الستين الغربي
                        </div>
                      </div>
                    </div>

                    <a
                      href="https://www.facebook.com/share/1Et8EPFxhC/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3.5 md:p-4 transition hover:bg-white/10"
                    >
                      <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-[#D4AF37]">
                        <div className="scale-75 md:scale-100 flex items-center justify-center">
                          <Icon name="facebook" size={20} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] md:text-xs text-blue-200">
                          المنصة الرسمية
                        </div>

                        <div className="mt-0.5 md:mt-1 text-[11px] md:text-base font-black">
                          Facebook
                        </div>
                      </div>
                    </a>

                    <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-white/10 bg-white/5 p-3.5 md:p-4">
                      <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-[#D4AF37]">
                        <div className="scale-75 md:scale-100 flex items-center justify-center">
                          <Icon name="clock" size={20} />
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] md:text-xs text-blue-200">
                          ساعات الخدمة
                        </div>

                        <div className="mt-0.5 md:mt-1 text-[11px] md:text-base font-black">
                          الطوارئ والعيادات: 24/7
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust card */}
              <div className="rounded-xl md:rounded-[30px] border border-blue-100 bg-blue-50/60 p-4 md:p-6 text-center md:text-right">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4">
                  <div className="flex h-10 w-10 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#0069D9] shadow-sm">
                    <div className="scale-75 md:scale-100 flex items-center justify-center">
                      <Icon name="shield" size={20} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black text-xs md:text-sm text-[#18529D]">
                      تنبيه مهم للخصوصية
                    </h3>

                    <p className="mt-1 md:mt-2 text-[9px] md:text-xs leading-relaxed text-slate-600">
                      تجنب إرسال معلومات طبية حساسة أو ملفات تحتوي على
                      بيانات صحية خاصة عبر نموذج التواصل العام.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-2xl md:rounded-[34px] border border-slate-200 bg-white p-5 md:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.07)] text-center md:text-right">
              {!submitted ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div className="border-b border-slate-100 pb-4 md:pb-6">
                    <span className="text-[10px] md:text-xs font-black text-[#D92541]">
                      CONTACT FORM
                    </span>

                    <h2 className="mt-1.5 md:mt-2 text-xl md:text-3xl font-black text-[#18529D]">
                      كيف يمكننا مساعدتك؟
                    </h2>

                    <p className="mt-1.5 md:mt-2 text-[10px] md:text-sm leading-relaxed text-slate-500">
                      أرسل لنا استفسارك أو ملاحظتك وسنستخدم هذه المعلومات
                      لمعالجة طلب التواصل.
                    </p>
                  </div>

                  <div className="grid gap-4 md:gap-6 md:grid-cols-2 text-right">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 md:mb-2 block text-xs md:text-sm font-black text-slate-700"
                      >
                        الاسم الكريم
                      </label>

                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: e.target.value,
                          })
                        }
                        placeholder="اسمك الكامل"
                        className="w-full rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 md:px-4 md:py-4 text-xs md:text-sm font-bold outline-none transition focus:border-[#0069D9] focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="mb-1.5 md:mb-2 block text-xs md:text-sm font-black text-slate-700"
                      >
                        رقم الجوال
                      </label>

                      <input
                        id="phone"
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            phone: e.target.value,
                          })
                        }
                        placeholder="77X XXX XXX"
                        className="w-full rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 md:px-4 md:py-4 text-left text-xs md:text-sm font-bold outline-none transition focus:border-[#0069D9] focus:bg-white focus:ring-4 focus:ring-blue-50"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <label
                      htmlFor="subject"
                      className="mb-1.5 md:mb-2 block text-xs md:text-sm font-black text-slate-700"
                    >
                      نوع الرسالة
                    </label>

                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subject: e.target.value,
                        })
                      }
                      className="w-full rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 md:px-4 md:py-4 text-xs md:text-sm font-bold text-slate-700 outline-none focus:border-[#0069D9] focus:bg-white focus:ring-4 focus:ring-blue-50"
                    >
                      <option value="">
                        اختر نوع الرسالة
                      </option>

                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="text-right">
                    <label
                      htmlFor="message"
                      className="mb-1.5 md:mb-2 block text-xs md:text-sm font-black text-slate-700"
                    >
                      الرسالة
                    </label>

                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      placeholder="اكتب استفسارك أو ملاحظتك هنا..."
                      className="w-full resize-none rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 md:px-4 md:py-4 text-xs md:text-sm leading-relaxed outline-none transition focus:border-[#0069D9] focus:bg-white focus:ring-4 focus:ring-blue-50"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 md:gap-3 rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 p-3 md:p-4 text-[9px] md:text-xs leading-relaxed text-slate-500 text-right">
                    <span className="mt-0.5 shrink-0 text-[#0069D9]">
                      <div className="scale-75 md:scale-100"><Icon name="shield" size={17} /></div>
                    </span>

                    <p>
                      لا تستخدم نموذج التواصل لإرسال معلومات طبية
                      حساسة أو طلبات طوارئ.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#D92541] py-3 md:py-4 text-xs md:text-sm font-black text-white shadow-lg shadow-red-900/10 transition hover:-translate-y-0.5 hover:bg-[#BF1D35]"
                  >
                    إرسال الرسالة
                    <div className="scale-75 md:scale-100"><Icon name="mail" size={18} /></div>
                  </button>
                </form>
              ) : (
                <div className="flex min-h-[400px] md:min-h-[560px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl md:rounded-[26px] bg-emerald-50 text-emerald-600 shadow-inner">
                    <Icon name="check" size={36} />
                  </div>

                  <span className="mt-5 md:mt-7 text-[10px] md:text-xs font-black text-emerald-600">
                    MESSAGE RECEIVED
                  </span>

                  <h2 className="mt-1.5 md:mt-2 text-2xl md:text-3xl font-black text-[#18529D]">
                    تم استلام رسالتك
                  </h2>

                  <p className="mx-auto mt-2 md:mt-4 max-w-md text-[10px] md:text-sm leading-relaxed md:leading-8 text-slate-500">
                    شكرًا لتواصلك مع المستشفى الأوربي الحديث. سيتم الرد عليك في أقرب وقت ممكن.
                  </p>

                  <div className="mt-6 md:mt-8 grid w-full max-w-md gap-2.5 md:gap-3 grid-cols-1 sm:grid-cols-2">
                    <Link
                      href="/booking"
                      className="rounded-xl md:rounded-2xl bg-[#0069D9] px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-black text-white"
                    >
                      احجز موعدًا
                    </Link>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-xl md:rounded-2xl border border-slate-200 bg-white px-4 py-3 md:px-5 md:py-4 text-xs md:text-sm font-black text-[#18529D]"
                    >
                      رسالة جديدة
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* =====================================================
            LOCATION
        ====================================================== */}
        <section id="location" className="scroll-mt-28 pb-12 md:pb-24">
          <div className="grid gap-6 md:gap-7 lg:grid-cols-[1fr_.8fr]">
            <div className="relative min-h-[300px] md:min-h-[360px] overflow-hidden rounded-2xl md:rounded-[36px] bg-[#18529D]">
              <img
                src="/images/the_building.png"
                alt="المستشفى الأوربي الحديث"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />

              <div className="absolute inset-0 bg-gradient-to-l from-[#0D2B52]/80 to-[#0069D9]/40" />

              <div className="relative z-10 flex h-full min-h-[300px] md:min-h-[360px] flex-col justify-end p-5 md:p-9 text-white text-center md:text-right">
                <span className="text-[10px] md:text-xs font-black text-[#D4AF37]">
                  OUR LOCATION
                </span>

                <h2 className="mt-1 md:mt-2 text-2xl md:text-3xl font-black">
                  أين تجدنا؟
                </h2>

                <p className="mt-1.5 md:mt-3 text-[11px] md:text-sm leading-relaxed text-blue-100">
                  العاصمة - شارع الستين الغربي
                </p>

                <div className="mt-4 md:mt-6 flex flex-wrap justify-center md:justify-start gap-2.5 md:gap-3">
                  <a
                    href="tel:774778805"
                    className="inline-flex items-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-white px-4 py-2.5 md:px-5 md:py-3 text-[11px] md:text-sm font-black text-[#0069D9]"
                  >
                    <div className="scale-75 md:scale-100"><Icon name="phone" size={17} /></div>
                    اتصل بنا
                  </a>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 md:px-5 md:py-3 text-[11px] md:text-sm font-black text-white backdrop-blur-md"
                  >
                    العودة للرئيسية
                    <div className="scale-75 md:scale-100"><Icon name="arrow" size={17} /></div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl md:rounded-[36px] border border-slate-200 bg-white p-5 md:p-9 shadow-[0_15px_50px_rgba(15,23,42,0.05)] text-center md:text-right">
              <div className="mx-auto md:mx-0 flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-xl md:rounded-2xl bg-blue-50 text-[#0069D9]">
                <div className="scale-75 md:scale-100 flex items-center justify-center">
                  <Icon name="building" size={25} />
                </div>
              </div>

              <h2 className="mt-4 md:mt-6 text-xl md:text-2xl font-black text-[#18529D]">
                قبل وصولك
              </h2>

              <div className="mt-4 md:mt-6 space-y-2.5 md:space-y-4">
                {[
                  'تأكد من معرفة القسم أو الطبيب الذي تريد زيارته.',
                  'احتفظ بتفاصيل الموعد عند الحجز.',
                  'أحضر المستندات أو التقارير المطلوبة عند الحاجة.',
                  'للحالات العاجلة استخدم مسار الطوارئ مباشرة.',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-2.5 md:gap-3 rounded-xl md:rounded-2xl bg-slate-50 p-3 md:p-4"
                  >
                    <span className="mt-0.5 text-[#0069D9]">
                      <div className="scale-75 md:scale-100"><Icon name="check" size={17} /></div>
                    </span>

                    <p className="text-[10px] md:text-sm leading-relaxed md:leading-7 text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* =====================================================
          EMERGENCY CTA
      ====================================================== */}
      <section id="emergency" className="scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 pb-12 md:pb-24 md:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl md:rounded-[38px] bg-gradient-to-l from-[#7d0d22] via-[#D92541] to-[#a51430] px-5 py-8 md:px-14 md:py-14 text-white shadow-2xl text-center md:text-right">
            <div className="absolute -left-10 -top-10 md:-left-20 md:-top-20 h-40 md:h-64 w-40 md:w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between gap-6 md:gap-7 md:flex-row md:items-center">
              <div>
                <div className="flex items-center justify-center md:justify-start gap-1.5 md:gap-2 text-xs md:text-sm font-black text-red-100">
                  <div className="scale-75 md:scale-100"><Icon name="emergency" size={18} /></div>
                  الحالات العاجلة
                </div>

                <h2 className="mt-2 md:mt-3 text-xl md:text-4xl font-black">
                  لا تنتظر نموذج التواصل في حالة الطوارئ.
                </h2>

                <p className="mx-auto md:mx-0 mt-2 md:mt-3 max-w-2xl text-[10px] md:text-base leading-relaxed md:leading-7 text-red-100">
                  إذا كانت الحالة تحتاج إلى تقييم طبي عاجل، استخدم
                  خدمات الطوارئ المتاحة بدل إرسال رسالة وانتظار الرد.
                </p>
              </div>

              <a
                href="tel:774778805"
                className="inline-flex shrink-0 mx-auto md:mx-0 items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-white px-6 py-3 md:px-7 md:py-4 text-[11px] md:text-sm font-black text-[#D92541] shadow-xl"
              >
                <div className="scale-75 md:scale-100"><Icon name="phone" size={18} /></div>
                اتصل الآن
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-[#0D2B52] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:gap-6 px-4 py-6 md:py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center justify-center md:justify-start gap-2.5 md:gap-3">
            <img
              src="/images/logo.png"
              alt="المستشفى الأوربي الحديث"
              className="h-8 w-8 md:h-11 md:w-11 object-contain"
            />

            <div>
              <div className="font-black text-[13px] md:text-base">
                المستشفى الأوربي الحديث
              </div>

              <div className="mt-0.5 text-[9px] md:text-xs text-slate-500">
                الرعاية تبدأ بالتواصل والثقة
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-end gap-1.5 md:gap-2 text-[9px] md:text-xs text-slate-500 border-t border-slate-800 md:border-none pt-3 md:pt-0 mt-1 md:mt-0">
            <div className="scale-75 md:scale-100"><Icon name="shield" size={15} /></div>
            معلومات التواصل الرسمية للمستشفى
          </div>
        </div>
      </footer>
    </main>
  );
}