import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../styles/events/Home.module.css";
import axios from "axios";
import { EventCard, Loader, Navbar } from "../../components";
import { eventsData } from "../../data";
import CustomTitle from "../../utils/customTitle";
import Footer from "../../components/Footer/Footer";

function Events() {
  const router = useRouter();
  const [sports, setSports] = useState(true);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    });
  }
  useEffect(() => {
    getEvents();
  }, []);
  if (loading) 
  return (
    <Loader/>
  );
  return (
    <>
      <CustomTitle title="Events" />
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
            ? events.map((item, index) => {
                if (item.isarts === false)
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/events/${item._id}`);
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
                if (item.isarts === true)
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(`/events/${item._id}`);
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
      <Footer/>
    </>
  );
}

export default Events;
