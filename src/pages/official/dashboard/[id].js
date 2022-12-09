import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Navbar } from "../../../components";
import CustomTitle from "../../../utils/customTitle";
import styles from "../../../styles/official/dashboard/Dashboard.module.css";

const columns = [
  { field: "name", headerName: "Name", width: 400, editable: true },
  { field: "age", headerName: "Age", type: "number", editable: true },
  {
    field: "dateCreated",
    headerName: "Date Created",
    type: "date",
    width: 180,
    editable: true,
  },
  {
    field: "lastLogin",
    headerName: "Last Login",
    type: "dateTime",
    width: 220,
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    name: "hello",
    age: 25,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
  {
    id: 2,
    name: "hello2",
    age: 36,
    dateCreated: new Date(),
    lastLogin: new Date(),
  },
];

function MyDataGrid() {
  const [data, setData] = React.useState([]);
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
        <div>{status ? "" : <MyDataGrid />}</div>
      </div>
    </>
  );
}

export default Event;
