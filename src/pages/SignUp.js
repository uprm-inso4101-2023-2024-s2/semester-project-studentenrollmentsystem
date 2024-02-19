import React from "react";
import styles from "../styles/pages/signup.module.scss"

export default function SignUp() {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.SignupBox}>
        <h2>SIGN UP</h2>
        <form>
          <div className={styles.nameFields}>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" placeholder=""></input>
            </div>
            <div className={styles.field}>
              <label>Last Name</label>
              <input type="text" placeholder=""></input>
            </div>
          </div>
          <div className={styles.field}>
            <label>Email</label>
            <input type="email" placeholder="" />
          </div>
          <div className={styles.field}>
            <label>New password</label>
            <input type="password" placeholder="" />
          </div>
          <div className={styles.field}>
            <label>Confirm password</label>
            <input type="password" placeholder="" />
          </div>
          <input type="button" value="Create Account" />
        </form>
        <p>Already have an account? <a href="/login">Login Here</a></p>
      </div>
    </div>
  );
}
