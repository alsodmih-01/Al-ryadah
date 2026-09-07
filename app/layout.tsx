import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// استيراد خط "القاهرة" الرسمي والممتاز للواجهات الطبية والمؤسسية
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// عنوان ووصف الموقع الذي سيظهر في المتصفح ومحركات البحث
export const metadata: Metadata = {
  title: "مستشفى الريادة الدولي",
  description: "بوابة حجز المواعيد الطبية وإدارة ملفات المرضى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // السر هنا: lang="ar" و dir="rtl" لقلب الموقع كاملاً
<html lang="ar" dir="rtl">      <body 
        className={`${cairo.className} min-h-full flex flex-col bg-slate-50 text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}