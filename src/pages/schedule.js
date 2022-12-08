import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import styles from "../styles/Schedule.module.css";

function Schedule() {
  const [tabs, setTabs] = useState("1");
  const handleDay1 = () => {
    setTabs("1");
  };
  const handleDay2 = () => {
    setTabs("2");
  };
  const handleDay3 = () => {
    setTabs("3");
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>Schedule</div>
          <div className={styles.tabs}>
            <div
              className={
                tabs === "1" ? styles.sub_heading_1 : styles.sub_heading
              }
              onClick={() => {
                handleDay1();
              }}
            >
              Day 1
            </div>
            <div
              className={
                tabs === "2" ? styles.sub_heading_1 : styles.sub_heading
              }
              onClick={() => {
                handleDay2();
              }}
            >
              Day 2
            </div>
            <div className={styles.tabs}>
              <div
                className={
                  tabs === "3" ? styles.sub_heading_1 : styles.sub_heading
                }
                onClick={() => {
                  handleDay3();
                }}
              >
                Day 3
              </div>
            </div>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}

export default Schedule;
