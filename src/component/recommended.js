import React from "react";
import Recommenddata from "./rcimg";
import '../css/product.css'
import { Link } from "react-router-dom";

const Recommend = () => {
return(
    <div className="container p-5">
        <h5 className="text-center text-red p-3">Recommended For You</h5>
       <div className="row mt-3 mb-4">
        {Recommenddata.map((product, index) => (
       <div key={product.id} className="col-md-3 mt-4 mb-4">
 
    <div className="card d-flex flex-column h-100" style={{ marginBottom: '' }}>
    <div className="image-container flex-grow-1">
        {/* Use Link to navigate to the product details page */}
        <Link to={`/product/${index}`}>
                <img src={product.image} className="card-img-top" width={'300px'} alt={product.name} />
                </Link>
              </div>
              <div className="onhover flex-grow-1">
              <img src={product.image} className="card-img-top" alt={product.name} />
              </div>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">{product.price}</p>
                </div>
              </div>
       </div>
        ))}

       </div>
    </div>
)
}
export default Recommend;