import React from 'react';
import PhoneCard from './phone-card';
import { Category } from './data';

const CategorySection = ({ category }: { category: Category }) => {
  return (
    <section id={category.brand} className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold mb-10 border-l-4 border-indigo-600 pl-4">
          {category.brand}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {category.products.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;