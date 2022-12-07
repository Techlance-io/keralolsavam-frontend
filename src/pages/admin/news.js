import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/admin/News.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { Button, TextField } from "@mui/material";
import EditNewsModal from "../../components/EditNewsModal/EditNewsModal";

function News() {
  const [news, setNews] = useState();
  const [variable, setVariable] = useState();
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  async function getNews() {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`).then((res) => {
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
  }, [variable]);

  return (
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
          {news?.map((data) => (
            <div className={styles.news} key={data._id}>
              <div className={styles.news_heading}>{data.title}</div>
              <div className={styles.buttons}>
                <Button variant="contained" color="primary" onClick={
                  handleOpen
                }>
                  Edit
                </Button>
                <Button variant="contained" color="error">
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditNewsModal
          open={open}
          setOpen={setOpen}
        />
    </div>
  );
}

export default News;
