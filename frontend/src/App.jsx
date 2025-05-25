
import { useState, useEffect } from 'react';
import './App.css';
import Header from './home/header.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductDetails from './component/productdetails';
import Men from './component/men';
import Woman from './component/woman';
import Catalog from './component/catalog';

import Login from './auth/login.jsx';

import Cart from './component/cart';

import Checkout from './payment/checkout.jsx';
import WhatsAppLink from './util/whatsapp.jsx';

import SearchPage from './component/searchpg';

import SimpleSlider from './home/home.jsx';
// import AutoPlay from './component/autoplayproduct';
import { auth } from "./Firebase"; 
import Recommend from './component/recommended';
import BillingAddressForm from './payment/checkout.jsx';
import ConfirmationPage from './payment/confirm.jsx';

import OrderPage from './profile/order';
import ContactInfo from './util/contactInfo.jsx';
import ProductForm from './home/add.jsx';
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
  const [formData, setFormData] = useState({});
const handleFormDataChange = (newFormData) => {
  setFormData(newFormData);
};
  const [cartItems, setCartItems] = useState([]); // Define cart state
  const [searchError, setSearchError] = useState(false); // State for search error
  // Add this line at the beginning of your component


  return (
    <div className="">
         
       
 <BrowserRouter>
  <Layout>

    <Routes>
      <Route path='/sli' element={<SimpleSlider cartItems={cartItems} setCartItems={setCartItems} />} />

      <Route path='/confirm' element={<ConfirmationPage cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/order' element={<OrderPage formData={formData} />} />


  
      {/* <Route path='/auto' element={<AutoPlay cartItems={cartItems} setCartItems={setCartItems} />} /> */}
      <Route path='/recommend' element={<Recommend cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/searchpg/:query" element={<SearchPage searchError={searchError} />} />

            <Route path='/add' element={<ProductForm/>} />
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
