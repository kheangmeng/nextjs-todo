import React, { useState } from 'react';
import { Store, ChevronDown, Menu, X } from 'lucide-react';
import { menuData, type MenuData } from './data';

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView();
    setOpenDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className="bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      onMouseLeave={() => setOpenDropdown(null)} // Close dropdown when mouse leaves the navbar
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScroll('hero')}>
            <Store className="text-indigo-600" size={28} />
            <span className="text-2xl font-extrabold text-gray-900">MobileVerse</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4 font-semibold">
            {(Object.keys(menuData) as Array<keyof typeof menuData>).map((category) => (
              <div 
                key={category} 
                className="relative"
                onMouseEnter={() => setOpenDropdown(category)}
              >
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors p-2">
                  {category} <ChevronDown size={16} />
                </button>
                {openDropdown === category && (
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md w-48 py-2">
                    {menuData[category].map((brandData) => (
                      <a
                        key={brandData.brand}
                        href={`#${brandData.brand}`}
                        onClick={(e) => { e.preventDefault(); handleScroll(brandData.brand); }}
                        className="block px-4 py-2 text-slate-700 hover:bg-indigo-50"
                      >
                        {brandData.brand}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X/> : <Menu/>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-2">
          {(Object.keys(menuData) as Array<keyof typeof menuData>).map((category) => (
            <div key={category} className="px-4 py-2">
              <h3 className="font-bold text-slate-800">{category}</h3>
              <div className="pl-4 mt-2 flex flex-col items-start">
                {menuData[category].map((brandData) => (
                   <a
                      key={brandData.brand}
                      href={`#${brandData.brand}`}
                      onClick={(e) => { e.preventDefault(); handleScroll(brandData.brand); }}
                      className="py-1 text-slate-600 hover:text-indigo-600"
                    >
                      {brandData.brand}
                    </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;