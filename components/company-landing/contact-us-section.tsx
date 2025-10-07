import { Mail } from 'lucide-react';

export default function ContactUs() {
  return (
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
  )
}
