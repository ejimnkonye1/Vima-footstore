import React from "react";
import { useState, useEffect } from "react";
import productdata from "../array/productimg";
import Mendata from "../array/menimg";
import Womandata from "../array/womanimg";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import CustomPagination from "../reuseable/page";
import ColorAlerts from "../reuseable/alerts";
import formatAsNaira from "../currency/naira";
const Catalog = ({cartItems, setCartItems}) => {
  const Allproduct = [...Mendata, ...Womandata, ...productdata]
    const [currentProducts, setCurrentProducts] = useState(Allproduct);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16; // Number of products to display per page
  const [totalProducts, setTotalProducts] = useState(Allproduct.length);
  const [showToast, setShowToast] = useState(false);
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
    const existingProduct = cartItems.find((item) => item.name === product.name);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setCartItems([...cartItems]);
    } else {
      product.quantity = 1;
      setCartItems([...cartItems, product]);
    }
    // navigate('./cart')
    setShowToast(true);

    // Hide the toast after a delay (adjust as needed)
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
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
            <div className="text-center mt-2 mb-4 p-2 border-bottom">
      <div className="d-flex justify-content-between align-items-center">
        {/* Filter Section (Right) */}
        
        <div>
          {/* Add your filter content here */}
          <span style={{ fontSize: '100%', color: 'grey', fontFamily: 'initial', padding:'30px' }}>Filter <i class="fa-solid fa-caret-down"></i></span>
        
        </div>

        {/* Total Product Section (Center) */}
        <div>
          <h5 style={{ fontSize: '100%', color: 'grey', fontFamily: 'initial' }}>{totalProducts} products</h5>
        </div>

        {/* Sort Section (End) */}
        <div>
          {/* Add your sort content here */}
          <span style={{ fontSize: '100%', color: 'grey', fontFamily: 'initial', padding:'30px' }}>Sort <i class="fa-solid fa-caret-down"></i></span>
        </div>
      </div>
    </div>
        <div className="container mt-4">
        {showToast && (
     <div className="custom-toast">
      <ColorAlerts />

   </div>
  )} 
        <div className="row mt-5 mb-4">
    {currentProductsPage.map((product, id) => (
   <div key={id} className="col-6 col-md-4 col-lg-3">

<div className="card  d-flex flex-column mt-3 mb-2" data-aos="fade-up" >
<div className="">
    {/* Use Link to navigate to the product details page */}
    <Link to={`/product/${product.id}`}>
            <img src={product.image} className="img-fluid woman rounded " alt={product.name} />
            </Link>
          </div>
          
            <div className="card-body border-top ">
              <p className="card-title text-success ">{product.name}</p>
              
              <p className="card-text  text-danger">{formatAsNaira(product.price)}</p>

            </div>
     
          </div>
   </div>
    ))}

   </div>
</div>

      <div className="d-flex justify-content-center">
            <CustomPagination 
        currentPage={currentPage}
        totalPages={Math.ceil(totalProducts / productsPerPage)}
        prevPage={prevPage}
        nextPage={nextPage}
      
      />
      </div>
</section>
    )
}
export default Catalog;