import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/admin/News.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Button } from "@mui/material";

function News() {
  const [news, setNews] = useState();
  async function getNews() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`).then((res) => {
      setNews(res.data.news);
    });
  }
  useEffect(() => {
    getNews();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          {" "}
          <div className={styles.heading}>News</div>
          <div
            className={styles.register_btn}
            onClick={() => {
              signOutOfGoogle();
            }}
          >
            Logout
          </div>
        </div>
        <div className={styles.news_box}>
          {news?.map((data) => (
            <div className={styles.news}>
              <div className={styles.news_heading}>{data.title}</div>
              <div className={styles.buttons}>
                <Button variant="contained" color="primary">Edit</Button>
                <Button variant="contained" color="error">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;
