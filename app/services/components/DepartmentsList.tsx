import Link from "next/link";

const departments = [
  ["جراحة المخ والأعصاب", "neurosurgery"],
  ["القسطرة والعناية القلبية", "cardiology"],
  ["الأطفال والخُدّج", "pediatrics"],
  ["النساء والولادة", "obstetrics-gynecology"],
  ["الباطنية", "internal-medicine"],
  ["الطوارئ", "emergency"],
  ["العظام والمفاصل", "orthopedics"],
  ["الأنف والأذن والحنجرة", "ent"],
  ["المختبرات", "laboratory"],
  ["الأشعة التشخيصية", "radiology"],
];

export default function DepartmentsList() {
  return (
    <section
      dir="rtl"
      className="rounded-[36px] bg-[#07182d] p-6 text-white shadow-2xl md:p-10"
    >
      <span className="text-xs font-black text-[#D4AF37]">
        Department Hub
      </span>

      <h3 className="mt-2 text-3xl font-black">
        أين تبدأ؟
      </h3>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {departments.map(([title, slug], index) => (
          <Link
            key={slug}
            href={`/departments/${slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xs font-black text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#103B6D]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="font-black">
              <div>{title}</div>
              <div className="mt-1 text-xs text-blue-200">
                استكشف القسم ←
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}