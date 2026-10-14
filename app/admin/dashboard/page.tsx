'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase'; 

export default function AdminDashboard() {
  // === حالات الحماية وتسجيل الدخول ===
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // === حالات بيانات لوحة التحكم ===
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // جلب البيانات وتفعيل الاشتراكات الفورية عند تسجيل الدخول
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointments();

      // تفعيل الاستماع الفوري للتغييرات في جدول appointments
      const channel = supabase
        .channel('admin-appointments-realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'appointments' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              setAppointments((prev) => [payload.new, ...prev]);
            } else if (payload.eventType === 'UPDATE') {
              setAppointments((prev) =>
                prev.map((app) => (app.id === payload.new.id ? payload.new : app))
              );
            } else if (payload.eventType === 'DELETE') {
              setAppointments((prev) => prev.filter((app) => app.id !== payload.old.id));
            }
          }
        )
        .subscribe();

      // تنظيف الاشتراك عند إغلاق الصفحة أو تسجيل الخروج
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  // دالة تسجيل الدخول
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('خطأ في جلب البيانات:', error);
    } else {
      setAppointments(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from('appointments')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('حدث خطأ أثناء تحديث الحالة');
    }
  };

  // ==========================================
  // 1. شاشة تسجيل الدخول
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans" dir="rtl">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <img src="/images/logo.png" alt="شعار المستشفى" className="w-20 h-20 mx-auto object-contain mb-4" />
          <h2 className="text-3xl font-black text-[#C21835]">
            المستشفى <span className="text-[#0056B3]">الأوربي</span> الحديث
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-bold">النظام الإداري - يرجى تسجيل الدخول</p>
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
                <label className="block text-sm font-bold text-slate-700 mb-2">اسم المستخدم</label>
                <input
                  type="text" required dir="ltr"
                  placeholder="admin"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] outline-none bg-slate-50 focus:bg-white text-left transition"
                  value={username} onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">كلمة المرور</label>
                <input
                  type="password" required dir="ltr"
                  placeholder="••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#0056B3] outline-none bg-slate-50 focus:bg-white text-left transition"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3.5 px-4 rounded-xl shadow-lg text-lg font-bold text-white bg-[#C21835] hover:bg-red-800 transition">
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. شاشة لوحة التحكم
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800" dir="rtl">
      
      {/* شريط الإدارة العلوي */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <img 
              src="/images/logo.png" 
              alt="شعار المستشفى" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-black text-[#C21835]">
                المستشفى <span className="text-[#0056B3]">الأوربي</span> الحديث
              </h1>
              <p className="text-xs font-bold text-slate-500">لوحة تحكم الاستقبال</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <span className="bg-green-500 w-2.5 h-2.5 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-green-700">النظام متصل (فوري)</span>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-sm bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-[#C21835] px-4 py-2 rounded-xl font-bold transition"
            >
              تسجيل خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">إجمالي الحجوزات</p>
              <h3 className="text-3xl font-black text-[#0056B3]">{appointments.length}</h3>
            </div>
            <div className="w-14 h-14 bg-blue-50 text-[#0056B3] rounded-2xl flex items-center justify-center text-3xl">📊</div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">قيد الانتظار</p>
              <h3 className="text-3xl font-black text-[#C21835]">
                {appointments.filter(a => a.status === 'pending' || !a.status).length}
              </h3>
            </div>
            <div className="w-14 h-14 bg-red-50 text-[#C21835] rounded-2xl flex items-center justify-center text-3xl">⏳</div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm font-bold mb-1">المواعيد المؤكدة</p>
              <h3 className="text-3xl font-black text-green-600">
                {appointments.filter(a => a.status === 'confirmed').length}
              </h3>
            </div>
            <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl">✅</div>
          </div>
        </div>

        {/* جدول الحجوزات */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-black text-slate-800">سجل حجوزات المرضى (مباشر لحظي)</h2>
            <button onClick={fetchAppointments} className="text-sm bg-blue-100 text-[#0056B3] font-bold px-4 py-2 rounded-xl hover:bg-blue-200 transition">
              🔄 تحديث يدوي
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-white text-slate-500 text-sm border-b border-slate-100">
                <tr>
                  <th className="p-4 font-bold">رقم الحجز</th>
                  <th className="p-4 font-bold">اسم المريض</th>
                  <th className="p-4 font-bold">رقم الجوال</th>
                  <th className="p-4 font-bold">القسم / الطبيب</th>
                  <th className="p-4 font-bold">تاريخ الطلب</th>
                  <th className="p-4 font-bold">الحالة</th>
                  <th className="p-4 font-bold text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                      جاري تحميل البيانات...
                    </td>
                  </tr>
                ) : appointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-bold">
                      لا توجد حجوزات حتى الآن.
                    </td>
                  </tr>
                ) : (
                  appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition duration-150">
                      <td className="p-4 font-bold text-slate-900">#{app.id}</td>
                      <td className="p-4 font-bold text-[#0056B3]">{app.patient_name}</td>
                      <td className="p-4 text-slate-600 font-medium" dir="ltr">{app.phone}</td>
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{app.department}</div>
                        <div className="text-xs text-slate-500">{app.doctor_name}</div>
                      </td>
                      <td className="p-4 text-slate-500 text-sm font-medium">
                        {new Date(app.created_at).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4">
                        {(!app.status || app.status === 'pending') && (
                          <span className="bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full text-xs font-bold border border-yellow-200">
                            قيد الانتظار ⏳
                          </span>
                        )}
                        {app.status === 'confirmed' && (
                          <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200">
                            مؤكد ✅
                          </span>
                        )}
                        {app.status === 'cancelled' && (
                          <span className="bg-red-50 text-red-700 px-3 py-1.5 rounded-full text-xs font-bold border border-red-200">
                            ملغي ❌
                          </span>
                        )}
                      </td>
                      <td className="p-4 flex justify-center gap-2">
                        {(!app.status || app.status === 'pending') && (
                          <>
                            <button 
                              onClick={() => updateStatus(app.id, 'confirmed')}
                              className="bg-[#0056B3] hover:bg-blue-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm"
                            >
                              تأكيد الموعد
                            </button>
                            <button 
                              onClick={() => updateStatus(app.id, 'cancelled')}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold transition border border-slate-200"
                            >
                              إلغاء
                            </button>
                          </>
                        )}
                        {app.status === 'confirmed' && (
                          <span className="text-xs text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-lg">تم التعامل معه</span>
                        )}
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