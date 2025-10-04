import React, { useState, useMemo, useEffect } from 'react';
import { Restaurant, duplicateRestaurants, foodTypes, promotions} from './data';
import AllRestaurantsSection from './restaurants-section';
import RestaurantCard from './restaurant-card';
import FilterSidebar from './filter-sidebar';
import Tabs, { type TabBar } from './tab-bar';
import Section from './Section';

const allRestaurants = duplicateRestaurants();

const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);
const SearchIcon = ({className = "h-5 w-5 text-gray-400"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-extrabold text-pink-500">foodpandora</div>
            <div className="flex-1 max-w-lg ml-8 hidden sm:block">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                    <input type="text" placeholder="Search for restaurants or cuisines" className="block w-full bg-gray-100 border border-gray-200 rounded-full py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent" />
                </div>
            </div>
            <div className="flex items-center">
                <button className="text-gray-600 hover:text-pink-500 font-semibold mr-4">Log in</button>
                <button className="bg-pink-500 text-white font-bold py-2 px-4 rounded-full hover:bg-pink-600 transition-colors">Sign up</button>
            </div>
        </div>
        <div className="flex items-center py-2 border-t border-gray-100">
            <LocationIcon />
            <span className="font-semibold text-gray-700">Phnom Penh</span>
            <span className="text-gray-400 ml-2">| Now</span>
        </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-gray-300 mt-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul><li className="py-1"><a href="#" className="hover:text-white">About us</a></li><li className="py-1"><a href="#" className="hover:text-white">Careers</a></li><li className="py-1"><a href="#" className="hover:text-white">Press</a></li></ul>
          </div>
          <div>
              <h4 className="font-bold text-white mb-3">Help</h4>
              <ul><li className="py-1"><a href="#" className="hover:text-white">FAQs</a></li><li className="py-1"><a href="#" className="hover:text-white">Contact Us</a></li><li className="py-1"><a href="#" className="hover:text-white">Support</a></li></ul>
          </div>
          <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul><li className="py-1"><a href="#" className="hover:text-white">Terms & Conditions</a></li><li className="py-1"><a href="#" className="hover:text-white">Privacy Policy</a></li></ul>
          </div>
          <div>
              <h4 className="font-bold text-white mb-3">Follow Us</h4>
              <div className="flex space-x-4"><a href="#" className="hover:text-white">FB</a><a href="#" className="hover:text-white">IG</a><a href="#" className="hover:text-white">TW</a></div>
          </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">&copy; {new Date().getFullYear()} foodpandora. All Rights Reserved.</div>
    </div>
  </footer>
);

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
      const timer = setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % promotions.length);
      }, 5000);
      return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-xl overflow-hidden shadow-lg h-56 sm:h-64 md:h-80">
        {promotions.map((promo, index) => (
          <img
            key={promo.id}
            src={promo.imageUrl}
            alt={promo.title}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </div>
  );
};

const CategoriesSection = () => (
  <Section title="What's on your mind?">
      <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
          {foodTypes.map(type => (
              <div key={type.name} className="flex-shrink-0 text-center cursor-pointer group">
                  <div className="mt-2 w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-md transform group-hover:scale-105 transition-transform">
                      <img src={type.imageUrl} alt={type.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="mt-2 font-bold text-gray-700">{type.name}</p>
              </div>
          ))}
      </div>
  </Section>
);

const PromotionFoodsSection = () => {
  const promotionFoods = allRestaurants.filter(r => r.promotion).slice(0, 4);
  return (
    <Section title="Deals for you">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {promotionFoods.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
      </div>
    </Section>
  );
};

const PopularBrandsSection = () => {
  const popularBrands = allRestaurants.filter(r => r.isPopular).slice(0, 4);
    return (
      <Section title="Popular Brands">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularBrands.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)}
        </div>
      </Section>
  );
};


export interface Filter {
  sortBy: string;
  offers: {
    freeDelivery: boolean;
    deals: boolean;
  };
  cuisines: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabBar>('Delivery');

  const initialFilters = {
    sortBy: 'Relevance',
    offers: { freeDelivery: false, deals: false },
    cuisines: []
  };

  const [filters, setFilters] = useState<Filter>(initialFilters);
  const [cuisineSearch, setCuisineSearch] = useState('');

  const resetFilters = () => {
      setFilters(initialFilters);
      setCuisineSearch('');
  }

  const filteredRestaurants = useMemo(() => {
    let restaurants: Restaurant[] = [...allRestaurants];

    // Filter by offers
    if (filters.offers.freeDelivery) {
        restaurants = restaurants.filter(r => r.offers.freeDelivery);
    }
    if (filters.offers.deals) {
        restaurants = restaurants.filter(r => r.offers.deals);
    }

    // Filter by cuisines
    if (filters.cuisines.length > 0) {
        restaurants = restaurants.filter(r => filters.cuisines.includes(r.cuisine));
    }

    // Sort
    switch (filters.sortBy) {
        case 'Top rated':
            restaurants.sort((a, b) => b.rating - a.rating);
            break;
        case 'Fastest delivery':
            restaurants.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
            break;
        // Add cases for 'Distance' and 'Relevance' if you have the data
        default:
            break; // Default is relevance (original order)
    }

    return restaurants;
  }, [filters]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="lg:flex lg:space-x-8">
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            cuisineSearch={cuisineSearch}
            setCuisineSearch={setCuisineSearch}
            resetFilters={resetFilters}
          />
          <div className="w-full lg:w-3/4 mt-8 lg:mt-0">
            <HeroSection />
            <CategoriesSection />
            <PromotionFoodsSection />
            <PopularBrandsSection />
            {activeTab === 'Delivery' && (
              <>
                <AllRestaurantsSection filteredRestaurants={filteredRestaurants} />
              </>
            )}
            {activeTab !== 'Delivery' && (
              <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">Content for {activeTab}</h2>
                <p className="text-gray-500 mt-2">This feature is coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

