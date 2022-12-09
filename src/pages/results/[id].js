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
import { Navbar } from "../../components";
import CustomTitle from "../../utils/customTitle";

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
  const [event, setEvent] = useState(eventsData[id - 1]);
  function getEvent() {
    const data = eventsData[id - 1];
    setEvent(data);
  }
  useEffect(() => {
    getEvent();
  }, [id]);
  console.log(event);
  return (
    <>
      <CustomTitle title="Results" />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Results</div>
        <div className={styles.header}>
          <div className={styles.image_wrapper}>
            <Image src={event?.image} className={styles.image} alt="" />
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
                  label="Gender"
                  onChange={(e) => {
                    setEvent(e.target.value);
                    router.push(
                      `/results/${eventsData.findIndex(
                        (item) => item.name === e.target.value
                      )}`
                    );
                  }}
                >
                  {eventsData.forEach((events, index) => {
                    if (events?.results)
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
          <div className={styles.first_container}>
            <div className={styles.first_header}>
              <div className={styles.first_heading}>First</div>
              <div className={styles.first_description}>
                <div className={styles.first_description_details}>
                  {event?.results[0]?.name}
                </div>
                <div className={styles.first_description_details}>District</div>
                <div className={styles.first_description_details}>LSGI</div>
              </div>
            </div>
            <div className={styles.first_image_wrapper}>
              <Image src={first} alt="" className={styles.first_image} />
            </div>
          </div>
          <div className={styles.second_container}>
            <div className={styles.second_header}>
              <div className={styles.second_heading}>Second</div>
              <div className={styles.second_description}>
                <div className={styles.second_description_details}>
                  {event?.results[1]?.name}
                </div>
                <div className={styles.second_description_details}>
                  District
                </div>
                <div className={styles.second_description_details}>LSGI</div>
              </div>
            </div>
            <div className={styles.second_image_wrapper}>
              <Image src={second} alt="" className={styles.second_image} />
            </div>
          </div>
          <div className={styles.third_container}>
            <div className={styles.third_header}>
              <div className={styles.third_heading}>Third</div>
              <div className={styles.third_description}>
                <div className={styles.third_description_details}>
                  {event?.results[2]?.name}
                </div>
                <div className={styles.third_description_details}>District</div>
                <div className={styles.third_description_details}>LSGI</div>
              </div>
            </div>
            <div className={styles.third_image_wrapper}>
              <Image src={third} alt="" className={styles.third_image} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventResults;
