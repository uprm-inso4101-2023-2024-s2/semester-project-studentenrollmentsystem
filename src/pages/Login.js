import React, { useState } from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Portimage from "../components/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    setEmail("");
    setPassword("");

    alert("Login clicked! Check the console for email and password values.");
  };

  return (
    <div className={styles.loginPage}>
      <div className="image">
        <Portimage /> {}
      </div>

      <div className="row">
        <div className="column" style={{marginLeft:'30%', marginTop:'15%'}}>
          <h1 style={{ marginBottom: '-20px'}}>STUDENT LOGIN</h1>
          
          <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center', marginTop: '0px', marginRight: '30%'}}>
            <p style={{marginRight: '2%'}}>Don't have an account?</p>
            <a href="url" className={styles.signUpButton}>Sign up</a>
          </div>
          
          <div>
            <form>
              <input type="text" id="uname" placeholder="Email" style={{marginBottom:'4px', borderRadius: '20px', padding: '10px', fontSize: '20px', width: '40%', borderColor: '#40976A', borderStyle: 'solid', borderWidth: '2px'}} onChange={(e) => setEmail(e.target.value)} value={email}></input><br/>
              <input type="password" id="password" placeholder="Password" style={{borderRadius: '20px', padding: '10px', fontSize: '20px', width: '40%', borderColor: '#40976A', borderStyle: 'solid', borderWidth: '2px'}} onChange={(e) => setPassword(e.target.value)} value={password}></input><br/>
              <input type="button" id="login" value='Log in' className={styles.loginButton} onClick={handleLogin}></input>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
