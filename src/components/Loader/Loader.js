import React from "react";
import styles from "./Loader.module.css";
import { ScaleLoader } from "react-spinners";

function Loader() {
  return (
    <div className={styles.loader_container}>
      <ScaleLoader color="#622308"  />
    </div>
  );
}

export default Loader;
