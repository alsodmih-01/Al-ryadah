import { client } from '@/lib/sanity';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

type Doctor = {
  _id: string;
  name: string;
  specialty?: string;
  department?: string;
  image?: any;
  days?: string;
  time?: string;
  isCosmetic?: boolean;
};

async function getDoctors(search?: string, department?: string) {
  const query = `*[
    _type == "doctor"
    && (!defined($search) || $search == null || name match $search)
    && (!defined($department) || $department == null || department == $department)
  ] | order(name asc) {
    _id,
    name,
    specialty,
    department,
    image,
    days,
    time,
    isCosmetic
  }`;

  return client.fetch<Doctor[]>(
    query,
    {
      search: search ? `*${search}*` : null,
      department: department ? department : null,
    },
    {
      next: {
        revalidate: 60,
      },
    }
  );
}

async function getDepartments() {
  const query = `array::unique(
    *[_type == "doctor" && defined(department)].department
  )`;

  return client.fetch<string[]>(
    query,
    {},
    {
      next: {
        revalidate: 300,
      },
    }
  );
}

function Icon({
  name,
  size = 22,
}: {
  name:
    | 'search'
    | 'calendar'
    | 'clock'
    | 'chevron'
    | 'medical'
    | 'users'
    | 'award'
    | 'shield'
    | 'arrow'
    | 'filter';
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

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    );
  }

  if (name === 'calendar') {
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    );
  }

  if (name === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === 'chevron') {
    return (
      <svg {...common}>
        <path d="m9 6 6 6-6 6" />
      </svg>
    );
  }

  if (name === 'medical') {
    return (
      <svg {...common}>
        <path d="M12 21s7-4.5 7-10V5l-7-3-7 3v6c0 5.5 7 10 7 10Z" />
        <path d="M12 7v6M9 10h6" />
      </svg>
    );
  }

  if (name === 'users') {
    return (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }

  if (name === 'award') {
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.5 7 22l5-3 5 3-1.5-9.5" />
      </svg>
    );
  }

  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }

  if (name === 'filter') {
    return (
      <svg {...common}>
        <path d="M4 6h16M7 12h10M10 18h4" />
      </svg>
    );
  }

  if (name === 'arrow') {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  return null;
}

function InitialAvatar({ name }: { name: string }) {
  const firstLetter = name?.trim()?.charAt(0) || 'ط';

  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0069D9] to-[#18529D]">
      <span className="text-4xl md:text-6xl font-black text-white/95">
        {firstLetter}
      </span>
    </div>
  );
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  const bookingUrl =
    `/booking?doctor=${encodeURIComponent(
      doctor.name
    )}&department=${encodeURIComponent(doctor.department || '')}`;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl md:rounded-[30px] border bg-white shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,105,217,0.14)] ${
        doctor.isCosmetic
          ? 'border-[#D4AF37]/35'
          : 'border-slate-200 hover:border-blue-100'
      }`}
    >
      {/* Image */}
      <div className="relative h-[160px] md:h-[290px] overflow-hidden bg-slate-100 shrink-0">
        <div
          className={`absolute inset-0 ${
            doctor.isCosmetic
              ? 'bg-gradient-to-t from-[#0D2B52] via-transparent to-transparent'
              : 'bg-gradient-to-t from-[#18529D]/90 via-transparent to-transparent'
          } z-10`}
        />

        {doctor.image ? (
          <img
            src={urlFor(doctor.image)
              .width(700)
              .height(700)
              .fit('crop')
              .url()}
            alt={doctor.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <InitialAvatar name={doctor.name} />
        )}

        {/* Status */}
        <div className="absolute right-2 top-2 md:right-5 md:top-5 z-20 flex items-center gap-1 md:gap-2 rounded-full border border-white/20 bg-black/20 px-2 py-1 md:px-3 md:py-2 text-[8px] md:text-xs font-bold text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-400" />
          عيادة نشطة
        </div>

        {/* Cosmetic badge */}
        {doctor.isCosmetic && (
          <div className="absolute left-2 top-2 md:left-5 md:top-5 z-20 rounded-full bg-[#D4AF37] px-2 py-1 md:px-3 md:py-1.5 text-[8px] md:text-xs font-black text-[#0D2B52] shadow-lg">
            مركز تجميل
          </div>
        )}

        {/* Doctor name over image */}
        <div className="absolute bottom-2.5 right-2.5 left-2.5 md:bottom-5 md:right-5 md:left-5 z-20">
          <p className="mb-0.5 md:mb-1 text-[9px] md:text-sm font-medium text-white/80 line-clamp-1">
            {doctor.department || 'القسم الطبي'}
          </p>

          <h2 className="text-[13px] md:text-2xl font-black tracking-tight text-white line-clamp-1">
            {doctor.name}
          </h2>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-3 md:p-6">
        <div className="min-h-[45px] md:min-h-[82px]">
          <span
            className={`inline-flex rounded-full border px-2 py-0.5 md:px-3 md:py-1.5 text-[8px] md:text-xs font-bold ${
              doctor.isCosmetic
                ? 'border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#8a6818]'
                : 'border-blue-100 bg-blue-50 text-[#0069D9]'
            }`}
          >
            {doctor.specialty || 'أخصائي واستشاري'}
          </span>

          <p className="mt-1.5 md:mt-3 line-clamp-2 text-[9px] md:text-sm leading-relaxed md:leading-7 text-slate-500">
            يقدم الرعاية الطبية المتخصصة ضمن فريق المستشفى الأوربي الحديث.
          </p>
        </div>

        {/* Schedule */}
        <div className="mt-2.5 md:mt-5 space-y-1.5 md:space-y-3 border-t border-slate-100 pt-2.5 md:pt-5">
          <div className="flex items-center gap-1.5 md:gap-3 text-xs md:text-sm">
            <span className="flex h-6 w-6 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-md md:rounded-xl bg-blue-50 text-[#0069D9]">
              <div className="scale-[0.6] md:scale-100 flex items-center justify-center">
                <Icon name="calendar" size={17} />
              </div>
            </span>

            <div className="overflow-hidden">
              <div className="text-[7px] md:text-[11px] font-bold text-slate-400">
                أيام الدوام
              </div>

              <div className="text-[9px] md:text-sm font-bold text-[#18529D] truncate">
                {doctor.days || 'من السبت إلى الخميس'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 md:gap-3 text-xs md:text-sm">
            <span className="flex h-6 w-6 md:h-9 md:w-9 shrink-0 items-center justify-center rounded-md md:rounded-xl bg-blue-50 text-[#0069D9]">
              <div className="scale-[0.6] md:scale-100 flex items-center justify-center">
                <Icon name="clock" size={17} />
              </div>
            </span>

            <div className="overflow-hidden">
              <div className="text-[7px] md:text-[11px] font-bold text-slate-400">
                ساعات العمل
              </div>

              <div dir="ltr" className="text-[9px] md:text-sm font-bold text-[#18529D] truncate text-right">
                {doctor.time || 'حسب الموعد'}
              </div>
            </div>
          </div>
        </div>

        {/* Booking */}
        <Link
          href={bookingUrl}
          className={`mt-3 md:mt-6 flex w-full items-center justify-center gap-1 md:gap-2 rounded-xl md:rounded-2xl px-2 py-2 md:px-5 md:py-3.5 text-[9px] md:text-sm font-black transition-all ${
            doctor.isCosmetic
              ? 'bg-[#D4AF37] text-[#0D2B52] hover:bg-[#b9933d]'
              : 'bg-[#D92541] text-white shadow-lg shadow-red-900/10 hover:bg-[#BF1D35]'
          }`}
        >
          <div className="scale-[0.7] md:scale-100 flex items-center justify-center">
            <Icon name="calendar" size={18} />
          </div>
          <span>احجز موعدًا</span>
        </Link>
      </div>
    </article>
  );
}

export default async function DoctorsPage({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    department?: string;
  };
}) {
  const query = searchParams?.q || '';
  const department = searchParams?.department || '';

  const [doctorsList, departments] = await Promise.all([
    getDoctors(query, department),
    getDepartments(),
  ]);

  const totalDoctors = doctorsList.length;

  return (
    <main
      dir="rtl"
      className="w-full min-h-screen overflow-x-hidden bg-[#f8fafc] font-sans text-slate-800"
    >
      {/* =========================
          TOP HEADER
      ========================== */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 md:px-6 lg:px-8 md:py-3">
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3 shrink-0">
            <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 shrink-0">
              <img
                src="/images/logo.png"
                alt="المستشفى الأوربي الحديث"
                className="h-6 w-6 md:h-10 md:w-10 object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <h1 className="text-sm md:text-xl font-black leading-none text-[#D92541]">
                المستشفى <span className="text-[#0069D9]">الأوربي</span>
              </h1>
              <div className="mt-1 text-[7px] md:text-[9px] font-bold tracking-[0.1em] md:tracking-[0.2em] text-slate-400">
                MODERN EUROPEAN HOSPITAL
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            <Link href="/" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#D92541]">الرئيسية</Link>
            <Link href="/departments" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#D92541]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="relative px-3 py-2 text-sm font-black text-[#D92541]">
              نخبة الأطباء
              <span className="absolute bottom-0 right-3 left-3 h-0.5 rounded-full bg-[#D92541]" />
            </Link>
            <Link href="/services" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#D92541]">الخدمات الذكية</Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-bold text-slate-600 transition hover:text-[#D92541]">تواصل معنا</Link>
          </nav>

          <Link
            href="/booking"
            className="hidden sm:inline-flex shrink-0 rounded-full bg-[#D92541] px-4 py-2 md:px-6 md:py-2.5 text-xs md:text-sm font-black text-white shadow-lg shadow-red-900/10 transition hover:bg-[#BF1D35]"
          >
            احجز موعدك
          </Link>
        </div>

        {/* شريط تنقل مخصص للجوال */}
        <div className="lg:hidden border-t border-slate-100 bg-slate-50/50">
          <nav className="flex overflow-x-auto gap-4 px-4 py-3 text-xs md:text-sm font-bold text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Link href="/" className="shrink-0 transition hover:text-[#D92541]">الرئيسية</Link>
            <Link href="/departments" className="shrink-0 transition hover:text-[#D92541]">الأقسام والمراكز</Link>
            <Link href="/doctors" className="shrink-0 text-[#D92541] border-b border-[#D92541] pb-0.5">نخبة الأطباء</Link>
            <Link href="/services" className="shrink-0 transition hover:text-[#D92541]">الخدمات الذكية</Link>
            <Link href="/booking" className="shrink-0 text-[#D92541]">احجز موعدك</Link>
          </nav>
        </div>
      </header>

      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-gradient-to-bl from-[#0069D9] via-[#18529D] to-[#0D2B52]">
        <div className="absolute -left-32 -top-32 h-64 w-64 md:h-96 md:w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-40 right-10 h-64 w-64 md:h-96 md:w-96 rounded-full bg-[#D92541]/20 blur-3xl" />
        <div className="absolute right-1/2 top-10 h-48 w-48 md:h-64 md:w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-28 lg:px-8">
          <div className="max-w-4xl text-center md:text-right">
            <div className="mb-4 md:mb-6 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-bold text-white backdrop-blur-md">
              <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-[#D4AF37]" />
              الكادر الطبي للمستشفى
            </div>

            <h1 className="max-w-4xl text-3xl font-black leading-[1.2] tracking-tight text-white md:text-6xl">
              اطّلع على أطبائنا
              <br />
              <span className="text-[#D4AF37]">
                واختر من تثق به
              </span>
            </h1>

            <p className="mx-auto md:mx-0 mt-3 md:mt-6 max-w-2xl text-xs leading-relaxed md:text-xl md:leading-8 text-blue-100">
              اكتشف نخبة الأطباء والاستشاريين والأخصائيين في
              مختلف الأقسام الطبية، وتعرّف على تخصصاتهم وأوقات
              عياداتهم قبل حجز موعدك.
            </p>

            {/* Hero search */}
            <form
              action="/doctors"
              method="GET"
              className="mt-6 md:mt-10 max-w-3xl mx-auto md:mx-0"
            >
              <div className="flex flex-col gap-2 md:gap-3 rounded-2xl md:rounded-[24px] border border-white/15 bg-white/10 p-2 md:p-3 shadow-2xl backdrop-blur-xl md:flex-row">
                <div className="flex flex-1 items-center gap-2.5 md:gap-3 rounded-xl md:rounded-2xl bg-white px-3 md:px-4">
                  <span className="text-[#0069D9]">
                    <Icon name="search" size={16} />
                  </span>

                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="ابحث باسم الطبيب أو التخصص..."
                    className="h-10 md:h-14 w-full bg-transparent text-[10px] md:text-sm font-bold text-slate-700 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  className="flex h-10 md:h-14 items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#D92541] px-4 md:px-7 text-[11px] md:text-sm font-black text-white shadow-lg transition hover:bg-[#BF1D35]"
                >
                  <Icon name="search" size={16} />
                  البحث عن طبيب
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =========================
          STATS
      ========================== */}
      <section className="relative z-20 mx-auto -mt-6 md:-mt-7 max-w-6xl px-4">
        <div className="grid overflow-hidden rounded-[16px] md:rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.10)] grid-cols-1 sm:grid-cols-3">
          <div className="flex items-center gap-3 md:gap-4 border-b border-slate-100 p-4 md:p-6 sm:border-b-0 sm:border-l">
            <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg md:rounded-2xl bg-blue-50 text-[#0069D9]">
              <div className="scale-75 md:scale-100 flex items-center justify-center">
                <Icon name="users" size={25} />
              </div>
            </div>

            <div>
              <div className="text-lg md:text-2xl font-black text-[#18529D]">
                {totalDoctors}+
              </div>

              <div className="text-[9px] md:text-sm font-bold text-slate-400">
                طبيب واستشاري
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 border-b border-slate-100 p-4 md:p-6 sm:border-b-0 sm:border-l">
            <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg md:rounded-2xl bg-red-50 text-[#D92541]">
              <div className="scale-75 md:scale-100 flex items-center justify-center">
                <Icon name="medical" size={25} />
              </div>
            </div>

            <div>
              <div className="text-lg md:text-2xl font-black text-[#18529D]">
                {departments.length}+
              </div>

              <div className="text-[9px] md:text-sm font-bold text-slate-400">
                تخصص وقسم طبي
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4 p-4 md:p-6">
            <div className="flex h-10 w-10 md:h-14 md:w-14 shrink-0 items-center justify-center rounded-lg md:rounded-2xl bg-[#D4AF37]/10 text-[#9a7417]">
              <div className="scale-75 md:scale-100 flex items-center justify-center">
                <Icon name="award" size={25} />
              </div>
            </div>

            <div>
              <div className="text-lg md:text-2xl font-black text-[#18529D]">
                رعاية
              </div>

              <div className="text-[9px] md:text-sm font-bold text-slate-400">
                تبدأ من الثقة بالخبير
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          DEPARTMENTS FILTER
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 pb-2 pt-12 md:pt-20 md:px-6 lg:px-8">
        <div className="mb-4 md:mb-8 flex flex-col justify-between gap-3 md:gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#D92541]">
              <span className="h-px w-4 md:w-8 bg-[#D92541]" />
              تصفح الأطباء
            </div>

            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#18529D] lg:text-4xl">
              ابحث حسب القسم
            </h2>

            <p className="mt-1.5 md:mt-3 text-[10px] md:text-sm leading-relaxed text-slate-500 md:text-base">
              اختر القسم للوصول بسرعة إلى الكادر الطبي التابع له.
            </p>
          </div>

          {department && (
            <Link
              href="/doctors"
              className="inline-flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-black text-[#D92541]"
            >
              إلغاء التصفية
              <Icon name="chevron" size={15} />
            </Link>
          )}
        </div>

        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link
            href="/doctors"
            className={`whitespace-nowrap rounded-full border px-4 py-2 md:px-5 md:py-2.5 text-[11px] md:text-sm font-black transition ${
              !department
                ? 'border-[#0069D9] bg-[#0069D9] text-white shadow-lg shadow-blue-900/10'
                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#0069D9]'
            }`}
          >
            جميع الأطباء
          </Link>

          {departments.map((item) => (
            <Link
              key={item}
              href={`/doctors?department=${encodeURIComponent(item)}`}
              className={`whitespace-nowrap rounded-full border px-4 py-2 md:px-5 md:py-2.5 text-[11px] md:text-sm font-black transition ${
                department === item
                  ? 'border-[#0069D9] bg-[#0069D9] text-white shadow-lg shadow-blue-900/10'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#0069D9]'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>
      </section>

      {/* =========================
          TRUST STRIP
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-6 md:py-8 md:px-6 lg:px-8">
        <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-3">
          {[
            {
              icon: 'award' as const,
              title: 'كادر طبي متخصص',
              text: 'الوصول إلى الأطباء حسب القسم والتخصص.',
            },
            {
              icon: 'calendar' as const,
              title: 'معلومات العيادة',
              text: 'أيام الدوام والساعات تظهر قبل الحجز.',
            },
            {
              icon: 'shield' as const,
              title: 'رحلة رقمية أوضح',
              text: 'اختيار الطبيب يصبح أسرع وأسهل.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-slate-200 bg-white p-3.5 md:p-5"
            >
              <div className="flex h-9 w-9 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-lg md:rounded-xl bg-slate-50 text-[#0069D9]">
                <div className="scale-75 md:scale-100 flex items-center justify-center">
                  <Icon name="award" size={20} />
                </div>
              </div>

              <div>
                <h3 className="font-black text-xs md:text-sm text-[#18529D]">
                  {item.title}
                </h3>

                <p className="mt-0.5 md:mt-1 text-[9px] md:text-xs leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          DOCTORS GRID
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-6 md:pb-24 md:pt-10 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-xl md:text-3xl font-black tracking-tight text-[#18529D]">
              {department
                ? `أطباء ${department}`
                : query
                ? `نتائج البحث عن "${query}"`
                : 'نخبة الأطباء'}
            </h2>

            <p className="mt-1.5 md:mt-2 text-[10px] md:text-sm text-slate-500">
              {doctorsList.length} طبيب متاح في نتائج العرض
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-500 md:flex">
            <Icon name="filter" size={15} />
            عرض منظم حسب التخصص
          </div>
        </div>

        {doctorsList.length === 0 ? (
          <div className="rounded-[20px] md:rounded-[32px] border border-dashed border-slate-300 bg-white px-4 py-12 md:px-6 md:py-20 text-center">
            <div className="mx-auto flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-xl md:rounded-3xl bg-blue-50 text-[#0069D9]">
              <div className="scale-75 md:scale-100 flex items-center justify-center">
                <Icon name="search" size={34} />
              </div>
            </div>

            <h3 className="mt-4 md:mt-6 text-lg md:text-2xl font-black text-[#18529D]">
              لم نجد طبيبًا مطابقًا
            </h3>

            <p className="mx-auto mt-2 md:mt-3 max-w-md text-[10px] md:text-sm leading-relaxed text-slate-500">
              جرّب اسمًا مختلفًا أو اختر أحد الأقسام الطبية
              للوصول إلى النتائج المتاحة.
            </p>

            <Link
              href="/doctors"
              className="mt-5 md:mt-7 inline-flex items-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#0069D9] px-5 py-2.5 md:px-6 md:py-3.5 text-[11px] md:text-sm font-black text-white"
            >
              عرض جميع الأطباء
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 md:gap-7 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* GRID: 2 Columns on mobile, 3-4 on Desktop */}
            {doctorsList.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>

      {/* =========================
          CTA
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 pb-12 md:pb-20 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl md:rounded-[36px] bg-gradient-to-l from-[#18529D] to-[#0069D9] px-5 py-8 text-white md:px-14 md:py-16 text-center md:text-right">
          <div className="absolute -left-10 -top-10 h-32 w-32 md:-left-20 md:-top-20 md:h-60 md:w-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-32 w-32 md:-bottom-28 md:right-20 md:h-72 md:w-72 rounded-full bg-[#D92541]/20 blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between gap-6 md:gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl mx-auto md:mx-0">
              <div className="mb-2 md:mb-3 text-[10px] md:text-sm font-black text-[#D4AF37]">
                خطوتك التالية
              </div>

              <h2 className="text-xl font-black leading-tight md:text-4xl">
                عرفت الطبيب المناسب؟
                <br />
                دعنا نبدأ رحلة رعايتك.
              </h2>

              <p className="mt-2 md:mt-4 text-[10px] md:text-sm leading-relaxed text-blue-100 md:text-base">
                انتقل مباشرة إلى حجز الموعد واستكمل خطوات الزيارة بسهولة.
              </p>
            </div>

            <Link
              href="/booking"
              className="inline-flex shrink-0 mx-auto md:mx-0 items-center justify-center gap-1.5 md:gap-2 rounded-xl md:rounded-2xl bg-[#D92541] px-6 py-3 md:px-8 md:py-4 text-[11px] md:text-sm font-black text-white shadow-xl transition hover:bg-[#BF1D35]"
            >
              احجز موعدًا الآن
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="bg-[#0D2B52] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:gap-4 px-4 py-6 md:py-8 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 md:gap-3 justify-center md:justify-start">
            <img
              src="/images/logo.png"
              alt="المستشفى الأوربي الحديث"
              className="h-8 w-8 md:h-11 md:w-11 object-contain"
            />

            <div>
              <div className="font-black text-[13px] md:text-base">
                المستشفى الأوربي الحديث
              </div>

              <div className="mt-0.5 md:mt-1 text-[9px] md:text-xs text-slate-400">
                الرعاية تبدأ بالثقة
              </div>
            </div>
          </div>

          <div className="text-[9px] md:text-xs font-medium text-slate-400 text-center md:text-right border-t border-slate-800 md:border-none pt-3 md:pt-0 mt-1 md:mt-0">
            © {new Date().getFullYear()} جميع الحقوق محفوظة
          </div>
        </div>
      </footer>
    </main>
  );
}