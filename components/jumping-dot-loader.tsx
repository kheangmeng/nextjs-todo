'use client'

import React from "react";
import { motion, Transition } from "framer-motion";

// --- Animation Variants ---
// These define the different states for our dots during the animation.
const dotVariants = {
  initial: {
    y: "0%", // Start at the bottom
  },
  animate: {
    y: "100%", // Move up
  },
};

// --- Animation Transitions ---
// This defines how the animation will behave (duration, ease, repeat, etc.)
const dotTransition: Transition = {
  duration: 0.4, // How long one bounce takes
  ease: "easeInOut", // Smooth start and end
  repeat: Infinity, // Repeat forever
  repeatType: "reverse", // Bounce up then back down
};

// --- Jumping Dots Loader Component ---
export default function JumpingDotsLoader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="flex space-x-2">
        {/* Dot 1 */}
        <motion.span
          className="block w-4 h-4 rounded-full bg-blue-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0 }} // No delay for the first dot
        />
        {/* Dot 2 */}
        <motion.span
          className="block w-4 h-4 rounded-full bg-blue-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.2 }} // Delay for the second dot
        />
        {/* Dot 3 */}
        <motion.span
          className="block w-4 h-4 rounded-full bg-blue-500"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{ ...dotTransition, delay: 0.4 }} // Delay for the third dot
        />
      </div>
    </div>
  );
}
