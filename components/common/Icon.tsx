import React from "react";

export default function Icon({ name, size = 22, className }: { name?: string; size?: number; className?: string; }) {
  const common = { 
    width: size, 
    height: size, 
    viewBox: "0 0 24 24", 
    fill: "none", 
    stroke: "currentColor", 
    strokeWidth: 1.8, 
    strokeLinecap: "round" as const, 
    strokeLinejoin: "round" as const,
    className
  };
  
  switch (name) {
    case "home": return <svg {...common}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9" /><path d="M9 20v-6h6v6" /></svg>;
    case "hospital": return <svg {...common}><path d="M4 21V5l8-3 8 3v16" /><path d="M9 21v-5h6v5" /><path d="M12 6v5M9.5 8.5h5" /></svg>;
    case "emergency": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v10M7 12h10" /></svg>;
    case "calendar": return <svg {...common}><rect x="3" y="4" width="18" height="17" rx="3" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    case "doctor": return <svg {...common}><circle cx="12" cy="7" r="4" /><path d="M5 22a7 7 0 0 1 14 0" /><path d="M9 7h6" /></svg>;
    case "heart": return <svg {...common}><path d="M20.8 8.6c0 5.5-8.8 11.2-8.8 11.2S3.2 14.1 3.2 8.6A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.8 2.3Z" /></svg>;
    case "brain": return <svg {...common}><path d="M9 4.5A3.5 3.5 0 0 0 5.5 8c0 .6.2 1.2.5 1.7A3.5 3.5 0 0 0 7 16.5c.4 0 .8-.1 1.2-.2A3.5 3.5 0 0 0 12 20V4.5A3.5 3.5 0 0 0 9 4.5Z" /><path d="M15 4.5A3.5 3.5 0 0 1 18.5 8c0 .6-.2 1.2-.5 1.7A3.5 3.5 0 0 1 17 16.5c-.4 0-.8-.1-1.2-.2A3.5 3.5 0 0 1 12 20V4.5A3.5 3.5 0 0 1 15 4.5Z" /></svg>;
    case "location": return <svg {...common}><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "clock": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    case "activity": return <svg {...common}><path d="M3 12h4l2-7 4 14 2-7h6" /></svg>;
    case "shield": return <svg {...common}><path d="M12 3 20 6v5c0 5-3.4 8.7-8 10-4.6-1.3-8-5-8-10V6l8-3Z" /><path d="m9 12 2 2 4-4" /></svg>;
    case "spark": return <svg {...common}><path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" /><path d="m19 16 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></svg>;
    case "check": return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
    case "arrow": return <svg {...common}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>;
    case "play": return <svg {...common}><path d="m9 6 8 6-8 6V6Z" fill="currentColor" stroke="none" /></svg>;
    default: return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}