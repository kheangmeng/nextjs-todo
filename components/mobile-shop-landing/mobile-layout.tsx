'use client'

import React from 'react';
import { categories } from './data';
import CategorySection from './category-section';
import Navbar from './navbar';
import Carousel from './carousel';
import Marquee from './marquee';

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
        <Marquee />
        <Carousel />
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