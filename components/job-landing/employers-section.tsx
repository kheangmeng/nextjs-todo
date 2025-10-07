import { employers } from './data'

export default function EmployersSection() {
  return(
    <div className="bg-gray-100 py-12 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Top Employers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {employers.map(e => (
            <div key={e.name} className="flex justify-center">
              <img src={e.logo} alt={e.name} className="h-12 filter grayscale hover:grayscale-0 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
)};
