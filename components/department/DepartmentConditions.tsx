import React from 'react';

export default function DepartmentConditions({ conditions }: { conditions: string[] }) {
  if (!conditions || conditions.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      <h2 className="text-2xl md:text-3xl font-black text-[#0056B3] mb-6 text-center">
        ماذا نعالج؟ (الحالات والأمراض)
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {conditions.map((condition, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3 hover:shadow-md transition">
            <span className="text-[#C21835] font-bold text-lg">✓</span>
            <p className="text-slate-800 font-bold">{condition}</p>
          </div>
        ))}
      </div>
    </section>
  );
}