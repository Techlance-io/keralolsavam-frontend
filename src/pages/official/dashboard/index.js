import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";  
import React, { useContext, useEffect } from "react";
import app from "../../../utils/firebase";
import styles from "../../../styles/official/Dashboard.module.css";
import styless from "../../../styles/official/Home.module.css";
import footer from "../../../assets/png/footer.png";
import Image from "next/image";
import left from "../../../assets/png/left.png";
import right from "../../../assets/png/right.png";
import top from "../../../assets/png/top.png";
import Navbar from "../../../components/Navbar/Navbar";
import EventCard from "../../../components/EventCard/EventCard";


function OfficialDashboard() {
  const router = useRouter();
  const auth = getAuth(app);
  const [events, setEvents] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const { authToken } = useContext(AuthContext);
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        router.push("/official");
      })
      .catch((error) => {});
  }

  const getEvent = async () => {
    if(!authToken) return;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/officer`,
      {
          headers: {
            "x-auth-token": authToken,
          }
        }
    );
    console.log(response.data);
    setUser(response.data);
    setEvents(response.data.events);
  };

  useEffect(() => {
    getEvent();
  }, [authToken]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Official Dashboard</div>
        <Image src={right} alt="" className={styles.image_top} />
        <div
          className={styles.register_btn}
          onClick={() => {
            signOutOfGoogle();
          }}
        >
          Logout
        </div>
        <Image src={left} alt="" className={styles.image_left} />
        <Image src={top} alt="" className={styles.image_right} />
      </div>
      <Image
        src={footer}
        alt=""
        style={{ width: "100vw", position: "relative", bottom: "0" }}
      />
      <div className={styless.cards}>
      {
        events.map((event) => {
          return (
            <div onClick={() => router.push(`/official/dashboard/${event._id}`)}>
              <EventCard title = {event.name}  />
            </div>
          );
        })
      }
      </div>
    </>
  );
}

export default OfficialDashboard;
