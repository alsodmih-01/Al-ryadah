import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function HeroSection() {
  let settings = null;
  try {
    settings = await prisma.siteSetting.findUnique({ where: { id: "global_settings" } });
  } catch (error) {}

  const title = settings?.heroTitle || "رعاية صحية تليق بثقتكم";
  const subtitle = settings?.heroSubtitle || "نجمع بين دقة التشخيص، حداثة التقنية، ومهارة الكادر الطبي.";
  const bgImage = settings?.heroImage || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop";

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${bgImage}')` }}>
        <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-black text-white">{title}</h1>
        <p className="text-lg md:text-2xl text-blue-50 font-medium">{subtitle}</p>
        <div className="flex gap-4 justify-center pt-8">
          <Link href="/booking" className="bg-[#C21835] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-full">بوابة المريض</Link>
        </div>
      </div>
    </div>
  );
}