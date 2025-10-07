import Header from './header'
import Footer from './footer'
import NewsletterSection from './newsletter-section'
import CarouselAnimate from './carousel-animate'
import SearchBar from './search-bar'
import JobTabs from './job-tabs'
import JobsCardSection from './jobs-card-section'
import EmployersSection from './employers-section'
import TestimonialsSection from './testimonials-section'
import JobsSidebar from './job-sidebar';
// import dynamic from 'next/dynamic';
// const JobsSidebar = dynamic(() => import('./job-sidebar'), { ssr: false })

export default function App() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />

      <main>
        <div className="relative">
          <CarouselAnimate />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SearchBar />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <JobTabs />
            </div>
            <div>
              <JobsSidebar />
            </div>
          </div>
        </div>

        <JobsCardSection />
        <EmployersSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>

      <Footer />
    </div>
  );
}

