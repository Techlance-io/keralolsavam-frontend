import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Loader, Navbar } from "../../components";
import Footer from "../../components/Footer/Footer";
import { eventsData } from "../../data";
import styles from "../../styles/events/Events.module.css";
import CustomTitle from "../../utils/customTitle";

function EventStatus() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #BF3100",
              borderRadius: "20px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #BF3100",
              borderRadius: "20px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "2px solid #BF3100",
              borderRadius: "20px",
            },
            minHeight: "150%",
          },
        },
      },
    },
  });
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) getEvent();
  }, [id]);
  async function getEvent() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
      .then((res) => {
        setEvent(res.data.event);
        setUsers(res.data.users);
        setLoading(false);
      });
  }
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
  function getTime(time1) {
    const date = new Date(time1);
    const time = date.toLocaleString();
    return time;
  }
  useEffect(() => {
    getEvents();
  }, []);
  if (loading) return <Loader />;
  return (
    <>
      <CustomTitle title="Events" />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Event Details</div>
        <div className={styles.header}>
          <div className={styles.header_1}>
            <div className={styles.header_2}>
              <div className={styles.event_name}>{event?.name}</div>
              {event?.status === "Event About To Start" && (
                <div className={styles.status}>
                  Starts At : {getTime(event?.time)}
                </div>
              )}
              {event?.status === "Event Started" && (
                <div className={styles.status_1}>Event is LIVE</div>
              )}
              {event?.status === "Event Over" && (
                <div className={styles.status}>{event?.status}</div>
              )}
            </div>

            <div>
              <Image
                src={getImage(event?.name)}
                className={styles.img}
                alt=""
              />
            </div>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <FormControl className={`${theme.root} ${styles.textfield}`}>
                <InputLabel
                  id="demo-simple-select-label"
                  style={{
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  }}
                >
                  Other Events
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Other Events"
                  onChange={(e) => {
                    setEvent(e.target.value);
                    router.push(
                      `/events/${
                        events.find((item) => item.name === e.target.value)._id
                      }`
                    );
                  }}
                >
                  {events.map((events, index) => {
                    return (
                      <MenuItem value={events.name} key={index}>
                        {events.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </ThemeProvider>
          </div>
        </div>
        {/* <div className={styles.staff_details}>
          <div className={styles.staff_heading}>Staff Incharges</div>
          <div className={styles.staff_details_content}>
            <div>Name : {event?.official?.name}</div>
            <div>Contact : {event?.official?.email}</div>
          </div>
        </div> */}
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.table_heading}>Chest No</th>
                <th className={styles.table_heading}>Participant Name</th>
                <th className={styles.table_heading_1}>Place</th>
                <th className={styles.table_heading_1}>LSGI</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.table_body}>{user?.chestNo}</td>
                    <td className={styles.table_body}>{user?.name}</td>
                    <td className={styles.table_body_1}>{user?.place}</td>
                    <td className={styles.table_body_1}>{user?.lsgi}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EventStatus;
