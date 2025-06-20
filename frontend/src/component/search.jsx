import { FiSearch } from "react-icons/fi";

const Search = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mt-4 w-full">
      <header className="">
        <div className="container mx-auto px-4 py-4 w-full">
          <div className="flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border border-gray-300 bg-white rounded-full w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Search;
