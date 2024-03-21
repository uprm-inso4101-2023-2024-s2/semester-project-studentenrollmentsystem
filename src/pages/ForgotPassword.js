import React, { useState } from "react";
import styles from "../styles/pages/forgotPassword.module.scss"

export default function ForgotPassword() {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [error, setError] = useState("");

  const handlePassword = () => {
    if(!validateEmail(email)){
      setError("Invalid email address.")
      return;
    }

    if (password === confirmPassword) {
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("Security Question:", securityQuestion);
      console.log("Security Answer:", securityAnswer);
      setPassword("");
      setConfirmPassword("");
      setSecurityQuestion("");
      setSecurityAnswer("");
      alert("Password Changed! Check the console for new password and security question values.");
    } else {
      setError("Passwords do not match.");
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className={styles.forgotpassContainer}>
      <div className={styles.forgotpassBox}>
        <h2>Recover Password</h2>
        <form>
          <div className={styles.field}>
            <label>Email</label>
            <input
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>New password</label>
            <input
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Confirm password</label>
            <input
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label>Answer to security question</label>
            <input
              type="text"
              placeholder=""
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input type="button" value="Create new Password" onClick={handlePassword} />
        </form>
        <p>Already have an account? <a href="/login">Login Here</a></p>
      </div>
    </div>
  );
}
