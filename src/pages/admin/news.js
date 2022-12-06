import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import Card from "../../components/news/card"
import styles from "../../styles/admin/Dashboard.module.css";
import Navbar from '../../components/Navbar/Navbar';

function news() {
    const [news, setNews] = useState([])
    useEffect(()=>{
     axios.get(`${process.env.NEXT_PUBLIC_API_URL}/news`).then((res)=>{
         setNews(res.data.news)
     })
    },[])
    
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
     <div className={styles.header}> <div className={styles.heading}>News</div>
        <div
          className={styles.register_btn}
          onClick={() => {
            signOutOfGoogle();
          }}
        >
          Logout
        </div>
        </div>
        {
      news.map((data)=>
      <Card title={data.title} id = {data.id}/>)
        }
        </div>
    </div>
  )
}

export default news
