import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from './data';

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div id="hero" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselSlides.map((slide) => (
            <div className="flex-grow-0 flex-shrink-0 w-full" key={slide.id}>
              <div className="relative h-[50vh] md:h-[60vh]">
                <Image priority={true} fill={true} src={slide.imageUrl} alt={slide.title} className="w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-2">{slide.title}</h1>
                  <p className="text-lg md:text-2xl opacity-90">{slide.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button onClick={scrollPrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition">
        <ChevronLeft className="text-slate-800" />
      </button>
      <button onClick={scrollNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full hover:bg-white transition">
        <ChevronRight className="text-slate-800" />
      </button>
    </div>
  );
};

export default Carousel;