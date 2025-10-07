'use client'

import Image from 'next/image'
import { testimonials } from './data'

export default function TestimonialsSection() {
  const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://picsum.photos/seed/${src}/${width}`
  }

  return(
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">What Employers Say About Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="flex flex-col justify-between bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">"{t.quote}"</p>
              <div className="flex items-center">
                {/* <img src={t.companyLogo} alt={t.companyName} className="w-12 h-12 rounded-full mr-4" /> */}
                <Image
                  loader={imageLoader}
                  priority={true}
                  src={`${t.id}`}
                  alt={t.companyName}
                  width={200}
                  height={200}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold text-gray-800">{t.employerName}</p>
                  <p className="text-sm text-gray-500">{t.employerRole}, {t.companyName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
)};
