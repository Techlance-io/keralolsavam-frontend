import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Login.module.css";
function Login() {
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>Login</div>
        <div className={styles.inputs}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={styles.login_btn}>Login</div>
        <div className={styles.register_link} onClick={()=>{
          router.push("/register");
        }}>Register Here.</div>
      </div>
    </>
  );
}

export default Login;
