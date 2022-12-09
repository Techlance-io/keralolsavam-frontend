import { About, Carousel, Hero, Navbar } from "../components";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      
      <About />
      <Carousel />
    </>
  );
}
