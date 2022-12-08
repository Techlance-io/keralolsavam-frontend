import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import styles from "./official.module.css";
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
export default function EditNewsModal(props) {
  const handleClose = () => props.setOpen(false);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [events, setEvents] = useState([]);
  const [eventStr, setEventStr] = useState("");
  const [selectedEvents, setSelectedEvents] = useState("");

  const getList = async () => {
    try{
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/events`
    )
    console.log(res.data);
    let arr = res.data
    setEvents(res.data);
    // store name property of events array to another string array:
    let strArr = arr.map((item) => item.name);
    setEventStr(strArr);
    }catch(err){
      console.log(err);
    }
    }
  useEffect(() => {
    getList()
  }, [props.data]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedEvents);
    let res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/officials`,
      {
        name: title,
        email: email,
        events: selectedEvents,
      }
    );
    console.log(res.data);
  
    // axios
    // .put(`${process.env.NEXT_PUBLIC_API_URL}/news/${props.data._id}`, {title:title})
    // .then((res) => {
    //   let arr = props.news;
    //   arr[props.data.index] = res.data;
    //   props.setNews([...arr])
    //   console.log(res.data);
    // });
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <form onSubmit={handleSubmit}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ mt: 3 }}>
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />

                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="email"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Autocomplete
                      multiple
                      onChange={(event, value) => {
                        setSelectedEvents(value);
                      }}
                      options={events}
                      filterSelectedOptions
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.name}
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Add Official
                    </Button>
                  </Box>
                </Box>
              </form>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
    </div>
  );
}
