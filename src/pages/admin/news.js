import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/admin/News.module.css";
import { Button, TextField } from "@mui/material";
import { EditNewsModal, Loader, Navbar, NewsCard } from "../../components";
import CustomTitle from "../../utils/customTitle";
import Footer from "../../components/Footer/Footer";
import { getAuth, signOut } from "firebase/auth";
import app from "../../utils/firebase";
import { useRouter } from "next/router";

function News() {
  const router=useRouter();
  const [news, setNews] = useState();
  const [variable, setVariable] = useState();
  const [title, setTitle] = useState("");
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const { user, loading, authToken } = useContext(AuthContext);
  const auth=getAuth(app);
  const handleOpen = () => {
    setOpen(true);
  };
  async function signOutOfGoogle() {
    signOut(auth)
      .then(() => {
        router.push("/admin");
      })
      .catch((error) => {});
  }
  async function getNews() {
    if (!authToken) return;
    await axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
        headers: {
          "x-auth-token": authToken,
        },
      })
      .then((res) => {
        setNews(res.data.news);
        setLoader(false);
      });
  }
  async function postNews() {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/news`, {
        title: title,
      })
      .then((res) => {
        console.log(res);
        setTitle("");
        setVariable(res.data);
      });
  }
  useEffect(() => {
    getNews();
  }, [variable, authToken]);
if(loader)
    return <Loader />
  return (
    <>
      <CustomTitle title="News" />
      <div>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.header}>
            {" "}
            <div className={styles.heading}>News</div>
            <div
              className={styles.register_btn}
              onClick={() => {
                signOutOfGoogle();
              }}
            >
              Logout
            </div>
          </div>
          <div className={styles.add}>
            <TextField
              id="outlined-basic"
              label="Enter News"
              variant="outlined"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                postNews();
              }}
            >
              Add News
            </Button>
          </div>
          <div className={styles.news_box}>
            {news?.map((data, index) => (
              <NewsCard
                data={data}
                index={index}
                key={index}
                news={news}
                setNews={setNews}
                modalOpen={handleOpen}
                setData={setData}
              />
            ))}
          </div>
        </div>
        <EditNewsModal
          open={open}
          setOpen={setOpen}
          setNews={setNews}
          data={data}
          news={news}
        />
      </div>
      <Footer/>
    </>
  );
}

export default News;
