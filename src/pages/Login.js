import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/pages/loginPage.module.scss";
import firebase from '../firebase';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      toast.success('Login successful');
      // Optionally, you can redirect the user to another page upon successful login
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error('Login failed');
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
      </div>
      <ToastContainer />
    </div>
  );
}
