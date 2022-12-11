import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import app from "../../utils/firebase";
import styles from "../../styles/admin/Dashboard.module.css";
import Image from "next/image";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { AddOfficialModal, Loader, Navbar } from "../../components";
import CustomTitle from "../../utils/customTitle";
import Footer from "../../components/Footer/Footer";
import { AuthContext } from "../../context/AuthContext";

function AdminDashboard() {
  const [omOpen, setOmOpen] = React.useState(false);
  const [officials, setOfficials] = React.useState([]);
  const [variable, setVariable] = React.useState();
  const [officialData, setOfficialdata] = React.useState({});
  const {authToken} = React.useContext(AuthContext);
  const [loader, setLoader] = React.useState(true);
  const Getofficials = async () => {
    if (!authToken) return;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/officials`,{
      headers: {
        "x-auth-token": authToken,
      },
    });
    console.log(res.data);
    setOfficials(res.data);
    setLoader(false);
  };

  React.useEffect(() => {
    Getofficials();
  }, [variable,authToken]);
  const router = useRouter();
  const auth = getAuth(app);
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
      <CustomTitle title="Admin Dashboard" />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>Admin Dashboard</div>
          <div
            className={styles.register_btn}
            onClick={() => {
              signOutOfGoogle();
            }}
          >
            Logout
          </div>
        </div>
        <div
          className={styles.register_btn_2}
          onClick={() => {
            router.push("/admin/news");
          }}
        >
          Add / Modify News
        </div>
        <div
          className={styles.register_btn_3}
          onClick={() => {
            router.push("/admin/notifications");
          }}
        >
          Add / Modify Notifications
        </div>

        <div className={styles.subheading}>Permissions</div>
        <div
          className={styles.register_btn}
          onClick={() => {
            setOmOpen(true);
          }}
        >
          Add Official
        </div>
        <div className={styles.cards}>
          {officials.map((official, index) => {
            return (
              <div className={styles.card} key={index}>
                <div className={styles.official_name}>{official.name}</div>
                <div className={styles.official_email}>{official.email}</div>
                <div className={styles.flexible}></div>
                <div className={styles.official_alloted}>Events Alloted</div>

                {official.events.map((event, index1) => {
                  return (
                    <>
                      <div key={index1} className={styles.event_name}>
                        {event.name}
                      </div>
                    </>
                  );
                })}

                <div>
                  <Button
                    onClick={() => {
                      setOfficialdata(official);
                      setOmOpen(true);
                    }}
                    variant="contained"
                    color="secondary"
                  >
                    Edit
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddOfficialModal
        open={omOpen}
        setOpen={setOmOpen}
        data={officialData}
        setVariable={setVariable}
      />
      <Footer />
    </>
  );
}

export default AdminDashboard;
