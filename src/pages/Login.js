import React, { useState, useContext } from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Portimage from "../components/image";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../functionality/AuthContext"; // Import the AuthContext
import firebase from '../firebase';

export default function LoginPage() {
  const { login } = useContext(AuthContext); // Access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Sign in with email and password using Firebase
      await firebase.auth().signInWithEmailAndPassword(email, password);
      // If successful, call login function from context
      login({ email });
      // Clear input fields
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
      // Optionally, display error to the user
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      // Sign in with Google using Firebase
      const { user } = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
      // If successful, call login function from context
      login({ email: user.email });
    } catch (error) {
      // Handle login error
      console.error('Google login error:', error.message);
      // Optionally, display error to the user
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.SignupBox}>
        <h2>LOGIN</h2>
        <form>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="button" value="Login" onClick={handleLogin} />
        </form>
        <p>Don't have an account? <a href="/Signup">Signup Here</a></p>
        <p>Forgot Password? <a href="/forgotPass">Recover it Here</a></p>
        <span>
         <GoogleLogin
           onSuccess={handleGoogleLoginSuccess}
           onError={() => {
            console.log('Login Failed');
           }}
         />
        </span>
      </div>
    </div>
  );
}
