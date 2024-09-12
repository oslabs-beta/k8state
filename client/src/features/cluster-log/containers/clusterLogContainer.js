import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import type React from "react"
import { useState } from "react";
import { Button } from "@mui/material";
// Alert Dialog imports
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGetClusterLogsQuery } from "../clusterLogsApiSlice";
import ClusterLog from "../components/ClusterLog";
export default function LogPage() {
    const [open, setOpen] = useState(false);
    //creates a log in the backend once the create log button is pressed.
    const createLogHandler = () => {
        async function sendCreateLogRequest() {
            try {
                await fetch("http://localhost:8080/api/createLogs", {
                    method: "POST",
                });
                await refetchClusterLogs();
            }
            catch (error) {
                throw new Error(`Something went wrong: ${error.message}`);
            }
        }
        sendCreateLogRequest();
    };
    //RTK Query to grab log info and to refetch if desired
    const { data: clusterLogs, refetch: refetchClusterLogs } = useGetClusterLogsQuery();
    //handlers for dialogues and for state modifications.
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
        return (
        // delete all confirmation prompt
        _jsxs(React.Fragment, { children: [_jsx(Button, { variant: "outlined", onClick: handleClickOpen, children: "Delete Logs" }), _jsxs(Dialog, { open: open, onClose: handleClose, "aria-labelledby": "alert-dialog-title", "aria-describedby": "alert-dialog-description", children: [_jsx(DialogTitle, { id: "alert-dialog-title", children: "Are you sure you want to delete all logs?" }), _jsx(DialogContent, { children: _jsx(DialogContentText, { id: "alert-dialog-description", children: "This action is irreversable, please confirm you would like to delete ALL logs." }) }), _jsxs(DialogActions, { children: [_jsx(Button, { onClick: handleCloseCancel, children: "Cancel" }), _jsx(Button, { onClick: handleCloseConfirm, autoFocus: true, children: "Confirm" })] })] })] }));
    }
    const confirmDeleteAll = () => {
        setOpen(true);
    };
    //deletes all the logs if the user accepts the confirmation prompt
    const deleteLogHandler = async () => {
        if (!clusterLogs || clusterLogs.length === 0) {
            return;
        }
        try {
            await Promise.all(clusterLogs.map(async (log) => {
                try {
                    await fetch(`http://localhost:8080/api/deleteLogs/${log.name}`, {
                        method: "DELETE",
                    });
                }
                catch (error) {
                    throw new Error(`Something went wrong: ${error.message}`);
                }
            }));
            await refetchClusterLogs();
        }
        catch (error) {
            throw new Error(`Something went wrong: ${error.message}`);
        }
    };
    return (
    // holds, styles, and displays the logs and buttons
    _jsxs("div", { style: {
            position: "relative",
            left: "225px",
            top: "90px",
            width: "100vw",
            height: "100vh",
        }, children: [_jsx("h1", { style: {
                    position: "absolute",
                    textAlign: "center",
                    marginLeft: "32px",
                    marginBottom: "16px",
                    minWidth: "700px",
                    left: "-50px",
                    top: "35px",
                }, children: "Logs" }), _jsxs("div", { className: "log-button-container", children: [_jsx(Button, { style: {
                            display: "absolute",
                            left: "130px",
                            top: "100px",
                            marginLeft: "32px",
                            marginBottom: "16px",
                        }, variant: "contained", color: "secondary", type: "button", onClick: createLogHandler, children: "Create a Log" }), _jsx(Button, { id: "delete-all-logs-button", style: {
                            display: "absolute",
                            left: "190px",
                            top: "100px",
                            marginLeft: "32px",
                            marginBottom: "16px",
                        }, variant: "contained", color: "error", type: "button", onClick: confirmDeleteAll, disabled: !clusterLogs || clusterLogs.length === 0 ? true : false, children: "Delete all Logs" })] }), clusterLogs?.map((clusterLog, i) => (_jsx(ClusterLog, { clusterLog: clusterLog }, `clusterLog:${i}`))), _jsx("div", { className: "alert-dialog", style: {
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                }, children: open === true && _jsx(AlertDialog, {}) })] }));
}
