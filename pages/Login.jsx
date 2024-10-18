import React, { useState } from 'react';
import Add from '../src/img/addavatar.png';
import {signInWithEmailAndPassword} from 'firebase/auth'
import { useNavigate, Link } from "react-router-dom";
import {auth} from '../src/firebase.js';

const Login = () => {

  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("Form submitted");
    
    e.preventDefault();
   
    const email = e.target[0].value;
    const password = e.target[1].value;
   

    try {
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/")
    } catch (err) {
      console.error("Error creating user: ", err);
      setErr(true);
      setLoading(false);
    }
  };


  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Chatto</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
           
            <input type="email" placeholder='enter email'/>
            <input type="password" placeholder='enter password'/>
            <input style={{display:"none"}}   type="file" id="file"/>
            
            <button>Sign In</button>
            {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account?<Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login;
