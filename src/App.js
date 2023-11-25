import logo from './logo.svg';
import { useState } from 'react';
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
import Login from './component/login';
import SignUp from './component/sign';
import Account from './component/account';
import Cart from './component/cart';
import Testimonials from './component/testmonial';
import ResetPassword from './component/resetpassword';
import Checkout from './component/checkout';
import WhatsAppLink from './component/whatsapp';
import 'font-awesome/css/font-awesome.min.css';
import SearchPage from './component/searchpg';
function App() {
  const [cartItems, setCartItems] = useState([]); // Define cart state
  const [searchError, setSearchError] = useState(false); // State for search error
  return (
    <div className="">
    <BrowserRouter>
      <Header cartItems={cartItems}  />
    
      <Routes>
         <Route path='/' element={<Home cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path='/visit' element={<Visit />} />
        
         <Route path='/product/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
         <Route path='/Man' element={<Men cartItems={cartItems} setCartItems={setCartItems} />} />
         <Route path='/Woman' element={<Woman cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path='/Cat' element={<Catalog cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path='/login' element={<Login />} />
         <Route path='/Signup' element={<SignUp />} />
         <Route path='/account' element={<Account />} />
         <Route path='/resetpaasword' element={<ResetPassword />} />
         <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}  />} />
         <Route path='/checkout' element={<Checkout />} />
         <Route path="/searchpg/:query" element={<SearchPage searchError={searchError} />} />
      </Routes>
      <Testimonials />
      <Text />
      <WhatsAppLink />
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
