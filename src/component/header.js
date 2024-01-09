import React, {useState} from 'react';
import logo from '../images/vima_logo-removebg-preview.png';
import { Link } from 'react-router-dom';
import '../css/header.css'
import { useNavigate } from 'react-router-dom';
const Header = ({cartItems}) => {
  const cartItemCount = cartItems.length;
  console.log(cartItemCount);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [searchError, setSearchError] = useState(false); // State for search error
  const [isOffcanvasVisible, setOffcanvasVisible] = useState(false);
  const handleSearch = () => {
    const query = searchQuery.toLowerCase().trim();
    if (query) {
      // Perform your search here and set searchError accordingly
      if (query) {
        setSearchError(false); // Products found
        navigate(`/searchpg/${query}`);
      } else {
        setSearchError(true); // No products found
      }
    }
  };
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };
  
  const closeOffcanvas = () => {
    const offcanvas = document.getElementById('offcanvasWithBothOptions');
    offcanvas.classList.remove('show'); // Remove the 'show' class to hide the offcanvas
  };
  return (
    
    <div className="navbar navbar-expand-lg navbar-light bg-success  border-bottom ">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src={logo}
            alt="Logo"
            height="90"
            className="d-inline-block align-top"
          />
        </Link>
        
        <form className="form-inline search-form d-lg-none"
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission
              handleSearch(); // Manually trigger the search function
            }}
          >
            <div className="input-group" style={{width:''}}>
              <input
                type="text"
                className="form-control"
                placeholder="i'm searching for.."
                aria-label="I'm searching for.."
                aria-describedby="basic-addon2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          </form>
          <div class="offcanvas offcanvas-start custom-offcanvas " data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
  <div class="offcanvas-header">
    
  <Link to="/account" className="nav-link">
    <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"  onClick={closeOffcanvas}>Login?</h5>
    </Link>
   
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    
  </div>
  
  <div class="offcanvas-body">
  <div className=" navbar-collapse justify-content-center" id="navbarNav">
            <div className='justify-content-center'>
            <ul className="navbar-nav " id="navbar-nav">
        <li className="nav-item">
      <Link to="/" className="nav-link text-whit"  onClick={closeOffcanvas}>Home</Link>
    </li>
    <li className="nav-item">
            <Link to="/Man" className="nav-link  text-whit" onClick={closeOffcanvas}>Men</Link>
          </li>

    <li className="nav-item">
      <Link to="/Woman" className="nav-link  text-whit"  onClick={closeOffcanvas}>Women</Link>
    </li>
    <li className="nav-item">
      <Link to="/Cat" className="nav-link  text-whit"  onClick={closeOffcanvas}>Catalog</Link>
    </li>
    
  </ul>
          </div>
         
        </div>
  </div>
</div>

        <div className="d-flex  nav-icon">
         
            <ul className="navbar-nav icon ml-auto d-flex flex-row ">
         
       

{isSearchVisible && (
  <li className="nav-item search-input">
    {/* Your search input goes here */}
    <div className="search-container">
      <input
        type="search"
        placeholder="Search..."
        className="search"
        onBlur={toggleSearch} // Optional: Hide input on blur
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <i className="fas fa-search search-icon " onClick={handleSearch}></i>
      
    </div>
  </li>
)}

      <li className="nav-item myicon user ">
        <Link to="/account" className="nav-link">
          <i className="fas fa-user" style={{color:'white'}}></i>
        </Link>
      </li>
      <li className="nav-item myicon ">
        <Link to="/cart" className="nav-link">
        <div className="cart-icon-container">
                <i className="fas fa-shopping-cart" style={{color:'white'}}></i>
                <span className='count'>{cartItemCount}</span>
              </div>
        </Link>
      </li>
      {!isSearchVisible && (
          <li className="nav-item myicon user">
            <Link to="/" className="nav-link" onClick={toggleSearch}>
              <i className="fas fa-search"style={{color:'white'}} ></i>
            </Link>
          </li>
        )}
      <li>
      <div className="menubar"
            
            data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"
          
          >
            <div className="bar" ></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
      </li>
      </ul>
            </div>
      </div>
    </div>
  );
};

export default Header;
