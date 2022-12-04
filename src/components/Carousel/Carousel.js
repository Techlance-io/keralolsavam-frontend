import React from "react";
import kathakali from "../../assets/jpg/kathakali.jpg";
import styles from "./Carousel.module.css";
import newsData from "../../data/newsData";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper";

function Carousel() {
  return (
    <>
      <div className={styles.carousel_container}>
        <Swiper
          slidesPerView={1}
          spaceBetween={50}
          loop={true}
          speed={1000}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Image src={kathakali} className={styles.carousel_img} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={kathakali} className={styles.carousel_img} alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <Image src={kathakali} className={styles.carousel_img} alt="" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.ticker_wrap}>
        <div className={styles.ticker_heading}>Latest News</div>
        <div className={styles.ticker_heading_1}>News</div>
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
