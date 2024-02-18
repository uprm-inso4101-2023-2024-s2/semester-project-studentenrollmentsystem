import React from "react";
import styles from "../styles/pages/signup.module.scss"
import Button from "../components/button";
import TextInput from "../components/textinput";

export default function SignUp() {
  return (
    <div class={styles.SignupBox}>
      <h2>SIGN UP</h2>
      <form>
        <label>Email</label>
          <input type="email" placeholder="" />
        <label>New password</label>
          <input type="password" placeholder="" />
        <label>Confim password</label>
          <input type="password" placeholder="" />
      </form>
        <input type="button" value="Create Account"></input>
        <p>Already have an account? <a href="/login">Login Here</a></p>
    </div>
    
    
    
  );
}
