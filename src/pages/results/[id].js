import React, { useEffect, useState } from "react";
import styles from "../../styles/results/Results.module.css";
import first from "../../assets/svg/first.svg";
import second from "../../assets/svg/second.svg";
import third from "../../assets/svg/third.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import eventsData from "../../data/eventsData";
import { Loader, Navbar } from "../../components";
import CustomTitle from "../../utils/customTitle";
import axios from "axios";
import Footer from "../../components/Footer/Footer";

function EventResults() {
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
  const [event, setEvent] = useState();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) getEvent();
  }, [id]);
  async function getEvent() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
      .then((res) => {
        setEvent(res.data.event);
        
        setLoading(false);
      });
  }
  async function getEvents() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/events`).then((res) => {
      setEvents(res.data);
    });
  }
  const getImage = (name) => {
    // find name proeprty in events data array:
    const event = eventsData.find((event) => event.name === name);
    // return image property of found event:
    return event?.image;
  };
  useEffect(() => {
    getEvents();
  }, []);
  //console.log(event);
  if (loading) return <Loader />;
  return (
    <>
      <CustomTitle title="Results" />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Results</div>
        <div className={styles.header}>
          <div className={styles.image_wrapper}>
            <Image src={getImage(event?.name)} className={styles.img} alt="" />
          </div>

          <div className={styles.event_name}>{event?.name}</div>
          <div className={styles.select}>
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
                      `/results/${
                        events.find((item) => item.name === e.target.value)._id
                      }`
                    );
                  }}
                >
                  {events.map((events, index) => {
                    if (events?.winners.length > 0)
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
        <div className={styles.prizes_container}>
          {(event?.winners[0]?.name === "No Winner" ||
            event?.winners[0]?.name == null|| event?.winners[0]?.name==="")  ?(""):(
            <div className={styles.first_container}>
              <div className={styles.first_header}>
                <div className={styles.first_heading}>First</div>
                <div className={styles.first_description}>
                  <div className={styles.first_description_details}>
                    {event?.winners[0]?.name}
                  </div>
                  <div className={styles.first_description_details}>
                    {event?.winners[0]?.lsgi}
                  </div>
                  <div className={styles.first_description_details}>
                    {event?.winners[0]?.localbody}
                  </div>
                </div>
              </div>
              <div className={styles.first_image_wrapper}>
                <Image src={first} alt="" className={styles.first_image} />
              </div>
            </div>
          )}
          {(event?.winners[1]?.participant_name === "No Winner" ||
            event?.winners[1]?.participant_name == null||event?.winners[1]?.participant_name==="") ?(""): (
            <div className={styles.second_container}>
              <div className={styles.second_header}>
                <div className={styles.second_heading}>Second</div>
                <div className={styles.second_description}>
                  <div className={styles.second_description_details}>
                    {event?.winners[1]?.participant_name}
                  </div>
                  <div className={styles.second_description_details}>
                    {event?.winners[1]?.lsgi}
                  </div>
                  <div className={styles.second_description_details}>
                    {event?.winners[1]?.localbody}
                  </div>
                </div>
              </div>
              <div className={styles.second_image_wrapper}>
                <Image src={second} alt="" className={styles.second_image} />
              </div>
            </div>
          )}
          {(event?.winners[2]?.participant_name === "No Winner" ||
            event?.winners[2]?.participant_name == null||event?.winners[2]?.participant_name==="")  ?(""): (
            <div className={styles.third_container}>
              <div className={styles.third_header}>
                <div className={styles.third_heading}>Third</div>
                <div className={styles.third_description}>
                  <div className={styles.third_description_details}>
                    {event?.winners[2]?.participant_name}
                  </div>
                  <div className={styles.third_description_details}>
                    {event?.winners[2]?.lsgi}
                  </div>
                  <div className={styles.third_description_details}>
                    {event?.winners[2]?.localbody}
                  </div>
                </div>
              </div>
              <div className={styles.third_image_wrapper}>
                <Image src={third} alt="" className={styles.third_image} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
export default EventResults;
