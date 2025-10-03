import type { Filter } from "./delivery-layout";
import { duplicateRestaurants } from "./data";

const allRestaurants = duplicateRestaurants();
const allCuisines = [...new Set(allRestaurants.map(r => r.cuisine))].sort();

const SearchIcon = ({className = "h-5 w-5 text-gray-400"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface FilterSidebarProp {
    filters: Filter;
    setFilters: (value: React.SetStateAction<Filter>) => void;
    cuisineSearch: string;
    setCuisineSearch: any;
    resetFilters: any;
}
export default function FilterSidebar({ filters, setFilters, cuisineSearch, setCuisineSearch, resetFilters }: FilterSidebarProp) {
    const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, sortBy: e.target.value }));
    const handleOfferChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFilters(prev => ({ ...prev, offers: { ...prev.offers, [name]: checked } }));
    };
    const handleCuisineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            cuisines: checked ? [...prev.cuisines, value] : prev.cuisines.filter(c => c !== value)
        }));
    };

    const filteredCuisines = allCuisines.filter(c => c.toLowerCase().includes(cuisineSearch.toLowerCase()));

    return (
        <aside className="w-full lg:w-1/4 lg:pr-8">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-20">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Filters</h3>
                    <button onClick={resetFilters} className="text-sm text-pink-500 font-semibold hover:underline">Clear All</button>
                </div>
                {/* Sort By */}
                <div>
                    <h4 className="font-bold mb-3">Sort by</h4>
                    <div className="space-y-2">
                        {['Relevance', 'Fastest delivery', 'Distance', 'Top rated'].map(option => (
                            <label key={option} className="flex items-center">
                                <input type="radio" name="sort" value={option} checked={filters.sortBy === option} onChange={handleSortChange} className="h-4 w-4 text-pink-600 border-gray-300 focus:ring-pink-500"/>
                                <span className="ml-3 text-gray-700">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>
                {/* Offers */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold mb-3">Offers</h4>
                     <div className="space-y-2">
                         <label className="flex items-center">
                             <input type="checkbox" name="freeDelivery" checked={filters.offers.freeDelivery} onChange={handleOfferChange} className="h-4 w-4 rounded text-pink-600 border-gray-300 focus:ring-pink-500"/>
                             <span className="ml-3 text-gray-700">Free delivery</span>
                         </label>
                         <label className="flex items-center">
                             <input type="checkbox" name="deals" checked={filters.offers.deals} onChange={handleOfferChange} className="h-4 w-4 rounded text-pink-600 border-gray-300 focus:ring-pink-500"/>
                             <span className="ml-3 text-gray-700">Deals</span>
                         </label>
                     </div>
                </div>
                {/* Cuisines */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-bold mb-3">Cuisines</h4>
                    <div className="relative mb-3">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon className="h-4 w-4 text-gray-400" /></div>
                        <input type="text" placeholder="Search cuisines..." value={cuisineSearch} onChange={(e) => setCuisineSearch(e.target.value)} className="block w-full border-gray-300 rounded-md shadow-sm pl-9 py-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"/>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {filteredCuisines.map(cuisine => (
                            <label key={cuisine} className="flex items-center">
                                <input type="checkbox" value={cuisine} checked={filters.cuisines.includes(cuisine)} onChange={handleCuisineChange} className="h-4 w-4 rounded text-pink-600 border-gray-300 focus:ring-pink-500"/>
                                <span className="ml-3 text-gray-700">{cuisine}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};
