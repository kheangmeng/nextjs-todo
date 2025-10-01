import React from 'react';
import Image from 'next/image';
import { Smartphone, Camera, Battery, ShoppingCart } from 'lucide-react';
import { Mobile } from './data';

const PhoneCard = ({ phone }: { phone: Mobile }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div><Image priority={true} src={phone.imageUrl} alt={phone.name} width={500} height={600} className="h-65" /></div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2">{phone.name}</h3>
        <div className="space-y-3 text-slate-600 mb-6 flex-grow">
          <p className="flex items-center"><Smartphone size={18} className="mr-3 text-indigo-500" /> {phone.specs.screen}</p>
          <p className="flex items-center"><Camera size={18} className="mr-3 text-indigo-500" /> {phone.specs.camera}</p>
          <p className="flex items-center"><Battery size={18} className="mr-3 text-indigo-500" /> {phone.specs.battery}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-extrabold text-indigo-600">${phone.price}</p>
          <button className="bg-indigo-600 text-white px-2 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <ShoppingCart size={18} /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;