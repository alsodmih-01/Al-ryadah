import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "المستشفى الأوربي الحديث",
  description: "بوابة حجز المواعيد الطبية وإدارة ملفات المرضى",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} min-h-full flex flex-col bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}