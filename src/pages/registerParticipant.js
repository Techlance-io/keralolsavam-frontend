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

function RegisterParticipant() {
  const router = useRouter();
  const lsgitypes = ["Municipality", "Corporation", "Block Panchayath"];
  const sextypes = ["Male", "Female"];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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
        if (item.gender == "Male") list.push(item.name);
      });
    } else if (sex == "Male" && isArts) {
      artsData.forEach((item) => {
        if (!item.gender || item.gender === "Male") list.push(item.name);
      });
    } else if (sex == "Female" && !isArts) {
      sportsData.forEach((item) => {
        if (item.gender == "Female") list.push(item.name);
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
    return placelist;
  }
  let user = {
    name,
    address,
    sex,
    place,
    lsgi,
    localbody,
    artEvents,
    sportsEvents,
  };
  console.log(user);
  async function handleSubmit() {
    await axios
      .post("http://localhost:5000/api/auth/signup", user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
        </div>
        <div
          className={styles.register_btn}
          onClick={() => {
            if (name && address && place && lsgi && localbody && sex) {
              handleSubmit();
            } else {
              alert("Please fill all the details...");
            }
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
