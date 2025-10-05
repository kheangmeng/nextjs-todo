import { motion } from "framer-motion";

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2, // Stagger animations of child elements
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const circleVariants = {
  start: {
    y: "0%", // Initial position
  },
  end: {
    y: "100%", // End position for a bouncing effect
  },
};
export default function Loader() {
  return (
    <motion.div
      variants={containerVariants}
      initial="start"
      animate="end"
      className="loading-container" // Apply CSS for layout
    >
      <motion.span
        variants={circleVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse", // Bounce back
          ease: "easeInOut",
        }}
        className="loading-circle" // Apply CSS for styling
      />
      <motion.span
        variants={circleVariants}
        transition={{
          delay: 0.1, // Stagger delay
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="loading-circle"
      />
      <motion.span
        variants={circleVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="loading-circle"
      />
      {/* Add more circles as needed */}
    </motion.div>
  );
};
