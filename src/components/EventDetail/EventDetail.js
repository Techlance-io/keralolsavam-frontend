import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import styles from "./EventDetail.module.css";

function EventDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>Date And Time</div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker renderInput={(params) => <TextField {...params} />} />
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
            >
              <FormControlLabel
                value="About To Start"
                control={<Radio />}
                label="Event About To Start"
              />
              <FormControlLabel
                value="Started"
                control={<Radio />}
                label="Event Started"
              />
              <FormControlLabel
                value="Over"
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
          <TextField label="Enter Name"/>
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>2nd</div>
        <div>
          <TextField label="Enter Name"/>
        </div>
      </div>
      <div className={styles.rows}>
        <div className={styles.sub_heading}>3rd</div>
        <div>
          <TextField label="Enter Name" />
        </div>
      </div>
      <div className={styles.register_btn}>Save</div>
    </div>
  );
}

export default EventDetail;
