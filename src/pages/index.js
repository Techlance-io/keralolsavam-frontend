import { About, Carousel, Navbar } from "../components";
import Hero from "../components/Hero/Hero";
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
