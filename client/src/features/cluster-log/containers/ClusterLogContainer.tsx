import type React from "react"
import { useState, useEffect } from "react"
import { TextField, Button, Box, Grid, Paper } from "@mui/material"
// import Row from "../Row"
// import {ClusterLog} from "../clusterLogsApiSlice"

import clusterLogApiSlice, {
  useGetClusterLogsQuery,
} from "../clusterLogsApiSlice"

import ClusterLog from "../components/ClusterLog"

export default function LogPage() {
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
      <Button
        style={{
          display: "flex",
          left: "290px",
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
      {store}
    </div>
  )
}
