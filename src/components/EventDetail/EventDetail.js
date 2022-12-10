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
import dayjs from "dayjs";
import React, { useState } from "react";
import styles from "./EventDetail.module.css";

function EventDetail() {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const [radioValue, setRadioValue] = useState("Event About To Start");
  return (
    <div className={styles.container}>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>Date And Time</div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            value={value}
            onChange={handleChange}
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
              value={radioValue}
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
            options={["one", "two", "three"]}
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
            options={["one", "two", "three"]}
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
            id="combo-box-demo"
            options={["one", "two", "three"]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Enter Name" />
            )}
          />
        </div>
      </div>
      <div className={styles.register_btn}>Save</div>
    </div>
  );
}

export default EventDetail;
