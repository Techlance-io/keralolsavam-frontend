import {
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import eventsData from "../../data/eventsData";
import styles from "../../styles/events/Events.module.css";

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
  const [event, setEvent] = useState(eventsData[id]);
  function getEvent() {
    const data = eventsData[id];
    setEvent(data);
  }
  useEffect(() => {
    getEvent();
  }, [id]);
  console.log(event);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Event Details</div>
        <div className={styles.header}>
          <div className={styles.header_1}>
            <div className={styles.header_2}>
              <div className={styles.event_name}>{event?.name}</div>
              <div className={styles.status}>Completed</div>
            </div>

            <div>
              <Image src={event?.image} alt="" />
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
                  label="Gender"
                  onChange={(e) => {
                    setEvent(e.target.value);
                    router.push(
                      `/events/${
                        eventsData.findIndex(
                          (item) => item.name === e.target.value
                        )
                      }`
                    );
                  }}
                >
                  {eventsData.map((events, index) => {
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
        <div className={styles.staff_details}>
          <div className={styles.staff_heading}>Staff Incharges</div>
          <div className={styles.staff_details_content}>
            <div>Name : Jaison Dennis</div>
            <div>Designation : Event Head</div>
            <div>Contact : 9188500270</div>
          </div>
        </div>
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
              <tr>
                <td  className={styles.table_body}>101</td>
                <td className={styles.table_body}>Jaison Dennis</td>
                <td className={styles.table_body_1}>Angamaly</td>
                <td className={styles.table_body_1}>Muncipality</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default EventStatus;
