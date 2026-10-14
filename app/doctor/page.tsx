'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function DoctorDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState('الكل');

  // جلب البيانات وتفعيل الاشتراكات الفورية عند تسجيل الدخول
  useEffect(() => {
    if (isAuthenticated) {
      fetchWaitingPatients();

      const channel = supabase
        .channel('doctor-dashboard-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'appointments' },
          () => {
            fetchWaitingPatients();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'doctor' && password === '0000') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('بيانات الدخول غير صحيحة، يرجى التأكد');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // جلب المرضى المنتظرين فقط (حالتهم مؤكدة من الاستقبال)
  const fetchWaitingPatients = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', 'confirmed') 
      .order('id', { ascending: true }); 

    if (!error && data) {
      setAppointments(data);
    }
    setIsLoading(false);
  };

  // دالة إدخال المريض وإنهاء المعاينة
  const completeAppointment = async (id: number) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: 'completed' })
      .eq('id', id);

    if (error) {
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  // تصفية المرضى حسب العيادة المختارة
  const filteredAppointments = selectedClinic === 'الكل' 
    ? appointments 
    : appointments.filter(app => app.department === selectedClinic);

  // ==========================================
  // 1. شاشة تسجيل دخول الأطباء
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans" dir="rtl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mx-auto mb-4 shadow-md border-2 border-[#0056B3]">
            👨‍⚕️
          </div>
          <h2 className="text-3xl font-black text-[#0056B3]">بوابة الأطباء</h2>
          <p className="mt-2 text-sm text-slate-500 font-bold">المستشفى الأوربي الحديث - العيادات</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl border border-slate-100 rounded-3xl sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              {authError && (
                <div className="bg-red-50 text-[#C21835] p-3 rounded-xl text-sm font-bold text-center border border-red-100">
                  ⚠️ {authError}
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الطبيب الوظيفي</label>
                <input
                  type="text" required dir="ltr"
                  placeholder="doctor"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] outline-none bg-slate-50 focus:bg-white text-left transition"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">الرمز السري للعيادة</label>
                <input
                  type="password" required dir="ltr"
                  placeholder="0000"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] outline-none bg-slate-50 focus:bg-white text-left transition"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3.5 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-[#0056B3] hover:bg-blue-800 transition">
                تسجيل الدخول للعيادة
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. لوحة تحكم الطبيب
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      
      {/* الشريط العلوي للعيادة */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl border border-blue-100">
              🩺
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#0056B3]">نظام العيادات الذكي (فوري)</h1>
              <p className="text-xs font-bold text-slate-500">إدارة دخول المرضى</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="text-sm bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-[#C21835] px-4 py-2 rounded-xl font-bold transition"
          >
            إنهاء الجلسة
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-black text-slate-800">المرضى في صالة الانتظار</h2>
          
          {/* القائمة المحدثة بكافة أقسام وعيادات المستشفى */}
          <select 
            className="px-4 py-2 rounded-xl border border-slate-200 font-bold text-slate-700 bg-white shadow-sm outline-none focus:ring-2 focus:ring-[#0056B3]"
            value={selectedClinic}
            onChange={(e) => setSelectedClinic(e.target.value)}
          >
            <option value="الكل">عرض جميع العيادات</option>
            <option value="جراحة المخ والأعصاب">جراحة المخ والأعصاب</option>
            <option value="قسم الأمراض الباطنية">قسم الأمراض الباطنية</option>
            <option value="قسم المخ والأعصاب">قسم المخ والأعصاب</option>
            <option value="جراحة العظام والمفاصل">جراحة العظام والمفاصل</option>
            <option value="قسم الأطفال والحضانات">قسم الأطفال والحضانات</option>
            <option value="مركز جراحة الإحليل">مركز جراحة الإحليل</option>
            <option value="مركز القلب والقسطرة">مركز القلب والقسطرة</option>
            <option value="قسم العلاج الطبيعي">قسم العلاج الطبيعي</option>
            <option value="مركز الجلدية والتجميل">مركز الجلدية والتجميل</option>
            <option value="قسم النساء والولادة">قسم النساء والولادة</option>
            <option value="قسم الأنف والأذن والحنجرة">قسم الأنف والأذن والحنجرة</option>
            <option value="المستشفى العام">المستشفى العام</option>
          </select>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold">الدور</th>
                  <th className="p-4 font-bold">اسم المريض</th>
                  <th className="p-4 font-bold">العيادة</th>
                  <th className="p-4 font-bold">الإجراء من قبل الطبيب</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-bold">
                      جاري فحص قائمة الانتظار...
                    </td>
                  </tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-slate-500 font-bold">
                      لا يوجد مرضى في صالة الانتظار لهذه العيادة حالياً.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((app, index) => (
                    <tr key={app.id} className={`${index === 0 ? 'bg-green-50' : 'hover:bg-slate-50'} transition duration-150`}>
                      <td className="p-4 font-black text-2xl text-slate-400">
                        {index + 1}
                      </td>
                      <td className="p-4 font-black text-lg text-[#0056B3]">
                        {app.patient_name}
                      </td>
                      <td className="p-4 font-bold text-slate-600">
                        {app.department}
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => completeAppointment(app.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl text-sm font-black transition shadow-md flex items-center gap-2 transform hover:-translate-y-1"
                        >
                          إدخال المريض وإنهاء المعاينة ✅
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}