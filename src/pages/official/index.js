import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import app from "../../utils/firebase";
import styles from "../../styles/official/Home.module.css";
import footer from "../../assets/png/footer.png";
import Image from "next/image";
import left from "../../assets/png/left.png";
import right from "../../assets/png/right.png";
import top from "../../assets/png/top.png";
import Navbar from "../../components/Navbar/Navbar";
function OfficialLogin() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [signedInUser, setSignedInUser] = useState();
  const auth = getAuth(app);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setSignedInUser(user);
      } else {
      }
    });
  });

  async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        return result;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return error;
      });
  }
  if (signedInUser) {
    router.push("/official/dashboard");
  }
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Official Login</div>
        <Image src={right} alt="" className={styles.image_top} />
        <div
          className={styles.register_btn}
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Login
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
export default OfficialLogin;
