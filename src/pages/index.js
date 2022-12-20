import Head from "next/head";
import { About, Carousel, Hero, Navbar } from "../components";
import Footer from "../components/Footer/Footer";
import styles from "../styles/Home.module.css";
import CustomTitle from "../utils/customTitle";

export default function Home() {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="L38wP45ufxCQGxUwTBluZJ188DpJ3g_P6Pnk1rRm3-o"
        />
      </Head>
      <CustomTitle title="Home" />
      <Navbar />
      <Hero />

      <About />
      <Carousel />
      <Footer />
    </>
  );
}
