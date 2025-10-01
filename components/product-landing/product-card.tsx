'use client'

import React from 'react';
import Image from 'next/image'
import { useInView } from 'react-intersection-observer';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  // Stagger the animation delay for each card
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-lg shadow-md overflow-hidden
        transform transition-all duration-700 ease-out
        ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
      style={{ transitionDelay: animationDelay }}
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-slate-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
