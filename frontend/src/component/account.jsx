import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase"; // Import Firebase auth object

const Account = () => {
    // Dummy data for orders (replace this with your actual data)
    const orders = [
        { id: 1, product: "Product A", price: 20.00 },
        { id: 2, product: "Product B", price: 30.00 },
        // Add more orders as needed
    ];

  
    const [user, setUser] = useState(null); // Store user information
    const navigate = useNavigate();
  
    useEffect(() => {
      // Add a Firebase authentication listener
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          // User is signed in
          setUser(authUser);
        } else {
          // User is signed out
          setUser(null);
        }
      });
  
      // Clean up the listener when the component unmounts
      return () => {
        unsubscribe();
      };
    }, []);
    const handleSignOut = () => {
      // Sign out the user
      auth.signOut().then(() => {
        // User signed out successfully
        setUser(null); // Clear user information
        navigate('/account')
      });
    };
    return (
        <div className="container">
            <div className="" style={{ marginTop: '180px' }}>
                <h5>My Account</h5>
                <p>Welcome, {user ? user.email : 'Guest'}</p>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div className="orders-container">
                <h6>My Orders</h6>

                {orders.map(order => (
                    <div className="order-item" key={order.id}>
                        <p>Order ID: {order.id}</p>
                        <p>Product: {order.product}</p>
                        <p>Price: ${order.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;
