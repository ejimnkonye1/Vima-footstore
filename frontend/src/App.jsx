import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Import components
import Header from './component/header.jsx';
import Footer from './component/footer.jsx';
import WhatsAppLink from './util/whatsapp.jsx';
import ContactInfo from './util/contactInfo.jsx';

// Import pages
import HomePage from './pages/homepage.jsx';
import ProductDetails from './pages/productdetails.jsx';
import CartPage from './pages/cart.jsx';
import CheckoutPage from './pages/checkout.jsx';
import UserDashboard from './pages/userdashboard.jsx';
import LoginPage from './auth/login.jsx';
import RegisterPage from './auth/register.jsx';
import SecondHeader from './component/secondheader.jsx';

// Loader component
const Loader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
    <div className="text-center">
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
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
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation(); // Get the current location

  return (
    <div>
      <Layout>
        {/* Conditionally render Header based on the current route */}
        {location.pathname !== '/login' && location.pathname !== '/register' 
        && location.pathname !== '/userdashboard' &&  
        location.pathname !== '/checkout' &&
        !location.pathname.startsWith('/product/')
        &&  (
          <Header
            setActiveCategory={setActiveCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeCategory={activeCategory}
          />
        )}

            {location.pathname !== '/' && location.pathname !== '/cart' && (
          <SecondHeader
          />
        )}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={
            <HomePage
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
            />
          } />
          <Route path="/product/:name" element={<ProductDetails/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
        </Routes>
        <ContactInfo />
        <WhatsAppLink />
        <Footer />
      </Layout>
    </div>
  );
}

// Wrap App with BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
