import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import app from "../../utils/firebase";
import styles from "../../styles/admin/Dashboard.module.css";
import Image from "next/image";
import { Autocomplete, Button, TextField } from "@mui/material";
import axios from "axios";
import { AddOfficialModal, Navbar } from "../../components";
import CustomTitle from "../../utils/customTitle";

function AdminDashboard() {
  const [omOpen, setOmOpen] = React.useState(false);
  const [officials, setOfficials] = React.useState([]);
  const [officialData, setOfficialdata] = React.useState({});
  const Getofficials = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/officials`);
    console.log(res.data);
    setOfficials(res.data);
  };

  React.useEffect(() => {
    Getofficials();
  }, []);
  const router = useRouter();
  const auth = getAuth(app);
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        router.push("/admin");
      })
      .catch((error) => {});
  }
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
          {officials.map((official) => {
            return (
              <>
                <div className={styles.card}>
                  <div className={styles.official_name}>{official.name}</div>
                  <div className={styles.official_email}>{official.email}</div>
                  <div className={styles.flexible}></div>
                  <div className={styles.official_alloted}>Events Alloted</div>

                  {official.events.map((event) => {
                    return (
                      <>
                        <div className={styles.event_name}>{event.name}</div>
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
              </>
            );
          })}
        </div>
      </div>
      <AddOfficialModal open={omOpen} setOpen={setOmOpen} data={officialData} />
    </>
  );
}

export default AdminDashboard;
