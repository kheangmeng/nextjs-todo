import { Lightbulb, Users, Briefcase } from 'lucide-react';

export default function Service() {
  return (
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
  )
}
