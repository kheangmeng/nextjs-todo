import React from 'react';
import Navbar from './navbar';
import FooterSection from './footer-section';
import PricingSection from './pricing-section';
import ServiceSection from './service-section';
import AboutUsSection from './about-us-section';
import ContactUsSection from './contact-us-section';
import HeroSection from './hero-section';
import CareerSection from './career-section';
import Section from './section';

function App() {
  return (
    <div>
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <Navbar />
      </nav>
      <main>
        <Section id="hero" bgColor="bg-gradient-to-br from-indigo-600 to-purple-700" textColor="text-white">
          <HeroSection />
        </Section>

        <Section id="about" title="About Our Company">
          <AboutUsSection />
        </Section>

        <Section id="services" title="Our Services" bgColor="bg-gray-100">
            <ServiceSection />
        </Section>

        <Section id="pricing" title="Find the Right Plan for You">
          <PricingSection />
        </Section>

        <Section id="career" title="Join Our Team">
          <CareerSection />
        </Section>

        <Section id="contact" title="Get in Touch" bgColor="bg-gray-100">
          <ContactUsSection />
        </Section>
      </main>

      <footer className="bg-white dark:bg-gray-900">
        <FooterSection />
      </footer>
    </div>
  );
}

export default App;
