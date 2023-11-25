import React from "react";
import { useState, useEffect } from "react";
import Catalogdata from "./catalogimg";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the AOS styles
const Catalog = ({cartItems, setCartItems}) => {
    const [currentProducts, setCurrentProducts] = useState(Catalogdata);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // Number of products to display per page

  // Calculate the index range for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProductsPage = currentProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page navigation
  const nextPage = () => {
    if (currentPage < Math.ceil(currentProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    
  };
  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item.name === product.name);
  
    if (existingProduct) {
      // If the product exists in the cart, increase its quantity by 1
      existingProduct.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      product.quantity = 1;
      setCartItems([...cartItems, product]);
    }
  };
  useEffect(() => {
    AOS.init({
      // You can customize AOS options here if needed
      duration: 1000,
      once: false,
    });
  }, []);
    return(
        <section className="" style={{marginTop:'150px'}}>
            <div className=" border-bottom p-5">
                <h4 className="text-center">Products</h4>

            </div>
            <h5 className="text-center mt-2 mb-4 border-bottom p-2">100 products</h5>
        <div className="container mt-4">
   
   <div className="row mt-5 mb-4">
    {currentProductsPage.map((product, index) => (
   <div key={index} className="col-md-3">

<div className="card d-flex flex-column mt-5 mb-4" style={{ marginBottom: '', borderRadius:'40px' }} data-aos="fade-up">
<div className="image-container ">
    {/* Use Link to navigate to the product details page */}
    <Link to={`/product/${index}`}>
            <img src={product.image} className="card-img-top" width={'300px'} height={'250px'} alt={product.name} />
            </Link>
          </div>
          <div className="onhover flex-grow-1">
          <img src={product.image} className="card-img-top" width={'300px'} height={'250px'} alt={product.name} data-aos="fade-up"/>
          </div>
            <div className="card-body mt-4">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <p className="card-text">{product.price}</p>
            </div>
         
          </div>
   </div>
    ))}

   </div>
</div>
<nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={prevPage}>
               <i className="fas fa-arrow-left"></i>
            </button>
          </li>
          {/* Create page number buttons */}
          <li className="page-item disabled" style={{marginLeft:'100px'}}>
      <span className="page-link">Page {currentPage} of {Math.ceil(currentProducts.length / productsPerPage)}</span>
    </li>
          <li style={{marginLeft:'100px'}} className={`page-item ${currentPage === Math.ceil(currentProducts.length / productsPerPage) ? 'disabled' : ''}`}>
            <button className="page-link " onClick={nextPage}>
            <i className="fas fa-arrow-right"></i>
            </button>
          </li>
        </ul>
      </nav>
      
</section>
    )
}
export default Catalog;