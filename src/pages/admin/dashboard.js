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
        <div className={styles.heading}>Admin Dashboard</div>
        <Image src={right} alt="" className={styles.image_top} />
        <div
          className={styles.register_btn}
          onClick={() => {
            signOutOfGoogle();
          }}
        >
          Logout
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

export default AdminDashboard;
