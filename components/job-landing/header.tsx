'use client'

import React, { useState } from 'react';
import AuthModal from './auth-form'

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const openLogin = () => { setIsRegisterOpen(false); setIsLoginOpen(true); };
  const openRegister = () => { setIsLoginOpen(false); setIsRegisterOpen(true); };
  const closeModals = () => { setIsLoginOpen(false); setIsRegisterOpen(false); };

  return(
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-indigo-600">JobFinder</div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="font-semibold text-gray-600 hover:text-indigo-500">Jobs</a>
            <a href="#" className="font-semibold text-gray-600 hover:text-indigo-500">Companies</a>
            <a href="#" className="font-semibold text-gray-600 hover:text-indigo-500">About</a>
          </nav>
          <div className="flex items-center space-x-2">
            <button onClick={openLogin} className="font-semibold text-indigo-600 hover:text-indigo-800 px-4 py-2 rounded-md">Log In</button>
            <button onClick={openRegister} className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700">Register</button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isLoginOpen} onClose={closeModals} type="login" onSwitch={openRegister} />
      <AuthModal isOpen={isRegisterOpen} onClose={closeModals} type="register" onSwitch={openLogin} />
    </header>
)};
