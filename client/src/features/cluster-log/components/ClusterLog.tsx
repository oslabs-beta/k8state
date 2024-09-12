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

  const [expanded, setExpanded] = React.useState(false)

  const { refetch: refetchClusterLogs } = useGetClusterLogsQuery()
  //opens and closes the accordion
  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded)
  }
  //requests data from the backend to download the log
  const downloadLogHandler = (): void => {
    async function sendDownloadLogRequest(): Promise<void> {
      try {
        const response = await fetch(
          `http://localhost:8080/api/getDownloadLogs/${clusterLog.name}`,
        )
        const blob = await response.blob()
        const url = await window.URL.createObjectURL(new Blob([blob]))
        const link = await document.createElement("a")

        link.href = url
        link.setAttribute("download", clusterLog.name)
        document.body.appendChild(link)
        link.click()

        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
        window.URL.revokeObjectURL(url)
      } catch (error) {
        throw new Error(`Something went wrong: ${(error as Error).message}`)
      }
    }

    sendDownloadLogRequest()
  }
  //deletes a log when the user selects delete log
  const deleteLogHandler = (): void => {
    async function sendDeleteLogRequest() {
      try {
        await fetch(`http://localhost:8080/api/deleteLogs/${clusterLog.name}`, {
          method: "DELETE",
        })
        setExpanded(prevExpanded => !prevExpanded)
        await refetchClusterLogs()
      } catch (error) {
        throw new Error(`Something went wrong: ${(error as Error).message}`)
      }
    }
    sendDeleteLogRequest()
  }

  return (
    //each log is placed in an accordion and can expand and shrink.
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        style={{
          position: "relative",
          width: "700px",
          top: "120px",
        }}
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
            aria-label="Download"
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
