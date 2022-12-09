import React from "react";
import styles from "./ScaleLoader.module.css";
import { ScaleLoader } from "react-spinners";

function ScaleLoader() {
  return (
    <div className={styles.loader_container}>
      <ScaleLoader color="#36d7b7" />
    </div>
  );
}

export default ScaleLoader;
