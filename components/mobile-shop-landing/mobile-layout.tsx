'use client'

import React from 'react';
import { categories } from './data';
import CategorySection from './category-section';
import { Phone, Store } from 'lucide-react';

// Navbar Component (can be in its own file)
const Navbar = () => {
  // Simple scroll-to-section logic
  const handleScroll = (id: string) => document.getElementById(id)?.scrollIntoView();
  
  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
            <Store className="text-indigo-600" size={28} />
            <span className="text-2xl font-extrabold text-gray-900">MobileVerse</span>
          </div>
          <div className="hidden md:flex gap-6 font-semibold">
            {categories.map(cat => (
              <button key={cat.brand} onClick={() => handleScroll(cat.brand)} className="hover:text-indigo-600 transition-colors">
                {cat.brand}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Component (can be in its own file)
const Hero = () => (
  <section id="hero" className="bg-indigo-600 text-white">
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">The Future in Your Pocket</h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
        Discover the latest and greatest in mobile technology. The perfect phone for you is just a scroll away.
      </p>
    </div>
  </section>
);

// Footer Component (can be in its own file)
const Footer = () => (
    <footer className="bg-slate-800 text-slate-300 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MobileVerse. All Rights Reserved.</p>
    </footer>
);


function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        {/* Dynamically create a section for each category from our data file */}
        {categories.map((category) => (
          <CategorySection key={category.brand} category={category} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;