import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = ({ signupSuccess, resetSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [issignVisible, setIsSignVisible] = useState(false);
  const [isresetVisible, setResetVisible] = useState(false);
  const [iserrotVisible, setErroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const validateForm = () => {
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const isEmailValid = emailPattern.test(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    setIsFormValid(isEmailValid && isPasswordValid);
    return isEmailValid && isPasswordValid;
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log('User signed in:', user);
          navigate('/account');
        })
        .catch((error) => {
          console.error('Sign-in error:', error);
          setError(error.message);
          setIsLoading(false);
          setErroVisible(true);
        });
    }
  };

  const handleInputChange = () => {
    // Clear error message when the user interacts with the input fields
    setError(null);
    setErroVisible(false);
  };

  useEffect(() => {
    const clearErrorTimeout = setTimeout(() => {
      setError(null);
      setErroVisible(false);
    }, 2000);

    return () => clearTimeout(clearErrorTimeout);
  }, []);

  useEffect(() => {
    if (signupSuccess) {
      setIsSignVisible(true);
      const timeoutId = setTimeout(() => {
        setIsSignVisible(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [signupSuccess]);

  useEffect(() => {
    if (resetSuccess) {
      setResetVisible(true);
      const timeoutId = setTimeout(() => {
        setResetVisible(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [resetSuccess]);
  useEffect(() => {
    setErroVisible(true);
    const clearErrorTimeout = setTimeout(() => {
     
      setErroVisible(false);
    }, 3000);

    return () => {
      clearTimeout(clearErrorTimeout);
      setErroVisible(false); // Ensure that the state is set to false when the component unmounts
    };
  }, [error]);

  return (
    <div className="container">
      <div className="d-grid justify-content-center border" style={{ marginTop: '100px' }}>
        <div>
          {isresetVisible ? (
            <div className="int alert alert-success mt-3" role="alert">
              We've sent you an email with a link to update your password.
            </div>
          ) : issignVisible ? (
            <div className="int alert alert-success mt-3" role="alert">
              Thank you for registering with us!
            </div>
          ) : iserrotVisible ? (
            <div className="int alert alert-danger mt-3" role="alert">
              {error}
            </div>
          ) : null}
          {/* ... rest of your component */}
        </div>

        <h3 className="text-center mt-3">Login</h3>

        <form name="" method="" action="" onSubmit={handleSignIn}>
          <div className="log">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              className="int"
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              className="int"
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              minLength={'8'}
              required
            />
          </div>
          <Link to='/resetpaasword'>
            <p className="text-center mt-2">Forget Your Password?</p>
          </Link>
          <button className="btn btn-danger sign">Sign In</button>
          <Link to='/Signup'>
            <p className="text-center mt-2">Create Account</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
