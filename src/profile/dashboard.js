// Dashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase"; // Import Firebase auth object


const Dashboard = () => {
    const [user, setUser] = useState(null); // Store user information
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  

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
// Example: Update user profile after sign-in
const updateProfile = async () => {
  try {
    await auth.currentUser.updateProfile({
      photoURL: "https://example.com/path/to/profile-image.jpg",
    });

    // Fetch the updated user object
    const updatedUser = auth.currentUser;
    setUser(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error.message);
  }
};

  return (
    <div className='container mt-5'>
    <div className="row">
        
      <div className="col-md-3">
        <div className="border">
      <div className='mt-3 border-bottom pointer' onClick={() => handleNavigate('/account')}>Dashboard</div>
        <div className='mt-3 border-bottom pointer' onClick={() => handleNavigate('/order')}>My Orders</div>
        <div className='mt-3  border-bottom pointer' >Edit Profile</div>
        <div className='mt-3  border-bottom pointer' >Change Password</div>
      </div>
        <div className='mt-5 '>
      <button className="btn btn-success" onClick={handleSignOut}>Sign Out</button>
      </div>
      </div>
     

      {/* Display logged-in user's details */}
      <div className="col-md-8 border m-2 mb-4">
        {/* Replace the following with actual user data */}
        <p className='border-bottom mb-3 p-1'>Logged in as:  {user ? user.email : 'Guest'}</p>
        <div className=' d-flex justify-content-between mt-3'>
       
        <div className=''>
  <svg xmlns="http://www.w3.org/2000/svg" width="89" height="90" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    {/* Add a text element with the number inside the circle */}
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="red" fontSize="8">
      0 {/* Your desired number */}
    </text>
  </svg>
  <div className='pointer mt-3' style={{textDecoration:"underline"}} onClick={() => handleNavigate('/order')}>View Orders</div>
</div>

      <div className=''>
        <p>{user ? user.email : 'Guest'}</p>
         <img src='' alt="User Profile" />
      </div>
      </div>

   
    </div>
    </div>
    </div>
  );
};

export default Dashboard;
