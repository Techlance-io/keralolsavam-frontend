import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import React, { useContext, useEffect } from "react";
import app from "../../../utils/firebase";
import styles from "../../../styles/official/dashboard/Home.module.css";
import Image from "next/image";
import { EventCard, Navbar } from "../../../components";
import { eventsData } from "../../../data";
import CustomTitle from "../../../utils/customTitle";
import Footer from "../../../components/Footer/Footer";

function OfficialDashboard() {
  const router = useRouter();
  const auth = getAuth(app);
  const [events, setEvents] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const { authToken } = useContext(AuthContext);
  const getImage = (name) => {
    // find name proeprty in events data array:
    const event = eventsData.find((event) => event.name === name);
    // return image property of found event:
    return event?.image;
  };
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        router.push("/official");
      })
      .catch((error) => {});
  }

  const getEvent = async () => {
    if (!authToken) return;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/officer`,
      {
        headers: {
          "x-auth-token": authToken,
        },
      }
    );
    console.log(response.data);
    setUser(response.data);
    setEvents(response.data.events);
  };

  useEffect(() => {
    getEvent();
  }, [authToken]);
  console.log(events);
  return (
    <>
      <CustomTitle title="Official Dashboard" />
      <Navbar />

      <div className={styles.container}>
        {/* <Image src={right} alt="" className={styles.image_top} /> */}
        <div className={styles.header}>
          <div className={styles.heading}>Official Dashboard</div>
          <div
            className={styles.register_btn}
            onClick={() => {
              signOutOfGoogle();
            }}
          >
            Logout
          </div>
        </div>
        {/* <Image src={left} alt="" className={styles.image_left} />
        <Image src={top} alt="" className={styles.image_right} /> */}

        <div className={styles.cards}>
          {events?.map((event) => {
            return (
              <div
                onClick={() => router.push(`/official/dashboard/${event._id}`)}
              >
                <EventCard title={event.name} image={getImage(event.name)} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default OfficialDashboard;
