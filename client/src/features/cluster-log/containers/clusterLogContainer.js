import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
// import Row from "../Row"
// import {ClusterLog} from "../clusterLogsApiSlice"
import { useGetClusterLogsQuery, } from "../clusterLogsApiSlice";
import ClusterLog from "../components/ClusterLog";
export default function LogPage() {
    const [dirInfo, setdirInfo] = useState([]);
    const [log, setLog] = useState([]);
    const [deleted, setDeleted] = useState("");
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
    const createLogHandler = () => {
        fetch("http://localhost:8080/api/createLogs", {
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
    };
    const store = [];
    for (let i = dirInfo.length; i > 0; i--) {
        if (dirInfo[i] !== (null || undefined)) {
            store.push(_jsx(Box, { children: _jsx(ClusterLog, { setDeleted: setDeleted, logName: dirInfo[i] }) }, i * 123));
        }
    }
    const { data: clusterLog, isLoading: clusterLogIsLoading, isError: clusterLogError, refetch: refetchClusterLogs, } = useGetClusterLogsQuery();
    console.log("useGetClusterLogsQuery.data: ", clusterLog);
    return (_jsxs("div", { style: { position: "absolute", left: "250px", top: "100px" }, children: [_jsx("h1", { style: {
                    textAlign: "center",
                    marginLeft: "32px",
                    marginBottom: "16px",
                    minWidth: "700px",
                }, children: "Logs" }), _jsx(Button, { style: {
                    display: "flex",
                    left: "290px",
                    marginLeft: "32px",
                    marginBottom: "16px",
                }, variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), store] }));
}
