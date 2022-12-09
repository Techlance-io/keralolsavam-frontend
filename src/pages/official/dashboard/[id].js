import React, { useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


const columns = [
    { field: 'name', headerName: 'Name', width: 400, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', editable: true },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'dateTime',
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
    }
  ];

function MyDataGrid() {
  const [data, setData] = React.useState([]);
  const gridRef = React.useRef(null);
   const onUpdate = (newData, oldData) => {
    if(JSON.stringify(newData) != JSON.stringify(oldData)){
       setData([newData,...data])
       console.log(newData, oldData)
    }
   
    }
  function handleSave() {
     // Get the updated data
     console.log(gridRef)
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
        processRowUpdate={(newData, oldData) => {onUpdate(newData, oldData);return newData}}
        autoHeight
        editMode="row"
        experimentalFeatures={{ newEditingApi: true }}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

function Event() {
  return <div>
    <MyDataGrid />
  </div>
}

export default Event;
