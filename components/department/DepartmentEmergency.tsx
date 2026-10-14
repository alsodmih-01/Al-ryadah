import React from 'react';

export default function DepartmentEmergency({ emergencyInfo }: { emergencyInfo: string }) {
  if (!emergencyInfo) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div className="bg-red-50 border-r-4 border-[#C21835] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">🚨</span>
          <h3 className="text-xl font-black text-[#C21835]">دليل الطوارئ (متى لا تنتظر؟)</h3>
        </div>
        <p className="text-slate-700 leading-relaxed font-medium text-base">
          {emergencyInfo}
        </p>
      </div>
    </section>
  );
}