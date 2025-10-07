'use client'

import Image from 'next/image';

export default function AboutUs() {
  const imageLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    return `https://images.unsplash.com/${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div>
        <p className="text-lg leading-relaxed mb-4">
          Founded in 20XX, OurCompany has grown from a small startup into a recognized leader in the industry. We pride ourselves on our commitment to innovation, quality, and customer satisfaction.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our mission is to empower businesses and individuals through technology, creating a positive impact on the world. We believe in fostering a culture of collaboration, continuous learning, and ethical practices.
        </p>
        <p className="text-lg leading-relaxed">
          Meet the passionate team behind our success. We're a diverse group of experts united by a shared vision.
        </p>
      </div>
      <div className="flex justify-center">
        <Image
          loader={imageLoader}
          priority={true}
          src="photo-1552581234-26160f608093?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
          width={800}
          height={800}
          alt="Our Team"
          className="rounded-lg shadow-xl w-full md:w-4/5 object-cover"
        />
      </div>
    </div>
  )
}
