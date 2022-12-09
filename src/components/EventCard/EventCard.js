import Image from "next/image";
import React from "react";
import styles from "./EventCard.module.css";

function EventCard(props) {
  return (
    <>
      <div className={styles.card}>
        <div className={styles.img_div}>
          <Image className={styles.img} src={props.image} alt="" />
        </div>
        <div className={styles.title}>{props.title}</div>
      </div>
    </>
  );
}

export default EventCard;
