import React from 'react';
import ProductCard from './product-card';

// Mock data - in a real app, this would come from an API
const products = [
  { id: 1, name: 'Wireless Headphones', description: 'High-fidelity sound and noise cancellation.', price: '199.99', imageUrl: '/products/headset.jpeg' },
  { id: 2, name: 'Smartwatch Series 7', description: 'Stay connected and track your fitness.', price: '349.00', imageUrl: '/products/smartwatch.jpeg' },
  { id: 3, name: 'Mechanical Keyboard', description: 'Tactile switches for a great typing experience.', price: '125.50', imageUrl: '/products/keyboard.jpeg' },
  { id: 4, name: '4K Gaming Monitor', description: '27-inch display with 144Hz refresh rate.', price: '499.99', imageUrl: '/products/monitor-black.jpg' },
  { id: 5, name: 'Ergonomic Mouse', description: 'Designed for comfort and precision.', price: '79.00', imageUrl: '/products/mouse.jpg' },
  { id: 6, name: 'HD Webcam', description: 'Crystal clear video for your streams and calls.', price: '95.00', imageUrl: '/products/webcam.jpg' },
];


const ProductList = () => {
  return (
    <section id="products" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Our Products</h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Discover our curated collection of high-quality tech gadgets designed to improve your daily life.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
