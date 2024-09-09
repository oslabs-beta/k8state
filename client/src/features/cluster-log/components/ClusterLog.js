import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useGetClusterLogsQuery } from "../clusterLogsApiSlice";
export default function ClusterLog(props) {
    const { clusterLog } = props;
    console.log("clusterLog:", clusterLog);
    const [expanded, setExpanded] = React.useState(false);
    const { 
    // data: clusterLogs,
    // isLoading: clusterLogIsLoading,
    // isError: clusterLogError,
    refetch: refetchClusterLogs, } = useGetClusterLogsQuery();
    const handleExpansion = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };
    const downloadLogHandler = () => {
        async function sendDownloadLogRequest() {
            try {
                const response = await fetch("http://localhost:8080/api/getDownloadLogs/" + clusterLog.name, {
                    method: "GET",
                });
                const blob = await response.blob();
                const url = await window.URL.createObjectURL(new Blob([blob]));
                const link = await document.createElement("a"); //creates an anchor for the download
                link.href = url; //sets the blob's url to the anchor
                link.setAttribute("download", clusterLog.name); //sets download attribute and file name (file type matters)
                document.body.appendChild(link); //appends document to DOM
                link.click(); //"clicks" the button
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                window.URL.revokeObjectURL(url); //cleans up the URL
            }
            catch (error) {
                console.log(error);
            }
        }
        sendDownloadLogRequest();
    };
    const deleteLogHandler = () => {
        // console.log("clusterLog.name: ", clusterLog.name)
        async function sendDeleteLogRequest() {
            try {
                await fetch("http://localhost:8080/api/deleteLogs/" + clusterLog.name, {
                    method: "DELETE",
                });
                // const data = await response.json()
                setExpanded(prevExpanded => !prevExpanded);
                // setDeleted(data)
                await refetchClusterLogs();
            }
            catch (error) {
                console.log(error);
            }
        }
        sendDeleteLogRequest();
    };
    return (_jsx("div", { children: _jsxs(Accordion, { expanded: expanded, onChange: handleExpansion, style: { width: "700px", left: "50px" }, sx: [
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
            ], children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsxs(Typography, { children: [_jsx("strong", { children: "Log Instance:" }), "\u00A0 ", clusterLog.name, " "] }) }), _jsxs(AccordionDetails, { children: [clusterLog.log.map((log, i) => (_jsxs(Typography, { children: [_jsxs("span", { children: [_jsx("strong", { children: "Date:\u00A0" }), log.date] }), _jsx("br", {}), _jsxs("span", { children: [_jsx("strong", { children: "Podname:\u00A0" }), log.name] }), _jsx("br", {}), _jsxs("span", { children: [_jsx("strong", { children: "Log:\u00A0" }), log.logs] }), _jsx("br", {}), _jsx("br", {})] }, i * 938))), _jsx(Button, { style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }), _jsx(Button, { style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" })] })] }) }));
}
