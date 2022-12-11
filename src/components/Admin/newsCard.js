import React from "react";
import styles from "./official.module.css";
import { Button } from "@mui/material";
import axios from "axios";

function newsCard({ data, setNews, news, index, modalOpen, setData }) {
  const editNews = () => {
    // axios
    //   .put(`${process.env.NEXT_PUBLIC_API_URL}/news/${data._id}`)
    //   .then((res) => {
    //     let arr = news;

    //     console.log(res);
    //   });
    data.index = index;
    setData(data);
    modalOpen();
  };

  const deleteNews = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/news/${data._id}`)
      .then((res) => {
        console.log(index);
        let arr = news;
        arr.splice(index, 1);
        console.log(arr, news);
        setNews([...arr]);
      });
  };
  console.log(index);

  return (
    <div className={styles.card_1}>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.buttons}>
        <Button variant="contained" color="secondary" onClick={editNews}>
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
