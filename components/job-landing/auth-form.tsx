import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

interface AuthModalProps {
  isOpen: boolean;
  type: 'login' | 'register';
  onClose: () => void;
  onSwitch: () => void;
}
export default function AuthModal({ isOpen, onClose, type, onSwitch }: AuthModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: -50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: -50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><XIcon /></button>
            <h2 className="text-2xl font-bold text-center mb-6">{type === 'login' ? 'Log In' : 'Create Account'}</h2>
            <form className="space-y-4">
              {type === 'register' && (
                <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-md" />
              )}
              <input type="email" placeholder="Email Address" className="w-full px-4 py-2 border rounded-md" />
              <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" />
              <button className="w-full bg-indigo-600 text-white font-bold py-3 rounded-md hover:bg-indigo-700">
                {type === 'login' ? 'Log In' : 'Register'}
              </button>
            </form>
            <p className="text-center text-sm mt-6">
              {type === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button onClick={onSwitch} className="font-semibold text-indigo-600 hover:underline ml-1">
                {type === 'login' ? 'Register' : 'Log In'}
              </button>
            </p>
          </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
)};
