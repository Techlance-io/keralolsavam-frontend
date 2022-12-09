import { About, Carousel, Hero, Navbar } from "../components";
import EditParticipant from "../components/EditParticipants/EditParticipant";
import styles from "../styles/Home.module.css";
import CustomTitle from "../utils/customTitle";

export default function Home() {
  return (
    <>
      <CustomTitle title="Home" />
      <Navbar />
      <Hero />

      <About />
      <Carousel />
      <EditParticipant/>
    </>
  );
}
