  import { useRouter } from "next/router";
  import styles from "../styles/Login.module.css";
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
        </div>
        <Footer/>
      </>
    );
  }
  export default Login;
  