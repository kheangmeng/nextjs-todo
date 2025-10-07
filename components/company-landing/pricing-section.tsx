import { Check, X } from 'lucide-react';

export default function Pricing() {
  return (
    <>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Choose the plan that fits your needs. All plans come with our world-class support.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <PricingCards />
      </div>

      <h3 className="text-3xl font-bold text-center mt-20 mb-8">Compare Features in Detail</h3>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <ComparisonTable />
      </div>
    </>
  )
}

function PricingCards() {
  return (
    <>
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
    </>
  )
}

function ComparisonTable() {
  return (
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
  )
}
