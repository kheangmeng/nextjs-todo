import Link from "next/link";
import CommandPalette from "@/components/command-palette";
import { BlogProfileMenu } from "@/components/blog-landing/blog-profile-menu";

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-2xl font-bold text-slate-800 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            DevInsights Blog
          </Link>
          <div className="text-gray-500 bg-gray-100 dark:bg-gray-800 dark:text-gray-200 p-2 rounded-lg">
            <p className="text-sm dark:text-gray-300">
              Press
              <kbd className="font-mono px-2 py-1 border-2 rounded-md text-gray-500 dark:text-gray-300 mx-1 shadow-md">
                ⌘<span className="hidden md:inline">/Win</span>
              </kbd>
              +
              <kbd className="font-mono px-2 py-1 border-2 rounded-md text-gray-500 dark:text-gray-300 mx-1 shadow-md">
                K
              </kbd>
              to toggle the modal.
            </p>
          </div>
        </div>
        <ul className="flex items-center space-x-6">
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Home</a></li>
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">About</a></li>
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Contact</a></li>
          <li><BlogProfileMenu /></li>
        </ul>
        <CommandPalette />
      </nav>
    </header>
)};

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
    <div className="bg-slate-50 dark:bg-slate-900 dark:text-white min-h-screen font-sans">
      <Header />
      <main className="min-h-[80vh]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
