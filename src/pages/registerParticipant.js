import {
  Autocomplete,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import artsData from "../data/artsData";
import placeData from "../data/placeData";
import sportsData from "../data/sportsData";
import styles from "../styles/RegisterParticipant.module.css";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import footer from "../assets/png/footer.png";
import Image from "next/image";
import left from "../assets/png/left.png";
import right from "../assets/png/right.png";
import top from "../assets/png/top.png";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function RegisterParticipant() {
  const router = useRouter();
  const lsgitypes = ["Municipality", "Corporation", "Block Panchayath"];
  const sextypes = ["Male", "Female"];
  const ageCategories = [
    "Male (15-20)",
    "Male (20-40)",
    "Female((20-40)",
    "Female (20-40)",
  ];
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
  function getList(sex, isArts) {
    let list = [];
    if (sex == "Male" && !isArts) {
      sportsData.forEach((item) => {
        if (!item.gender || item.gender == "Male") list.push(item.name);
      });
    } else if (sex == "Male" && isArts) {
      artsData.forEach((item) => {
        if (!item.gender || item.gender === "Male") list.push(item.name);
      });
    } else if (sex == "Female" && !isArts) {
      sportsData.forEach((item) => {
        if (!item.gender || item.gender == "Female") list.push(item.name);
      });
    } else if (sex == "Female" && isArts) {
      artsData.forEach((item) => {
        if (!item.gender || item.gender === "Female") list.push(item.name);
      });
    } else {
      list.push("No events available");
    }
    return list;
  }
  function getPlaceList(lsgi) {
    let placelist = [];
    placeData.forEach((item) => {
      if (item.type == lsgi) placelist.push(item.name);
    });
    if (placelist.length == 0) placelist.push("No places available");
    return placelist;
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
  async function handleSubmit() {
    if (name && address && place && lsgi && localbody && sex) {
      console.log("date", typeof date);
      let expr = "";
      // check regex match :
      if (phone.match(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)) {
        await axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, user)
          .then((res) => {
            if (res.status === 200) {
              alert("Registration Successful");
              window.location.reload();
            } else {
              alert("Registration Failed");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        alert("Please enter a valid Indian phone number");
      }
    } else {
      alert("Please enter all the details");
    }
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Participant Registration</div>
        <Image src={right} alt="" className={styles.image_top} />
        <div className={styles.content}>
          <div className={styles.rows}>
            <ThemeProvider theme={theme}>
              <TextField
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  },
                }}
                id="outlined-basic"
                className={`${theme.root} ${styles.textfield}`}
                label="Name"
                variant="outlined"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <TextField
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  },
                }}
                id="outlined-basic"
                className={`${theme.root} ${styles.textfield}`}
                label="Mobile Number"
                variant="outlined"
              />
            </ThemeProvider>
          </div>
          <div className={styles.rows}>
            <ThemeProvider theme={theme}>
              <TextField
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  },
                }}
                id="outlined-basic"
                className={`${theme.root} ${styles.textfield}`}
                label="Address"
                variant="outlined"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="Date of Birth"
                  inputFormat="DD/MM/YYYY"
                  className={`${theme.root} ${styles.textfield}`}
                  value={date}
                  onChange={(newDate) => {
                    setDate(new Date(newDate).toUTCString());
                  }}
                  renderInput={(params) => (
                    <TextField
                      InputLabelProps={{
                        style: {
                          fontWeight: "400",
                          fontFamily: "Montserrat",
                          fontSize: "17px",
                          lineHeight: "26px",
                          color: " #622308",
                        },
                      }}
                      id="outlined-basic"
                      className={`${theme.root} ${styles.textfield}`}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </ThemeProvider>
          </div>
          <div className={styles.rows}>
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
                  Gender
                </InputLabel>
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
            </ThemeProvider>
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
                  Age
                </InputLabel>
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
            </ThemeProvider>
          </div>
          <div className={styles.rows}>
            <ThemeProvider theme={theme}>
              <FormControl className={`${theme.root} ${styles.textfield}`}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={theme.root}
                  style={{
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  }}
                >
                  LSGI
                </InputLabel>
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
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <FormControl className={`${theme.root} ${styles.textfield}`}>
                <InputLabel
                  id="demo-simple-select-label"
                  className={theme.root}
                  style={{
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  }}
                >
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
            </ThemeProvider>
          </div>

          <div className={styles.rows}>
            <ThemeProvider theme={theme}>
              <TextField
                value={place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                InputLabelProps={{
                  style: {
                    fontWeight: "400",
                    fontFamily: "Montserrat",
                    fontSize: "17px",
                    lineHeight: "26px",
                    color: " #622308",
                  },
                }}
                id="outlined-basic"
                className={`${theme.root} ${styles.textfield}`}
                label="Place"
                variant="outlined"
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Autocomplete
                multiple
                onChange={(event, value) => {
                  setArtEvents(value);
                }}
                options={getList(sex, true)}
                filterSelectedOptions
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                className={`${theme.root} ${styles.textfield}`}
                disablePortal
                id="combo-box-demo"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Arts Events"
                    InputLabelProps={{
                      style: {
                        fontWeight: "400",
                        fontFamily: "Montserrat",
                        fontSize: "17px",
                        lineHeight: "26px",
                        color: " #622308",
                      },
                    }}
                  />
                )}
              />
            </ThemeProvider>
          </div>
          <ThemeProvider theme={theme}>
            <Autocomplete
              multiple
              onChange={(event, value) => {
                setSportsEvents(value);
              }}
              options={getList(sex, false)}
              filterSelectedOptions
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              className={`${theme.root} ${styles.textfield}`}
              disablePortal
              id="combo-box-demo"
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Sports Events"
                  InputLabelProps={{
                    style: {
                      fontWeight: "400",
                      fontFamily: "Montserrat",
                      fontSize: "17px",
                      lineHeight: "26px",
                      color: " #622308",
                    },
                  }}
                />
              )}
            />
          </ThemeProvider>
        </div>
        <div
          className={styles.register_btn}
          onClick={() => {
            handleSubmit();
          }}
        >
          Register{" "}
        </div>
        <Image src={left} alt="" className={styles.image_left} />
        <Image src={top} alt="" className={styles.image_right} />
      </div>
      <Image
        src={footer}
        alt=""
        style={{ width: "100vw", position: "relative", bottom: "0" }}
      />
    </>
  );
}

export default RegisterParticipant;
