import { useRouter } from "next/router";
import React, { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import Navbar from "../../components/Navbar/Navbar";
import eventsData from "../../data/eventsData";
import styles from "../../styles/results/Home.module.css";

function Events() {
  const router = useRouter();
  const [sports, setSports] = useState(true);
  const handleChangeArts = () => {
    setSports(false);
  };
  const handleChangeSports = () => {
    setSports(true);
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Results</div>
        <div className={styles.tabs}>
          <div
            className={sports ? styles.sub_heading_1 : styles.sub_heading}
            onClick={() => {
              handleChangeSports();
            }}
          >
            Sports
          </div>
          <div
            className={sports ? styles.sub_heading : styles.sub_heading_1}
            onClick={() => {
              handleChangeArts();
            }}
          >
            Arts
          </div>
        </div>
        <div className={styles.cards}>
          {sports
            ? eventsData.map((item, index) => {
                if (item.isArts === false&&item.results)
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/results/${item.id}`);
                      }}
                    >
                      <EventCard image={item.image} title={item.name} />
                    </div>
                  );
              })
            : eventsData.map((item, index) => {
                if (item.isArts === true&&item.results)
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/results/${item.id}`);
                      }}
                    >
                      <EventCard image={item.image} title={item.name} />
                    </div>
                  );
              })}
        </div>
      </div>
    </>
  );
}

export default Events;
