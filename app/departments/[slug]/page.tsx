import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { Department, Doctor } from "@/types/department";

import Icon from "@/components/common/Icon";
import SectionHeading from "@/components/department/SectionHeading";
import QuickAction from "@/components/department/QuickAction";
import DoctorCard from "@/components/department/DoctorCard";
import LiveDepartmentHero from "@/components/department/LiveDepartmentHero";

const builder = createImageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

/* =========================================================
   DATA FETCHING
========================================================= */

async function getDepartmentData(slug: string) {
  const departmentQuery = `*[
    _type == "department" &&
    slug.current == $slug
  ][0]{
    _id, title, description, image, emergencyInfo,
    trustIndicators[]{ title, description, icon },
    conditions,
    symptoms[]{ title, description, emergency },
    services[]{ name, description },
    procedures[]{ name, description },
    technologies,
    equipment[]{ name, description, image },
    emergencyRedFlags[]{ title, description },
    patientJourney[]{ title, description },
    beforeVisit, afterCare,
    tools[]{ title, description, href, icon },
    videos[]{ title, description, url, thumbnail },
    faqs[]{ question, answer },
    contact{ phone, extension, location },
    ctaTitle, ctaDescription,
    "slug": slug.current
  }`;

  const department = (await client.fetch(
    departmentQuery,
    { slug },
    { next: { revalidate: 300, tags: [`department:${slug}`] } }
  )) as Department | null;

  if (!department) return { department: null, doctors: [] };

  const doctorsQuery = `*[_type == "doctor" && department match $departmentTitle]{ _id, name, specialty, department, image, days, time, isCosmetic }`;
  const doctors = (await client.fetch(
    doctorsQuery,
    { departmentTitle: department.title },
    { next: { revalidate: 300, tags: [`department-doctors:${department._id}`] } }
  )) as Doctor[];

  return { department, doctors };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { department } = await getDepartmentData(slug);

  if (!department) return { title: "القسم غير متوفر | المستشفى الأوربي الحديث" };

  return {
    title: `${department.title} | المستشفى الأوربي الحديث`,
    description: department.description || `تعرف على خدمات ${department.title}.`,
    openGraph: {
      title: `${department.title} | المستشفى الأوربي الحديث`,
      description: department.description || `تعرف على خدمات ${department.title}.`,
      images: department.image ? [urlFor(department.image).width(1200).height(630).url()] : [],
    },
  };
}

/* =========================================================
   PAGE MAIN RENDER
========================================================= */

export default async function DepartmentDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { department, doctors } = await getDepartmentData(slug);

  if (!department) {
    notFound();
  }

  const hasConditions = Array.isArray(department.conditions) && department.conditions.length > 0;
  const hasSymptoms = Array.isArray(department.symptoms) && department.symptoms.length > 0;
  const hasServices = Array.isArray(department.services) && department.services.length > 0;
  const hasProcedures = Array.isArray(department.procedures) && department.procedures.length > 0;
  const hasTechnologies = Array.isArray(department.technologies) && department.technologies.length > 0;
  const hasEquipment = Array.isArray(department.equipment) && department.equipment.length > 0;
  const hasJourney = Array.isArray(department.patientJourney) && department.patientJourney.length > 0;
  const hasBeforeVisit = Array.isArray(department.beforeVisit) && department.beforeVisit.length > 0;
  const hasAfterCare = Array.isArray(department.afterCare) && department.afterCare.length > 0;
  const hasTools = Array.isArray(department.tools) && department.tools.length > 0;
  const hasVideos = Array.isArray(department.videos) && department.videos.length > 0;
  const hasFaqs = Array.isArray(department.faqs) && department.faqs.length > 0;
  const hasEmergency = Boolean(department.emergencyInfo) || Boolean(department.emergencyRedFlags && department.emergencyRedFlags.length);

  return (
    <main dir="rtl" className="min-h-screen overflow-x-hidden bg-[#F6F8FC] pb-[82px] font-sans text-slate-800 md:pb-0">
      
      {/* TOP STRIP */}
      <div className="hidden bg-[#0D2B52] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> المستشفى الأوربي الحديث
          </div>
          <div className="flex items-center gap-5 text-white/65">
            <span>بوابة القسم الطبية</span>
            {department.contact?.phone && <span dir="ltr">{department.contact.phone}</span>}
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-[80] border-b border-slate-200/70 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:h-[76px] md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 md:h-12 md:w-12 md:rounded-2xl">
              <img src="/images/logo.png" alt="المستشفى الأوربي الحديث" className="h-8 w-8 object-contain md:h-10 md:w-10" />
              <span className="absolute left-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <div className="text-[14px] font-black text-[#D92541] md:text-xl">
                المستشفى <span className="text-[#0069D9]">الأوربي</span> الحديث
              </div>
              <div className="hidden text-[8px] font-bold tracking-[0.15em] text-slate-400 md:block">MODERN EUROPEAN HOSPITAL</div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/departments" className="hidden rounded-full border border-slate-200 px-4 py-2 text-xs font-black text-[#18529D] md:inline-flex">جميع الأقسام</Link>
            <Link href={`/booking?department=${encodeURIComponent(department.title)}`} className="rounded-full bg-[#D92541] px-4 py-2.5 text-[10px] font-black text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-[#BF1D35] md:px-5 md:text-xs">
              احجز موعدًا
            </Link>
          </div>
        </div>
      </header>

      {/* LIVE HERO */}
      <LiveDepartmentHero 
        department={department} 
        doctorCount={doctors.length} 
        serviceCount={(department.services?.length || 0) + (department.procedures?.length || 0)} 
      />

      {/* QUICK ACTIONS */}
      <section className="relative z-20 -mt-7 px-4 md:-mt-9 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-2 rounded-[1.6rem] border border-slate-100 bg-white p-3 shadow-2xl md:grid-cols-5 md:gap-3 md:rounded-[2rem] md:p-4">
            <QuickAction href="#conditions" icon="brain" title="ماذا نعالج؟" />
            <QuickAction href="#symptoms" icon="doctor" title="هل هذه أعراضك؟" />
            <QuickAction href="#emergency" icon="emergency" title="متى تكون طارئة؟" danger />
            <QuickAction href="#journey" icon="location" title="رحلة المريض" />
            <QuickAction href="#preparation" icon="check" title="كيف أستعد؟" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-12">
        <div className="grid gap-3 md:grid-cols-3">
          {(department.trustIndicators?.length ? department.trustIndicators : [
            { title: "رعاية متخصصة", description: "معلومات منظمة حول نطاق خدمات القسم.", icon: "doctor" },
            { title: "فريق طبي", description: "انتقل من القسم إلى أطباء القسم مباشرة.", icon: "heart" },
            { title: "تجربة رقمية", description: "معلومات وأدوات تجعل رحلة المريض أوضح.", icon: "shield" }
          ]).map((item, index) => {
            if (!item) return null;
            return (
              <div key={`trust-${index}`} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:p-5 text-right">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#18529D]">
                  <Icon name={item.icon || "shield"} size={21} />
                </div>
                <div>
                  <h3 className="text-xs font-black text-[#18529D] md:text-sm">{item.title}</h3>
                  {item.description && <p className="mt-1 text-[9px] leading-5 text-slate-500 md:text-[10px]">{item.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONDITIONS */}
      {hasConditions && (
        <section id="conditions" className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-20">
          <SectionHeading eyebrow="CONDITIONS" title="ماذا يعالج هذا القسم؟" description="تعرف على الحالات والمجالات التي يغطيها القسم وفق المحتوى المنشور من المستشفى." />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {department.conditions!.map((condition, index) => {
              if (!condition) return null;
              return (
                <div key={`cond-${index}`} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl md:rounded-[1.6rem] md:p-6 text-right">
                  <div className="absolute right-0 top-0 h-full w-1 bg-[#18529D] transition group-hover:bg-[#D92541]" />
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[10px] font-black text-[#18529D] md:h-11 md:w-11 md:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="line-clamp-2 text-xs font-black leading-5 text-[#18529D] md:text-lg">{condition}</h3>
                  <p className="mt-2 line-clamp-3 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">معلومات تعريفية حول الحالة ضمن نطاق القسم.</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SYMPTOMS */}
      {hasSymptoms && (
        <section id="symptoms" className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="HEALTH NAVIGATOR" title="هل تبحث عن نقطة بداية لأعراضك؟" description="هذه معلومات تثقيفية وتوجيهية فقط، ولا تعني وجود تشخيص محدد." />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {department.symptoms!.map((symptom, index) => {
                if (!symptom) return null;
                return (
                  <div key={`symp-${index}`} className={`rounded-2xl border p-4 transition hover:-translate-y-1 md:rounded-[1.6rem] md:p-6 text-right ${symptom.emergency ? "border-[#F3C8D1] bg-[#FFF8F9]" : "border-slate-200 bg-[#F8FAFD]"}`}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D]">
                        <Icon name={symptom.emergency ? "emergency" : "activity"} size={18} />
                      </div>
                      {symptom.emergency && <span className="rounded-full bg-[#D92541] px-2 py-1 text-[7px] font-black text-white md:text-[9px]">انتبه</span>}
                    </div>
                    <h3 className="mt-4 text-xs font-black text-[#18529D] md:text-lg">{symptom.title}</h3>
                    {symptom.description && <p className="mt-2 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">{symptom.description}</p>}
                    <div className="mt-4 border-t border-slate-100 pt-3 text-[8px] font-bold text-slate-400 md:text-[9px]">لا تستخدم هذه المعلومات للتشخيص الذاتي.</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* EMERGENCY */}
      {hasEmergency && (
        <section id="emergency" className="px-4 py-12 md:px-8 md:py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0D2B52] shadow-2xl">
            <div className="grid lg:grid-cols-[.75fr_1.25fr]">
              <div className="bg-[#D92541] p-6 text-white md:p-10 text-right">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <Icon name="emergency" size={26} />
                </div>
                <h2 className="mt-5 text-2xl font-black md:text-3xl">متى يجب ألا تنتظر؟</h2>
                <p className="mt-3 text-[10px] leading-6 text-white/80 md:text-sm md:leading-7">{department.emergencyInfo || "عند وجود أعراض شديدة أو مفاجئة، يجب طلب التقييم الطبي العاجل وفق تعليمات الطوارئ المعتمدة."}</p>
                <Link href="/emergency" className="mt-6 inline-flex rounded-full bg-white px-5 py-2.5 text-[10px] font-black text-[#D92541] md:text-xs">افتح دليل الطوارئ</Link>
              </div>
              <div className="p-5 md:p-10 text-right">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-sm font-black text-white md:text-lg">علامات تستحق اهتمامًا عاجلًا</h3>
                  <Icon name="activity" size={21} />
                </div>
                <div className="grid grid-cols-2 gap-2 md:gap-3">
                  {(department.emergencyRedFlags?.length ? department.emergencyRedFlags : [
                    { title: "تدهور مفاجئ", description: "ظهور أعراض شديدة أو جديدة بصورة مفاجئة." },
                    { title: "فقدان الوعي", description: "تغير واضح أو مفاجئ في الوعي." }
                  ]).map((flag, index) => {
                    if (!flag) return null;
                    return (
                      <div key={`flag-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="mb-3 flex h-2 w-2 rounded-full bg-[#EF476F]" />
                        <h4 className="text-[10px] font-black text-white md:text-xs">{flag.title}</h4>
                        {flag.description && <p className="mt-2 text-[8px] leading-5 text-white/55 md:text-[10px] md:leading-6">{flag.description}</p>}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-[8px] leading-5 text-white/45 md:text-[10px]">هذه الصفحة لا تستبدل التقييم الطبي المباشر.</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES & PROCEDURES */}
      {(hasServices || hasProcedures) && (
        <section id="services" className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="SERVICES" title="الخدمات والإجراءات" description="استكشف ما يقدمه القسم بطريقة منظمة وواضحة." />
            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              {hasServices && (
                <div className="rounded-[1.7rem] bg-[#F7F9FC] p-5 md:p-7 text-right">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#18529D] text-white"><Icon name="check" size={22} /></div>
                    <h3 className="text-lg font-black text-[#18529D] md:text-2xl">خدمات القسم</h3>
                  </div>
                  <div className="mt-5 space-y-2.5">
                    {department.services!.map((service, index) => {
                      if (!service) return null;
                      return (
                        <div key={`srv-${index}`} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                          <div className="flex items-start gap-3">
                            <span className="mt-1 flex h-2 w-2 shrink-0 rounded-full bg-[#0069D9]" />
                            <div>
                              <h4 className="text-xs font-black text-[#18529D] md:text-sm">{service.name}</h4>
                              {service.description && <p className="mt-1.5 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">{service.description}</p>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {hasProcedures && (
                <div className="rounded-[1.7rem] bg-[#18529D] p-5 md:p-7 text-right">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white"><Icon name="doctor" size={22} /></div>
                    <h3 className="text-lg font-black text-white md:text-2xl">الإجراءات</h3>
                  </div>
                  <div className="mt-5 space-y-2.5">
                    {department.procedures!.map((procedure, index) => {
                      if (!procedure) return null;
                      return (
                        <div key={`proc-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <h4 className="text-xs font-black text-white md:text-sm">{procedure.name}</h4>
                          {procedure.description && <p className="mt-1.5 text-[9px] leading-5 text-white/55 md:text-xs md:leading-6">{procedure.description}</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* TECHNOLOGY */}
      {(hasTechnologies || hasEquipment) && (
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="TECHNOLOGY" title="التقنيات والتجهيزات" description="تعرف على التقنيات والمعدات المنشورة للقسم." />
            {hasTechnologies && (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
                {department.technologies!.map((technology, index) => {
                  if (!technology) return null;
                  return (
                    <div key={`tech-${index}`} className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-lg md:p-5 text-right">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D]"><Icon name="spark" size={17} /></div>
                      <span className="text-[10px] font-bold leading-5 text-slate-700 md:text-xs">{technology}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {hasEquipment && (
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
                {department.equipment!.map((equipment, index) => {
                  if (!equipment) return null;
                  return (
                    <div key={`eq-${index}`} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm text-right">
                      {equipment.image ? (
                        <img src={urlFor(equipment.image).width(800).height(500).fit("crop").url()} alt={equipment.name} className="h-32 w-full object-cover md:h-52" />
                      ) : (
                        <div className="flex h-32 items-center justify-center bg-gradient-to-br from-[#0069D9] to-[#18529D] text-white md:h-52"><Icon name="hospital" size={40} /></div>
                      )}
                      <div className="p-3 md:p-5">
                        <h3 className="text-xs font-black text-[#18529D] md:text-sm">{equipment.name}</h3>
                        {equipment.description && <p className="mt-2 line-clamp-3 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">{equipment.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* PATIENT JOURNEY */}
      {hasJourney && (
        <section id="journey" className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="PATIENT JOURNEY" title="رحلتك داخل القسم" description="خطوات واضحة تساعدك على فهم مسار الزيارة." />
            <div className="relative">
              <div className="absolute right-5 top-5 hidden h-[calc(100%-40px)] w-px bg-slate-200 md:block" />
              <div className="space-y-3 md:space-y-5">
                {department.patientJourney!.map((step, index) => {
                  if (!step) return null;
                  return (
                    <div key={`step-${index}`} className="relative flex gap-4 rounded-[1.4rem] border border-slate-200 bg-[#F8FAFD] p-4 md:gap-6 md:rounded-[1.8rem] md:p-6 md:pr-16 text-right">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#18529D] text-xs font-black text-white shadow-lg md:h-12 md:w-12">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-[#18529D] md:text-xl">{step.title}</h3>
                        {step.description && <p className="mt-1.5 text-[9px] leading-5 text-slate-500 md:text-sm md:leading-7">{step.description}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PREPARATION */}
      {hasBeforeVisit && (
        <section id="preparation" className="bg-[#18529D] py-12 text-white md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="BEFORE YOUR VISIT" title="كيف تستعد لزيارتك؟" description="خطوات عامة منشورة من القسم لمساعدة المريض." light />
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
              {department.beforeVisit!.map((item, index) => {
                if (!item) return null;
                return (
                  <div key={`prep-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-5 text-right">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white"><Icon name="check" size={18} /></div>
                    <p className="mt-3 text-[9px] leading-5 text-white/75 md:text-xs md:leading-6">{item}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-[9px] leading-6 text-white/55 md:text-xs">
              تعليمات الصيام أو الأدوية أو التحضير لإجراء طبي يجب أن تكون وفق تعليمات الطبيب والقسم.
            </div>
          </div>
        </section>
      )}

      {/* AFTER CARE */}
      {hasAfterCare && (
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="AFTER CARE" title="ماذا بعد الزيارة؟" description="إرشادات عامة تساعدك على فهم الخطوات التالية." />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {department.afterCare!.map((item, index) => {
                if (!item) return null;
                return (
                  <div key={`after-${index}`} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6 text-right">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D]"><Icon name="check" size={18} /></div>
                    <p className="mt-3 text-[9px] font-bold leading-5 text-slate-600 md:text-xs md:leading-7">{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* DOCTORS */}
      <section id="doctors" className="bg-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeading eyebrow="OUR MEDICAL TEAM" title={`أطباء ${department.title}`} description="تعرف على الفريق الطبي المرتبط بالقسم." />
          {doctors.length === 0 ? (
            <div className="rounded-[1.7rem] border border-dashed border-slate-300 bg-[#F8FAFD] p-12 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#18529D] shadow-sm"><Icon name="doctor" size={28} /></div>
              <h3 className="mt-5 text-lg font-black text-[#18529D]">بيانات الأطباء قيد التحديث</h3>
              <p className="mt-2 text-xs text-slate-500">سيتم عرض الفريق الطبي عند نشر البيانات.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
              {doctors.map((doctor) => {
                if (!doctor) return null;
                return <DoctorCard key={doctor._id} doctor={doctor} departmentName={department.title} />;
              })}
            </div>
          )}
        </div>
      </section>

      {/* DIGITAL TOOLS */}
      {hasTools && (
        <section className="bg-[#F6F8FC] py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="DIGITAL TOOLS" title="أدوات رقمية للقسم" description="انتقل مباشرة إلى الأدوات والخدمات الرقمية المرتبطة بالمحتوى." />
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
              {department.tools!.map((tool, index) => {
                if (!tool) return null;
                return (
                  <div key={`tool-${index}`} className="group flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:p-6 text-right">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white">
                      <Icon name={tool.icon || "spark"} size={21} />
                    </div>
                    <h3 className="mt-4 text-xs font-black text-[#18529D] md:text-lg">{tool.title}</h3>
                    {tool.description && <p className="mt-2 line-clamp-3 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">{tool.description}</p>}
                    {tool.href && (
                      <Link href={tool.href} className="mt-auto pt-4 inline-flex items-center gap-1 text-[9px] font-black text-[#D92541] md:text-xs">
                        افتح الأداة <Icon name="arrow" size={12} />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* VIDEOS */}
      {hasVideos && (
        <section className="bg-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-8">
            <SectionHeading eyebrow="DOCTOR EXPLAINS" title="طبيبنا يشرح" description="محتوى مبسط يساعد المريض على فهم الموضوع الصحي بشكل أفضل." />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {department.videos!.map((video, index) => {
                if (!video) return null;
                return (
                  <a key={`vid-${index}`} href={video.url || "#"} target={video.url ? "_blank" : undefined} rel={video.url ? "noopener noreferrer" : undefined} className="group overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl text-right">
                    <div className="relative h-48 overflow-hidden bg-[#18529D] md:h-56">
                      {video.thumbnail ? (
                        <img src={urlFor(video.thumbnail).width(800).height(500).fit("crop").url()} alt={video.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/70"><Icon name="activity" size={40} /></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B52]/80 to-transparent" />
                      <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#18529D] shadow-xl"><Icon name="play" size={19} /></div>
                    </div>
                    <div className="p-5">
                      <h3 className="line-clamp-2 text-sm font-black text-[#18529D] md:text-lg">{video.title}</h3>
                      {video.description && <p className="mt-2 line-clamp-3 text-[9px] leading-5 text-slate-500 md:text-xs md:leading-6">{video.description}</p>}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {hasFaqs && (
        <section className="bg-[#F6F8FC] py-12 md:py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <SectionHeading eyebrow="FAQ" title="الأسئلة الشائعة" description="إجابات مختصرة عن الأسئلة الأكثر شيوعًا." />
            <div className="space-y-3">
              {department.faqs!.map((faq, index) => {
                if (!faq) return null;
                return (
                  <details key={`faq-${index}`} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-right">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-xs font-black text-[#18529D] md:p-5 md:text-sm">
                      <span>{faq.question}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EAF2FF] text-[#18529D] transition group-open:rotate-45">+</span>
                    </summary>
                    <div className="border-t border-slate-100 px-4 pb-5 pt-3 text-[9px] leading-6 text-slate-500 md:px-5 md:text-xs md:leading-7">
                      {faq.answer}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="px-4 py-10 md:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-l from-[#18529D] to-[#0D2B52] p-6 text-white shadow-2xl md:rounded-[2.5rem] md:p-10">
          <div className="grid items-center gap-7 md:grid-cols-[1fr_auto] md:gap-10 text-center md:text-right">
            <div>
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[9px] font-black md:text-xs">{department.title}</div>
              <h2 className="mt-3 text-xl font-black leading-tight md:text-3xl">{department.ctaTitle || `هل تحتاج إلى زيارة ${department.title}؟`}</h2>
              <p className="mt-2 max-w-2xl text-[10px] leading-6 text-white/60 md:text-sm md:leading-7">{department.ctaDescription || "تعرف على الخدمات وفريق الأطباء ثم انتقل إلى الحجز بطريقة سهلة."}</p>
              {department.contact?.location && (
                <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-[9px] text-white/60 md:text-xs">
                  <Icon name="location" size={15} /> {department.contact.location}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row md:flex-col justify-center">
              <Link href={`/booking?department=${encodeURIComponent(department.title)}`} className="inline-flex min-w-44 items-center justify-center rounded-full bg-[#D92541] px-6 py-3 text-xs font-black text-white transition hover:bg-[#BF1D35]">احجز موعدًا</Link>
              <Link href="/departments" className="inline-flex min-w-44 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs font-black text-white transition hover:bg-white/10">جميع الأقسام</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D2B52]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center md:flex-row md:px-8 md:text-right">
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.png" alt="المستشفى الأوربي الحديث" className="h-9 w-9 object-contain" />
            <div>
              <div className="text-xs font-black text-white">المستشفى الأوربي الحديث</div>
              <div className="mt-0.5 text-[8px] text-white/35">DIGITAL HEALTH EXPERIENCE</div>
            </div>
          </div>
          <div className="text-[8px] text-white/35">© {new Date().getFullYear()} جميع الحقوق محفوظة</div>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAV */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,50,90,0.12)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 text-center text-slate-400">
          <Link href="/" className="py-2 text-[10px] font-bold"><Icon name="home" size={20} className="mx-auto mb-1" />الرئيسية</Link>
          <Link href="/departments" className="py-2 text-[10px] font-bold text-[#0069D9]"><Icon name="hospital" size={20} className="mx-auto mb-1" />الأقسام</Link>
          <Link href="#doctors" className="py-2 text-[10px] font-bold"><Icon name="doctor" size={20} className="mx-auto mb-1" />الأطباء</Link>
          <Link href="/booking" className="py-2 text-[10px] font-bold"><Icon name="calendar" size={20} className="mx-auto mb-1" />الحجز</Link>
        </div>
      </nav>

    </main>
  );
}