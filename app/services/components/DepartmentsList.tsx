import React from 'react';

export default function DepartmentsList() {
  // القائمة الحقيقية الثابتة بدون الحاجة لقاعدة بيانات
  const departments = [
    { title: "قسم جراحة المخ والأعصاب", icon: "🧠" },
    { title: "وحدة القسطرة والعناية القلبية", icon: "🫀" },
    { title: "قسم الأطفال والخُدّج", icon: "👶" },
    { title: "قسم النساء والولادة", icon: "🤰" },
    { title: "قسم الباطنية", icon: "🩺" },
    { title: "قسم الطوارئ", icon: "🚨" },
    { title: "قسم العظام والمفاصل", icon: "🦴" },
    { title: "قسم الأنف والأذن والحنجرة", icon: "👂" },
    { title: "قسم المختبرات", icon: "🔬" },
    { title: "قسم الأشعة التشخيصية", icon: "🩻" },
  ];

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#0056B3] w-full" dir="rtl">
      <h3 className="text-3xl font-black text-center mb-8 text-slate-900">أقسامنا ومراكزنا الطبية</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, idx) => (
          <div key={idx} className="p-6 border border-slate-100 rounded-2xl bg-slate-50 hover:shadow-md transition flex flex-col justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#0056B3]/10 flex items-center justify-center text-2xl">
                {dept.icon}
              </div>
              <h4 className="text-lg font-bold text-[#0056B3]">{dept.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}