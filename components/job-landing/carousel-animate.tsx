'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { carouselItems } from './data'

const ChevronLeftIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>;
const ChevronRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;

export default function Carousel() {
    const [index, setIndex] = useState(0);

    const paginate = (newDirection: number) => {
        setIndex(prevIndex => prevIndex + newDirection);
    };

    const imageIndex = useMemo(() => {
        const len = carouselItems.length;
        return ((index % len) + len) % len;
    }, [index]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIndex(prev => prev + 1);
        }, 5000);
        return () => clearTimeout(timer);
    }, [index]);

    return (
      <div className="relative w-full h-64 md:h-96 overflow-hidden bg-gray-100">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ x: 1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -1000, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full"
          >
            <img src={carouselItems[imageIndex].img} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-2xl md:text-4xl font-bold p-4 text-center">{carouselItems[imageIndex].title}</h2>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute z-10 top-1/2 -translate-y-1/2 left-4">
          <button onClick={() => paginate(-1)} className="bg-white/50 p-2 rounded-full hover:bg-white"><ChevronLeftIcon /></button>
        </div>
          <div className="absolute z-10 top-1/2 -translate-y-1/2 right-4">
          <button onClick={() => paginate(1)} className="bg-white/50 p-2 rounded-full hover:bg-white"><ChevronRightIcon /></button>
        </div>
      </div>
    );
};
