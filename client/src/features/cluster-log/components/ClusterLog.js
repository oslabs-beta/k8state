import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
export default function Log(props) {
    const { logName, setDeleted } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState([]);
    const [name, setName] = useState([]);
    const [namespace, setNamespace] = useState([]);
    const handleExpansion = () => {
        setExpanded(prevExpanded => !prevExpanded);
        if (appear) {
            setAppear(false);
        }
        else {
            fetch("http://localhost:8080/api/getLogs/" + props.logName, {
                method: "GET",
            })
                .then(response => response.json())
                .then(data => {
                console.log(data);
                setName(data.map((element, i) => {
                    return _jsx("span", { children: element.name }, i + 303030303);
                }));
                setNamespace(data.map((element, i) => {
                    return _jsx("span", { children: element.namespace }, i + 101010101);
                }));
                setLog(data.map((element, i) => {
                    return _jsx("span", { children: element.logs }, i + 202020202);
                }));
                setAppear(true);
            })
                .catch(error => {
                console.log(error);
            });
        }
    };
    const downloadLogHandler = () => {
        fetch("http://localhost:8080/api/getDownloadLogs/" + props.logName, {
            method: "GET",
        })
            .then(response => response.blob()) //stores the file in a blob (binary large object)
            .then(blob => {
            const url = window.URL.createObjectURL(
            //creates a URL with the blob object
            new Blob([blob]));
            const link = document.createElement("a"); //creates an anchor for the download
            link.href = url; //sets the blob's url to the anchor
            link.setAttribute("download", props.logName); //sets download attribute and file name (file type matters)
            document.body.appendChild(link); //appends document to DOM
            link.click(); //"clicks" the button
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url); //cleans up the URL
        });
    };
    const deleteLogHandler = () => {
        fetch("http://localhost:8080/api/deleteLogs/" + props.logName, {
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
        const dateInfo = props.logName.match(regex);
        if (dateInfo) {
            const [_, year, month, day] = dateInfo;
            const date = new Date(`${year}-${month}-${day}`);
            return date.toLocaleDateString();
        }
    };
    return (_jsx("div", { children: _jsxs(Accordion, { expanded: expanded, onChange: handleExpansion, 
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
            ], children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsxs(Typography, { children: [logName, " "] }) }), _jsxs(AccordionDetails, { children: [_jsx(Typography, { children: log }), _jsx(Button, { style: { marginBottom: "16px" }, variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }), _jsx(Button, { style: { marginBottom: "16px" }, variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" })] })] }) }));
}
