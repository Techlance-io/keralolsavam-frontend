import { getImageListItemBarUtilityClass } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components";
import EventCard from "../../components/EventCard/EventCard";
import Footer from "../../components/Footer/Footer";
import { eventsData } from "../../data";
import styles from "../../styles/results/Home.module.css";
import CustomTitle from "../../utils/customTitle";

function Results() {
  const router = useRouter();
  const [sports, setSports] = useState(true);
  const [events, setEvents] = useState([]);
  const handleChangeArts = () => {
    setSports(false);
  };
  const handleChangeSports = () => {
    setSports(true);
  };
  const getImage = (name) => {
    // find name proeprty in events data array:
    const event = eventsData.find((event) => event.name === name);
    // return image property of found event:
    return event?.image;
  };
  async function getEvents() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`).then((res) => {
      setEvents(res.data);
    });
  }
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <>
      <CustomTitle title="Results" />
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
            ? events.map((item, index) => {
                if (
                  item.isarts === false &&
                  item.winners.length > 0 &&
                  (item.winners[0] !== null ||
                    item.winners[1] !== null ||
                    item.winners[2] !== null)
                )
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/results/${item._id}`);
                      }}
                    >
                      <EventCard
                        image={getImage(item.name)}
                        title={item.name}
                      />
                    </div>
                  );
              })
            : events.map((item, index) => {
                if (
                  item.isarts === true &&
                  item.winners.length > 0 &&
                  (item.winners[0] !== null ||
                    item.winners[1] !== null ||
                    item.winners[2] !== null)
                )
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/results/${item._id}`);
                      }}
                    >
                      <EventCard
                        image={getImage(item.name)}
                        title={item.name}
                      />
                    </div>
                  );
              })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Results;
