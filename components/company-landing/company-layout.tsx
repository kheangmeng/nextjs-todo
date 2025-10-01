import React from 'react';
import Navbar from './navbar';
import FooterSection from './footer-section';
import { Lightbulb, Users, Briefcase, Mail, Check, X } from 'lucide-react';

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}
const Section = ({ id, title, children, bgColor = 'bg-white', textColor = 'text-gray-800' }: SectionProps) => (
  <section id={id} className={`py-20 px-4 ${bgColor} ${textColor}`}>
    <div className="container mx-auto max-w-4xl">
      <h2 className="text-4xl font-extrabold text-center mb-8">{title}</h2>
      {children}
    </div>
  </section>
);

function App() {
  return (
    <div>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Section id="hero" bgColor="bg-gradient-to-br from-indigo-600 to-purple-700" textColor="text-white">
          <div className="flex flex-col items-center text-center py-16">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Innovate. Create. <span className="text-indigo-200">Inspire.</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
              We are a leading company dedicated to delivering cutting-edge solutions and exceptional experiences.
            </p>
            <a
              href="#about"
              className="bg-white text-indigo-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg"
            >
              Learn More About Us
            </a>
          </div>
        </Section>

        {/* About Us Section */}
        <Section id="about" title="About Our Company">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-4">
                Founded in 20XX, OurCompany has grown from a small startup into a recognized leader in the industry. We pride ourselves on our commitment to innovation, quality, and customer satisfaction.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Our mission is to empower businesses and individuals through technology, creating a positive impact on the world. We believe in fostering a culture of collaboration, continuous learning, and ethical practices.
              </p>
              <p className="text-lg leading-relaxed">
                Meet the passionate team behind our success. We're a diverse group of experts united by a shared vision.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800"
                alt="Our Team"
                className="rounded-lg shadow-xl w-full md:w-4/5 object-cover"
              />
            </div>
          </div>
        </Section>

        {/* Services Section */}
        <Section id="services" title="Our Services" bgColor="bg-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Lightbulb size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Strategic Consulting</h3>
              <p className="text-gray-600">Guidance to navigate complex challenges and achieve your business goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Users size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Software Development</h3>
              <p className="text-gray-600">Custom software solutions tailored to your unique requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <Briefcase size={48} className="text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Digital Marketing</h3>
              <p className="text-gray-600">Boost your online presence and reach your target audience effectively.</p>
            </div>
          </div>
        </Section>

        <Section id="pricing" title="Find the Right Plan for You">
          <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Choose the plan that fits your needs. All plans come with our world-class support.
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-gray-500 mb-4">For individuals getting started</p>
              <p className="text-4xl font-extrabold mb-6">$19<span className="text-lg font-medium text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>1 Project</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Basic Analytics</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Email Support</li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Get Started</button>
            </div>

            {/* Pro Plan (Highlighted) */}
            <div className="bg-white p-8 rounded-lg shadow-2xl border-2 border-indigo-600 flex flex-col relative transform md:scale-105">
              <span className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</span>
              <h3 className="text-2xl font-bold mb-2 text-indigo-600">Pro</h3>
              <p className="text-gray-500 mb-4">For growing teams and businesses</p>
              <p className="text-4xl font-extrabold mb-6">$49<span className="text-lg font-medium text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>10 Projects</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Advanced Analytics</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Priority Email Support</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>API Access</li>
              </ul>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Choose Pro</button>
            </div>

            {/* Team Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Team</h3>
              <p className="text-gray-500 mb-4">For large-scale collaboration</p>
              <p className="text-4xl font-extrabold mb-6">$99<span className="text-lg font-medium text-gray-500">/mo</span></p>
              <ul className="space-y-3 mb-8 text-gray-600 flex-grow">
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Unlimited Projects</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Advanced Analytics</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>24/7 Phone Support</li>
                <li className="flex items-center"><Check size={18} className="text-green-500 mr-2"/>Dedicated Account Manager</li>
              </ul>
              <button className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Contact Sales</button>
            </div>
          </div>

          {/* Comparison Table */}
          <h3 className="text-3xl font-bold text-center mt-20 mb-8">Compare Features in Detail</h3>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 w-1/3 font-semibold">Feature</th>
                  <th className="p-4 text-center font-semibold">Basic</th>
                  <th className="p-4 text-center font-semibold">Pro</th>
                  <th className="p-4 text-center font-semibold">Team</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Number of Projects</td>
                  <td className="p-4 text-center">1</td>
                  <td className="p-4 text-center">10</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="p-4">API Access</td>
                  <td className="p-4 flex justify-center"><X size={20} className="text-red-500" /></td>
                  <td className="p-4 flex justify-center"><Check size={20} className="text-green-500" /></td>
                  <td className="p-4 flex justify-center"><Check size={20} className="text-green-500" /></td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">Support Level</td>
                  <td className="p-4 text-center">Email</td>
                  <td className="p-4 text-center">Priority Email</td>
                  <td className="p-4 text-center">24/7 Phone</td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <td className="p-4">Dedicated Account Manager</td>
                  <td className="p-4 flex justify-center"><X size={20} className="text-red-500" /></td>
                  <td className="p-4 flex justify-center"><X size={20} className="text-red-500" /></td>
                  <td className="p-4 flex justify-center"><Check size={20} className="text-green-500" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        {/* Career Section */}
        <Section id="career" title="Join Our Team">
          <div className="text-center">
            <p className="text-lg leading-relaxed mb-6">
              Are you passionate about technology and innovation? We're always looking for talented individuals to join our growing team. Explore exciting career opportunities with us.
            </p>
            <a
              href="#"
              className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-transform hover:scale-105 shadow-lg"
            >
              View Open Positions
            </a>
          </div>
        </Section>

        {/* Contact Us Section */}
        <Section id="contact" title="Get in Touch" bgColor="bg-gray-100">
          <div className="text-center">
            <p className="text-lg leading-relaxed mb-6">
              Have questions or want to collaborate? We'd love to hear from you. Reach out to us through the form below or our contact details.
            </p>
            <div className="flex items-center justify-center gap-4 text-xl mb-6">
                <Mail className="text-indigo-600" />
                <span>info@ourcompany.com</span>
            </div>
            <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-indigo-700 transition-colors"
                >
                    Send Message
                </button>
            </form>
          </div>
        </Section>
      </main>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-300 py-8 px-4 text-center">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} OurCompany. All rights reserved.</p>
        </div>
      </footer> */}
      <FooterSection />
    </div>
  );
}

export default App;
