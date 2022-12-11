import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/admin/Notifications.module.css";
import { Button, TextField } from "@mui/material";
import { EditNewsModal, Loader, Navbar } from "../../components";
import NotificationCard from "../../components/Admin/notificationCard";
import CustomTitle from "../../utils/customTitle";
import Footer from "../../components/Footer/Footer";
import EditNotificationsModal from "../../components/EditNotificationsModal/EditNotificationsModal";
import { getAuth, signOut } from "firebase/auth";
import app from "../../utils/firebase";
import { useRouter } from "next/router";

function Notifications() {
  const router=useRouter();
  const auth=getAuth(app)
  const [notifications, setNotifications] = useState();
  const [variable, setVariable] = useState();
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const { user, loading, authToken } = useContext(AuthContext);
  const handleOpen = () => {
    setOpen(true);
  };
  async function getNotifications() {
    if (!authToken) return;
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        headers: {
          "x-auth-token": authToken,
        },
      })
      .then((res) => {
        setNotifications(res.data);
        setLoader(false);
        console.log(res);
      });
  }
  async function postNotifications() {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/notifications`, {
        title: title,
        link: link,
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setLink("");
        setVariable(res.data);
      });
  }
  useEffect(() => {
    getNotifications();
  }, [variable, authToken]);
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        router.push("/admin");
      })
      .catch((error) => {});
  }
  if (loader) return <Loader />;
  return (
    <>
      <CustomTitle title="Notifications" />
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.header}>
            {" "}
            <div className={styles.heading}>Notifications</div>
            <div
              className={styles.register_btn}
              onClick={() => {
                signOutOfGoogle();
              }}
            >
              Logout
            </div>
          </div>
          <div className={styles.add}>
            <TextField
              id="outlined-basic"
              label="Enter Notification Title"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Link for Notification"
              variant="outlined"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                postNotifications();
              }}
            >
              Add Notification
            </Button>
          </div>
          <div className={styles.news_box}>
            {notifications?.map((data, index) => (
              <NotificationCard
                key={index}
                data={data}
                index={index}
                notifications={notifications}
                setNotifications={setNotifications}
                modalOpen={handleOpen}
                setData={setData}
              />
            ))}
          </div>
        </div>
        <EditNotificationsModal
          open={open}
          setOpen={setOpen}
          setNotifications={setNotifications}
          data={data}
          notifications={notifications}
        />
      </div>
      <Footer />
    </>
  );
}

export default Notifications;
