import React, {useState, useEffect} from "react";
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import the necessary functions
import { auth } from '../Firebase'; // Import the Firebase auth object
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import '../css/Login.css'
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
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
              navigate('/');
            })
            .catch((error) => {
              console.error('Sign-in error:', error);
              setError(error.message);
              setIsLoading(false);
            });
        }
      };
      const location = useLocation();
        // Check if there is a state indicating reset success
  const resetSuccess = location.state && location.state.resetSuccess;


    return(
        <div className="container">
            <div className="d-grid justify-content-center" style={{marginTop:'250px'}}>
            {resetSuccess && (
        <div className="int alert alert-success mt-3" role="alert">
        We've sent you an email with a link to update your password.
        </div>
      )}
                <h3 className="text-center">Login</h3>
              
            <form name="" method="" action="" onSubmit={handleSignIn}>
                <div className="log">
                    <label for='email'>Email</label>
                    <br/>
                    <input type="email" 
                    name="email" 
                    id="email"  
                    className="int" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <br/>
                    <label for='password'>Password</label>
                    <br/>
                    <input type="password"
                     name="password" 
                     id="password"
                      className="int" 
                      onChange={(e) => setPassword(e.target.value)}
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
    )
}
export default Login;