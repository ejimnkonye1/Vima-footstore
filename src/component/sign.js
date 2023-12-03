import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../Firebase'; // Import the Firebase auth object
import '../css/Login.css'
const SignUp = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  const validateForm = () => {
    const emailValue = email.trim();
    const passwordValue = password.trim();
    const userNameValue = firstName.trim() + ' ' + lastName.trim();

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    
    const isEmailValid = emailPattern.test(emailValue);
    const isPasswordValid = passwordValue.length >= 8;
    const isUserNameValid = userNameValue.length > 0; // Add your specific validation for user name
    
    setIsFormValid(isEmailValid && isPasswordValid && isUserNameValid);
    
    return isEmailValid && isPasswordValid && isUserNameValid;
  };
  const handleInputChange = () => {
    // Clear error message when the user interacts with the input fields
    setError(null);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        })
          .then(() => {
            console.log('User profile updated successfully:', user);
            navigate('/account');
          })
          .catch((profileError) => {
            console.error('Error updating user profile:', profileError);
            setError(profileError.message);
            setIsLoading(false);
          });
      })
      .catch((signupError) => {
        console.error('Sign-up error:', signupError);
        setError(signupError.message);
        setIsLoading(false);
      });
    }
  };

    return(
        <div className="container">
          
            <div className="d-grid justify-content-center" style={{marginTop:'250px'}}>
                <h3 className="text-center">Create Account</h3>
            <form name="" method="" action="" onSubmit={handleSignUp}>
                <div className="signup">
                   <label for='fname'>Firstname</label>
                    <br/>
                    <input type="text"
                     name="fname" 
                     id="fname"
                    className="int" 
                    required
                    onChange={(e) => { setFirstName(e.target.value); handleInputChange(); }}
                   
                       />
                    <br />
                    <label for='lname'>Lastname</label>
                    <br/>
                    <input type="text" 
                    name="lname"
                     id="lname" 
                     className="int"
                     required
                     onChange={(e) => { setLastName(e.target.value); handleInputChange(); }}

                     />
                    <br />
                    <label for='email'>Email</label>
                    <br/>
                    <input type="email"
                     name="email"
                     id="email" 
                     className="int"
                     required
                     onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
                       />
                    <br/>
                    <label for='password'>Password</label>
                    <br/>
                    <input type="password"
                     name="password" 
                     id="password"
                     className="int" 
                     required  
                     minLength={'8'}
                     onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
                      />
                </div>
                 <button type="submit" className="btn btn-danger mt-3 sign">
                  Create
                 </button>

                 
            </form>
            </div>
        </div>
    )
}
export default SignUp;