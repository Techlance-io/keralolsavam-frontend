import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Autocomplete,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import styles from "./EditParticipant.module.css";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { artsData, placeData, sportsData } from "../../data";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Montserrat",
      textTransform: "none",
    },
  },
});
export default function EditParticipant(props) {
  const handleClose = () => props.setOpen(false);

  const [title, setTitle] = useState("");
  const [sex, setSex] = useState("");
  const [lsgi, setLsgi] = useState("");
  const sextypes = ["Male", "Female"];
  const lsgitypes = ["Municipality", "Corporation", "Block Panchayath"];
  const ageCategories = [
    "Male (15-20)",
    "Male (20-40)",
    "Female (15-20)",
    "Female (20-40)",
  ];
  function getList(sex, isarts) {
    let list = [];
    if (sex == "Male" && !isarts) {
      sportsData.forEach((item) => {
        if (!item.gender || item.gender == "Male") list.push(item.name);
      });
    } else if (sex == "Male" && isarts) {
      artsData.forEach((item) => {
        if (!item.gender || item.gender === "Male") list.push(item.name);
      });
    } else if (sex == "Female" && !isarts) {
      sportsData.forEach((item) => {
        if (!item.gender || item.gender == "Female") list.push(item.name);
      });
    } else if (sex == "Female" && isarts) {
      artsData.forEach((item) => {
        if (!item.gender || item.gender === "Female") list.push(item.name);
      });
    } else {
      list.push("No events available");
    }
    return list;
  }
  function getAgeCategories(sex) {
    let agelist = [];
    if (sex === "Male") {
      agelist.push(ageCategories[0]);
      agelist.push(ageCategories[1]);
      return agelist;
    } else if (sex === "Female") {
      agelist.push(ageCategories[2]);
      agelist.push(ageCategories[3]);
      return agelist;
    } else {
      agelist.push("No categories available");
      return agelist;
    }
  }
  function getPlaceList(lsgi) {
    let placelist = [];
    placeData.forEach((item) => {
      if (item.type == lsgi) placelist.push(item.name);
    });
    if (placelist.length == 0) placelist.push("No places available");
    return placelist;
  }

  useEffect(() => {
    setTitle(props.data?.title);
  }, [props.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.NEXT_PUBLIC_API_URL}/news/${props.data._id}`, {
        title: title,
      })
      .then((res) => {
        let arr = props.news;
        arr[props.data.index] = res.data;
        props.setNews([...arr]);
        console.log(res.data);
      });
  };
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ThemeProvider theme={theme}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    label="Date of Birth"
                    inputFormat="DD/MM/YYYY"
                    renderInput={(params) => (
                      <TextField fullWidth id="outlined-basic" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                  >
                    {sextypes.map((sex, index) => {
                      return (
                        <MenuItem value={sex} key={index}>
                          {sex}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    {getAgeCategories(sex).map((age, index) => {
                      return (
                        <MenuItem value={age} key={index}>
                          {age}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">LSGI</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="LSGI"
                  >
                    {lsgitypes.map((lsgitype, index) => {
                      return (
                        <MenuItem value={lsgitype} key={index}>
                          {lsgitype}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Local Body
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Local Body"
                  >
                    {getPlaceList(lsgi).map((place, index) => {
                      return (
                        <MenuItem value={place} key={index}>
                          {place}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Place" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={getList(sex, true)}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  disablePortal
                  id="combo-box-demo"
                  renderInput={(params) => (
                    <TextField {...params} label="Select Arts Events" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={getList(sex, false)}
                  filterSelectedOptions
                  disableCloseOnSelect
                  getOptionLabel={(option) => option}
                  className={`${theme.root} ${styles.textfield}`}
                  disablePortal
                  id="combo-box-demo"
                  renderInput={(params) => (
                    <TextField {...params} label="Select Sports Events" />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Details
            </Button>
          </Box>
        </ThemeProvider>
      </Box>
    </Modal>
  );
}
