
import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WhatsAppLink from './util/whatsapp.jsx';
import ContactInfo from './util/contactInfo.jsx';
import ECommerceStore from './test.jsx';
import Footer from './util/footer.jsx';
import ProductDetailsNew from './new/productdetails.jsx';
import CartPage from './new/cart.jsx';
import CheckoutPage from './new/checkout.jsx';
import UserDashboard from './new/ac.jsx';




const Loader = () => (
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <div class="text-center">
    <div class="spinner-grow text-dark" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>


);


// Layout component that includes the loader logic

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayLoader = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(delayLoader);
  }, []);

  return isLoading ? <Loader /> : children;
};

function App() {


  return (
    <div className="">
         
       
 <BrowserRouter>
  <Layout>

    <Routes>
               <Route path='/' element={<ECommerceStore />} />
                              <Route path='/product/:name' element={<ProductDetailsNew />} />
                                                            <Route path='/cart' element={<CartPage />} />
                                                           <Route path='/checkout' element={<CheckoutPage />} />
                                                         <Route path='/us' element={<UserDashboard />} />
    </Routes>

    <ContactInfo />
    <WhatsAppLink />
    <Footer/>
  </Layout>
</BrowserRouter>

   
    </div>
  );
}

export default App;
