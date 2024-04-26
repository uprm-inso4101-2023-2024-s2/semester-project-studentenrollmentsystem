import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "../styles/pages/signup.module.scss";
import firebase from '../firebase';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.database().ref(`users/${user.uid}`).set({
        email: user.email,
        uid: user.uid,
      });
      toast.success('Sign-up successful');
      // Optionally, you can redirect the user to another page upon successful sign-up
    } catch (error) {
      console.error('Sign-up error:', error.message);
      toast.error('Sign-up failed');
      // Optionally, display error to the user
    }
  };
  

  return (
    <div className={styles.signupContainer}>
      <div className={styles.SignupBox}>
        <h2>SIGN UP</h2>
        <form>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.field}>
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <input type="button" value="Create Account" onClick={handleSignUp} />
        </form>
        <p>Already have an account? <a href="/login">Login Here</a></p>
      </div>
      <ToastContainer />
    </div>
  );
}
