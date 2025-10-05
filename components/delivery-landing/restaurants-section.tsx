import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Restaurant } from './data';
import Section from './Section';
import LoadingDot from '../loading-dot';

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8-2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function AllRestaurantsSection({ filteredRestaurants }: { filteredRestaurants: Restaurant[] }) {
  const ITEMS_PER_PAGE = 8;
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setRestaurants(filteredRestaurants.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filteredRestaurants.length > ITEMS_PER_PAGE);
  }, [filteredRestaurants]);

  const lastRestaurantElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      setTimeout(() => {
        const nextPageItems = filteredRestaurants.slice(
          (page - 1) * ITEMS_PER_PAGE,
          page * ITEMS_PER_PAGE
        );
        setRestaurants(prevRestaurants => [...prevRestaurants, ...nextPageItems]);
        setHasMore(restaurants.length + nextPageItems.length < filteredRestaurants.length);
        setLoading(false);
      }, 1500);
    }
  }, [page]);

  return (
    <Section title="All Restaurants">
      {restaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => {
          if (restaurants.length === index + 1) {
            return <div ref={lastRestaurantElementRef} key={restaurant.id}><RestaurantCard restaurant={restaurant} /></div>;
          } else {
            return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
          }
        })}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg font-semibold text-gray-700">No restaurants found</p>
          <p className="text-gray-500">Try adjusting your filters.</p>
        </div>
      )}
      {loading && <LoadingDot />}
    </Section>
  );
};

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-200 cursor-pointer group">
    <div className="relative">
      <img src={restaurant.imageUrl} alt={restaurant.name} className="w-full h-40 object-cover" />
      {restaurant.promotion && <div className="absolute top-0 left-0 bg-pink-500 text-white text-xs font-bold uppercase p-2 rounded-br-lg">{restaurant.promotion}</div>}
    </div>
    <div className="p-4">
      <h3 className="text-lg font-bold text-gray-800 truncate">{restaurant.name}</h3>
      <p className="text-sm text-gray-500 truncate">{restaurant.tags.join(', ')}</p>
      <div className="flex items-center mt-2">
        <StarIcon />
        <span className="text-sm text-gray-700 font-semibold ml-1">{restaurant.rating}</span>
        <span className="text-gray-400 mx-2">•</span>
        <span className="text-sm text-gray-500">{restaurant.deliveryTime}</span>
      </div>
    </div>
  </div>
);
