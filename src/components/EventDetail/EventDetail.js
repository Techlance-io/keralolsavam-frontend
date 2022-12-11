import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { AuthContext } from "../../context/AuthContext";
import styles from "./EventDetail.module.css";

function EventDetail() {
  const router = useRouter();
  const [time, setTime] = useState(dayjs("2022-12-10T10:11:54"));
  const [status, setStatus] = useState("Event About To Start");
  const [winners, setWinners] = useState([]);
  const [loader, setLoader] = useState(true);
  const [first, setFirst] = useState();
  const [second, setSecond] = useState();
  const [third, setThird] = useState();
  const [event, setEvent] = useState();
  const {authToken}=useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const { id } = router.query;
  useEffect(() => {
    if (id) getEvent();
  }, [id]);
  async function getEvent() {
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`)
      .then((res) => {
        setEvent(res.data.event);
        setUsers(res.data.users);
        setTime(dayjs(res.data.event.time));
        setStatus(res.data.event.status);
        setFirst(res.data.event.winners[0]);
        setSecond(res.data.event.winners[1]);
        setThird(res.data.event.winners[2]);
        setLoader(false);
      });
  }
  async function handleSubmit() {
    const winners_list = [first, second, third];
    let data = {
      time: time.toISOString(),
      status: status,
      winners: winners_list,
    };
    await axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`, data,{
        headers: {
          "x-auth-token": authToken,
      }})
      .then((res) => {
        //console.log(res.data);
        alert("Event Updated Successfully");
        window.location.reload();
      });
  }
  if (loader)
    return (
      <div className={styles.container}>
        <ScaleLoader color="#622308" />
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>Date And Time</div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={time}
            onChange={(newValue) => {
              setTime(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>Event Status</div>
        <div>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <FormControlLabel
                value="Event About To Start"
                control={<Radio />}
                label="Event About To Start"
              />
              <FormControlLabel
                value="Event Started"
                control={<Radio />}
                label="Event Started"
              />
              <FormControlLabel
                value="Event Over"
                control={<Radio />}
                label="Event Over"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={styles.sub_heading}>Winners</div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>1st</div>
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={users}
            getOptionLabel={(option) => option?.name}
            value={first || { name: "" }}
            onChange={(e, newValue) => setFirst(newValue)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" />
            )}
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>2nd</div>
        <div>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            value={second || { name: "" }}
            onChange={(e, newValue) => setSecond(newValue)}
            options={users}
            getOptionLabel={(option) => option?.name}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" />
            )}
          />
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>3rd</div>
        <div>
          <Autocomplete
            disablePortal
            value={third || { name: "" }}
            getOptionLabel={(option) => option?.name}
            onChange={(e, newValue) => setThird(newValue)}
            id="combo-box-demo"
            options={users}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" />
            )}
          />
        </div>
      </div>
      <div
        className={styles.register_btn}
        onClick={() => {
          handleSubmit();
        }}
      >
        Save
      </div>
    </div>
  );
}

export default EventDetail;
