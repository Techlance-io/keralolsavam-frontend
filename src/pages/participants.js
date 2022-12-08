import React from "react";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import styles from "../styles/Participant.module.css";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";
import Pagination from "@mui/material/Pagination";

function participants() {
  const [participants, setParticipants] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pagination = 10;

  const handlePageChange = (event, p) => {
    setPage(p);
  };

  const Footer = () => {
    return (
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItem: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </div>
    );
  };
  
    let columns= [
      { field: "sl", headerName: "sl no.", width: 70 },
      { field: "name", headerName: "Name", width: 200 },
      { field: "sex", headerName: "Gender", width: 150 },
      { field: "phone", headerName: "Phone", width: 200 },
      { field: "address", headerName: "Address", width: 200 },
      {
        field: "date",
        headerName: "Date of Birth",
        width: 150,
        type: "date",
        valueFormatter: (params) => {
          return new Date(params.value).toLocaleDateString();
        },
      },
      { field: "artEvents", headerName: "Events", width: 300 },
      {
        field: "Edit",
        headerName: "",
        width: "100",
        renderCell: (props) => <Button>Edit</Button>,
      },
    ];
   
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/getAllUsers?page=${page}&pagination=${pagination}`
      )
      .then((res) => {
        res.data.users.forEach((user, index) => {
          user.id = user._id;
          user.sl = index + 1 + (page - 1) * pagination;
          delete user._id;
        });
        setParticipants(res.data.users);
        setTotalPages(res.data.pages);
        console.log(res.data.pages);
        console.log(res.data.users);
      });
  }, [page]);
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heading} style={{ marginBottom: "7px" }}>
          Participants
        </div>
        <div className={styles.content}>
          <div style={{ display: "flex", height: "100%", flexGrow: 1 }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={participants}
                columns={columns}
                components={{
                    Footer: Footer,
                }}                              
                autoHeight
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default participants;
