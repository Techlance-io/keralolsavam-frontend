import React from "react";
import kathakali from "../../assets/jpg/kathakali.jpg";
import styles from "./Carousel.module.css";
import newsData from "../../data/newsData";
import Image from "next/image";

function Carousel() {
  return (
    <>
      <div className={styles.carousel_container}>
        <Image src={kathakali} className={styles.carousel_img} alt="" />
      </div>
      <div className={styles.ticker_wrap}>
        <div className={styles.ticker_heading}>Latest News</div>
        <div className={styles.ticker}>
          {newsData.map((news) => {
            return (
              <div className={styles.ticker_item} key={news.id}>
                {news.title}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Carousel;
