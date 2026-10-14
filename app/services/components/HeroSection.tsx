import Link from 'next/link';

function IconSpark() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" />
      <path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section dir="rtl" className="relative min-h-[720px] overflow-hidden bg-[#07182d]">
      <div className="absolute inset-0">
        <img
          src="/images/the_building.png"
          alt="المستشفى الأوربي الحديث"
          className="h-full w-full object-cover opacity-25"
        />

        <div className="absolute inset-0 bg-gradient-to-l from-[#0056B3] via-[#103B6D]/90 to-[#07182d]" />
      </div>

      <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full bg-[#C21835]/20 blur-3xl" />

      <div className="relative z-10 mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-4 py-20 md:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#D4AF37]" />
            مركز الصحة الرقمي
          </div>

          <h1 className="mt-6 text-5xl font-black leading-[1.1] tracking-tight text-white md:text-7xl">
            صحتك أقرب.
            <br />
            <span className="text-[#D4AF37]">بذكاء ووضوح.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-blue-100 md:text-2xl">
            أدوات تفاعلية تساعدك على فهم بعض المؤشرات الصحية،
            استكشاف نقطة البداية المناسبة، والاستعداد لرحلة الرعاية.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#navigator"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black text-[#0056B3] shadow-2xl transition hover:bg-slate-100"
            >
              ابدأ من احتياجك
              <IconSpark />
            </a>

            <Link
              href="/booking"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#C21835] px-8 py-4 text-sm font-black text-white shadow-2xl transition hover:bg-[#a9132d]"
            >
              احجز موعدك
              <IconArrow />
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-5 rounded-[42px] border border-white/10 bg-white/5 backdrop-blur-sm" />

            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[28px] bg-white">
                <div className="rounded-t-[28px] bg-gradient-to-l from-[#0056B3] to-[#103B6D] p-6 text-white">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[#103B6D]">
                      <IconSpark />
                    </div>

                    <div>
                      <div className="text-xs font-bold text-blue-100">
                        Digital Health
                      </div>

                      <div className="text-xl font-black">
                        ماذا تحتاج اليوم؟
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 p-5">
                  {[
                    'أبحث عن تخصص مناسب',
                    'لدي أعراض وأريد التوجيه',
                    'أريد حساب مؤشر صحي',
                    'أتابع الحمل أو صحة طفلي',
                    'أستعد لفحص أو زيارة',
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-xs font-black text-[#0056B3]">
                        0{index + 1}
                      </span>

                      <span className="text-sm font-bold text-[#103B6D]">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}