import React, { useState, useContext } from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Portimage from "../components/image";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../functionality/AuthContext"; // Import the AuthContext

export default function LoginPage() {
  const { login } = useContext(AuthContext); // Access login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    // Perform login logic here (e.g., call login function from context)
    login({ email }); // You can pass any user data needed for authentication

    setEmail("");
    setPassword("");

    alert("Login clicked! Check the console for email and password values.");
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    // Perform login logic here (e.g., call login function from context)
    login({ email: decoded.email }); // Assuming decoded object contains email
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
