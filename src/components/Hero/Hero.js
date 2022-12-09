import React, { useEffect, useState } from "react";
import styles from "./Hero.module.css";
import logo from "../../assets/svg/logo.svg";
import background from "../../assets/svg/background.svg";
import axios from "axios";
import "swiper/css";
import "swiper/css/autoplay";
import Image from "next/image";
function Hero() {
  const [news, setNews] = useState([]);
  async function getNews() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`).then((res) => {
      setNews(res.data.news);
    });
  }
  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <div className={styles.carousel_container}>
        <Image src={logo} alt="" className={styles.carousel_img}/>
      </div>
      <div className={styles.ticker_wrap}>
        <div className={styles.ticker_heading}>Latest News</div>
        <div className={styles.ticker_heading_1}>News</div>
        <div className={styles.ticker}>
          {news.map((news) => {
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

export default Hero;
