import React from "react";
import styles from "./official.module.css";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";

function notificationCard({
  data,
  setNotifications,
  notifications,
  index,
  modalOpen,
  setData,
}) {
  const editNotifications = () => {
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

  const deleteNotifications = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_URL}/notifications/${data._id}`)
      .then((res) => {
        //console.log(index);
        let arr = notifications;
        arr.splice(index, 1);
        //console.log(arr, notifications);
        setNotifications([...arr]);
      });
  };
  console.log(index);

  return (
    <div className={styles.card_1}>
      <div className={styles.title}>{data.title}</div>
      <Link href={data.link} passHref={true} target="_blank">
        <div className={styles.link}>{data.link}</div>
      </Link>
      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={editNotifications}
        >
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={deleteNotifications}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default notificationCard;
