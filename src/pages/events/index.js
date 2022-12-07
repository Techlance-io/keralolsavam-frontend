import React, { useState } from "react";
import EventCard from "../../components/EventCard/EventCard";
import Navbar from "../../components/Navbar/Navbar";
import sportsData from "../../data/sportsData";
import artsData from "../../data/artsData";
import styles from "../../styles/events/Home.module.css";

function Events() {
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
        <div className={styles.heading}>Events</div>
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
            ? sportsData.map((item, index) => {
                return (
                  <div key={index}>
                    <EventCard image={item.image} title={item.name} />
                  </div>
                );
              })
            : artsData.map((item, index) => {
                return (
                  <div key={index}>
                    <EventCard image={item.image} title={item.name} />
                  </div>
                );
              })}
          )
        </div>
      </div>
    </>
  );
}

export default Events;
