"use client";

import React, { useState, useMemo } from "react";

type BloodDonor = {
  id: string;
  fullName: string;
  phone: string;
  bloodType: string;
  region: string;
  lastDonationDate: Date;
};

export default function DigitalBloodBank() {
  // بيانات افتراضية لعرضها للإدارة
  const [donors, setDonors] = useState<BloodDonor[]>([
    { id: "1", fullName: "أحمد عبدلله", phone: "770000000", bloodType: "O+", region: "صنعاء - الستين", lastDonationDate: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000) },
    { id: "2", fullName: "محمد علي", phone: "771111111", bloodType: "A+", region: "صنعاء - حدة", lastDonationDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    { id: "3", fullName: "صالح يحيى", phone: "772222222", bloodType: "B-", region: "ذمار", lastDonationDate: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000) },
  ]);

  const [searchBlood, setSearchBlood] = useState("");
  const [searchRegion, setSearchRegion] = useState("");

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newBlood, setNewBlood] = useState("O+");
  const [newRegion, setNewRegion] = useState("");
  const [newDate, setNewDate] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // فلترة المتبرعين
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      const matchBlood = searchBlood ? donor.bloodType === searchBlood : true;
      const matchRegion = searchRegion ? donor.region.includes(searchRegion) : true;
      return matchBlood && matchRegion;
    });
  }, [donors, searchBlood, searchRegion]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone || !newRegion || !newDate) return;

    const newDonor: BloodDonor = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: newName,
      phone: newPhone,
      bloodType: newBlood,
      region: newRegion,
      lastDonationDate: new Date(newDate),
    };

    setDonors([newDonor, ...donors]);
    setNewName(""); setNewPhone(""); setNewRegion(""); setNewDate("");
  };

  return (
    <div className="animate-[fadeUp_.4s_ease-out_both] p-2 md:p-4 text-right">
      <div className="mb-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl mb-3 border border-red-100 shadow-sm text-[#C21835]">
          🩸
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#103B6D] mb-2">بنك الدم الرقمي</h2>
        <p className="text-slate-500 text-sm">ساهم في إنقاذ الأرواح، ابحث عن متبرع متطابق أو انضم لقائمة الأبطال.</p>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 md:gap-8">
        
        {/* =======================================
            الجانب الأيمن: البحث وقائمة المتبرعين
        ======================================= */}
        <div className="bg-white border border-slate-100 p-5 md:p-6 rounded-3xl shadow-sm h-fit order-2 lg:order-1">
          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
            <span className="text-xl">🔍</span>
            <h3 className="font-black text-[#103B6D]">البحث العاجل عن متبرع</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">فصيلة الدم</label>
              <select 
                value={searchBlood}
                onChange={(e) => setSearchBlood(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-[#C21835] bg-slate-50"
              >
                <option value="">جميع الفصائل</option>
                {bloodTypes.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">المنطقة أو الحي</label>
              <input 
                type="text" 
                value={searchRegion}
                onChange={(e) => setSearchRegion(e.target.value)}
                placeholder="مثال: شارع الستين..." 
                className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-[#C21835] bg-slate-50"
              />
            </div>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredDonors.length === 0 ? (
              <div className="text-center py-10 text-slate-400 font-bold text-sm border-2 border-dashed border-slate-100 rounded-2xl">
                لا يوجد متبرعون متاحون لهذه الفصيلة أو المنطقة حالياً.
              </div>
            ) : (
              filteredDonors.map((donor) => {
                const today = new Date();
                const diffTime = Math.abs(today.getTime() - donor.lastDonationDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                const isAvailable = diffDays >= 90;

                const nextDate = new Date(donor.lastDonationDate);
                nextDate.setDate(nextDate.getDate() + 90);

                return (
                  <div key={donor.id} className="p-4 rounded-2xl border border-slate-100 bg-[#F8FAFC] hover:border-[#103B6D] transition shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#C21835] text-white font-black w-12 h-12 flex items-center justify-center rounded-xl text-lg shadow-md shadow-red-900/20">
                          {donor.bloodType}
                        </span>
                        <div>
                          <h4 className="font-black text-[#103B6D] text-base">{donor.fullName}</h4>
                          <div className="text-xs text-slate-500 mt-0.5">📍 {donor.region}</div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black ${isAvailable ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                        {isAvailable ? "متاح للتبرع 🟢" : "غير متاح ⏳"}
                      </span>
                    </div>

                    <div className="border-t border-slate-200/60 pt-3 mt-3">
                      {isAvailable ? (
                        <a href={`tel:${donor.phone}`} className="flex items-center justify-center gap-2 w-full bg-[#103B6D] hover:bg-[#0a2647] text-white font-black py-2.5 rounded-xl transition shadow-sm text-sm">
                          <span>📞</span> الاتصال بالمتبرع ({donor.phone})
                        </a>
                      ) : (
                        <div className="text-center text-[10px] text-slate-500 font-bold bg-white py-2 rounded-xl border border-slate-100">
                          سيكون متاحاً للتبرع بتاريخ: {nextDate.toLocaleDateString('ar-EG')}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* =======================================
            الجانب الأيسر: نموذج الانضمام
        ======================================= */}
        <div className="bg-gradient-to-br from-[#103B6D] to-[#0a2647] p-6 rounded-3xl shadow-lg text-white h-fit order-1 lg:order-2 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-black mb-2">كن بطلاً وانقذ حياة</h3>
            <p className="text-xs text-blue-200 mb-6 leading-relaxed">
              سجل كمتبرع بالدم ليتمكن المرضى من الوصول إليك في الحالات الطارئة.
            </p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-blue-200 mb-1.5">الاسم الكامل</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full rounded-xl border-none bg-white/10 px-4 py-3 text-sm font-bold text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C21835]" placeholder="أدخل اسمك ثلاثياً" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-blue-200 mb-1.5">فصيلة الدم</label>
                  <select value={newBlood} onChange={(e) => setNewBlood(e.target.value)} className="w-full rounded-xl border-none bg-white/10 px-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#C21835] [&>option]:text-slate-800">
                    {bloodTypes.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-blue-200 mb-1.5">رقم الهاتف</label>
                  <input type="text" dir="ltr" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full rounded-xl border-none bg-white/10 px-4 py-3 text-sm font-bold text-white text-right placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C21835]" placeholder="77xxxxxxx" required />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-blue-200 mb-1.5">المنطقة أو الحي</label>
                <input type="text" value={newRegion} onChange={(e) => setNewRegion(e.target.value)} className="w-full rounded-xl border-none bg-white/10 px-4 py-3 text-sm font-bold text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#C21835]" placeholder="مثال: ذمار - الدائري" required />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-blue-200 mb-1.5">تاريخ آخر تبرع</label>
                <input type="date" value={newDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => setNewDate(e.target.value)} className="w-full rounded-xl border-none bg-white/10 px-4 py-3 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-[#C21835] [color-scheme:dark]" required />
              </div>

              <button type="submit" className="w-full bg-[#C21835] hover:bg-[#a9132d] text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-red-900/40 mt-2">
                انضم لقائمة المتبرعين
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}