import React, {useEffect} from "react";
import { useState } from "react";
import Mendata from "./menimg";
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomPagination from "./page";
const Men = ({ cartItems, setCartItems }) => {
  const [currentProducts, setCurrentProducts] = useState(Mendata);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 15; // Number of products to display per page
  const [totalProducts, setTotalProducts] = useState(Mendata.length);

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
        <section className="" style={{marginTop:'30px'}}>
            <div className=" border-bottom p-3">
                <h4 className="text-center text-danger">Men</h4>
                <p className="text-center">Here we'll find beautiful design shoes, slippers and sandals for men... Happy Shopping</p>
            </div>
            <h5 className="text-center mt-2 mb-4 border-bottom p-2 text-success" style={{fontSize:'100%', color:'grey', fontFamily:'initial'}}>{totalProducts} products</h5>
        <div className="container mt-4">
   
   <div className="row mt-5 mb-4 ">
    {currentProductsPage.map((product, id) => (
   <div key={id} className="col-6 col-md-4 col-lg-3">

<div className="card d-flex flex-column mt-3 mb-2"   data-aos="fade-up" >

          <div className="">
          <Link to={`/product/${product.id}`}>
          <img src={product.image} className="img-fluid men"   alt={product.name} />
          </Link>
          </div>
            <div className="card-body mt-0" style={{ height: "90px", width:'100%' }}>
              <p className="card-title text-success">{product.name}</p>

              <p className="card-text text-danger mt-1">NGN{product.price}</p>
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
export default Men;