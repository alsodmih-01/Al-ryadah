import Link from 'next/link';

export default function HeroSection() {
  const title = "رعاية صحية تليق بثقتكم";
  const subtitle = "نجمع بين دقة التشخيص، حداثة التقنية، ومهارة الكادر الطبي.";
  const bgImage = "/images/the_building.png"; // تم استخدام صورة المستشفى

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden" dir="rtl">
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity" style={{ backgroundImage: `url('${bgImage}')` }}>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#0056B3] via-[#0056B3]/80 to-[#0056B3]/10"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-black text-white">{title}</h1>
        <p className="text-lg md:text-2xl text-blue-50 font-medium">{subtitle}</p>
        <div className="flex gap-4 justify-center pt-8">
          <Link href="/booking" className="bg-[#C21835] hover:bg-red-800 text-white font-bold px-8 py-4 rounded-full shadow-lg transition">بوابة المريض</Link>
        </div>
      </div>
    </div>
  );
}