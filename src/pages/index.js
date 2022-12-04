import { About, Carousel, Navbar } from "../components";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <About />
    </>
  );
}
