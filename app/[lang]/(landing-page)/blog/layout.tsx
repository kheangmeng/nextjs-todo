import Link from "next/link";
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import CommandPalette from "@/components/command-palette";
import { BlogProfileMenu } from "@/components/blog-landing/blog-profile-menu";
import BlogLayoutWrapper from '@/components/blog-landing/blog-layout-wrapper';

const Header = () => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-start md:items-center">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <Link
            href="/blog"
            className="text-2xl font-bold text-blue-500 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
          >
            DevInsights Blog
          </Link>
          <div className="flex justify-center border border-mute/50 text-gray-500 dark:text-gray-200 p-2 rounded-lg">
            <p className="text-sm dark:text-gray-300">
              Press
              <KbdGroup className="mx-2">
                <Kbd>⌘</Kbd>/<Kbd>Win</Kbd> + <Kbd>K</Kbd>
              </KbdGroup>
              to search.
            </p>
          </div>
        </div>
        <ul className="hidden md:flex items-center space-x-6">
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Home</a></li>
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">About</a></li>
          <li><a href="#" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-300 transition-colors">Contact</a></li>
          <li><BlogProfileMenu /></li>
        </ul>
        <div className="flex md:hidden"><BlogProfileMenu /></div>
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
    <BlogLayoutWrapper>
      <div className="bg-slate-50 dark:bg-slate-900 dark:text-white min-h-screen font-sans">
        <Header />
        <main className="min-h-[80vh]">
          {children}
        </main>
        <Footer />
      </div>
    </BlogLayoutWrapper>
  );
}
