import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import styles from "../styles/Participant.module.css";
import { DataGrid } from "@mui/x-data-grid";

function participants() {
  const [participants, setParticipants] = useState([]);
  const data = {
    columns: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 130 },
      { field: "phone", headerName: "Phone", width: 130 },
      { field: "college", headerName: "College", width: 130 },
    ],
    rows: [{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 }],
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/getAllUsers`)
      .then((res) => {
        setParticipants(res.data.users);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading}>Participants</div>
        <div className={styles.content}>
          <div style={{ display: "flex", height: "100%", flexGrow:1 }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid autoHeight {...data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default participants;
