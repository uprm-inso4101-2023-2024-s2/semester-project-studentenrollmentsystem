import React from "react";
import styles from "../styles/pages/loginPage.module.scss";
import Navbar from "../components/navbar";
import portico from "../img/Portico.jpg"; 

export default function LoginPage() {
  return (
    <div className={styles.loginPage}>

      <div class="row">
        <div class="column"
        className = {styles["vertical-rectangle"]}
        style={{
          backgroundImage: `url(${portico})`,
          width: "30%",
          height: "80%",
          borderRadius: "8%",
          position: "absolute",
          top: "10%",
          left: "5%",
        }}
      ></div>


        <div className="column" style={{marginLeft:'370px', marginTop:'160px'}}>
          <h1 style={{fontSize:'40px'}}>STUDENT LOGIN</h1>
          <div>
            <form>
              <input type="text" id="uname" placeholder="Email" style={{marginBottom:'4px'}}></input><br/>
              <input type="password" id="password" placeholder="Password"></input><br/>
              <input type="button" id="login" value='Log in' style={{marginTop:'10px'}}></input>
            </form>
          </div>
          <div style={{display: 'flex', justifyContent:'center', alignContent:'center'}}>
            <p style={{float:'left', fontSize:'15px', paddingRight:'10px'}}>Don't have an account?</p>
            <a href="url" style={{textDecoration:'none', fontSize:'17px', textAlign:'center', marginTop:'14px'}}>Sign up</a>
          </div>
        </div>
      </div>

      

    </div>
  );
}
