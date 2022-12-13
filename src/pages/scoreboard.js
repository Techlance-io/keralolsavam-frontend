import axios from "axios";
import React, { useEffect, useState } from "react";
import { Loader, Navbar } from "../components";
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
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState([]);
  const [localBodyScore, setLocalBodyScore] = useState([]);
  const [lsgiScore, setLsgiScore] = useState([]);
  const handleUser = () => {
    setTabs("user");
  };
  const handleLocalBody = () => {
    setTabs("localbody");
  };
  const handleLsgi = () => {
    setTabs("lsgi");
  };
  async function getScore() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/score`).then((res) => {
      //console.log(res.data);
      setScore(sortingUser(res.data));
      setLoading(false);
    });
  }
  async function getLocalBodyScore() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/score/localbody`).then((res) => {
      //console.log(res.data);
      setLocalBodyScore(sortingLocalBody(res.data));
    });
  }
  async function getLsgiScore() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/score/lsgi`).then((res) => {
      //console.log(res.data);
      setLsgiScore(sortingLSGI(res.data));
    });
  }
  useEffect(() => {
    getScore();
    getLocalBodyScore();
    getLsgiScore();
  }, []);
function sortingUser(scoredata1)
{
  scoredata1.sort((a, b) => b.total - a.total);
  console.log(scoredata1);
  return scoredata1;
}
function sortingLocalBody(scoredata2)
{
  scoredata2.sort((a, b) => b.total - a.total);
  console.log(scoredata2);
  return scoredata2;
}
function sortingLSGI(scoredata3)
{
  scoredata3.sort((a, b) => b.total_score - a.total_score);
  console.log(scoredata3);
  return scoredata3;
}
  if (loading) {
    return <Loader />;
  }
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
                  {score.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.table_body_1}>{index + 1}</td>
                        <td className={styles.table_body}>{item.player.participant_name}</td>
                        <td className={styles.table_body_1}>{item.sports_Score}</td>
                        <td className={styles.table_body_1}>{item.arts_score}</td>
                        <td className={styles.table_body}>{item.total}</td>
                      </tr>
                    );
                  })}
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
                  {
                    localBodyScore.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className={styles.table_body_1}>{index + 1}</td>
                          <td className={styles.table_body}>{item.name}</td>
                          <td className={styles.table_body_1}>{item.sports}</td>
                          <td className={styles.table_body_1}>{item.arts}</td>
                          <td className={styles.table_body}>{item.total}</td>
                        </tr>
                      );
                    })
                  }
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
                  {
                    lsgiScore.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td className={styles.table_body_1}>{index + 1}</td>
                          <td className={styles.table_body}>{item.name}</td>
                          <td className={styles.table_body_1}>{item.sports_score}</td>
                          <td className={styles.table_body_1}>{item.arts_score}</td>
                          <td className={styles.table_body}>{item.total_score}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Scoreboard;
