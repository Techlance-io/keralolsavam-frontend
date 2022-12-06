import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import React from "react";
import app from "../../utils/firebase";
import styles from "../../styles/admin/Dashboard.module.css";
import footer from "../../assets/png/footer.png";
import Image from "next/image";
import left from "../../assets/png/left.png";
import right from "../../assets/png/right.png";
import top from "../../assets/png/top.png";
import Navbar from "../../components/Navbar/Navbar";
import { Autocomplete, TextField } from "@mui/material";

function AdminDashboard() {
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
        
        <div className={styles.subheading}>Permissions</div>
        <div className={styles.rows}>
        <div className={styles.row}>
          <div>
            Jagannath E Shahi
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              multiple
              options={['Test','Test1','Test2']}
              filterSelectedOptions
                disableCloseOnSelect
                disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Events" />}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            Jagannath E Shahi
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              multiple
              options={['Test','Test1','Test2']}
              filterSelectedOptions
                disableCloseOnSelect
                disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Events" />}
            />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            Jagannath E Shahi
          </div>
          <div>
            <Autocomplete
              id="combo-box-demo"
              multiple
              options={['Test','Test1','Test2']}
              filterSelectedOptions
                disableCloseOnSelect
                disablePortal
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Select Events" />}
            />
          </div>
        </div>
        </div>
        <div
          className={styles.register_btn_1}
          onClick={() => {
          }}
        >
          Save
        </div>
      </div>
      <Image
        src={footer}
        alt=""
        style={{ width: "100vw", position: "relative", bottom: "0" }}
      />
    </>
  );
}

export default AdminDashboard;
