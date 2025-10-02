const Header = () => (
  <header className="bg-white shadow-md sticky top-0 z-10">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div 
        className="text-2xl font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors"
      >
        DevInsights Blog
      </div>
      <ul className="flex space-x-6">
        <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a></li>
        <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">About</a></li>
        <li><a href="#" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a></li>
      </ul>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-800 text-white mt-12 py-8">
    <div className="container mx-auto px-6 text-center">
      <p>&copy; {new Date().getFullYear()} DevInsights Blog. All Rights Reserved.</p>
      <p className="text-sm text-slate-400 mt-2">Designed with React & Tailwind CSS</p>
    </div>
  </footer>
);

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header />
        {children}
      <Footer />
    </div>
  );
}
