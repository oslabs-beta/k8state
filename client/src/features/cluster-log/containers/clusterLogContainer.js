import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import type React from "react"
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
// import Row from "../Row"
// import {ClusterLog} from "../clusterLogsApiSlice"
// Alert Dialog imports
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetClusterLogsQuery, } from "../clusterLogsApiSlice";
import ClusterLog from "../components/ClusterLog";
export default function LogPage() {
    const [dirInfo, setdirInfo] = useState([]);
    const [log, setLog] = useState([]);
    const [deleted, setDeleted] = useState("");
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
            .then(process => process.json())
            .then(data => {
            //console.log(data);
            setdirInfo(data);
        })
            .catch(error => {
            console.log(error);
        });
    }, [log, deleted]);
    const createLogHandler = async () => {
        await fetch("http://localhost:8080/api/createLogs", {
            method: "POST",
        })
            .then(process => process.json())
            .then(data => {
            //console.log(data);
            setLog(data);
        })
            .catch(error => {
            console.log(error);
        });
        await refetchClusterLogs();
    };
    // const store: JSX.Element[] = []
    // for (let i = dirInfo.length; i > 0; i--) {
    //   if (dirInfo[i] !== (null || undefined)) {
    //     store.push(
    //       <Box key={i * 123}>
    //         <ClusterLog setDeleted={setDeleted} logName={dirInfo[i]} />
    //       </Box>,
    //     )
    //   }
    // }
    const { data: clusterLogs, isLoading: clusterLogIsLoading, isError: clusterLogError, refetch: refetchClusterLogs, } = useGetClusterLogsQuery();
    console.log("useGetClusterLogsQuery.data: ", clusterLogs);
    // delete all logs alert function
    function AlertDialog() {
        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const handleCloseCancel = () => {
            setOpen(false);
        };
        const handleCloseConfirm = () => {
            setOpen(false);
            deleteLogHandler();
        };
        return (_jsxs(React.Fragment, { children: [_jsx(Button, { variant: "outlined", onClick: handleClickOpen, children: "Delete Logs" }), _jsxs(Dialog, { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", children: [_jsx(DialogTitle, { id: "alert-dialog-title", children: "Are you sure you want to delete all logs?" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "alert-dialog-description", children: "This action is irreversable, please confirm you would like to delete ALL logs." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseCancel, children: "Cancel" }), _jsx(Button, { onClick: handleCloseConfirm, autoFocus: true, children: "Confirm" })] })] })] }));
    }
    const confirmDeleteAll = () => {
        setOpen(true);
    };
    const deleteLogHandler = () => {
        dirInfo.forEach(log => {
            fetch("http://localhost:8080/api/deleteLogs/" + log, {
                method: "DELETE",
            })
                .then(response => response.json())
                .then(data => {
                setDeleted(data);
                console.log(data);
            })
                .catch(error => {
                console.log(error);
            });
        });
        setdirInfo([]);
    };
    return (_jsxs("div", { style: { position: "absolute", left: "250px", top: "100px" }, children: [_jsx("h1", { style: {
                    textAlign: "center",
                    marginLeft: "32px",
                    marginBottom: "16px",
                    minWidth: "700px",
                }, children: "Logs" }), _jsxs("div", { className: "log-button-container", children: [_jsx(Button, { style: {
                            display: "inline",
                            left: "175px",
                            marginLeft: "32px",
                            marginBottom: "16px",
                        }, variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), _jsx(Button, { id: "delete-all-logs-button", style: {
                            display: "inline",
                            left: "240px",
                            marginLeft: "32px",
                            marginBottom: "16px",
                        }, variant: "contained", color: "error", type: "button", onClick: confirmDeleteAll, children: "Delete all Logs" })] }), clusterLogs?.map((clusterLog, i) => (_jsx(ClusterLog, { clusterLog: clusterLog, setDeleted: setDeleted }))), _jsx("div", { className: "alert-dialog", style: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                }, children: open === true && _jsx(AlertDialog, {}) })] }));
}
