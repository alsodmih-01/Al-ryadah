import Link from "next/link";

const programs = [
  {
    title: "متابعة السكري",
    description: "تنظيم المعلومات والفحوصات والمتابعة مع الفريق الطبي.",
  },
  {
    title: "متابعة ضغط الدم",
    description: "دعم متابعة القراءات ومراجعتها مع المختص عند الحاجة.",
  },
  {
    title: "متابعة القلب",
    description: "تنظيم الزيارات والبيانات التي يرغب المريض في مناقشتها.",
  },
  {
    title: "الرعاية طويلة المدى",
    description: "محتوى يساعد على الاستمرار في المتابعة المنتظمة.",
  },
];

export default function ChronicCare() {
  return (
    <section dir="rtl" className="rounded-[32px] border border-blue-100 bg-white p-6 shadow-lg md:p-8">
      <span className="text-xs font-black text-[#0056B3]">
        Chronic Care Companion
      </span>

      <h3 className="mt-2 text-2xl font-black text-[#103B6D]">
        الرعاية المستمرة
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-500">
        أدوات ومحتوى لمساعدة المريض على تنظيم المتابعة، دون أن تحل
        محل الخطة الطبية الرسمية.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {programs.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-blue-100 bg-blue-50 p-5"
          >
            <h4 className="font-black text-[#0056B3]">
              {item.title}
            </h4>

            <p className="mt-2 text-xs leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <Link
        href="/booking"
        className="mt-6 flex items-center justify-center rounded-2xl bg-[#0056B3] py-4 font-black text-white"
      >
        ابدأ المتابعة
      </Link>
    </section>
  );
}