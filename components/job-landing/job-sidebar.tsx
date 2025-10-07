'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { allJobs } from './data'

export default function JobsSidebarWrapper() {
  return <JobsSidebar />
}

function JobsSidebar() {
  const urgentJobs = useMemo(() => allJobs.filter(j => j.isUrgent), []);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (urgentJobs.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 5) >= urgentJobs.length ? 0 : prev + 5);
    }, 3000);
    return () => clearInterval(interval);
  }, [urgentJobs.length]);

  const jobsToShow = urgentJobs.slice(currentIndex, currentIndex + 5);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4 text-red-600">Urgent Jobs</h3>
      <div className="space-y-4 overflow-hidden h-80 relative">
        <AnimatePresence>
        {jobsToShow.map((job, index) => job && (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50, position: 'absolute' }}
            transition={{ duration: 0.5 }}
            className="border-b pb-2 last:border-b-0 w-full"
          >
            <a suppressHydrationWarning={true} href="#" className="flex gap-2 items-center font-semibold text-gray-800 hover:text-indigo-600 block truncate">
              {job.title}
              <span className="badge rounded-full px-2 text-xs text-white">
                urgent
              </span>
            </a>
            <p suppressHydrationWarning={true} className="text-sm text-gray-500">{job.company} - {job.location}</p>
          </motion.div>
        ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
