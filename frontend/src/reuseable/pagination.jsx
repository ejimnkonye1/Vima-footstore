import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  
  // Show limited page numbers with ellipsis
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pageNumbers.push(i);
    }
  }

  return (
    <nav className="flex items-center gap-1">
      <button
        onClick={() => paginate(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <FiChevronLeft />
      </button>

      {pageNumbers.map((number, index) => (
        <div key={number} className="flex items-center">
          {index > 0 && number - pageNumbers[index - 1] > 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => paginate(number)}
            className={`w-10 h-10 rounded-md flex items-center justify-center ${
              currentPage === number 
                ? 'bg-indigo-600 text-white' 
                : 'hover:bg-gray-100'
            }`}
          >
            {number}
          </button>
        </div>
      ))}

      <button
        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;