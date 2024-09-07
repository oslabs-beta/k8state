import * as React from "react"
import { useState, useEffect } from "react"
import type { AccordionSlots } from "@mui/material/Accordion"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"

interface Props {
  logName: string
  setDeleted: Function
}

export default function Log(props: Props) {
  const { logName, setDeleted } = props
  const [expanded, setExpanded] = React.useState(false)

  const [appear, setAppear] = useState(false)
  const [log, setLog] = useState([])
  const [name, setName] = useState([])
  const [namespace, setNamespace] = useState([])

  const handleExpansion = () => {
    setExpanded(prevExpanded => !prevExpanded)
    interface dataObj {
      name: string
      namespace: string
      logs: string
    }
    if (appear) {
      setAppear(false)
    } else {
      fetch("http://localhost:8080/api/getLogs/" + props.logName, {
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setName(
            data.map((element: dataObj, i: number) => {
              return <span key={i + 303030303}>{element.name}</span>
            }),
          )
          setNamespace(
            data.map((element: dataObj, i: number) => {
              return <span key={i + 101010101}>{element.namespace}</span>
            }),
          )
          setLog(
            data.map((element: dataObj, i: number) => {
              return <span key={i + 202020202}>{element.logs}</span>
            }),
          )
          setAppear(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const downloadLogHandler = (): void => {
    fetch("http://localhost:8080/api/getDownloadLogs/" + props.logName, {
      method: "GET",
    })
      .then(response => response.blob()) //stores the file in a blob (binary large object)
      .then(blob => {
        const url = window.URL.createObjectURL(
          //creates a URL with the blob object
          new Blob([blob]),
        )
        const link = document.createElement("a") //creates an anchor for the download
        link.href = url //sets the blob's url to the anchor
        link.setAttribute("download", props.logName) //sets download attribute and file name (file type matters)
        document.body.appendChild(link) //appends document to DOM
        link.click() //"clicks" the button
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
        window.URL.revokeObjectURL(url) //cleans up the URL
      })
  }

  const deleteLogHandler = (): void => {
    fetch("http://localhost:8080/api/deleteLogs/" + props.logName, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(data => {
        setExpanded(prevExpanded => !prevExpanded)
        props.setDeleted(data)
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const dateManager = (): string | undefined => {
    const regex = /(\d{4})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})/
    const dateInfo = props.logName.match(regex)
    if (dateInfo) {
      const [_, year, month, day] = dateInfo
      const date = new Date(`${year}-${month}-${day}`)
      return date.toLocaleDateString()
    }
  }

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={handleExpansion}
        // slots={{ transition: Fade as AccordionSlots['transition'] }}
        // slotProps={{ transition: { timeout: 400 } }}
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
          <Typography>{logName} </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>{log}</Typography>
          <Button
            style={{ marginBottom: "16px" }}
            variant="contained"
            color="primary"
            type="button"
            onClick={downloadLogHandler}
          >
            Download
          </Button>
          <Button
            style={{ marginBottom: "16px" }}
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
