import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataGrid, selectedGridRowsCountSelector } from "@mui/x-data-grid";
import { Navbar } from "../../../components";
import CustomTitle from "../../../utils/customTitle";
import styles from "../../../styles/official/dashboard/Dashboard.module.css";
import EventDetail from "../../../components/EventDetail/EventDetail";
import {useRouter} from "next/router";
import { AuthContext } from "../../../context/AuthContext";


const columns = [
  { field: "participant_name", headerName: "Name", width: 400, editable: false },
  { field: "serial_no", headerName: "sl no.", type: "number", editable: true },
  { field: "score", headerName: "score", type: "number", editable: true },
 
];

// const rows = [
//   {
//     id: 1,
//     name: "hello",
//     age: 25,
//     dateCreated: new Date(),
//     lastLogin: new Date(),
//   },
//   {
//     id: 2,
//     name: "hello2",
//     age: 36,
//     dateCreated: new Date(),
//     lastLogin: new Date(),
//   },
// ];

function MyDataGrid() {
  const [data, setData] = React.useState([]);
  const [rows, setRows] = useState([])
  const {authToken} = useContext(AuthContext)

  const router = useRouter();
  const { id } = router.query;

  const getParticipants = async()=>{
    if(!authToken)return;
    console.log(id)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/officer/participants/${id}`,{
      headers: {
        "x-auth-token": authToken,
      },
    }).then(
      (res)=>{
        console.log(res.data)
        res.data.forEach((user, index) => {
          user.id = user._id;
          delete user._id;
        });
        setRows(res.data)
      }
    )
  }

  useEffect(()=>{
    getParticipants()
  },[authToken, id])
  const gridRef = React.useRef(null);
  const onUpdate = (newData, oldData) => {
    if (JSON.stringify(newData) != JSON.stringify(oldData)) {
      setData([newData, ...data]);
      console.log(newData, oldData);
    }
  };
  function handleSave() {
    // Get the updated data
    console.log(gridRef);
    // const updatedData = gridRef.current.getRows();
    // console.log(updatedData);

    // Send the updated data to the server using axios
    axios
      .post("/api/save-data", data)
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  }

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        onProcessRowUpdateError={(params) => console.log(params)}
        processRowUpdate={(newData, oldData) => {
          onUpdate(newData, oldData);
          return newData;
        }}
        autoHeight
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function Event() {
  const [status, setStatus] = useState(true);
  function handleStatus() {
    setStatus(true);
  }
  function handleParticipants() {
    setStatus(false);
  }
  return (
    <>
      <CustomTitle title="Official Dashboard" />
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.heading}>Official Dashboard</div>
          <div
            className={styles.register_btn}
            onClick={() => {
              signOutOfGoogle();
            }}
          >
            Logout
          </div>
        </div>
        <div className={styles.tabs_wrapper}>
          <div className={styles.tabs}>
            <div
              className={status ? styles.sub_heading_1 : styles.sub_heading}
              onClick={() => {
                handleStatus();
              }}
            >
              Status
            </div>
            <div
              className={status ? styles.sub_heading : styles.sub_heading_1}
              onClick={() => {
                handleParticipants();
              }}
            >
              Participants
            </div>
          </div>
        </div>
        <div>{status ? <EventDetail/> : <MyDataGrid />}</div>
      </div>
    </>
  );
}

export default Event;
