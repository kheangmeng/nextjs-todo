export default function HeroSection() {
  return (
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
  )
}
