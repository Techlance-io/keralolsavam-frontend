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
  const handleClose = () => {
    props.setOpen(false);
  };

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [place, setPlace] = useState("");
  const [lsgi, setLsgi] = useState();
  const [artEvents, setArtEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([]);
  const [localbody, setLocalbody] = useState("");
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
  let user = {
    name,
    phone,
    address,
    date,
    sex,
    age,
    lsgi,
    localbody,
    place,
    artEvents,
    sportsEvents,
  };
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("user", user);
    //console.log(props.participant);
    if (name && address && place && lsgi && localbody && sex) {
      //console.log("date", typeof date);
      let expr = "";
      // check regex match :
      if (phone.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)) {
        await axios
          .put(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/updateUser/${props.participant.id}`,
            user
          )
          .then((res) => {
            if (res.status === 200) {
              alert("Registration Updated");
              props.setOpen(false);
            } else {
              alert("Registration Failed");
            }
          })
          .catch((err) => {
            //console.log(err);
          });
      } else {
        alert("Please enter a valid Indian phone number");
      }
    } else {
      alert("Please enter all the details");
    }
  }
  useEffect(() => {
    setName(props.participant?.name);
    setPhone(props.participant?.phone);
    setDate(props.participant?.date);
    setAddress(props.participant?.address);
    setAge(props.participant?.age);
    setSex(props.participant?.sex);
    setPlace(props.participant?.place);
    setLsgi(props.participant?.lsgi);
    setArtEvents(props.participant?.artEvents);
    setSportsEvents(props.participant?.sportsEvents);
    setLocalbody(props.participant?.localbody);
  }, [props.participant]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .put(`${process.env.NEXT_PUBLIC_API_URL}/news/${props.data._id}`, {
  //       title: title,
  //     })
  //     .then((res) => {
  //       let arr = props.news;
  //       arr[props.data.index] = res.data;
  //       props.setNews([...arr]);
  //       console.log(res.data);
  //     });
  // };
  return (
    <Modal
      open={props.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
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
                    value={sex}
                    onChange={(e) => {
                      setSex(e.target.value);
                    }}
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
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
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
                    value={lsgi}
                    onChange={(e) => {
                      setLsgi(e.target.value);
                    }}
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
                    value={localbody}
                    onChange={(e) => {
                      setLocalbody(e.target.value);
                    }}
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
                <TextField
                  fullWidth
                  label="Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  value={artEvents}
                  onChange={(event, newValue) => {
                    setArtEvents(newValue);
                  }}
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
                  value={sportsEvents}
                  onChange={(event, newValue) => {
                    setSportsEvents(newValue);
                  }}
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
          </ThemeProvider>
        </Box>
      </form>
    </Modal>
  );
}
