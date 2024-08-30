import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Row from './Row';
export default function LogPage() {
    const [dirInfo, setdirInfo] = useState([]);
    const [log, setLog] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
            .then(process => process.json())
            .then(data => {
            console.log(data);
            setdirInfo(data);
        });
    }, [log]);
    const createLogHandler = () => {
        fetch("http://localhost:8080/api/createLogs")
            .then(process => process.json())
            .then(data => {
            console.log(data);
            setLog(data);
        });
    };
    const store = [];
    for (const element of dirInfo) {
        store.push(_jsx(Row, { logName: element }));
    }
    return (_jsxs("div", { children: [_jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), store] }));
}
;
