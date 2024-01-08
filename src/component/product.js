import React,{useEffect} from "react";
import productdata from './productimg';
import '../css/product.css'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the AOS styles
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const Proudcts = ({cartItems, setCartItems}) => {
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
  <div className="container ">
  <h5 className="text-left pro mt-5 text-danger">FEATURED COLLECTION</h5>
  <div className="row mt-5 mb-4 justify-content-center">
    {productdata.map((product, index) => (
      <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
        <div className="card d-flex flex-column mt-3 mb-2" data-aos="fade-up">
          <div className="">
            <Link to={`/product/${index}`}>
              <img src={product.image} className="img-fluid men" alt={product.name} />
            </Link>
          </div>
          <div className="card-body mt-1"  >
            <p className="card-title text-truncate">{product.name}</p>
            <p className="card-text text-danger mt-0">NGN{product.price}</p>
            <Link to={`/product/${index}`}>
            <button className="btn btn-sm btn-success" style={{width:'100%',textOverflow:'initial' }}>View details</button>
         </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
)
}
export default Proudcts