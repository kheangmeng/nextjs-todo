'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCommandShortcut } from '@/hooks/use-command-shortcut';

interface SearchResult {
  title: string;
  description: string;
}
const data: SearchResult[] = [
  { title: 'react', description: 'React is a JavaScript library for building user interfaces.' },
  { title: 'angular', description: 'Angular is a TypeScript-based open-source web application framework'},
  { title: 'vue', description: 'Vue.js is a progressive framework for building user interfaces'},
  { title: 'shade/cn', description: 'Clean, modern building blocks. Copy and paste into your apps. Works with all React frameworks.' },
  { title: 'tailwindcss', description: 'Tailwind CSS is a utility-first CSS framework'},
  { title: 'node.js', description: 'Node.js is a cross-platform, open-source server environment that can run' },
]

// { isOpen, onClose }: { isOpen: boolean, onClose: () => void }
export default function CommandPalette() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const togglePalette = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Set up the Cmd/Win + K shortcut globally
  useCommandShortcut({ key: 'k', modifier: 'meta', callback: togglePalette});

  // Use 'Escape' key to close the modal
  // This listener will only fire if the event hasn't been stopped by useClearOnEscape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const results = data.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchResults(results);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        // Backdrop overlay
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-40 bg-opacity-75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose} // Close when clicking the backdrop
        >
          {/* Modal Content */}
          <motion.div
            className="w-full max-w-lg mx-4 bg-gray-800 rounded-xl shadow-2xl overflow-hidden ring-4 ring-teal-500/30"
            // Stop click propagation so clicking the modal doesn't close it
            onClick={(e) => e.stopPropagation()}
            initial={{ y: -50, scale: 0.95, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 50, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>

                <input
                  autoFocus
                  // This input is subject to the new useClearOnEscape hook.
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={handleSearch}
                  className="flex-grow bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 h-48 overflow-y-auto text-gray-400">
              <p className="text-sm font-semibold mb-2 text-teal-400">Recent Commands</p>
              <ul className="space-y-1">
                {
                  searchResults.map((result, index) => (
                    <li key={index} className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
                      <span className="text-white font-semibold">{result.title}: </span>
                      <span className='text-gray-500 text-sm'>{result.description}</span>
                    </li>
                ))}
                {
                  !searchResults.length &&
                    <>
                      <li className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
                        <span className="text-white">Toggle Dark Mode</span>
                        <span className="float-right text-xs bg-gray-700 px-2 py-0.5 rounded-md">T</span>
                      </li>
                      <li className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
                        <span className="text-white">Go to Settings</span>
                        <span className="float-right text-xs bg-gray-700 px-2 py-0.5 rounded-md">G S</span>
                      </li>
                      <li className="p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition">
                        <span className="text-white">Create New Document</span>
                        <span className="float-right text-xs bg-gray-700 px-2 py-0.5 rounded-md">N</span>
                      </li>
                    </>
                }

              </ul>

              {/* <p className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-700/50 text-center">
                Search functionality and command execution would be implemented here.
              </p> */}
            </div>

            <div className="p-2 bg-gray-700/30 text-right text-xs text-gray-500 border-t border-gray-700/50">
              <span className="mr-2">Close with</span>
              <kbd className="font-mono bg-gray-700 px-1.5 py-0.5 rounded-md text-gray-300 shadow-sm">
                ESC
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
