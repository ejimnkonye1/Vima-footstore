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
import Ani from './component/home';
import YES from './component/autoplayproduct';
import BottomNavbar from './component/bottomnav';
import SimpleSlider from './component/home';
import AutoPlay from './component/autoplayproduct';
import { auth } from "./Firebase"; // Import Firebase auth object

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
      <Header cartItems={cartItems}  />

      <Routes>
         <Route path='/' element={<  SimpleSlider  cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path='/visit' element={<Visit />} />
        
         <Route path='/product/:id' element={<ProductDetails cartItems={cartItems} setCartItems={setCartItems} />} />
         <Route path='/Man' element={<Men cartItems={cartItems} setCartItems={setCartItems} />} />
         <Route path='/Woman' element={<Woman cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path='/Cat' element={<Catalog cartItems={cartItems} setCartItems={setCartItems}/>} />
         <Route path="/account">
          <Route path="/account" element={user ? <Account /> : <Login />} />
          </Route>
         {/* <Route path='/login' element={<Login />} /> */}
         <Route path='/signup' element={<SignUp />} />
         {/* <Route path='/account' element={<Account />} /> */}
         <Route path='/resetpaasword' element={<ResetPassword />} />
         <Route path='/cart' element={<Cart cartItems={cartItems} setCartItems={setCartItems}  />} />
         <Route path='/checkout' element={<Checkout cartItems={cartItems}/>} />
         <Route path="/searchpg/:query" element={<SearchPage searchError={searchError} />} />
      </Routes>

      {/* <AutoPlay />
      <Testimonials /> */}
      {/* <YES /> */}
      <Text />
    
      <WhatsAppLink />
      <Footer />
      {/* <BottomNavbar /> */}
      </Layout>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
