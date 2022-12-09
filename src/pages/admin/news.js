import axios from "axios";
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "../../styles/admin/News.module.css";
import { Button, TextField } from "@mui/material";
import { EditNewsModal, Navbar, NewsCard } from "../../components";
import CustomTitle from "../../utils/customTitle";

function News() {
  const [news, setNews] = useState();
  const [variable, setVariable] = useState();
  const [title, setTitle] = useState("");
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const { user, loading, authToken } = useContext(AuthContext);
  const handleOpen = () => {
    setOpen(true);
  };
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
    </>
  );
}

export default News;
