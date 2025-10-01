import React from 'react';
import ProductList from './product-list'
import Navbar from './navbar'
import FooterSection from './footer-section'

const Hero = () => (
  <header className="bg-indigo-50 py-24 px-4">
    <div className="container mx-auto text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
        Next-Gen Tech, <span className="text-indigo-600">Unleashed</span>.
      </h1>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
        Elevate your lifestyle with our innovative and beautifully designed tech products. Quality and performance in every device.
      </p>
      <a
        href="#products"
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105"
      >
        Explore Products
      </a>
    </div>
  </header>
);

// const Footer = () => (
//     <footer className="bg-slate-800 text-slate-300 py-8 px-4">
//         <div className="container mx-auto text-center">
//             <p>&copy; {new Date().getFullYear()} Techify. All rights reserved.</p>
//         </div>
//     </footer>
// )

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <ProductList />
      </main>
      {/* <Footer /> */}
      <FooterSection />
    </div>
  );
}

export default App;
