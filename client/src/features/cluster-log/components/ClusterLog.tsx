import * as React from "react"

import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Button from "@mui/material/Button"

import type { Log, ClusterLog as ClusterLogType } from "../clusterLogsApiSlice"

import { useGetClusterLogsQuery } from "../clusterLogsApiSlice"

interface Props {
  clusterLog: ClusterLogType
}

export default function ClusterLog(props: Props) {
  const { clusterLog } = props
  console.log("clusterLog:", clusterLog)
  const [expanded, setExpanded] = React.useState(false)

  const {
    // data: clusterLogs,
    // isLoading: clusterLogIsLoading,
    // isError: clusterLogError,
    refetch: refetchClusterLogs,
  } = useGetClusterLogsQuery()

  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }

  const downloadLogHandler = (): void => {
    async function sendDownloadLogRequest(): Promise<void> {
      try {
        const response = await fetch(
          "http://localhost:8080/api/getDownloadLogs/" + clusterLog.name,
          {
            method: "GET",
          },
        )
        const blob = await response.blob()
        const url = await window.URL.createObjectURL(new Blob([blob]))
        const link = await document.createElement("a") //creates an anchor for the download
        link.href = url //sets the blob's url to the anchor
        link.setAttribute("download", clusterLog.name) //sets download attribute and file name (file type matters)
        document.body.appendChild(link) //appends document to DOM
        link.click() //"clicks" the button
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
        window.URL.revokeObjectURL(url) //cleans up the URL
      } catch (error) {
        console.log(error)
      }
    }

    sendDownloadLogRequest()
  }

  const deleteLogHandler = (): void => {
    // console.log("clusterLog.name: ", clusterLog.name)

    async function sendDeleteLogRequest() {
      try {
        await fetch("http://localhost:8080/api/deleteLogs/" + clusterLog.name, {
          method: "DELETE",
        })
        // const data = await response.json()
        setExpanded(prevExpanded => !prevExpanded)
        // setDeleted(data)
        await refetchClusterLogs()
      } catch (error) {
        console.log(error)
      }
    }
    sendDeleteLogRequest()
  }

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        style={{ width: "700px", left: "50px" }}
        sx={[
          expanded
            ? {
                "& .MuiAccordion-region": {
                  height: "auto",
                },
                "& .MuiAccordionDetails-root": {
                  display: "block",
                },
              }
            : {
                "& .MuiAccordion-region": {
                  height: 0,
                },
                "& .MuiAccordionDetails-root": {
                  display: "none",
                },
              },
        ]}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <strong>Log Instance:</strong>
            &nbsp; {clusterLog.name}{" "}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          {clusterLog.log.map((log: Log, i: number) => (
            <Typography key={i * 938}>
              <span>
                <strong>Date:&nbsp;</strong>
                {log.date}
              </span>
              <br />
              <span>
                <strong>Podname:&nbsp;</strong>
                {log.name}
              </span>
              <br />
              <span>
                <strong>Log:&nbsp;</strong>
                {log.logs}
              </span>
              <br />
              <br />
            </Typography>
          ))}

          <Button
            style={{ margin: "16px" }}
            variant="contained"
            color="primary"
            type="button"
            onClick={downloadLogHandler}
          >
            Download
          </Button>
          <Button
            style={{ margin: "16px" }}
            variant="contained"
            color="primary"
            type="button"
            onClick={deleteLogHandler}
          >
            Delete
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
