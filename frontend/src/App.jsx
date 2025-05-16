import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import Header from './component/header';
import Proudcts from './component/product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './component/home';
import Text from './component/text';
import Visit from './component/visit';
import ProductDetails from './component/productdetails';
import Men from './component/men';
import Woman from './component/woman';
import Catalog from './component/catalog';
import Footer from './component/footer';
import Login from './profile/login';
import SignUp from './profile/sign';
import Account from './component/account.jsx';
import Cart from './component/cart';
import Testimonials from './component/testmonial';
import ResetPassword from './profile/resetpassword';
import Checkout from './component/checkout';
import WhatsAppLink from './component/whatsapp';

import SearchPage from './component/searchpg';
import Ani from './component/home';
import YES from './component/autoplayproduct';
import BottomNavbar from './component/bottomnav';
import SimpleSlider from './component/home';
import AutoPlay from './component/autoplayproduct';
import { auth } from "./Firebase"; // Import Firebase auth object
import Recommend from './component/recommended';
import BillingAddressForm from './component/checkout';
import ConfirmationPage from './component/confirm';
import Dashboard from './profile/dashboard';
import OrderPage from './profile/order';
import ContactInfo from './component/text';



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
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="">
         
       
 <BrowserRouter>
  <Layout>
    <Header cartItems={cartItems} />

    <Routes>
      <Route path='/' element={<SimpleSlider cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/cart/checkout' element={<BillingAddressForm cartItems={cartItems} setCartItems={setCartItems} onFormDataChange={handleFormDataChange} />} />
      <Route path='/confirm' element={<ConfirmationPage cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/order' element={<OrderPage formData={formData} />} />
      <Route path='/product/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/Man' element={<Men cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/Woman' element={<Woman cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/Cat' element={<Catalog cartItems={cartItems} setCartItems={setCartItems} />} />
      
      {/* <Route path="/account">
        <Route path="/account" element={user ? <Dashboard /> : <Login />} />
      </Route> */}

      {/* <Route path='/signup' element={<SignUp />} /> */}
      {/* <Route path='/resetpassword' element={<ResetPassword />} /> */}

      {/* {user ? (
        <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      ) : (
        <Route path='/cart' element={<Login />} />
      )} */}

      <Route path='/checkout' element={<Checkout cartItems={cartItems} />} />
      <Route path='/auto' element={<AutoPlay cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path='/recommend' element={<Recommend cartItems={cartItems} setCartItems={setCartItems} />} />
      <Route path="/searchpg/:query" element={<SearchPage searchError={searchError} />} />
    </Routes>

    <ContactInfo />
    <WhatsAppLink />
    <Footer />
  </Layout>
</BrowserRouter>

   
    </div>
  );
}

export default App;
