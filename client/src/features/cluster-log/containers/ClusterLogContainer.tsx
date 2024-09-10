// import type React from "react"
import { useState } from "react"
import { Button } from "@mui/material"

// Alert Dialog imports
import * as React from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

import { useGetClusterLogsQuery } from "../clusterLogsApiSlice"

import ClusterLog from "../components/ClusterLog"

export default function LogPage() {
  const [open, setOpen] = useState(false)

  const createLogHandler = (): void => {
    async function sendCreateLogRequest() {
      try {
        await fetch("http://localhost:8080/api/createLogs", {
          method: "POST",
        })
        await refetchClusterLogs()
      } catch (error) {
        console.log(error)
      }
    }

    sendCreateLogRequest()
  }

  const { data: clusterLogs, refetch: refetchClusterLogs } =
    useGetClusterLogsQuery()

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

  const deleteLogHandler = async (): Promise<void> => {
    if (!clusterLogs || clusterLogs.length === 0) {
      console.log("No logs to delete")
      return
    }

    try {
      await Promise.all(
        clusterLogs.map(async (log): Promise<void> => {
          try {
            await fetch(`http://localhost:8080/api/deleteLogs/${log.name}`, {
              method: "DELETE",
            })
          } catch (error) {
            console.log(error)
          }
        }),
      )
      await refetchClusterLogs()
    } catch (error) {
      console.log("Error in deleting logs:", error)
    }
  }

  return (
    <div style={{ position: "absolute", left: "225px", top: "100px" }}>
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
          disabled={!clusterLogs || clusterLogs.length === 0 ? true : false}
        >
          Delete all Logs
        </Button>
      </div>
      {clusterLogs?.map((clusterLog, i) => (
        <ClusterLog
          key={`clusterLog:${i}`}
          clusterLog={clusterLog}
          // setDeleted={setDeleted}
        />
      ))}

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
