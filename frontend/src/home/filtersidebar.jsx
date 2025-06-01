import { FiFilter } from 'react-icons/fi';
import formatAsNaira from '../currency/naira';
const FilterSidebar = ({priceFilter, setPriceFilter, }) => {



  return (
    <aside className="w-full md:w-64 flex-shrink-0 md:block hidden">
      <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
        <h3 className="font-medium text-lg mb-4 flex items-center">
          <FiFilter className="mr-2" />
          Filters
        </h3>
        
        {/* Price Filter */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">{formatAsNaira(priceFilter[0])}</span>
            <span className="text-sm text-gray-500">{formatAsNaira(priceFilter[1])}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={priceFilter[1]}
            onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
   
        
    
        
        <button
          onClick={() => {
            setPriceFilter([1000, 50000]);
          }}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Clear all filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;