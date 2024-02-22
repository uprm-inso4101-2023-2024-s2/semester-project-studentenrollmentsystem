import React, { useState } from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Portimage from "../components/image";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

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

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleMSRedirect = () => {
      instance
          .loginRedirect({
              ...loginRequest,
              prompt: 'create',
          })
          .catch((error) => console.log(error));
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
        <span>
         <GoogleLogin
           onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse?.credential);
            console.log(decoded);
           }}
           onError={() => {
            console.log('Login Failed');
           }}
         />
        </span>
        <AuthenticatedTemplate>
                 {activeAccount ? (
                  <p>
                    Authenticated Succesfully
                  </p>
                 ) : null}
             </AuthenticatedTemplate>
             <UnauthenticatedTemplate>
              <input type="button" value="Sign in with Microsoft" onClick={handleMSRedirect} />
             </UnauthenticatedTemplate>
      </div>
    </div>
  );
}

const App = ({ instance }) => {
  return (
      <MsalProvider instance={instance}>
        
      </MsalProvider>
  );
};
