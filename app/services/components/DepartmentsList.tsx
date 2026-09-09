import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function DepartmentsList() {
  const departments = await prisma.department.findMany({
    include: { doctors: true },
  });

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-[#0056B3] w-full" dir="rtl">
      <h3 className="text-3xl font-black text-center mb-8">أقسامنا الطبية</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="p-6 border rounded-2xl bg-slate-50">
            <h4 className="text-xl font-bold text-[#0056B3]">{dept.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}