const steps = [
  {
    number: "01",
    title: "اكتشف",
    text: "تعرف على احتياجك والقسم المناسب.",
  },
  {
    number: "02",
    title: "استعد",
    text: "راجع معلومات الزيارة والتحضير.",
  },
  {
    number: "03",
    title: "توجه",
    text: "اعرف أين تبدأ رحلتك داخل المستشفى.",
  },
  {
    number: "04",
    title: "تلقى الرعاية",
    text: "ابدأ الزيارة الطبية في القسم المناسب.",
  },
  {
    number: "05",
    title: "تابع",
    text: "نظم معلوماتك وخطوتك التالية.",
  },
];

export default function PatientJourney() {
  return (
    <section dir="rtl" className="rounded-[36px] bg-[#07182d] p-6 text-white shadow-2xl md:p-10">
      <span className="text-xs font-black text-[#D4AF37]">
        Patient Journey
      </span>

      <h3 className="mt-2 text-3xl font-black">
        رحلة المريض
      </h3>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100">
        تجربة مترابطة تبدأ قبل الوصول إلى المستشفى ولا تنتهي عند
        مغادرة العيادة.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-5">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="text-sm font-black text-[#D4AF37]">
              {step.number}
            </div>

            <h4 className="mt-3 font-black">{step.title}</h4>

            <p className="mt-2 text-xs leading-6 text-blue-100">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}