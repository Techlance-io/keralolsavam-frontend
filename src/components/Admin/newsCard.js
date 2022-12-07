import React from "react";
import styles from "../../styles/admin/News.module.css";
import { Button } from "@mui/material";
import axios from "axios";

function newsCard({ data, setNews, news, index }) {
  const editNews = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/news/${data._id}`)
      .then((res) => {
        let arr = news;
        

        console.log(res);
      });
  };

  const deleteNews = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${data._id}`)
      .then((res) => {
        console.log(index);
        let arr = news;
        arr.splice(index, 1);
        console.log(arr, news)
        setNews([...arr]);
      });
  };
  console.log(index)

  return (
    <div className={styles.news} key={data._id}>
      <div className={styles.news_heading}>{data.title}</div>
      <div className={styles.buttons}>
        <Button variant="contained" color="primary" onClick={editNews}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={deleteNews}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default newsCard;
