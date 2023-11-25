import React,{useEffect} from "react";
import productdata from './productimg';
import '../css/product.css'
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the AOS styles



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
    <div className="container p-5">
        <h5 className="text-center p-3">FEATURED COLLECTION</h5>
       <div className="row mt-3 mb-4">
        {productdata.map((product, index) => (
       <div key={product.id} className="col-4 col-md-4 col-lg-3" >
        
 
    <div className="card  mt-5 mb-4"data-aos="fade-up" style={{ marginBottom: '' }}>
    <div className="i">
        {/* Use Link to navigate to the product details page */}
        <Link to={`/product/${index}`}>
                <img src={product.image} className="img-fluid " width={'300px'} alt={product.name} />
                </Link>
              </div>
             
                <div className="card-body">
                  <p className="card-title">{product.name}</p>
                
                  <p className="card-text">{product.price}</p>
                </div>
              
              </div>
       </div>
        ))}

       </div>
    </div>
)
}
export default Proudcts