import {
  Autocomplete,
  createTheme,
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

function RegisterParticipant() {
  const router = useRouter();
  const lsgitypes = ["Municipality", "Corporation", "Block Panchayath"];
  const sextypes = ["Male", "Female"];
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState("");
  const [place, setPlace] = useState("");
  const [lsgi, setLsgi] = useState(lsgitypes[0]);
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
              border: "3px solid #bf3100",
              borderRadius: "10px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "3px solid #bf3100",
              borderRadius: "10px",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              color: "#9E0000",
              border: "3px solid #bf3100",
              borderRadius: "10px",
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
    let placelist = ["Select Place"];
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
  async function handleSubmit()
  {
    await axios.post("http://localhost:5000/api/auth/signup",user)
    .then((res)=>{
      console.log(res.data);
     })
    .catch((err)=>{
      console.log(err);
    })
  }
  return (
    <>
      <form className={styles.container}>
        <div className={styles.heading}>Particpant Registration</div>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Address"
            multiple
            className={styles.input}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Place"
            className={styles.input}
            value={place}
            onChange={(e) => {
              setPlace(e.target.value);
            }}
          />
          <div className={styles.gender_1}>
            <div>LSGI Type</div>
            <select
              name="lsgi"
              id="lsgi"
              value={lsgi}
              onChange={(e) => {
                setLsgi(e.target.value);
              }}
            >
              {lsgitypes.map((lsgitype, index) => {
                return (
                  <option value={lsgitype} key={index}>
                    {lsgitype}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.gender_1}>
            <div>Local Body</div>
            <select
              name="localbody"
              id="localbody"
              value={localbody}
              onChange={(e) => {
                setLocalbody(e.target.value);
              }}
            >
              {getPlaceList(lsgi).map((place, index) => {
                return (
                  <option value={place} key={index}>
                    {place}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.gender}>
            <div>Gender</div>
            <div className={styles.gender_option}>
              {sextypes.map((sextype, index) => {
                return (
                  <div className={styles.gender_select} key={index}>
                    <input
                      type="radio"
                      name="gender"
                      value={sextype}
                      onChange={(e) => {
                        setSex(e.target.value);
                      }}
                    />
                    <div>{sextype}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <Autocomplete
                multiple
                sx={{
                  width: 350,
                  marginTop: "0.9rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                onChange={(event, value) => {
                  setArtEvents(value);
                }}
                options={getList(sex, true)}
                filterSelectedOptions
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Arts Events"
                    className={theme.root}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                      "& label.Mui-focused": {
                        color: "black",
                      },
                    }}
                    variant="outlined"
                  />
                )}
              />
            </ThemeProvider>
            <ThemeProvider theme={theme}>
              <Autocomplete
                multiple
                sx={{
                  width: 350,
                  marginTop: "1.5rem",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
                onChange={(event, value) => {
                  setSportsEvents(value);
                }}
                options={getList(sex, false)}
                filterSelectedOptions
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Sports Events"
                    className={theme.root}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "black",
                      },
                      "& label.Mui-focused": {
                        color: "black",
                      },
                    }}
                    variant="outlined"
                  />
                )}
              />
            </ThemeProvider>
          </div>
        </div>
        <div
          className={styles.register_btn}
          type="submit"
          onClick={() => {
            if (name && address && place && lsgi && localbody && sex) {
              handleSubmit();
            } else {
              alert("Please fill all the details...");
            }
          }}
        >
          Register
        </div>
      </form>
    </>
  );
}

export default RegisterParticipant;
