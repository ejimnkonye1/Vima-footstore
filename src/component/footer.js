import React,{useEffect} from "react";
import '../css/footer.css';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You may need to import the AOS styles

const Footer = () => {
   useEffect(() => {
      AOS.init({
        // You can customize AOS options here if needed
        duration: 1000,
        once: false,
      });
    }, []);
    return(
      <footer>
    <div className="d-flex justify-content-center bg-success p-5" id="foot">
        <div className=" d-grid justify-content-center " >
        <h3 className="text-center p-2"data-aos="fade-up">Subscribe to our emails</h3>
        <p className="text-center p-4"data-aos="fade-up">Be the first to know about new collections and exclusive offers.</p>
        <div className=" justify-content-center" style={{width:'100%'}}>
            <form name="" action="" >
            <div class="input-container"data-aos="fade-up">
                <input type="email" placeholder="Email" className="email" />
                <i className="arrow fas fa-arrow-right" ></i>
                </div>
            </form>
            <div className="d flex justify-content-center align-items-center" id="social"data-aos="fade-up">
            <div className="navbar navbar-expand-sm">
             <ul className="navbar-nav ml-auto d-flex flex-row">
             <li className="nav-item">
             <Link to="/" className="nav-link social">
                <i class="fab fa-facebook"></i> 
                </Link>
                </li>
                
             <li>
             <Link to="/" className="nav-link social">
                <i class="fab fa-whatsapp"></i>
                </Link>
                 </li>

             <li className="nav-item">
             <Link to="/" className="nav-link social">
                <i class="fab fa-instagram"></i> 
                </Link>
                </li>
             <li className="nav-item">
             <Link to="/" className="nav-link social">
                <i class="fab fa-twitter"></i>
                </Link> 
                </li>
            </ul>
            </div>
            </div>
            {/* <div className="border-bottom p-1" id="bot"></div> */}
            {/* <div className="navbar navbar-expand-lg p-4" id="links" data-aos="fade-up">
             <ul className="navbar-nav ml-auto d-flex flex-row">
             <li className="nav-item">
             <Link to="#ss" className="nav-link" style={{color:'grey'}}>
             © 2023, vimafootstore.Ng
                </Link>
                </li>
                
             <li>
             <Link to="#ss" className="nav-link"style={{color:'grey'}}>
             Refund policy
                </Link>
                 </li>

             <li className="nav-item">
             <Link to="#dd" className="nav-link" style={{color:'grey'}}>
             Terms of service

                </Link>
                </li>
             <li className="nav-item">
             <Link to="#dd" className="nav-link"style={{color:'grey'}}>
             Shipping policy

                </Link> 
                </li>
                <li className="nav-item">
             <Link to="#dd" className="nav-link"style={{color:'grey'}}>
             Contact information

                </Link> 
                </li>
            </ul>
            </div> */}
            <div className="text-center " >
            © 2023, vimafootstore.Ng
            </div>
        </div>
        </div>
    </div>
    </footer>
    )
}

export default Footer;