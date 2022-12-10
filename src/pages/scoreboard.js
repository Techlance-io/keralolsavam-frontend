import React, { useState } from "react";
import { Navbar } from "../components";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Scoreboard.module.css";
import CustomTitle from "../utils/customTitle";
// import score1 from "../assets/svg/score1.svg";
// import score2 from "../assets/svg/score2.svg";
// import score3 from "../assets/svg/score3.svg";
// import Image from "next/image";
// import score4 from "../assets/svg/score4.svg";
// import score5 from "../assets/svg/score5.svg";
// import score6 from "../assets/svg/score6.svg";
// import score8 from "../assets/svg/score8.svg";
// import score9 from "../assets/svg/score9.svg";

function Scoreboard() {
  const [tabs, setTabs] = useState("user");
  const handleUser = () => {
    setTabs("user");
  };
  const handleLocalBody = () => {
    setTabs("localbody");
  };
  const handleLsgi = () => {
    setTabs("lsgi");
  };
  return (
    <>
      <CustomTitle title="Scoreboard" />
      <Navbar />

      <div className={styles.container}>
        {/* <Image src={score1} alt="score1" className={styles.score1} />
        <Image src={score2} alt="score2" className={styles.score2} />
        <Image src={score3} alt="score3" className={styles.score3} />
        <Image src={score4} alt="score4" className={styles.score4} />
        <Image src={score5} alt="score5" className={styles.score5} />
        <Image src={score6} alt="score6" className={styles.score6} />
        <Image src={score8} alt="score8" className={styles.score8} />
        <Image src={score9} alt="score9" className={styles.score9} /> */}

        <div className={styles.heading}>Scoreboard</div>
        <div className={styles.tabs}>
          <div
            className={
              tabs === "user" ? styles.sub_heading_1 : styles.sub_heading
            }
            onClick={() => {
              handleUser();
            }}
          >
            Users
          </div>
          <div
            className={
              tabs === "localbody" ? styles.sub_heading_1 : styles.sub_heading
            }
            onClick={() => {
              handleLocalBody();
            }}
          >
            Local Body
          </div>
          <div className={styles.tabs}>
            <div
              className={
                tabs === "lsgi" ? styles.sub_heading_1 : styles.sub_heading
              }
              onClick={() => {
                handleLsgi();
              }}
            >
              LSGI
            </div>
          </div>
        </div>
        <div>
          <div className={styles.table_container}>
            {tabs === "user" && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table_heading_1}>SI No</th>
                    <th className={styles.table_heading}>Name</th>
                    <th className={styles.table_heading_1}>Sports</th>
                    <th className={styles.table_heading_1}>Arts</th>
                    <th className={styles.table_heading}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.table_body_1}>101</td>
                    <td className={styles.table_body}>Jaison Dennis</td>
                    <td className={styles.table_body_1}>Angamaly</td>
                    <td className={styles.table_body_1}>Muncipality</td>
                    <td className={styles.table_body}>80</td>
                  </tr>
                </tbody>
              </table>
            )}
            {tabs === "localbody" && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table_heading_1}>SI No</th>
                    <th className={styles.table_heading}>Local Body</th>
                    <th className={styles.table_heading_1}>Sports</th>
                    <th className={styles.table_heading_1}>Arts</th>
                    <th className={styles.table_heading}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.table_body_1}>101</td>
                    <td className={styles.table_body}>Jaison Dennis</td>
                    <td className={styles.table_body_1}>Angamaly</td>
                    <td className={styles.table_body_1}>Muncipality</td>
                    <td className={styles.table_body}>80</td>
                  </tr>
                </tbody>
              </table>
            )}
            {tabs === "lsgi" && (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table_heading_1}>SI No</th>
                    <th className={styles.table_heading}>LSGI</th>
                    <th className={styles.table_heading_1}>Sports</th>
                    <th className={styles.table_heading_1}>Arts</th>
                    <th className={styles.table_heading}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.table_body_1}>101</td>
                    <td className={styles.table_body}>Jaison Dennis</td>
                    <td className={styles.table_body_1}>Angamaly</td>
                    <td className={styles.table_body_1}>Muncipality</td>
                    <td className={styles.table_body}>80</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Scoreboard;
