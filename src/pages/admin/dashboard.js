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
import { Autocomplete, Button, TextField } from "@mui/material";
import AddOfficialModal from "../../components/Admin/addOfficialModal"
import axios from "axios";

function AdminDashboard() {
  const [omOpen, setOmOpen] = React.useState(false);
  const [officials, setOfficials] = React.useState([]);
  const Getofficials = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/officials`)
    console.log(res.data)
    setOfficials(res.data)
  }

  React.useEffect(() => {
    Getofficials()
  }, [])
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
        
     
          
        {
        officials.map((official)=>{
          return <div>{official.name}</div>
        }
        )

      }

      <Button onClick={()=>{setOmOpen(true)}}>Add Official</Button>
      </div>
      <Image
        src={footer}
        alt=""
        style={{ width: "100vw", position: "relative", bottom: "0" }}
      />
     
      
      <AddOfficialModal open = {omOpen} setOpen={setOmOpen}/>
    </>
  );
}

export default AdminDashboard;
