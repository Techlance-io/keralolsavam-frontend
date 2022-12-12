  import { useRouter } from "next/router";
  import styles from "../styles/Login.module.css";
  import Image from "next/image";
  import left from "../assets/png/left.png";
  import right from "../assets/png/right.png";
  import top from "../assets/png/top.png";
  import { Navbar } from "../components";
  import CustomTitle from "../utils/customTitle";
  import Footer from "../components/Footer/Footer";
  function Login() {
    const router = useRouter();
    return (
      <>
        <CustomTitle title="Login" />
        <Navbar />
        <div className={styles.container}>
          <div className={styles.heading}>Login</div>
          <Image src={right} alt="" className={styles.image_top} />
          <div
            className={styles.register_btn}
            onClick={() => {
              router.push("/admin");
            }}
          >
            Login as Admin
          </div>
          <div
            className={styles.register_btn}
            onClick={() => {
              router.push("/official");
            }}
          >
            Login as Official
          </div>
          <Image src={left} alt="" className={styles.image_left} />
          <Image src={top} alt="" className={styles.image_right} />
        </div>
        <Footer/>
      </>
    );
  }
  export default Login;
  