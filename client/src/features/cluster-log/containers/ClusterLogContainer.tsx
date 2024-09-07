// import type React from "react"
import { useState, useEffect } from "react"
import { TextField, Button, Box, Grid, Paper } from "@mui/material"
// import Row from "../Row"
// import {ClusterLog} from "../clusterLogsApiSlice"

// Alert Dialog imports
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import clusterLogApiSlice, {
  useGetClusterLogsQuery,
} from "../clusterLogsApiSlice"

import ClusterLog from "../components/ClusterLog"

export default function LogPage() {
  const [dirInfo, setdirInfo] = useState([])
  const [log, setLog] = useState([])
  const [deleted, setDeleted] = useState("")
  const [open, setOpen] = useState(false)

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

  const store: JSX.Element[] = []
  for (let i = dirInfo.length; i > 0; i--) {
    if (dirInfo[i] !== (null || undefined)) {
      store.push(
        <Box key={i * 123}>
          <ClusterLog setDeleted={setDeleted} logName={dirInfo[i]} />
        </Box>,
      )
    }
  }

  const {
    data: clusterLog,
    isLoading: clusterLogIsLoading,
    isError: clusterLogError,
    refetch: refetchClusterLogs,
  } = useGetClusterLogsQuery()

  console.log("useGetClusterLogsQuery.data: ", clusterLog)

  // delete all logs alert function
  function AlertDialog() {
    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const handleCloseCancel = () => {
      setOpen(false)
    }

    const handleCloseConfirm = () => {
      setOpen(false)
      deleteLogHandler()
    }

    return (
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Delete Logs
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete all logs?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is irreversable, please confirm you would like to
              delete ALL logs.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseCancel}>Cancel</Button>
            <Button onClick={handleCloseConfirm} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }

  const confirmDeleteAll = () => {
    setOpen(true)
  }

  const deleteLogHandler = (): void => {
    dirInfo.forEach(log => {
      fetch("http://localhost:8080/api/deleteLogs/" + log, {
        method: "DELETE",
      })
        .then(response => response.json())
        .then(data => {
          setDeleted(data)
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
    })
    setdirInfo([])
  }

  return (
    <div style={{ position: "absolute", left: "250px", top: "100px" }}>
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
            left: "175px",
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
          onClick={confirmDeleteAll}
        >
          Delete all Logs
        </Button>
      </div>
      {store}
      <div
        className="alert-dialog"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        {open === true && <AlertDialog />}
      </div>
    </div>
  )
}
