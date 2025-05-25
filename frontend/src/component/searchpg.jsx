import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Mendata from "../array/menimg";
import { Link } from "react-router-dom";

function SearchPage({ searchError }) {
  const { query } = useParams();
  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    console.log('Query:', query);

    const filteredProducts = Mendata.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    console.log('Filtered Products:', filteredProducts);

    if (filteredProducts.length === 0) {
      console.log('No products found');
    }

    setCurrentProducts(filteredProducts);
  }, [query]);


  return (
    <div>
    
      <div className="container mt-5 mb-5" style={{marginTop:'150px'}}>
      {currentProducts.length === 0 ? (
          <h5 className="error-message mb-5" style={{marginTop:'350px'}}>No products found for: "{query}"</h5>
        ) : (
          <h3 className="search-result mb-4" style={{marginTop:'350px'}}>Search Results for: "{query}"</h3>
        )}
        <div className="row">
          {currentProducts.map((product, index) => (
            <div className="col-6 col-md-4 mb-4 col-lg-3 col-sm-6" key={index}>
              {/* Display product details here */}
              <div className="card   d-flex flex-column h-100 product-card">
                <div className="border-bottom pb-2 d-flex justify-content-center">
                  {/* Use Link to navigate to the product details page */}
                  <Link to={`/product/${index}`}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      style={{ width: "100%", height:'250px' }}
                      alt={product.name}
                    />
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-title">{product.name}</p>
                  <p className="card-text text-success">
                    <strong>NGN{product.price}</strong>
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
   
    </div>
  );
}

export default SearchPage;
