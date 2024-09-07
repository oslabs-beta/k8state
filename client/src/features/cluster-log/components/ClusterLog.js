import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
export default function Log(props) {
    // const { logName, setDeleted } = props
    const { clusterLog, setDeleted } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState([]);
    const [name, setName] = useState([]);
    const [namespace, setNamespace] = useState([]);
    const handleExpansion = () => {
        setExpanded(prevExpanded => !prevExpanded);
        // interface dataObj {
        //   name: string
        //   namespace: string
        //   logs: string
        // }
        // if (appear) {
        //   setAppear(false)
        // } else {
        //   fetch("http://localhost:8080/api/getLogs/" + props.logName, {
        //     method: "GET",
        //   })
        //     .then(response => response.json())
        //     .then(data => {
        //       console.log(data)
        //       setName(
        //         data.map((element: dataObj, i: number) => {
        //           return <span key={i + 303030303}>{element.name}</span>
        //         }),
        //       )
        //       setNamespace(
        //         data.map((element: dataObj, i: number) => {
        //           return <span key={i + 101010101}>{element.namespace}</span>
        //         }),
        //       )
        //       setLog(
        //         data.map((element: dataObj, i: number) => {
        //           return <span key={i + 202020202}>{element.logs}</span>
        //         }),
        //       )
        //       setAppear(true)
        //     })
        //     .catch(error => {
        //       console.log(error)
        //     })
        // }
    };
    const downloadLogHandler = () => {
        // fetch("http://localhost:8080/api/getDownloadLogs/" + props.logName, {
        fetch("http://localhost:8080/api/getDownloadLogs/" + clusterLog.name, {
            method: "GET",
        })
            .then(response => response.blob()) //stores the file in a blob (binary large object)
            .then(blob => {
            const url = window.URL.createObjectURL(
            //creates a URL with the blob object
            new Blob([blob]));
            const link = document.createElement("a"); //creates an anchor for the download
            link.href = url; //sets the blob's url to the anchor
            // link.setAttribute("download", props.logName) //sets download attribute and file name (file type matters)
            link.setAttribute("download", clusterLog.name); //sets download attribute and file name (file type matters)
            document.body.appendChild(link); //appends document to DOM
            link.click(); //"clicks" the button
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url); //cleans up the URL
        });
    };
    const deleteLogHandler = () => {
        // fetch("http://localhost:8080/api/deleteLogs/" + props.logName, {
        fetch("http://localhost:8080/api/deleteLogs/" + clusterLog.name, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
            setExpanded(prevExpanded => !prevExpanded);
            props.setDeleted(data);
            console.log(data);
        })
            .catch(error => {
            console.log(error);
        });
    };
    const dateManager = () => {
        const regex = /(\d{4})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})/;
        // const dateInfo = props.logName.match(regex)
        const dateInfo = clusterLog.name.match(regex);
        if (dateInfo) {
            const [_, year, month, day] = dateInfo;
            const date = new Date(`${year}-${month}-${day}`);
            return date.toLocaleDateString();
        }
    };
    return (_jsx("div", { children: _jsxs(Accordion, { expanded: expanded, onChange: handleExpansion, style: { width: "700px", left: "50px" }, 
            // slots={{ transition: Fade as AccordionSlots['transition'] }}
            // slotProps={{ transition: { timeout: 400 } }}
            sx: [
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
            ], children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsxs(Typography, { children: [_jsx("strong", { children: "Log Instance:" }), "\u00A0 ", clusterLog.name, " "] }) }), _jsxs(AccordionDetails, { children: [_jsx(Typography, { children: clusterLog.log.map((log, i) => (_jsxs(_Fragment, { children: [_jsx("p", { children: _jsxs("span", { children: [_jsx("strong", { children: "Date:\u00A0" }), log.date] }) }), _jsx("p", { children: _jsxs("span", { children: [_jsx("strong", { children: "Podname:\u00A0" }), log.name] }) }), _jsx("p", { children: _jsxs("span", { children: [_jsx("strong", { children: "Log:\u00A0" }), log.logs] }) }), _jsx("br", {})] }))) }), _jsx(Button, { style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }), _jsx(Button, { style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" })] })] }) }));
}
