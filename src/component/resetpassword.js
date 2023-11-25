import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the necessary Firebase auth function
import { auth } from '../Firebase'; // Import the Firebase auth object
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/reset.css';

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
        navigate('/login',{ state: { resetSuccess: true } }); // Use navigate to redirect to the reset-message route
      })
      .catch((error) => {
        // Handle errors
        console.error('Password reset error:', error);
        setResetSuccess(false); 
      
      });
  };

  return (
    <div className="container">
    <div className="d-grid justify-content-center" style={{marginTop:'250px'}}>
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
