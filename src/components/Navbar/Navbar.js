import styles from "./Navbar.module.css";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
function Navbar() {
  const router = useRouter();
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
        <div
          className={styles.navbar_item}
          onClick={() => {
            router.push("/");
          }}
        >
          HOME
        </div>
        <div
          onClick={() => {
            router.push("/events");
          }}
          className={styles.navbar_item}
        >
          EVENTS
        </div>
        <div
          onClick={() => {
            router.push("/results");
          }}
          className={styles.navbar_item}
        >
          RESULTS
        </div>
        <div
          onClick={() => {
            router.push("/scoreboard");
          }}
          className={styles.navbar_item}
        >
          SCOREBOARD
        </div>
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
              <div
                onClick={() => {
                  router.push("/");
                  handleDrawerClose();
                }}
                className={styles.navbar_item}
              >
                HOME
              </div>
              <div
                onClick={() => {
                  router.push("/events");
                  handleDrawerClose();
                }}
                className={styles.navbar_item}
              >
                EVENTS
              </div>
              <div
                onClick={() => {
                  router.push("/results");
                  handleDrawerClose();
                }}
                className={styles.navbar_item}
              >
                RESULTS
              </div>
              <div
                onClick={() => {
                  router.push("/scoreboard");
                  handleDrawerClose();
                }}
                className={styles.navbar_item}
              >
                SCOREBOARD
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
export default Navbar;
