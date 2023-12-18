import React from "react";
import { useState, useEffect } from "react";
import productdata from "./productimg";
import Mendata from "./menimg";
import Womandata from "./womanimg";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the AOS styles
const Catalog = ({cartItems, setCartItems}) => {
  const Allproduct = [...Mendata, ...Womandata, ...productdata]
    const [currentProducts, setCurrentProducts] = useState(Allproduct);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // Number of products to display per page
  const [totalProducts, setTotalProducts] = useState(Allproduct.length);

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
        <section className="" style={{marginTop:'40px'}}>
            <div className=" border-bottom p-3">
                <h4 className="text-center text-danger">Products</h4>

            </div>
            <h5 className="text-center mt-2 mb-4 border-bottom p-2 text-success"style={{fontSize:'100%', color:'grey', fontFamily:'initial'}}>{totalProducts} products</h5>
        <div className="container mt-4">
   
        <div className="row mt-5 mb-4">
    {currentProductsPage.map((product, id) => (
   <div key={id} className="col-4 col-md-4 col-lg-3">

<div className=" d-flex flex-column mt-3 mb-2" data-aos="fade-up" >
<div className="">
    {/* Use Link to navigate to the product details page */}
    <Link to={`/product/${product.id}`}>
            <img src={product.image} className="img-fluid woman" alt={product.name} />
            </Link>
          </div>
          
            <div className="card-body mt-0"style={{ height: "90px", width:'100%' }}>
              <p className="card-title text-success">{product.name}</p>
              
              <p className="card-text mt-1 text-danger">NGN{product.price}</p>
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