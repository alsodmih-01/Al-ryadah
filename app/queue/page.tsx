'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function QueueScreen() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [time, setTime] = useState<string>('');

  // 1. تحديث الساعة والدقيقة باستمرار
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. جلب البيانات وتفعيل التحديث الفوري (Realtime)
  useEffect(() => {
    fetchQueue();

    const channel = supabase
      .channel('queue-screen-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'appointments' },
        () => {
          fetchQueue();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchQueue = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed')
      .order('id', { ascending: false })
      .limit(6);

    if (!error && data) {
      setAppointments(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans overflow-hidden flex flex-col" dir="rtl">
      
      {/* رأس الشاشة (الهيدر) بالهوية البصرية الرسمية */}
      <header className="bg-white border-b border-slate-200 p-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/images/logo.png" alt="الشعار" className="w-16 h-16 object-contain" />
          <div>
            <h1 className="text-3xl font-black text-[#C21835]">
              المستشفى <span className="text-[#0056B3]">الأوربي</span> الحديث
            </h1>
            <p className="text-slate-500 text-lg font-bold mt-1">شاشة نداء العيادات الطبية</p>
          </div>
        </div>
        <div className="text-left">
          <div className="text-5xl font-black text-[#0056B3] font-mono drop-shadow-sm" dir="ltr">
            {time}
          </div>
        </div>
      </header>

      {/* منطقة العرض الرئيسية */}
      <main className="flex-1 p-8">
        {appointments.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <h2 className="text-4xl text-slate-300 font-bold animate-pulse">في انتظار نداء المرضى...</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((app, index) => (
              <div 
                key={app.id} 
                className={`bg-white rounded-3xl overflow-hidden shadow-xl transform transition-all border ${
                  index === 0 ? 'scale-105 border-4 border-[#C21835] animate-pulse-slow shadow-[#C21835]/20' : 'border-slate-200'
                }`}
              >
                {/* اسم العيادة والطبيب */}
                <div className="bg-[#C21835] p-4 text-center border-b-4 border-[#0056B3]">
                  <h3 className="text-2xl font-black text-white">{app.department}</h3>
                  <p className="text-red-100 font-bold mt-1">{app.doctor_name}</p>
                </div>
                
                {/* اسم المريض */}
                <div className="p-8 text-center bg-white">
                  <p className="text-slate-500 font-bold text-lg mb-2">يتفضل المريض / المريضة</p>
                  <h2 className="text-4xl font-black text-[#0056B3] leading-tight">
                    {app.patient_name}
                  </h2>
                </div>
                
                * {/* رقم النداء */}
                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                  <p className="text-slate-600 font-bold text-lg">
                    رقم الحجز: <span className="text-2xl text-[#C21835]">#{app.id}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* الشريط الإخباري المتحرك في الأسفل (Ticker) */}
      <footer className="bg-[#0056B3] py-3 overflow-hidden border-t-4 border-[#C21835]">
        <div className="whitespace-nowrap animate-marquee flex gap-10 text-xl font-bold text-white items-center">
          <span>✨ نتمنى لكم موفور الصحة والعافية</span>
          <span>•</span>
          <span>يرجى تجهيز بطاقة الهوية وتأكيد الحجز عند موظف الاستقبال</span>
          <span>•</span>
          <span>نحن هنا لخدمتكم على مدار 24 ساعة في قسم الطوارئ</span>
          <span>•</span>
          <span>للحفاظ على هدوء المستشفى، يرجى وضع الهواتف على الوضع الصامت</span>
          <span>•</span>
          <span>✨ المستشفى الأوربي الحديث - رعاية تثق بها</span>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-pulse-slow {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}} />
      </footer>
    </div>
  );
}