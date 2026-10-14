"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* =========================================================
   BRAND
========================================================= */

const BRAND = {
  navy: "#18529D",
  blue: "#0069D9",
  red: "#D92541",
  gold: "#D4AF37",
  soft: "#F5F8FC",
  dark: "#0D2B52",
};

/* =========================================================
   TYPES
========================================================= */

type IconName =
  | "home"
  | "hospital"
  | "doctor"
  | "calendar"
  | "more"
  | "search"
  | "emergency"
  | "lab"
  | "child"
  | "mother"
  | "heart"
  | "brain"
  | "bone"
  | "clinic"
  | "navigator"
  | "calculator"
  | "firstaid"
  | "journey"
  | "book"
  | "bell"
  | "arrow"
  | "phone"
  | "clock"
  | "location"
  | "chevron"
  | "activity"
  | "check"
  | "x"
  | "menu"
  | "close"
  | "sparkles"
  | "play"
  | "shield"
  | "whatsapp"
  | "droplet";

type Slide = {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  badge?: string;
};

type Announcement = {
  id: number;
  type: "خبر" | "تنبيه" | "حملة" | "عرض" | "فعالية";
  title: string;
  description: string;
  date: string;
  href: string;
  image?: string;
};

type RadarItem = {
  id: number;
  label: string;
  value: string;
  status: "normal" | "busy" | "alert";
  icon: IconName;
};

type InsuranceCompany = {
  name: string;
  logo: string;
};

/* =========================================================
   HERO SLIDER DATA
========================================================= */

const heroSlides: Slide[] = [
  {
    id: 1,
    image: "/images/the_building.png",
    eyebrow: "المستشفى الأوربي الحديث",
    title: "رعايتك تبدأ من هنا.",
    description:
      "اكتشف الخدمات، ابحث عن الطبيب المناسب، احجز موعدك واستكشف الأدوات الصحية الرقمية من مكان واحد.",
    primaryLabel: "احجز موعدك",
    primaryHref: "/booking",
    secondaryLabel: "استكشف الخدمات",
    secondaryHref: "/services",
    badge: "DIGITAL CARE",
  },
  {
    id: 2,
    image: "/images/hospital-bg.jpg",
    eyebrow: "تجربة صحية رقمية",
    title: "لا تبدأ باسم الطبيب... ابدأ بما تحتاجه.",
    description:
      "استخدم المساعد الصحي للوصول إلى التخصص أو الخدمة التي قد تكون نقطة البداية المناسبة لك.",
    primaryLabel: "ابدأ المساعد الصحي",
    primaryHref: "/health-navigator",
    secondaryLabel: "الأقسام الطبية",
    secondaryHref: "/departments",
    badge: "SMART HEALTH",
  },
  {
    id: 3,
    image: "/images/the_building.png",
    eyebrow: "معك قبل الزيارة وبعدها",
    title: "رحلة المريض أصبحت أوضح.",
    description:
      "تعرف على خطوات الزيارة، كيفية الاستعداد للفحوصات والخدمات التي تساعدك بعد الرعاية.",
    primaryLabel: "شاهد رحلة المريض",
    primaryHref: "/patient-journey",
    secondaryLabel: "دليل الفحوصات",
    secondaryHref: "/tests-guide",
    badge: "PATIENT JOURNEY",
  },
];

/* =========================================================
   CMS-READY ANNOUNCEMENTS
========================================================= */

const fallbackAnnouncements: Announcement[] = [
  {
    id: 1,
    type: "خبر",
    title: "اكتشف مركز الصحة الرقمي",
    description:
      "أدوات صحية، إرشادات، حاسبات ورحلة رقمية أسهل من مكان واحد.",
    date: "اليوم",
    href: "/services",
    image: "/images/hospital-bg.jpg",
  },
  {
    id: 2,
    type: "فعالية",
    title: "تابع أخبار وفعاليات المستشفى",
    description:
      "تعرف على الحملات والأنشطة والتحديثات الجديدة التي يعلن عنها المستشفى.",
    date: "هذا الأسبوع",
    href: "/contact",
    image: "/images/the_building.png",
  },
  {
    id: 3,
    type: "تنبيه",
    title: "حالة طارئة؟ لا تؤخر طلب الرعاية",
    description:
      "استخدم دليل الطوارئ للتعرف على علامات الخطر التي تستدعي عناية عاجلة.",
    date: "مهم",
    href: "/emergency",
    image: "/images/hospital-bg.jpg",
  },
];

/* =========================================================
   FEATURED HOSPITAL VIDEO
========================================================= */

const featuredHospitalVideo = {
  eyebrow: "HOSPITAL ANNOUNCEMENT",
  label: "إعلان المستشفى",
  title: "تدشين أحدث جهاز للأشعة فوق الصوتية عبر المنظار",
  subtitle: "Endoscopic Ultrasound — EUS",
  description:
    "في خطوة تعزز مكانة المستشفى الأوربي الحديث كوجهة رائدة للخدمات الطبية في اليمن، يعلن المستشفى عن تشغيل أحدث جهاز للأشعة فوق الصوتية عبر المنظار، ليكون من المستشفيات السباقة في توطين هذه التقنية في بلادنا.",
  details:
    "تم الإعلان خلال حفل التدشين الذي حضره رئيس وأعضاء مجلس الإدارة، ونخبة من الأطباء والاستشاريين، ومدراء الإدارات ورؤساء الأقسام الطبية والإدارية، إضافة إلى حضور رسمي من مدير مكتب الصحة والبيئة بأمانة العاصمة.",
  video: "/videos/hospital-eus-launch.mp4",
  poster: "/images/announcements/eus-launch-poster.jpg",
};

/* =========================================================
   QUICK ACTIONS
========================================================= */

const quickActions = [
  {
    title: "احجز موعدًا",
    subtitle: "اختر الطبيب والوقت",
    href: "/booking",
    icon: "calendar" as IconName,
    tone: "blue",
    featured: true,
  },
  {
    title: "طبيبي المناسب",
    subtitle: "اعثر على الطبيب",
    href: "/doctors",
    icon: "doctor" as IconName,
    tone: "navy",
    featured: false,
  },
  {
    title: "لدي أعراض",
    subtitle: "من أين أبدأ؟",
    href: "/health-navigator",
    icon: "navigator" as IconName,
    tone: "teal",
    featured: false,
  },
  {
    title: "حالة طارئة",
    subtitle: "علامات الخطر",
    href: "/emergency",
    icon: "emergency" as IconName,
    tone: "red",
    featured: false,
  },
  {
    title: "الفحوصات",
    subtitle: "دليل التحضير",
    href: "/tests-guide",
    icon: "lab" as IconName,
    tone: "gold",
    featured: false,
  },
  {
    title: "الأقسام",
    subtitle: "استكشف التخصصات",
    href: "/departments",
    icon: "hospital" as IconName,
    tone: "purple",
    featured: false,
  },
];

/* =========================================================
   DIGITAL HEALTH SERVICES
========================================================= */

const digitalServices = [
  {
    title: "المساعد الصحي",
    description: "ابدأ من الأعراض أو احتياجك الصحي.",
    href: "/health-navigator",
    icon: "navigator" as IconName,
    badge: "SMART",
  },
  {
    title: "الحاسبات الصحية",
    description: "أدوات وحاسبات تثقيفية سهلة الاستخدام.",
    href: "/health-tools",
    icon: "calculator" as IconName,
    badge: "TOOLS",
  },
  {
    title: "الإسعافات الأولية",
    description: "إرشادات عامة سريعة عند الحاجة.",
    href: "/first-aid",
    icon: "firstaid" as IconName,
    badge: "GUIDE",
  },
  {
    title: "دليل الفحوصات",
    description: "تعرف على كيفية الاستعداد لبعض الفحوصات.",
    href: "/tests-guide",
    icon: "lab" as IconName,
    badge: "PREPARE",
  },
  {
    title: "رحلة المريض",
    description: "افهم خطوات رحلتك داخل المستشفى.",
    href: "/patient-journey",
    icon: "journey" as IconName,
    badge: "CARE",
  },
  {
    title: "المحتوى الطبي",
    description: "مقالات ومحتوى صحي تثقيفي.",
    href: "/health-library",
    icon: "book" as IconName,
    badge: "LEARN",
  },
  {
    title: "بنك الدم الرقمي",
    description: "الوصول السريع للمتبرعين في الحالات الحرجة.",
    href: "/blood-bank",
    icon: "droplet" as IconName,
    badge: "BLOOD BANK",
  },
];

/* =========================================================
   DEPARTMENTS
========================================================= */

const departments = [
  {
    title: "القلب والقسطرة",
    description: "رعاية متخصصة للحالات القلبية والخدمات التداخلية.",
    href: "/departments/cardiac-cath",
    icon: "heart" as IconName,
  },
  {
    title: "جراحة المخ والأعصاب",
    description: "خدمات للدماغ والعمود الفقري والأعصاب.",
    href: "/departments/neurosurgery",
    icon: "brain" as IconName,
  },
  {
    title: "الأطفال",
    description: "رعاية صحية متخصصة للأطفال.",
    href: "/departments/pediatrics",
    icon: "child" as IconName,
  },
  {
    title: "النساء والولادة",
    description: "رعاية متكاملة للمرأة والحمل والولادة.",
    href: "/departments/obstetrics",
    icon: "mother" as IconName,
  },
];

/* =========================================================
   INSURANCE
   IMPORTANT:
   Put these images under:
   public/images/insurance/
========================================================= */

const insuranceCompanies: InsuranceCompany[] = [
  {
    name: "الشركة المتحدة للتأمين",
    logo: "https://cpanel.uicyemen.com/storage/general-settings-images/01JW8D5D624XH2MQRQ003WJE1M.svg",
  },
  {
    name: "الشركة اليمنية للتأمين",
    logo: "https://yginsurance.com/images/ygilogo_h80.png",
  },
  {
    name: "شركة التضامن للتأمين",
    logo: "https://altadamun-ins.iq/static/img/common/logo.svg",
  },
  {
    name: "شركة مأرب للتأمين",
    logo: "https://www.myicyemen.com/logo-new.png",
  },
  {
    name: "الشركة الإسلامية للتأمين",
    logo: "https://www.yiic.co/assets/uploads/media-uploader/yiclogo21658536962.svg",
  },
  {
    name: "كاك للتأمين",
    logo: "https://cacinsurance.com.ye/images/logo.png",
  },
];

/* =========================================================
   LIVE RADAR
========================================================= */

const radarItems: RadarItem[] = [
  {
    id: 1,
    label: "العيادات الخارجية",
    value: "نشطة",
    status: "normal",
    icon: "doctor",
  },
  {
    id: 2,
    label: "الاستقبال",
    value: "نشط",
    status: "normal",
    icon: "hospital",
  },
  {
    id: 3,
    label: "المختبر",
    value: "متوسط",
    status: "busy",
    icon: "lab",
  },
  {
    id: 4,
    label: "الطوارئ",
    value: "مفتوحة",
    status: "normal",
    icon: "emergency",
  },
];

/* =========================================================
   ICON
========================================================= */

function Icon({
  name,
  size = 24,
  strokeWidth = 1.8,
}: {
  name?: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...props}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case "hospital":
      return (
        <svg {...props}>
          <path d="M4 21V5l8-3 8 3v16" />
          <path d="M9 21v-5h6v5" />
          <path d="M12 6v5M9.5 8.5h5" />
        </svg>
      );

    case "doctor":
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="4" />
          <path d="M5 22a7 7 0 0 1 14 0" />
          <path d="M9 7h6" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18" />
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
        </svg>
      );

    case "more":
      return (
        <svg {...props}>
          <circle
            cx="5"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="12"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
          <circle
            cx="19"
            cy="12"
            r="1.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="6.5" />
          <path d="m16 16 5 5" />
        </svg>
      );

    case "emergency":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );

    case "lab":
      return (
        <svg {...props}>
          <path d="M9 3v6l-4.5 7.5A3 3 0 0 0 7 21h10a3 3 0 0 0 2.5-4.5L15 9V3" />
          <path d="M8 3h8M7 16h10" />
        </svg>
      );

    case "child":
      return (
        <svg {...props}>
          <circle cx="12" cy="7" r="3" />
          <path d="M5 21a7 7 0 0 1 14 0" />
          <path d="M9 13h6" />
        </svg>
      );

    case "mother":
      return (
        <svg {...props}>
          <circle cx="12" cy="6" r="3" />
          <path d="M6 21a6 6 0 0 1 12 0" />
          <path d="M8 13c2 2 6 2 8 0" />
        </svg>
      );

    case "heart":
      return (
        <svg {...props}>
          <path d="M20.8 8.6c0 5.5-8.8 11.2-8.8 11.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.3Z" />
        </svg>
      );

    case "brain":
      return (
        <svg {...props}>
          <path d="M9 4.5A3.5 3.5 0 0 0 5.5 8c0 .6.2 1.2.5 1.7A3.5 3.5 0 0 0 7 16.5c.4 0 .8-.1 1.2-.2A3.5 3.5 0 0 0 12 20V4.5A3.5 3.5 0 0 0 9 4.5Z" />
          <path d="M15 4.5A3.5 3.5 0 0 1 18.5 8c0 .6-.2 1.2-.5 1.7A3.5 3.5 0 0 1 17 16.5c-.4 0-.8-.1-1.2-.2A3.5 3.5 0 0 1 12 20V4.5A3.5 3.5 0 0 1 15 4.5Z" />
        </svg>
      );

    case "bone":
      return (
        <svg {...props}>
          <path d="M7 4a2.5 2.5 0 1 0-3 3l8 8a2.5 2.5 0 1 0 3 3" />
          <path d="M17 20a2.5 2.5 0 1 0 3-3l-8-8a2.5 2.5 0 1 0-3-3" />
        </svg>
      );

    case "clinic":
      return (
        <svg {...props}>
          <path d="M4 21V5l8-3 8 3v16" />
          <path d="M9 21v-5h6v5" />
          <path d="M12 6v5M9.5 8.5h5" />
        </svg>
      );

    case "navigator":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z" />
        </svg>
      );

    case "calculator":
      return (
        <svg {...props}>
          <rect x="5" y="2" width="14" height="20" rx="2" />
          <path d="M8 6h8" />
          <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
      );

    case "firstaid":
      return (
        <svg {...props}>
          <rect x="3" y="6" width="18" height="14" rx="2" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M12 10v6M9 13h6" />
        </svg>
      );

    case "journey":
      return (
        <svg {...props}>
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="5" r="2" />
          <path d="M7 18c5-1 3-8 10-11" />
          <path d="M12 7h5v5" />
        </svg>
      );

    case "book":
      return (
        <svg {...props}>
          <path d="M4 5a3 3 0 0 1 3-3h5v18H7a3 3 0 0 0-3 3V5Z" />
          <path d="M20 5a3 3 0 0 0-3-3h-5v18h5a3 3 0 0 1 3 3V5Z" />
        </svg>
      );

    case "bell":
      return (
        <svg {...props}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...props}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "phone":
      return (
        <svg {...props}>
          <path d="M6.5 3.5 9 3l2 5-2 1.5c1 2 2.5 3.5 4.5 4.5L15 12l5 2 .5 2.5c.2 1-.5 2-1.5 2.5-1 .5-2 .7-3 .5-7-1.4-12.6-7-14-14-.2-1 .1-2 .5-3 .5-1 1.5-1.7 2.5-1.5Z" />
        </svg>
      );

    case "clock":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "location":
      return (
        <svg {...props}>
          <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );

    case "chevron":
      return (
        <svg {...props}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );

    case "activity":
      return (
        <svg {...props}>
          <path d="M3 12h4l2-7 4 14 2-7h6" />
        </svg>
      );

    case "check":
      return (
        <svg {...props}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "x":
    case "close":
      return (
        <svg {...props}>
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      );

    case "menu":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );

    case "sparkles":
      return (
        <svg {...props}>
          <path d="m12 3 1.2 4.3L17 9l-3.8 1.7L12 15l-1.2-4.3L7 9l3.8-1.7L12 3Z" />
          <path d="m19 14 .6 2.1L22 17l-2.4.9L19 20l-.6-2.1L16 17l2.4-.9L19 14Z" />
        </svg>
      );

    case "play":
      return (
        <svg {...props}>
          <path
            d="m9 6 8 6-8 6V6Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );

    case "whatsapp":
      return (
        <svg {...props}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );

    case "droplet":
      return (
        <svg {...props}>
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div className="animate-[fadeUp_.6s_ease-out_both]">
        {eyebrow && (
          <div className="mb-2 flex items-center gap-2 text-[10px] font-black tracking-[0.12em] text-[#D92541]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D92541]" />
            {eyebrow}
          </div>
        )}

        <h2 className="text-xl font-black leading-tight text-[#18529D] md:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-1.5 max-w-2xl text-xs leading-6 text-slate-500 md:text-sm">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="hidden shrink-0 items-center gap-1 text-xs font-black text-[#D92541] transition hover:gap-2 sm:flex"
        >
          {actionLabel}
          <Icon name="arrow" size={14} />
        </Link>
      )}
    </div>
  );
}

/* =========================================================
   MAIN
========================================================= */

export default function EuropeanModernHospital() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  /* -------------------------------------------------------
     HERO AUTO SLIDE
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     ANNOUNCEMENT AUTO SLIDE
  ------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setAnnouncementIndex(
        (current) => (current + 1) % fallbackAnnouncements.length
      );
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     STATUS MAP
  ------------------------------------------------------- */

  const statusMap = useMemo(
    () => ({
      normal: {
        label: "حالة مستقرة",
        dot: "bg-emerald-500",
        text: "text-emerald-600",
        bg: "bg-emerald-50",
      },
      busy: {
        label: "نشاط مرتفع",
        dot: "bg-amber-500",
        text: "text-amber-700",
        bg: "bg-amber-50",
      },
      alert: {
        label: "تنبيه",
        dot: "bg-red-500",
        text: "text-red-600",
        bg: "bg-red-50",
      },
    }),
    []
  );

  return (
    <main
      dir="rtl"
      className="relative min-h-screen overflow-x-hidden bg-[#F6F8FC] pb-[82px] font-sans text-slate-800 md:pb-0"
    >
      {/* ===================================================
          GLOBAL MOTION
      =================================================== */}

      <style jsx global>{`
        @keyframes heroZoom {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.07);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes softPulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* ===================================================
          DESKTOP / TABLET TOP HEADER
      =================================================== */}

      <div className="hidden bg-[#0D2B52] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs font-bold lg:px-8">
          <div className="flex items-center gap-2">
            <Icon name="location" size={14} />
            <span>العاصمة — شارع الستين الغربي</span>
          </div>

          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                style={{
                  animation:
                    "softPulse 2.4s ease-in-out infinite",
                }}
              />
              الخدمات الرقمية متاحة
            </span>

            <a
              href="tel:774778805"
              dir="ltr"
              className="flex items-center gap-2 transition hover:text-[#D4AF37]"
            >
              <Icon name="phone" size={14} />
              774778805
            </a>
          </div>
        </div>
      </div>

      {/* ===================================================
          APP HEADER
      =================================================== */}

      <header className="sticky top-0 z-[70] border-b border-white/60 bg-white/80 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 md:h-[76px] md:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5"
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/images/logo.png"
                alt="المستشفى الأوربي الحديث"
                className="object-contain"
                fill
                sizes="(max-width: 768px) 40px, 48px"
                priority
              />

              <span className="absolute -left-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 md:h-3 md:w-3" />
            </div>

            <div className="min-w-0">
              <div className="truncate text-[15px] font-black text-[#D92541] md:text-xl">
                المستشفى{" "}
                <span className="text-[#0069D9]">الأوربي</span> الحديث
              </div>

              <div className="hidden text-[9px] font-bold tracking-[0.18em] text-slate-400 md:block">
                CARE • TRUST • TECHNOLOGY
              </div>
            </div>
          </Link>

          {/* Desktop navigation */}

          <nav className="hidden items-center gap-6 lg:flex">
            {[
              ["الرئيسية", "/"],
              ["الأقسام", "/departments"],
              ["الأطباء", "/doctors"],
              ["الصحة الرقمية", "/services"],
              ["عن المستشفى", "/about"],
              ["تواصل", "/contact"],
            ].map(([name, href]) => (
              <Link
                key={href}
                href={href}
                className="relative text-sm font-black text-[#18529D] transition hover:text-[#D92541]"
              >
                {name}
              </Link>
            ))}
          </nav>

          {/* Header actions */}

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="فتح الإشعارات"
              aria-expanded={notificationOpen}
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-[#18529D] transition hover:bg-[#EAF2FF]"
            >
              <Icon name="bell" size={19} />

              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#D92541]" />
            </button>

            <Link
              href="/booking"
              className="hidden rounded-full bg-[#D92541] px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-red-500/20 transition hover:-translate-y-0.5 hover:bg-[#BF1D35] sm:inline-flex"
            >
              احجز موعدك
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF2FF] text-[#18529D] transition hover:bg-[#DDEBFF] lg:hidden"
            >
              <Icon
                name={mobileMenuOpen ? "close" : "menu"}
                size={20}
              />
            </button>
          </div>
        </div>

        {/* =================================================
            NOTIFICATION DROPDOWN
        ================================================= */}

        {notificationOpen && (
          <div className="absolute left-4 top-[72px] z-[90] w-[calc(100vw-32px)] max-w-[370px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl md:left-auto md:right-8">
            <div className="border-b border-slate-100 bg-[#F7FAFF] px-4 py-3">
              <div className="text-sm font-black text-[#18529D]">
                مركز الإشعارات
              </div>

              <div className="mt-0.5 text-[10px] text-slate-500">
                آخر التحديثات والتنبيهات
              </div>
            </div>

            {fallbackAnnouncements.map((item) => (
              <Link
                href={item.href}
                key={item.id}
                onClick={() => setNotificationOpen(false)}
                className="flex gap-3 border-b border-slate-100 p-4 transition hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D]">
                  <Icon
                    name={
                      item.type === "تنبيه"
                        ? "emergency"
                        : item.type === "فعالية"
                        ? "activity"
                        : "bell"
                    }
                    size={18}
                  />
                </div>

                <div>
                  <div className="text-xs font-black text-[#18529D]">
                    {item.title}
                  </div>

                  <div className="mt-1 text-[10px] leading-5 text-slate-500">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {mobileMenuOpen && (
          <div className="border-t border-slate-100 bg-white/95 lg:hidden">
            <div className="grid grid-cols-2 gap-2 p-4">
              {[
                ["الرئيسية", "/", "home"],
                ["الأقسام", "/departments", "hospital"],
                ["الأطباء", "/doctors", "doctor"],
                ["الصحة الرقمية", "/services", "navigator"],
                ["عن المستشفى", "/about", "heart"],
                ["تواصل معنا", "/contact", "phone"],
              ].map(([title, href, icon]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 text-xs font-black text-[#18529D] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#0069D9] shadow-sm">
                    <Icon name={icon as IconName} size={17} />
                  </span>

                  {title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===================================================
          HERO APP SLIDER
      =================================================== */}

      <section className="relative bg-[#0D2B52]">
        <div className="relative mx-auto min-h-[500px] max-w-7xl overflow-hidden md:min-h-[560px]">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeSlide
                  ? "visible translate-x-0 opacity-100"
                  : "invisible translate-x-4 opacity-0"
              }`}
            >
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  className="object-cover"
                  style={{
                    animation:
                      index === activeSlide
                        ? "heroZoom 6500ms ease-out forwards"
                        : "none",
                  }}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B52]/95 via-[#0D2B52]/72 to-[#0069D9]/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B52] via-transparent to-transparent" />

              <div className="relative flex min-h-[500px] items-center px-5 py-12 md:min-h-[560px] md:px-10 lg:px-14">
                <div className="max-w-2xl">
                  <div className="mb-5 inline-flex animate-[fadeUp_.7s_ease-out_both] items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black tracking-wide text-white backdrop-blur-md md:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                    {slide.badge}
                  </div>

                  <div
                    className="mb-4 text-[10px] font-black text-[#B9D9FF] md:text-sm"
                    style={{ animation: "fadeUp .7s .08s ease-out both" }}
                  >
                    {slide.eyebrow}
                  </div>

                  <h1
                    className="max-w-xl text-4xl font-black leading-[1.16] text-white md:text-6xl"
                    style={{ animation: "fadeUp .7s .16s ease-out both" }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className="mt-5 max-w-xl text-sm leading-7 text-white/75 md:text-lg md:leading-8"
                    style={{ animation: "fadeUp .7s .24s ease-out both" }}
                  >
                    {slide.description}
                  </p>

                  <div
                    className="mt-7 flex flex-wrap gap-3"
                    style={{ animation: "fadeUp .7s .32s ease-out both" }}
                  >
                    <Link
                      href={slide.primaryHref}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black text-[#18529D] shadow-2xl transition hover:-translate-y-1 hover:shadow-white/20 md:px-7 md:py-3.5 md:text-sm"
                    >
                      {slide.primaryLabel}
                      <Icon name="arrow" size={16} />
                    </Link>

                    {slide.secondaryHref && slide.secondaryLabel && (
                      <Link
                        href={slide.secondaryHref}
                        className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-black text-white backdrop-blur transition hover:bg-white/15 md:px-7 md:py-3.5 md:text-sm"
                      >
                        {slide.secondaryLabel}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Slider controls */}

          <div className="absolute bottom-7 right-5 left-5 flex items-center justify-between md:right-10 md:left-10">
            <div className="flex items-center gap-1.5">
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`عرض الشريحة ${index + 1}`}
                  aria-current={activeSlide === index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlide === index
                      ? "w-8 bg-white"
                      : "w-2 bg-white/35"
                  }`}
                />
              ))}
            </div>

            <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[9px] font-bold text-white/70 backdrop-blur-md">
              {String(activeSlide + 1).padStart(2, "0")} /{" "}
              {String(heroSlides.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          QUICK ACCESS
      =================================================== */}

      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-4 md:-mt-10 md:px-8">
        <div className="overflow-hidden rounded-[1.7rem] border border-slate-100 bg-white p-3 shadow-2xl shadow-slate-900/10 md:rounded-[2rem] md:p-5">
          <div className="mb-3 flex items-center justify-between px-1 md:px-2">
            <div>
              <div className="text-[9px] font-black tracking-widest text-[#D92541]">
                QUICK ACCESS
              </div>

              <h2 className="mt-0.5 text-base font-black text-[#18529D] md:text-xl">
                ماذا تحتاج الآن؟
              </h2>
            </div>

            <Link
              href="/services"
              className="text-[10px] font-black text-slate-400 transition hover:text-[#18529D] md:text-xs"
            >
              المزيد
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {quickActions.map((item) => {
              const styles: Record<string, string> = {
                blue: "bg-[#EAF2FF] text-[#0069D9]",
                navy: "bg-[#EEF3F9] text-[#18529D]",
                teal: "bg-[#EAFBF8] text-[#118A7E]",
                red: "bg-[#FFF0F3] text-[#D92541]",
                gold: "bg-[#FFF8E6] text-[#A88012]",
                purple: "bg-[#F3F0FF] text-[#6C57B5]",
              };

              return (
                <Link
                  href={item.href}
                  key={item.title}
                  className={`group rounded-2xl border p-2.5 text-center transition-all duration-500 md:p-3 ${
                    item.featured
                      ? "border-[#D92541]/20 bg-[#FFF8FA] shadow-md shadow-red-500/5"
                      : "border-slate-100 bg-slate-50/70"
                  } hover:-translate-y-1 hover:bg-white hover:shadow-lg`}
                >
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-105 md:h-12 md:w-12 md:rounded-2xl ${styles[item.tone]}`}
                  >
                    <Icon name={item.icon} size={19} />
                  </div>

                  <div className="mt-2 text-[10px] font-black leading-tight text-[#18529D] md:text-xs">
                    {item.title}
                  </div>

                  <div className="mt-0.5 hidden text-[9px] text-slate-400 md:block">
                    {item.subtitle}
                  </div>

                  {item.featured && (
                    <div className="mt-2 inline-flex rounded-full bg-[#D92541]/10 px-2 py-1 text-[7px] font-black text-[#D92541]">
                      الأكثر استخدامًا
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================================================
          ANNOUNCEMENTS
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-7 md:px-8 md:pt-12">
        <div className="overflow-hidden rounded-[1.8rem] bg-white shadow-sm ring-1 ring-slate-100">
          <div className="relative min-h-[190px] md:min-h-[230px]">
            {fallbackAnnouncements.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === announcementIndex
                    ? "visible translate-y-0 opacity-100"
                    : "invisible translate-y-3 opacity-0"
                }`}
              >
                <div className="absolute inset-0">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-l from-[#0D2B52]/95 via-[#0D2B52]/75 to-[#0D2B52]/20" />
                </div>

                <div className="relative flex h-full items-center justify-between gap-5 px-5 py-6 md:px-8">
                  <div className="max-w-2xl text-white">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="rounded-full bg-white/15 px-3 py-1 text-[9px] font-black backdrop-blur-md">
                        {item.type}
                      </span>

                      <span className="text-[9px] font-bold text-white/50">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-black md:text-2xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-[10px] leading-6 text-white/70 md:text-sm">
                      {item.description}
                    </p>

                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-black text-white md:text-xs">
                      اكتشف المزيد
                      <Icon name="arrow" size={14} />
                    </div>
                  </div>

                  <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-md sm:flex md:h-20 md:w-20 md:rounded-3xl">
                    <Icon
                      name={
                        item.type === "تنبيه"
                          ? "emergency"
                          : item.type === "فعالية"
                          ? "activity"
                          : "sparkles"
                      }
                      size={28}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 bg-white px-4 py-3">
            <div className="flex items-center gap-1.5">
              {fallbackAnnouncements.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`عرض الإعلان ${index + 1}`}
                  aria-current={announcementIndex === index}
                  onClick={() => setAnnouncementIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    announcementIndex === index
                      ? "w-7 bg-[#D92541]"
                      : "w-2 bg-slate-200"
                  }`}
                />
              ))}
            </div>

            <span className="text-[9px] font-black text-slate-400">
              من أخبار المستشفى
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================
          FEATURED HOSPITAL VIDEO
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-7 md:px-8 md:pt-12">
        <div className="overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm">
          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            {/* VIDEO */}

            <div className="relative min-h-[240px] overflow-hidden bg-[#0D2B52] md:min-h-[360px]">
              <video
                className="h-full min-h-[240px] w-full object-cover md:min-h-[360px]"
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={featuredHospitalVideo.poster}
              >
                <source
                  src={featuredHospitalVideo.video}
                  type="video/mp4"
                />

                متصفحك لا يدعم تشغيل الفيديو.
              </video>

              <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-[#0D2B52]/70 px-3 py-1.5 text-[9px] font-black text-white backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D92541]" />
                فيديو من المستشفى
              </div>
            </div>

            {/* CONTENT */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#18529D] to-[#0D2B52] p-5 text-white md:p-8">
              <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-[#0069D9]/30 blur-3xl" />

              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-black backdrop-blur-md">
                  <Icon name="play" size={12} />
                  {featuredHospitalVideo.eyebrow}
                </div>

                <div className="text-[10px] font-black text-[#D4AF37] md:text-xs">
                  {featuredHospitalVideo.label}
                </div>

                <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">
                  {featuredHospitalVideo.title}
                </h2>

                <div className="mt-2 inline-flex rounded-full bg-white/10 px-3 py-1 text-[9px] font-black text-white/80 md:text-xs">
                  {featuredHospitalVideo.subtitle}
                </div>

                <p className="mt-4 text-[10px] leading-6 text-white/75 md:text-xs md:leading-7">
                  {featuredHospitalVideo.description}
                </p>

                <p className="mt-3 text-[9px] leading-6 text-white/50 md:text-[10px] md:leading-7">
                  {featuredHospitalVideo.details}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={featuredHospitalVideo.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-black text-[#18529D] transition hover:-translate-y-0.5 md:text-xs"
                  >
                    <Icon name="play" size={14} />
                    فتح الفيديو
                  </a>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-[10px] font-black text-white backdrop-blur-md transition hover:bg-white/15 md:text-xs"
                  >
                    تعرف على المزيد
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <Icon name="hospital" size={18} />
                  </div>

                  <div>
                    <div className="text-[9px] font-black text-white">
                      المستشفى الأوربي الحديث
                    </div>

                    <div className="mt-0.5 text-[8px] text-white/45">
                      عناية .. واهتمام
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================
          LIVE RADAR
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-7 md:px-8 md:pt-14">
        <div className="relative overflow-hidden rounded-[1.8rem] bg-[#0D2B52] p-5 text-white shadow-xl md:rounded-[2rem] md:p-8">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#0069D9]/20 blur-3xl" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="mb-1 flex items-center gap-2 text-[9px] font-black tracking-widest text-[#8FC4FF]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  LIVE RADAR
                </div>

                <h2 className="text-xl font-black md:text-2xl">
                  ماذا يحدث الآن؟
                </h2>

                <p className="mt-1 max-w-xl text-[10px] leading-5 text-white/55 md:text-xs">
                  مؤشرات تشغيلية ستتحول لاحقًا إلى بيانات مباشرة من منصة
                  الخدمات والانتظار.
                </p>
              </div>

              <div className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-bold text-white/60 sm:block">
                تجربة تشغيلية
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              {radarItems.map((item, index) => {
                const status = statusMap[item.status];

                return (
                  <div
                    key={item.id}
                    className="group rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-white/10"
                    style={{
                      animation: `fadeUp .6s ${
                        0.08 * index
                      }s ease-out both`,
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#A8D1FF]">
                        <Icon name={item.icon} size={18} />
                      </div>

                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-1 text-[8px] font-black ${status.bg} ${status.text}`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                        />
                        {item.value}
                      </span>
                    </div>

                    <div className="mt-3 text-xs font-black">
                      {item.label}
                    </div>

                    <div className="mt-1 text-[9px] text-white/45">
                      {status.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          SIGNATURE PATIENT JOURNEY
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#DDE9F7] bg-white p-5 shadow-sm md:rounded-[2.5rem] md:p-8">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#EAF2FF]" />
          <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#FFF0F3]" />

          <div className="relative grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div
              className="animate-[fadeUp_.7s_ease-out_both]"
            >
              <div className="mb-2 flex items-center gap-2 text-[9px] font-black tracking-[0.16em] text-[#D92541]">
                <Icon name="journey" size={14} />
                PATIENT JOURNEY
              </div>

              <h2 className="max-w-md text-2xl font-black leading-tight text-[#18529D] md:text-4xl">
                الرعاية التي تبدأ قبل أن تصل
              </h2>

              <p className="mt-3 max-w-md text-xs leading-6 text-slate-500 md:text-sm md:leading-7">
                نساعدك على فهم خطوتك التالية قبل الزيارة، من اكتشاف التخصص
                المناسب حتى الاستعداد للفحوصات ومتابعة رحلتك.
              </p>

              <Link
                href="/patient-journey"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#18529D] px-5 py-3 text-xs font-black text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-1"
              >
                ابدأ رحلتك
                <Icon name="arrow" size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["01", "اختر القسم", "hospital"],
                ["02", "اعثر على الطبيب", "doctor"],
                ["03", "احجز موعدك", "calendar"],
                ["04", "استعد للزيارة", "check"],
              ].map(([number, title, icon], index) => (
                <div
                  key={number}
                  className="group rounded-[1.4rem] border border-slate-100 bg-[#F9FBFE] p-4 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                  style={{
                    animation: `fadeUp .6s ${
                      0.1 + index * 0.08
                    }s ease-out both`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black tracking-widest text-[#D92541]">
                      {number}
                    </span>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white">
                      <Icon
                        name={icon as IconName}
                        size={17}
                      />
                    </div>
                  </div>

                  <div className="mt-4 text-xs font-black leading-5 text-[#18529D]">
                    {title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          DOCTOR SPOTLIGHT
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-14">
        <SectionTitle
          eyebrow="DOCTOR DIRECTORY"
          title="ابدأ بالطبيب المناسب"
          description="استخدم دليل الأطباء للوصول إلى التخصص والطبيب والموعد المناسب."
          actionHref="/doctors"
          actionLabel="جميع الأطباء"
        />

        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {[
            {
              icon: "search" as IconName,
              title: "ابحث عن طبيب",
              description: "استخدم البحث للوصول إلى الطبيب أو التخصص الذي تبحث عنه.",
              href: "/doctors",
              badge: "SEARCH",
            },
            {
              icon: "hospital" as IconName,
              title: "تصفح التخصصات",
              description: "ابدأ من القسم الطبي ثم استكشف الأطباء والخدمات المتاحة.",
              href: "/departments",
              badge: "DEPARTMENTS",
            },
            {
              icon: "calendar" as IconName,
              title: "احجز موعدك",
              description: "بعد اختيار الطبيب المناسب، انتقل مباشرة إلى الحجز.",
              href: "/booking",
              badge: "BOOK",
            },
          ].map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:p-5"
              style={{
                animation: `fadeUp .6s ${
                  index * 0.08
                }s ease-out both`,
              }}
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-[#18529D] transition group-hover:bg-[#D92541]" />

              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#EAF2FF] text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white">
                  <Icon name={item.icon} size={27} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[8px] font-black tracking-wider text-[#D92541]">
                    {item.badge}
                  </div>

                  <div className="truncate text-sm font-black text-[#18529D]">
                    {item.title}
                  </div>

                  <div className="mt-1 text-[10px] leading-5 text-slate-500">
                    {item.description}
                  </div>
                </div>

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-[#18529D] transition group-hover:bg-[#D92541] group-hover:text-white">
                  <Icon name="arrow" size={13} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================
          DIGITAL HEALTH HUB
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <div className="overflow-hidden rounded-[2rem] bg-[#EAF2FF] p-5 md:rounded-[2.5rem] md:p-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[9px] font-black tracking-widest text-[#D92541]">
                <Icon name="sparkles" size={13} />
                DIGITAL HEALTH HUB
              </div>

              <h2 className="text-2xl font-black text-[#18529D] md:text-3xl">
                مركز الصحة الرقمي
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-6 text-slate-500 md:text-sm">
                أدوات وخدمات رقمية صُممت لتجعل الوصول إلى المعلومة والخدمة
                الصحية أكثر سهولة.
              </p>
            </div>

            <Link
              href="/services"
              className="hidden shrink-0 rounded-full bg-white px-4 py-2 text-[10px] font-black text-[#18529D] shadow-sm transition hover:-translate-y-0.5 sm:inline-flex"
            >
              فتح المركز
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {digitalServices.map((service, index) => (
              <Link
                href={service.href}
                key={service.title}
                className="group rounded-2xl border border-white/80 bg-white p-3.5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:rounded-[1.4rem] md:p-5"
                style={{
                  animation: `fadeUp .6s ${
                    index * 0.07
                  }s ease-out both`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white md:h-12 md:w-12 md:rounded-2xl">
                    <Icon name={service.icon} size={20} />
                  </div>

                  <span className="rounded-full bg-slate-50 px-2 py-1 text-[7px] font-black text-slate-400">
                    {service.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-xs font-black text-[#18529D] md:text-sm">
                  {service.title}
                </h3>

                <p className="mt-1.5 line-clamp-2 text-[9px] leading-5 text-slate-500 md:text-[10px]">
                  {service.description}
                </p>

                <div className="mt-3 flex items-center gap-1 text-[9px] font-black text-[#D92541]">
                  افتح الخدمة
                  <Icon name="arrow" size={11} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================
          DEPARTMENTS
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <SectionTitle
          eyebrow="DEPARTMENTS"
          title="تخصصاتك في مكان واحد"
          description="ابدأ من القسم أو التخصص الأقرب إلى احتياجك."
          actionHref="/departments"
          actionLabel="جميع الأقسام"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {departments.map((department, index) => (
            <Link
              href={department.href}
              key={department.title}
              className="group rounded-[1.4rem] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:rounded-[1.6rem] md:p-5"
              style={{
                animation: `fadeUp .6s ${
                  index * 0.07
                }s ease-out both`,
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2FF] text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white md:h-14 md:w-14">
                <Icon name={department.icon} size={23} />
              </div>

              <h3 className="mt-4 text-xs font-black leading-5 text-[#18529D] md:text-base">
                {department.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-[9px] leading-5 text-slate-500 md:text-xs">
                {department.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <span className="text-[9px] font-black text-[#D92541]">
                  اكتشف القسم
                </span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 text-[#18529D] transition group-hover:bg-[#18529D] group-hover:text-white">
                  <Icon name="arrow" size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================
          INSURANCE
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <div className="mb-6 flex flex-col items-center justify-between gap-4 text-center md:mb-10 md:flex-row md:items-end md:text-right">
          <div>
            <div className="mb-2 flex items-center justify-center gap-2 text-[10px] font-black tracking-widest text-[#D92541] md:justify-start">
              <Icon name="shield" size={14} />
              INSURANCE PARTNERS
            </div>

            <h2 className="text-xl font-black text-[#18529D] md:text-3xl">
              شركات التأمين
            </h2>

            <p className="mt-2 max-w-2xl text-[10px] leading-relaxed text-slate-500 md:text-sm md:leading-7">
              تعرف على شركات التأمين التي يتعامل معها المستشفى، ويمكنك
              التواصل معنا للاستعلام عن التغطية والإجراءات.
            </p>
          </div>

          <Link
            href="/contact"
            className="hidden shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-black text-[#0069D9] transition hover:border-blue-200 hover:bg-blue-50 md:inline-flex"
          >
            استعلم عن تأمينك
            <Icon name="arrow" size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 md:gap-4">
          {insuranceCompanies.map((company, index) => (
            <div
              key={company.name}
              className="group flex flex-col items-center justify-center rounded-[1.2rem] border border-slate-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-[#0069D9]/30 hover:shadow-xl md:rounded-[1.5rem] md:p-6"
              style={{
                animation: `fadeUp .6s ${
                  index * 0.06
                }s ease-out both`,
              }}
            >
              <div className="relative flex h-14 w-full items-center justify-center overflow-hidden md:h-20">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="relative z-10 max-h-full max-w-[80%] object-contain opacity-60 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  loading="lazy"
                  width={180}
                  height={80}
                />
              </div>

              <div className="mt-3 text-center text-[10px] font-black text-[#18529D] md:text-xs">
                {company.name}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center md:hidden">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-[10px] font-black text-[#0069D9] transition hover:bg-blue-50"
          >
            استعلم عن تأمينك
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </section>

      {/* ===================================================
          EMERGENCY CTA
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pt-9 md:px-8 md:pt-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#D92541] p-5 text-white shadow-xl md:rounded-[2.4rem] md:p-8">
          <div className="absolute -left-8 -top-12 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Icon name="emergency" size={25} />
              </div>

              <div>
                <div className="text-[9px] font-black tracking-wider text-white/70">
                  EMERGENCY GUIDE
                </div>

                <h2 className="mt-1 text-xl font-black md:text-2xl">
                  هل الحالة لا تحتمل الانتظار؟
                </h2>

                <p className="mt-1.5 max-w-xl text-[10px] leading-6 text-white/75 md:text-xs">
                  تعرف على علامات الخطر ومتى يجب طلب رعاية عاجلة.
                </p>
              </div>
            </div>

            <Link
              href="/emergency"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-black text-[#D92541] shadow-xl transition hover:-translate-y-1"
            >
              دليل الطوارئ
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="mx-auto mt-12 max-w-7xl px-4 md:mt-20 md:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#0D2B52] p-6 text-white md:p-9">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/logo.png"
                  alt="شعار المستشفى الأوربي الحديث"
                  className="object-contain"
                  width={48}
                  height={48}
                />

                <div>
                  <div className="text-base font-black">
                    المستشفى{" "}
                    <span className="text-[#D4AF37]">الأوربي</span> الحديث
                  </div>

                  <div className="mt-1 text-[9px] text-white/45">
                    DIGITAL HEALTH EXPERIENCE
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-md text-xs leading-6 text-white/50">
                منصة رقمية حديثة لتسهيل الوصول إلى المعلومات والخدمات والرعاية
                الصحية.
              </p>
            </div>

            <div>
              <div className="text-xs font-black text-white">
                الوصول السريع
              </div>

              <div className="mt-4 space-y-2 text-[10px] text-white/50">
                <Link
                  href="/departments"
                  className="block transition hover:text-white"
                >
                  الأقسام والمراكز
                </Link>

                <Link
                  href="/doctors"
                  className="block transition hover:text-white"
                >
                  دليل الأطباء
                </Link>

                <Link
                  href="/services"
                  className="block transition hover:text-white"
                >
                  مركز الصحة الرقمي
                </Link>

                <Link
                  href="/booking"
                  className="block transition hover:text-white"
                >
                  حجز موعد
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-black text-white">
                تواصل معنا
              </div>

              <div className="mt-4 space-y-3 text-[10px] text-white/50">
                <a
                  href="tel:774778805"
                  dir="ltr"
                  className="flex items-center gap-2 transition hover:text-white"
                >
                  <Icon name="phone" size={14} />
                  774778805
                </a>

                <div className="flex items-start gap-2">
                  <Icon name="location" size={14} />
                  <span>العاصمة — شارع الستين الغربي</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="text-[9px] text-white/35">
              جميع الحقوق محفوظة © 2026 المستشفى الأوربي الحديث
            </p>

            <p className="mt-1 text-[9px] font-bold text-[#D4AF37]">
              تصميم وتطوير وبرمجة: Hesham Al-sodmi
            </p>
          </div>
        </div>
      </footer>

      {/* ===================================================
          FLOATING WHATSAPP
      =================================================== */}

      <a
        href="https://wa.me/967774778805"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-[100px] left-4 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:bg-[#20bd5a] md:bottom-8 md:left-8 md:h-16 md:w-16"
        aria-label="تواصل معنا عبر واتساب"
      >
        <div className="scale-110 md:scale-125">
          <Icon name="whatsapp" size={28} />
        </div>

        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25D366] md:h-4 md:w-4" />
      </a>

      {/* ===================================================
          MOBILE BOTTOM NAVIGATION
      =================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_rgba(15,50,90,0.10)] backdrop-blur-xl md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5">
          <Link
            href="/"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[#0069D9]"
          >
            <Icon name="home" size={20} />
            <span className="text-[8px] font-black">
              الرئيسية
            </span>
          </Link>

          <Link
            href="/departments"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400 transition hover:text-[#18529D]"
          >
            <Icon name="hospital" size={20} />
            <span className="text-[8px] font-bold">
              الأقسام
            </span>
          </Link>

          {/* PRIMARY MOBILE ACTION */}

          <Link
            href="/booking"
            className="relative -mt-7 flex flex-col items-center gap-1"
            aria-label="حجز موعد"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#D92541] text-white shadow-xl shadow-red-500/30 transition hover:scale-105">
              <Icon name="calendar" size={24} />
            </div>

            <span className="mt-0.5 text-[8px] font-black text-[#18529D]">
              الحجز
            </span>
          </Link>

          <Link
            href="/doctors"
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400 transition hover:text-[#18529D]"
          >
            <Icon name="doctor" size={20} />
            <span className="text-[8px] font-bold">
              الأطباء
            </span>
          </Link>

          <button
            type="button"
            aria-label="فتح المزيد"
            aria-expanded={quickMenuOpen}
            onClick={() => setQuickMenuOpen(!quickMenuOpen)}
            className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-slate-400 transition hover:text-[#18529D]"
          >
            <Icon name="more" size={20} />
            <span className="text-[8px] font-bold">
              المزيد
            </span>
          </button>
        </div>
      </nav>

      {/* ===================================================
          MOBILE MORE SHEET
      =================================================== */}

      {quickMenuOpen && (
        <div className="fixed inset-0 z-[120] md:hidden">
          <button
            type="button"
            aria-label="إغلاق"
            onClick={() => setQuickMenuOpen(false)}
            className="absolute inset-0 bg-[#0D2B52]/40 backdrop-blur-sm"
          />

          <div className="absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-5 pb-8 shadow-2xl">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-slate-200" />

            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-[9px] font-black tracking-widest text-[#D92541]">
                  MORE
                </div>

                <h3 className="mt-1 text-lg font-black text-[#18529D]">
                  كل شيء في مكان واحد
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setQuickMenuOpen(false)}
                aria-label="إغلاق"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500"
              >
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                ["الصحة الرقمية", "/services", "navigator"],
                ["الإسعافات", "/first-aid", "firstaid"],
                ["رحلة المريض", "/patient-journey", "journey"],
                ["المحتوى الطبي", "/health-library", "book"],
                ["عن المستشفى", "/about", "hospital"],
                ["تواصل معنا", "/contact", "phone"],
                ["بنك الدم", "/blood-bank", "droplet"],
              ].map(([title, href, icon]) => (
                <Link
                  href={href}
                  key={href}
                  onClick={() => setQuickMenuOpen(false)}
                  className="flex items-center gap-3 rounded-2xl bg-[#F7F9FC] p-3 transition hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#18529D] shadow-sm">
                    <Icon
                      name={icon as IconName}
                      size={17}
                    />
                  </div>

                  <span className="text-[10px] font-black text-[#18529D]">
                    {title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}