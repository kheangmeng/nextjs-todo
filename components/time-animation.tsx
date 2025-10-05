import React, { useState, useEffect } from 'react';
import { motion, useTime, useTransform, AnimatePresence } from 'framer-motion';

// This component handles the animation for a single character (0-9).
const Digit = ({ value }: { value: string }) => {
  return (
    <div className="relative h-8 overflow-hidden w-3 flex justify-center items-center">
      {/* AnimatePresence allows us to animate components when they are removed
        (the old digit) and when they are added (the new digit).
      */}
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          initial={{ y: '100%' }} // Start the new digit from the bottom
          animate={{ y: '0%' }}   // Move to the centered position
          exit={{ y: '-100%' }}  // Slide the old digit out to the top
          transition={{
            type: "tween",
            ease: [0.2, 0.65, 0.3, 0.9], // Custom easing for a snappier flip
            duration: 0.4
          }}
          className="block tracking-tighter absolute inset-0 text-center"
          style={{ lineHeight: 1 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// --- Time Segment Component (Groups two Digits) ---
const TimeSegment = ({ value, label }: { value: string, label: string }) => {
  // Split the two-character string (e.g., "05") into an array of characters
  const digits = Array.from(value);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center justify-center">
        {/* Render two Digit components */}
        {digits.map((digit, index) => (
          // Use index as a stable key for the container, and pass the character as the value
          <Digit key={index} value={digit} />
        ))}
      </div>
        {/* <span className="text-sm md:text-lg text-teal-200 mt-2 uppercase tracking-widest opacity-80">
          {label}
        </span> */}
    </div>
  );
};

export default function App () {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the time state every 1000 milliseconds (1 second)
    const timerId = setInterval(() => setTime(new Date()), 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format time components
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const seconds = String(time.getSeconds()).padStart(2, '0');

  return (
    <div className="flex items-center justify-center">
      <TimeSegment value={hours} label="Hours" />
      <div className="relative h-8 overflow-hidden w-3">
        <div style={{ lineHeight: 1 }} className="text-center">:</div>
      </div>
      <TimeSegment value={minutes} label="Minutes" />
      <div className="relative h-8 overflow-hidden w-3">
        <div style={{ lineHeight: 1 }} className="text-center">:</div>
      </div>
      <TimeSegment value={seconds} label="Seconds" />
    </div>
  );
};

