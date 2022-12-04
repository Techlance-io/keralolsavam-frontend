import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "../styles/Register.module.css";
function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let user = {
    name,
    email,
    password,
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.heading}>Register</div>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
        <div
          className={styles.register_btn}
          onClick={() => {
            if (name && email && password) {
              alert("Details will be sent to your mail after verification...");
              router.push("/");
            } else {
              alert("Please fill all the details...");
            }
          }}
        >
          Register
        </div>
      </div>
    </>
  );
}

export default Register;
