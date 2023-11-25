import React,{useEffect} from "react";
// import img1 from '../images/beautiful-men-sandal.jpg';
import img2 from '../images/man-two-background-accessory-velcro-removebg-preview.png';
// import img3 from '../images/men-leather-sandal-flip-flop-shoes (1).jpg';
// import img4 from '../images/leather-shoes-sandal.jpg';
import '../css/visit.css';
import AOS from "aos";
import 'aos/dist/aos.css';
const Visitdata = [
    {
        id: 1,
        name: 'Product 1',
        description: 'Description of Product 1.',
        image:  img2,
        price: '$19.99',
      },
      {
        id: 1,
        name: 'Product 2',
        description: 'Description of Product 2.',
        image: img2,
        price: '$19.99',
      },
      {
        id: 1,
        name: 'Product 3',
        description: 'Description of Product 3.',
        image: img2,
        price: '$19.99',
      },
      {
        id: 1,
        name: 'Product 4',
        description: 'Description of Product 4.',
        image: img2,
        price: '$19.99',
      },
]

const Visit = () => {
  useEffect(() => {
    AOS.init({
      // You can customize AOS options here if needed
      duration: 1000,
      once: false,
    });
  }, []);
return(
    <div className="box">
      <div className="container" id="app">
        <div className="body"data-aos="fade-down">
      <h5 className="">Shop our range of exotic products here</h5>
      <div className="">Great pleasure, we take in your satisfaction...</div>
      <button className="btn btn-danger vi">visit shop now</button>
      </div>
        <div className="visit">
        
               <div className="visit-item" >    
                <img src={img2} className="card-img-top" alt="" data-aos="" />
                </div>  
                <div className="visit-item">
                <img src={img2} className="card-img-top" alt="" data-aos="" />
                </div>
                <div className="visit-item">
                <img src={img2} className="card-img-top" alt="" data-aos="" />
                </div>
               <div className="visit-item">
                <img src={img2} className="card-img-top" alt="" data-aos="" />
                </div>
  </div>
   </div>
    </div>
)
}
export default Visit;