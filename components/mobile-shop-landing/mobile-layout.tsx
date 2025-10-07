'use client'

import React from 'react';
import { categories } from './data';
import CategorySection from './category-section';
import Navbar from './navbar';
import Carousel from './carousel';
import Marquee from './marquee';
import HeroSection from './hero-section';

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <section id="hero" className="bg-indigo-600 text-white">
          <HeroSection />
        </section>
        <Marquee />
        <Carousel />
        {/* Dynamically create a section for each category from our data file */}
        {categories.map((category) => (
          <CategorySection key={category.brand} category={category} />
        ))}
      </main>
      <footer className="bg-slate-800 text-slate-300 py-8 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} MobileVerse. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
