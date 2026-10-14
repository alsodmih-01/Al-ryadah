import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/lib/sanity';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function DepartmentEquipment({ equipment }: { equipment: any[] }) {
  if (!equipment || equipment.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-2xl md:text-3xl font-black text-[#0056B3] mb-8 text-center">
        أحدث أجهزة وتقنيات القسم
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {equipment.map((item, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition">
            {item.image && (
              <div className="h-52 overflow-hidden bg-slate-50 relative">
                <img 
                  src={urlFor(item.image).url()} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-[#0056B3] mb-2">{item.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}