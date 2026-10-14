import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function DepartmentHero({ department }: { department: any }) {
  return (
    <section className="bg-gradient-to-l from-[#0056B3] to-[#0a2342] text-white py-16 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold backdrop-blur-sm border border-white/20 mb-4 inline-block">
          قسم متخصص ومعتمد
        </span>
        <h1 className="text-3xl md:text-5xl font-black mb-4">{department.title}</h1>
        <p className="text-blue-100 text-lg leading-relaxed max-w-2xl mx-auto">
          {department.description}
        </p>
      </div>
    </section>
  );
}