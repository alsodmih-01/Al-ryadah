import React from 'react';

export default function DepartmentServices({ services }: { services: string[] }) {
  if (!services || services.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-12">
      <h2 className="text-2xl md:text-3xl font-black text-[#0056B3] mb-6 text-center">
        الخدمات والإجراءات الطبية
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-3 hover:shadow-md transition border-r-4 border-r-[#0056B3]">
            <span className="text-[#0056B3] font-bold text-lg">✦</span>
            <p className="text-slate-800 font-bold">{service}</p>
          </div>
        ))}
      </div>
    </section>
  );
}