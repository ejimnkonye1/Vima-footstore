import React,{useEffect} from "react";
import productdata from './productimg';
import { Link } from "react-router-dom";
import AOS from 'aos';
import formatAsNaira from "../currency/naira";
import 'aos/dist/aos.css'; // You may need to import the AOS styles



const Proudcts = ({cartItems, setCartItems}) => {

  useEffect(() => {
    AOS.init({
      // You can customize AOS options here if needed
      duration: 1000,
      once: false,
    });
  }, []);
return(
<div className="container mx-auto">
  <h5 className="text-left mt-5 text-red-600">FEATURED COLLECTION</h5>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5 mb-4">
    {productdata.map((product, index) => (
      <div key={product.id} className="flex flex-col mt-3 mb-2">
        <div className="card" data-aos="fade-up">
          <div className="">
            <Link to={`/product/${index}`}>
              <img src={product.image} className="w-full h-auto" alt={product.name} />
            </Link>
          </div>
          <div className="p-2 mt-1">
            <p className="text-truncate">{product.name}</p>
            <p className="text-red-600 mt-0">{formatAsNaira(product.price)}</p>
            <Link to={`/product/${index}`}>
              <button className="btn btn-sm bg-green-500 text-white w-full py-1">View details</button>
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