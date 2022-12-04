import styles from "./Navbar.module.css";
import { Link } from "react-scroll";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
function Navbar() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={styles.navbar}>
        <Link
          to="home"
          spy={true}
          activeClass="navbar_item_active"
          smooth={true}
          offset={0}
          duration={500}
          className={styles.navbar_item}
        >
          HOME
        </Link>
        <Link
          to="about"
          activeClass="navbar_item_active"
          className={styles.navbar_item}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          ABOUT
        </Link>
        <Link
          to="speakers"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          activeClass="navbar_item_active"
          className={styles.navbar_item}
        >
          STATUS
        </Link>
        <Link
          to="workshops"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          activeClass="navbar_item_active"
          className={styles.navbar_item}
        >
          EVENT SCHEDULE
        </Link>
        <Link
          to="codeofconduct"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          activeClass="navbar_item_active"
          className={styles.navbar_item}
        >
          RESULTS
        </Link>
        <Link
          to="registration"
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
          activeClass="navbar_item_active"
          className={styles.navbar_item}
        >
          SCOREBOARD
        </Link>
      </div>
      <div className={styles.nav__mob}>
        <div className={styles.nav__mob_container}>
          <button className={styles.nav_btn} onClick={handleDrawerOpen}>
            <HiOutlineMenuAlt3 className={styles.hamburger} />
          </button>
        </div>
      </div>
      <Drawer
        open={open}
        onClick={handleDrawerClose}
        onClose={(event, reason) => {
          if (reason !== "backdropClick") {
            handleDrawerClose();
          } else if (reason !== "escapeKeyDown") {
            handleDrawerClose();
          }
        }}
        anchor="left"
      >
        <div className={styles.nav__drawer}>
          <div className={styles.nav__drawer_header}>
            <div className={styles.navbar_items_mob}>
              <Link
                to="home"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                HOME
              </Link>
              <Link
                to="about"
                onClick={() => {
                  handleDrawerClose();
                }}
                className={styles.navbar_item}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
              >
                ABOUT
              </Link>
              <Link
                to="speakers"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                SPEAKERS
              </Link>
              <Link
                to="workshops"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                WORKSHOPS
              </Link>
              <Link
                to="codeofconduct"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                CODE OF CONDUCT
              </Link>
              <Link
                to="registration"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                REGISTRATION
              </Link>
              <Link
                to="sponsors"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                SPONSORS
              </Link>
              <Link
                to="timeline"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                TIMELINE
              </Link>
              <Link
                to="clubs"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                CLUBS
              </Link>
              <Link
                to="faq"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                FAQ
              </Link>
              <Link
                to="contact"
                onClick={() => {
                  handleDrawerClose();
                }}
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
                activeClass="navbar_item_active"
                className={styles.navbar_item}
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
export default Navbar;
