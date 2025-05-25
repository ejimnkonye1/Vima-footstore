import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the necessary Firebase auth function

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/reset.css';
import Login from './login';
import { auth } from '../Firebase';
const ResetPassword = () => {
  
    const [resetSuccess, setResetSuccess] = useState(false);
  const [resetEmail, setResetEmail] = useState(''); // State for the email used in password reset
  const navigate = useNavigate(); // Initialize the navigate function

  const handleResetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetEmail) // Use sendPasswordResetEmail from Firebase auth
      .then(() => {
        // Password reset email sent successfully
        console.log('Password reset email sent');
        setResetSuccess(true);
     
      })
      .catch((error) => {
        // Handle errors
        console.error('Password reset error:', error);
        setResetSuccess(false); 
      
      });
  };
  useEffect(() => {
    setTimeout(() => {
   setResetSuccess(false)
    }, 2000);
  }, []);
  if (resetSuccess) {
    // Render the Login component directly
    return <Login resetSuccess={resetSuccess}/>;
  }


  return (
    <div className="container">
    <div className="d-grid justify-content-center" style={{marginTop:'90px'}}>
        <h3 className="text-center">RESET YOUR PASSWORD</h3>
        <p className='mt-2 text-center'>We will send you an email to reset your password.</p>
        <form>   
              <div className="form-group">
                <label htmlFor="resetEmail">Email</label>
                <br/>
                <input
                  type="text"
                  className="reset"
                  id="resetEmail"
                
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
            <div className='mt-3'>
            <button type="" onClick={handleResetPassword} className="btn btn-primary btn-block reset-btn">
                Submit
              </button>
            </div>
            </form>
            </div>
            </div>
  
  );
};

export default ResetPassword;
