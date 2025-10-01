import { Zap } from 'lucide-react';

export default function Navbar () {
  return (
    <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Zap className="text-indigo-600" />
            <span className="text-2xl font-bold">Techify</span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <a href="#" className="hover:text-indigo-600 transition-colors">Home</a>
            <a href="#products" className="hover:text-indigo-600 transition-colors">Products</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
