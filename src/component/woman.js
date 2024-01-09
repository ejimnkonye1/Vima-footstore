import React, {useEffect} from "react";
import { useState } from "react";
import Womandata from "./womanimg";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomPagination from "./page";
import formatAsNaira from "../currency/naira";
const Woman = ({cartItems, setCartItems}) => {
    const [currentProducts, setCurrentProducts] = useState(Womandata);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // Number of products to display per page
  const [totalProducts, setTotalProducts] = useState(Womandata.length);
  

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
            <div className=" border-bottom p-4">
                <h4 className="text-center text-danger">Women</h4>
                <p className="text-center">Here we'll find beautiful design shoes, slippers and sandals for Woman... Happy Shopping</p>
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
          <h5 className="text-success" style={{ fontSize: '100%', color: 'grey', fontFamily: 'initial' }}>{totalProducts} products</h5>
        </div>

        {/* Sort Section (End) */}
        <div>
          {/* Add your sort content here */}
          <span style={{ fontSize: '100%', color: 'grey', fontFamily: 'initial', padding:'30px' }}>Sort <i class="fa-solid fa-caret-down"></i></span>
        </div>
      </div>
    </div>
        <div className="container mt-4">
   
   <div className="row mt-5 mb-4">
    {currentProductsPage.map((product, id) => (
   <div key={id} className="col-6 col-md-4 col-lg-3">

<div className="card d-flex flex-column mt-5 mb-4 " data-aos="fade-up" >
<div className="">
    {/* Use Link to navigate to the product details page */}
    <Link to={`/product/${product.id}`}>
            <img src={product.image} className="img-fluid woman rounded"  alt={product.name} />
            </Link>
          </div>
          
            <div className="card-body mt-0 " style={{ height: "90px", width:'100%' }}>
              <p className="card-title text-success">{product.name}</p>
              
              <p className="card-text mt-1 text-danger">{formatAsNaira(product.price)}</p>
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
export default Woman;