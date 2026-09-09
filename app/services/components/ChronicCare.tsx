export default function ChronicCare() {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#0056B3] w-full" dir="rtl">
      <h3 className="text-2xl font-black text-slate-800 mb-4 text-center">
        برامج الرعاية المستمرة للأمراض المزمنة
      </h3>
      <p className="text-slate-600 text-center mb-6 leading-relaxed">
        نقدم متابعة دورية واستشارات متخصصة لمرضى السكري، الضغط، والأمراض المزمنة الأخرى لضمان جودة حياة أفضل ورعاية صحية آمنة.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-[#0056B3] mb-2 text-lg">🩺 متابعة السكري المستمرة</h4>
          <p className="text-sm text-slate-600">برامج متكاملة لفحص السكر التراكمي، إرشادات التغذية السليمة، والمتابعة الدورية مع أخصائي الغدد.</p>
        </div>
        
        <div className="p-5 bg-blue-50 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-[#0056B3] mb-2 text-lg">❤️ مراقبة ضغط الدم والقلب</h4>
          <p className="text-sm text-slate-600">استشاريون مختصون لمتابعة ضغط الدم، تخطيط القلب، والوقاية من المضاعفات المبكرة.</p>
        </div>
      </div>
    </div>
  );
}