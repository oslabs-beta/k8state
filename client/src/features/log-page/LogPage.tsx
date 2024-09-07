import type React from "react"
import { useState, useEffect } from "react"
import { TextField, Button, Box, Grid, Paper } from "@mui/material"
import Row from "./Row"

import Log from "./Log"

interface Props {
  logName: string
  setDeleted: Function
}

export default function LogPage(props: Props) {
  const [dirInfo, setdirInfo] = useState([])
  const [log, setLog] = useState([])
  const [deleted, setDeleted] = useState("")

  useEffect(() => {
    fetch("http://localhost:8080/api/getLogs")
      .then(process => process.json())
      .then(data => {
        //console.log(data);
        setdirInfo(data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [log, deleted])

  const createLogHandler = () => {
    fetch("http://localhost:8080/api/createLogs", {
      method: "POST",
    })
      .then(process => process.json())
      .then(data => {
        //console.log(data);
        setLog(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const deleteLogHandler = (): void => {
    dirInfo.forEach(log => {
      fetch("http://localhost:8080/api/deleteLogs/" + log, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => {
          props.setDeleted(data)
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
    })
    setdirInfo([])
  }

  const store: JSX.Element[] = []

  // for(let i = 0; i < dirInfo.length; i++){
  //     store.push(
  //     // <Grid item xs={12} sm={6} md={4} key={i + 3013031}>
  //         // <Box sx={{ border: 1, borderColor: "black"}}>
  //         <Box>
  //             <Row logName={dirInfo[i]} setDeleted={setDeleted}/>
  //         </Box>
  //     // </Grid>);
  // )};

  for (let i = dirInfo.length; i > 0; i--) {
    if (dirInfo[i] !== (null || undefined)) {
      store.push(
        // <Grid item xs={12} sm={6} md={4} key={i + 3013031}>
        // <Box sx={{ border: 1, borderColor: "black"}}>
        <Box key={i * 123}>
          <Log setDeleted={setDeleted} logName={dirInfo[i]} />
        </Box>,
        // </Grid>
      )
    }
  }
  console.log(store)
  return (
    <div style={{ position: "absolute", left: "250px", top: "100px" }}>
      {/* <Box sx={{marginLeft: '8px', marginTop: '96px', overflowY: 'scroll', border: 1, borderColor: "black", maxWidth: '1450px',}}> */}
      <h1
        style={{
          textAlign: "center",
          marginLeft: "32px",
          marginBottom: "16px",
          minWidth: "700px",
        }}
      >
        Logs
      </h1>
      <div className="log-button-container">
        <Button
          style={{
            display: "inline",
            left: "180px",
            marginLeft: "32px",
            marginBottom: "16px",
          }}
          variant="contained"
          color="primary"
          type="button"
          onClick={createLogHandler}
        >
          Create a Log
        </Button>
        <Button
          id="delete-all-logs-button"
          style={{
            display: "inline",
            left: "240px",
            marginLeft: "32px",
            marginBottom: "16px",
          }}
          variant="contained"
          color="error"
          type="button"
          onClick={deleteLogHandler}
        >
          Delete all Logs
        </Button>
      </div>
      {store}
      {/* <div id="delete-all-logs-container">
        <Button
          id="delete-all-logs-button"
          style={{
            marginTop: "16px",
            left: "275px",
            marginLeft: "32px",
            marginBottom: "16px",
          }}
          variant="contained"
          color="primary"
          type="button"
          onClick={deleteLogHandler}
        >
          Delete all Logs
        </Button>
      </div> */}
      {/* <Grid container direction="column" spacing={4} style={{ marginLeft: '1px', marginRight: '32px'}}> */}
      {/* </Grid> */}
      {/* </Box> */}
    </div>
  )
}
