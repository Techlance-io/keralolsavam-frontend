import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
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
export default function EditNotificationsModal(props) {
  const handleClose = () => props.setOpen(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setTitle(props.data?.title);
    setLink(props.data?.link);
  }, [props.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(props.data._id);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/${props.data._id}`,
        {
          title: title,
          link: link,
        }
      )
      .then((res) => {
        let arr = props.notifications;
        arr[props.data.index] = res.data;
        props.setNotifications([...arr]);
        //console.log(res.data);
        handleClose();
      });
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
                      label="News"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <Box sx={{ mt: 3 }} />
                    <TextField
                      required
                      fullWidth
                      id="name"
                      label="News"
                      name="name"
                      autoComplete="name"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Update Notification
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
