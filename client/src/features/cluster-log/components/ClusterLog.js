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
    const [expanded, setExpanded] = React.useState(false);
    const { refetch: refetchClusterLogs } = useGetClusterLogsQuery();
    //opens and closes the accordion
    const handleExpansion = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };
    //requests data from the backend to download the log
    const downloadLogHandler = () => {
        async function sendDownloadLogRequest() {
            try {
                const response = await fetch(`http://localhost:8080/api/getDownloadLogs/${clusterLog.name}`);
                const blob = await response.blob();
                const url = await window.URL.createObjectURL(new Blob([blob]));
                const link = await document.createElement("a");
                link.href = url;
                link.setAttribute("download", clusterLog.name);
                document.body.appendChild(link);
                link.click();
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
                window.URL.revokeObjectURL(url);
            }
            catch (error) {
                throw new Error(`Something went wrong: ${error.message}`);
            }
        }
        sendDownloadLogRequest();
    };
    //deletes a log when the user selects delete log
    const deleteLogHandler = () => {
        async function sendDeleteLogRequest() {
            try {
                await fetch(`http://localhost:8080/api/deleteLogs/${clusterLog.name}`, {
                    method: "DELETE",
                });
                setExpanded(prevExpanded => !prevExpanded);
                await refetchClusterLogs();
            }
            catch (error) {
                throw new Error(`Something went wrong: ${error.message}`);
            }
        }
        sendDeleteLogRequest();
    };
    return (
    //each log is placed in an accordion and can expand and shrink.
    _jsx("div", { children: _jsxs(Accordion, { expanded: expanded, onChange: handleExpansion, style: {
                position: "relative",
                width: "700px",
                top: "120px",
            }, sx: [
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
            ], children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1-content", id: "panel1-header", children: _jsxs(Typography, { children: [_jsx("strong", { children: "Log Instance:" }), "\u00A0 ", clusterLog.name, " "] }) }), _jsxs(AccordionDetails, { children: [clusterLog.log.map((log, i) => (_jsxs(Typography, { children: [_jsxs("span", { children: [_jsx("strong", { children: "Date:\u00A0" }), log.date] }), _jsx("br", {}), _jsxs("span", { children: [_jsx("strong", { children: "Podname:\u00A0" }), log.name] }), _jsx("br", {}), _jsxs("span", { children: [_jsx("strong", { children: "Log:\u00A0" }), log.logs] }), _jsx("br", {}), _jsx("br", {})] }, i * 938))), _jsx(Button, { "aria-label": "Download", style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: downloadLogHandler, children: "Download" }), _jsx(Button, { style: { margin: "16px" }, variant: "contained", color: "primary", type: "button", onClick: deleteLogHandler, children: "Delete" })] })] }) }));
}
